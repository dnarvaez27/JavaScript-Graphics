'use strict';

function Chart() {

}

Chart.Linear = function ( container_id, loadOnReady = true ) {
    let self = this;
    this.config = {
        container_id: container_id,
        rangeName: '',
        domainName: '',
        svg: undefined,
        onClick: undefined,
        loadOnReady: loadOnReady
    };
    this.attrs = {
        chart: {
            line_width: 2,
            point_diameter: 10,
            animation_duration: 150,
            background: '#FFFFFF'
        },
        axis: {
            show: true,
            width: 1,
            color: '#CCC',
            y_min: 10
        },
        guides: {
            show: true,
            color: '#DDDDDD',
            width: .5
        },
        labels: {
            show: { x: true, y: true },
            font: {
                size: 10,
                family: 'Arial'
            },
            color: '#AAAAAA',
            gap: 5
        },
        tooltip: {
            fontUp: {
                size: 15,
                family: 'Arial'
            },
            fontDown: {
                size: 10,
                family: 'Arial'
            },
            padding: {
                lrSides: 20,
                udSides: 10
            },
            coords: { x: true, y: true },
            style: {
                background: '#FFFFFF',
                foreground: '#212121'
            }
        },
        legend: {
            show: true,
            style: {
                foreground: '#212121',
                background: '#FFFFFF'
            }
        }
    };

    this.data = [];
    this.axisY = [];
    this.axisX = [];
    let utils = {
        extractNumber: function ( str ) {
            return str.match( /[0-9]+\.*[0-9]*/g )[ 0 ];
        },
    };
    let computedStyle = window.getComputedStyle( document.getElementById( self.config.container_id ), null );
    let dummyText;
    let dims = { w: 0, h: 0 };
    let svgContainer = document.createElement( 'div' );
    let dictSeries = {};

    this.draw = function () {
        removeChildsFrom( self.config.container_id );
        let mainContainer = document.getElementById( self.config.container_id );
        svgContainer.setAttribute( 'id', 'svg-container-for-' + container_id );
        svgContainer.style.height = mainContainer.style.height || 'auto';
        svgContainer.style.width = mainContainer.style.width || 'auto';
        mainContainer.appendChild( svgContainer );
        // mainContainer.style.height = 'auto';
        // mainContainer.style.width = 'auto';
        mainContainer.style.display = 'table';

        self.config.svg = SVG( 'svg-container-for-' + container_id ).size( '100%', '100%' );
        self.config.svg.style( 'background-color', self.attrs.chart.background );
        self.config.svg.viewbox( 0,
                                 0,
                                 utils.extractNumber( computedStyle.getPropertyValue( 'width' ) ),
                                 utils.extractNumber( computedStyle.getPropertyValue( 'height' ) ) );
        self.config.svg.clear();
        dummyText = self.config.svg.text( '' );
        dummyText.fill( 'transparent' );
        drawLegend();
        draw_points();
    };

    function draw_points() {
        const minY = self.data.reduce( function ( total, serie ) {
            return Math.min( total, serie.values.reduce( function ( total, tupla ) {
                return Math.min( total, tupla[ 1 ] );
            }, Number.MAX_SAFE_INTEGER ) );
        }, Number.MAX_SAFE_INTEGER );
        const maxY = Math.max( self.attrs.axis.y_min, self.data.reduce( function ( total, serie ) {
            return Math.max( total, serie.values.reduce( function ( total, tupla ) {
                return Math.max( total, transform( tupla[ 1 ], minY ) );
            }, 0 ) );
        }, 0 ) );
        const minX = self.data.reduce( function ( total, serie ) {
            return Math.min( total, serie.values.reduce( function ( total, tupla ) {
                return Math.min( total, tupla[ 0 ] );
            }, Number.MAX_SAFE_INTEGER ) );
        }, Number.MAX_SAFE_INTEGER );
        const maxX = Math.max( 0, self.data.reduce( function ( total, serie ) {
            return Math.max( total, serie.values.reduce( function ( total, tupla ) {
                return Math.max( total, transform( tupla[ 0 ], minX ) );
            }, 0 ) );
        }, 0 ) );
        const tooltip_w = 50;
        const tooltip_h = 50;
        const diameter = self.attrs.chart.point_diameter;

        let style = window.getComputedStyle( document.getElementById( self.config.svg.node.id ), null );
        dims.h = utils.extractNumber( style.height );
        dims.w = utils.extractNumber( style.width );

        const heightLabel = (self.attrs.labels.gap * 2) + self.attrs.labels.font.size;
        const widthLabel = getSize( minY.toString(), self.attrs.labels.font.size ) + (self.attrs.chart.point_diameter / 2) + self.attrs.labels.gap;

        const tooltip = self.config.svg.group().hide();
        tooltip.rect( tooltip_w, tooltip_h ).move( tooltip.x(), tooltip.y() );
        tooltip.text( '' ).font( self.attrs.tooltip.fontUp ); // Domain
        tooltip.text( '' ).font( self.attrs.tooltip.fontDown ); // Range
        let dictQueuesAnim = {};

        (function draw_axis() {
            if ( self.attrs.axis.show ) {
                let coords = getCoordinates( 0, 0 );

                let asix_Y = self.config.svg.line( coords.x, 0, coords.x, dims.h - heightLabel );
                asix_Y.stroke( { color: self.attrs.axis.color, width: self.attrs.axis.width, linecap: 'round' } );

                let asix_X = self.config.svg.line( widthLabel, coords.y, dims.w, coords.y );
                asix_X.stroke( { color: self.attrs.axis.color, width: self.attrs.axis.width, linecap: 'round' } );
            }
        })();

        function drawGuides() {
            function guides( x1, y1, x2, y2, ) {
                let line = self.config.svg.line( x1, y1, x2, y2 );
                line.stroke( { color: self.attrs.guides.color, width: self.attrs.guides.width } );
                line.back();
            }

            function labels( t ) {
                let text = self.config.svg.text( t );
                text.font( self.attrs.labels.font );
                text.fill( self.attrs.labels.color );
                return text;
            }

            self.axisX.forEach( function ( x ) {
                if ( x <= maxX && x + 1 >= minX || x === 0 ) {
                    let coords = getCoordinates( x, 0 );
                    let labelCoord = getCoordinates( x, minY );

                    if ( self.attrs.guides.show ) {
                        guides( coords.x, 0, coords.x, dims.h - heightLabel );
                    }
                    if ( self.attrs.labels.show.x ) {
                        let text = labels( x.toString() );
                        text.y( dims.h - heightLabel + self.attrs.labels.gap );
                        text.cx( labelCoord.x );
                    }
                }
            } );
            self.axisY.forEach( function ( y ) {
                if ( y <= maxY && y >= minY || y === 0 ) {
                    let coords = getCoordinates( 0, y );

                    if ( coords.y <= dims.h - heightLabel ) {
                        if ( self.attrs.guides.show ) {
                            guides( getSize( y.toString(), self.attrs.labels.font.size ) + self.attrs.labels.gap * 2, coords.y, dims.w, coords.y );
                        }
                        if ( self.attrs.labels.show.y ) {
                            let text = labels( y.toString() );
                            // let textSize = getSize( text.text(), text.font().size );
                            text.x( self.attrs.labels.gap );
                            text.cy( coords.y );
                        }
                    }
                }
            } );
        }

        function getCoordinates( x, y ) {
            let actualY = dims.h - (transform( y, minY ) * (dims.h - heightLabel - self.attrs.chart.point_diameter * 2 - self.attrs.labels.gap) / maxY) - heightLabel - self.attrs.chart.point_diameter / 2 - self.attrs.labels.gap;
            let actualX = (transform( x, minX ) * (dims.w - widthLabel - self.attrs.chart.point_diameter * 2 - self.attrs.labels.gap) / maxX) + widthLabel + self.attrs.chart.point_diameter / 2 + self.attrs.labels.gap;
            return { x: actualX, y: actualY };
        }

        function drawLines( x1, y1, x2, y2, serie, last, point, first ) {
            function animateLine( l ) {
                if ( l ) {
                    l.l.animate( self.attrs.chart.animation_duration, '-', 0 ).plot( l.x1, l.y1, l.x2, l.y2 ).after( function () {
                        l.point.animate( 300, '<>', 0 ).size( diameter );
                        l.point.front();
                        animateLine( dictQueuesAnim[ serie.name ].shift() );
                    } );
                }
            }

            if ( first ) {
                dictSeries[ serie.name ].push( point );
            }
            else {
                let line = self.config.svg.line( x1, y1, x1, y1 );
                line.stroke( { color: serie.color, width: self.attrs.chart.line_width, linecap: 'round' } );
                line.style( 'cursor', 'pointer' );
                line.back();
                dictSeries[ serie.name ].push( point );
                dictSeries[ serie.name ].push( line );

                line.click( showSerie( serie.name ) );

                if ( !(serie.name in dictQueuesAnim) ) {
                    dictQueuesAnim[ serie.name ] = [];
                }
                dictQueuesAnim[ serie.name ].push( { l: line, x1: x1, x2: x2, y1: y1, y2: y2, point: point } );
                if ( last ) {
                    animateLine( dictQueuesAnim[ serie.name ].shift() );
                }
            }
        }

        function onMouseOver( serie, point, tuple ) {
            return function () {
                // Rect SetUp
                let rect = tooltip.select( 'rect' ).first();
                rect.fill( self.attrs.tooltip.style.background );
                rect.stroke( serie.color );

                let texts = tooltip.select( 'text' );
                // Upper Text SetUp
                let textUp = texts.get( 0 );
                textUp.text( tuple[ 2 ] || '-' );
                textUp.fill( self.attrs.tooltip.style.foreground );
                let textUpLength = getSize( textUp.text(), textUp.font().size );

                // Lower Text SetUp
                let textDown = texts.get( 1 );
                let textDownLength = 0;
                if ( self.attrs.tooltip.coords.x || self.attrs.tooltip.coords.y ) {
                    textDown.text( '(' + (self.attrs.tooltip.coords.x ? tuple[ 0 ] + ', ' : '') + (self.attrs.tooltip.coords.y ? tuple[ 1 ] : '') + ')' );
                    textDown.fill( self.attrs.tooltip.style.foreground );
                    textDownLength = getSize( textDown.text(), textDown.font().size );
                }
                else {
                    textDown.hide();
                }

                // Position SetUp
                let maxTextLength = Math.max( textUpLength, textDownLength ) + (self.attrs.tooltip.padding.lrSides * 2);
                rect.width( maxTextLength );
                textUp.cx( rect.cx() );
                textUp.y( rect.y() + self.attrs.tooltip.padding.udSides );
                textDown.cx( rect.cx() );
                textDown.y( rect.height() - self.attrs.tooltip.fontDown.size - self.attrs.tooltip.padding.udSides );

                let nX = point.cx() - rect.width() / 2;
                let nY = point.y() - rect.height();

                if ( nY < 0 ) {
                    nY = point.y() + point.height();
                }
                if ( nX < 0 ) {
                    nX = 1; // STROKE LINE
                }
                else if ( nX + rect.width() > dims.w ) {
                    nX = dims.w - rect.width();
                }
                tooltip.move( nX, nY );

                tooltip.front();
                tooltip.show();
            };
        }

        function onMouseOut() {
            return function () {
                tooltip.hide();
            };
        }

        function transform( d, min ) {
            return (d - min + (min < 0 ? 0 : min === 0 ? -min : min));
        }

        self.data.forEach( function ( serie ) {
            let data = [ [ -1, -1 ], [ -1, -1 ] ];
            dictSeries[ serie.name ] = [];
            serie.values.sort( function ( a, b ) {
                return a[ 0 ] - b[ 0 ];
            } );

            serie.values.forEach( function ( tuple, index ) {
                let coords = getCoordinates( tuple[ 0 ], tuple[ 1 ] );
                let actualX = coords.x;
                let actualY = coords.y;

                let point = self.config.svg.circle( 1 );
                point.fill( serie.color );
                point.center( actualX, actualY );
                point.style( 'cursor', 'pointer' );
                point.front();

                point.on( 'mouseover', onMouseOver( serie, point, tuple ) );
                point.on( 'mouseout', onMouseOut() );
                point.click( function () {
                    if ( self.config.onClick ) {
                        self.config.onClick( {
                                                 x: tuple[ 0 ],
                                                 y: tuple[ 1 ],
                                                 data: tuple.length === 3 ? tuple[ 2 ] : undefined,
                                                 obj: tuple
                                             } );
                    }
                } );

                if ( index === 0 ) {
                    data[ 0 ] = [ actualX, actualY ];
                    point.animate( 300, '<>', 0 ).size( diameter );
                    drawLines( -1, -1, -1, -1, serie, -1, point, true );
                }
                else {
                    data[ 1 ] = [ actualX, actualY ];
                }
                if ( index > 0 ) {
                    drawLines( data[ 0 ][ 0 ], data[ 0 ][ 1 ], data[ 1 ][ 0 ], data[ 1 ][ 1 ], serie, index === serie.values.length - 1, point );
                    data[ 0 ] = data[ 1 ];
                }
            } );
        } );

        drawGuides();
    }

    function drawLegend() {
        if ( self.attrs.legend.show ) {
            let container = document.getElementById( self.config.container_id );
            let legendContainer = document.createElement( 'div' );
            legendContainer.classList.add( 'linear-chart-legend-container' );
            legendContainer.style.backgroundColor = self.attrs.legend.style.background;

            self.data.forEach( function ( item ) {
                let serie = document.createElement( 'div' );
                serie.classList.add( 'linear-chart-legend-serie' );
                serie.onclick = showSerie( item.name );

                let legend = document.createElement( 'span' );
                legend.appendChild( document.createTextNode( item.name ) );
                legend.style.color = self.attrs.legend.style.foreground;
                legend.classList.add( 'linear-chart-legend-text' );

                let bullet = document.createElement( 'span' );
                bullet.classList.add( 'linear-chart-legend-bullet' );
                bullet.style.backgroundColor = item.color;

                serie.appendChild( bullet );
                serie.appendChild( legend );

                legendContainer.appendChild( serie );
            } );
            container.insertBefore( legendContainer, svgContainer );
        }
    }

    function showSerie( serieName ) {
        return function () {
            let temp = [];
            dictSeries[ serieName ].forEach( function ( item ) {
                if ( item.type === 'circle' ) {
                    temp.push( item );
                }
                else {
                    item.front();
                }
            } );
            temp.forEach( function ( item ) {
                item.front();
            } );
        };
    }

    function getSize( text, fontSize ) {
        dummyText.text( text );
        if ( fontSize ) {
            dummyText.font( { size: fontSize } );
        }
        let length = dummyText.length();
        dummyText.text( '' );
        return length;
    }

    function removeChildsFrom( id ) {
        let parent = document.getElementById( id );
        while ( parent.firstChild ) {
            parent.removeChild( parent.firstChild );
        }
    }

    if ( self.config.loadOnReady ) {
        SVG.on( document, 'DOMContentLoaded', function () {
            self.draw();
        } );
    }
};

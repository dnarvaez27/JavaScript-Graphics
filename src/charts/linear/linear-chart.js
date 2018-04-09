'use strict';

function Chart() {

}

Chart.Linear = function ( container_id, loadOnReady = true ) {
    let self = this;
    this.config = {
        container_id: container_id,
        rangeName: '',
        svg: undefined,
        dims: { w: 0, h: 0 },
        onClick: undefined,
        loadOnReady: loadOnReady,
        showAxis: true,
        showLabels: true,
        showGuides: true,
        showLegend: true,
        showCoord: { x: true, y: true },
        minHeight: 10
    };
    this.attrs = {
        padding: 30,
        axis_width: 1,
        line_width: 2,
        animatation_duration: 150,
        point_diameter: 10,
        axis_color: '#212121',
        guides_color: '#DDDDDD',
        bg: '#FFFFFF',
        fg: '#212121'
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

    this.draw = function () {
        validate();

        self.config.svg = SVG( self.config.container_id ).size( '100%', '100%' );
        self.config.svg.style( 'background-color', self.attrs.bg );
        self.config.svg.viewbox( 0,
                                 0,
                                 utils.extractNumber( computedStyle.getPropertyValue( 'width' ) ),
                                 utils.extractNumber( computedStyle.getPropertyValue( 'height' ) ) );
        draw_points();
    };

    function validate() {
        self.data.forEach( function ( serie ) {
            serie.values.forEach( function ( item ) {
                if ( item[ 0 ] < 0 || item[ 1 ] < 0 ) {
                    throw new Error( 'Negative values are not allowed yet' );
                }
            } );
        } );
    }

    function draw_points() {
        const minY = self.data.reduce( function ( total, serie ) {
            return Math.min( total, serie.values.reduce( function ( total, tupla ) {
                return Math.min( total, tupla[ 1 ] );
            }, Number.MAX_SAFE_INTEGER ) );
        }, Number.MAX_SAFE_INTEGER );
        const maxY = Math.max( self.config.minHeight, self.data.reduce( function ( total, serie ) {
            return Math.max( total, serie.values.reduce( function ( total, tupla ) {
                return Math.max( total, transform( tupla[ 1 ], minY ) );
            }, 0 ) );
        }, 0 ) * 1.1 );
        const minX = self.data.reduce( function ( total, serie ) {
            return Math.min( total, serie.values.reduce( function ( total, tupla ) {
                return Math.min( total, tupla[ 0 ] );
            }, Number.MAX_SAFE_INTEGER ) );
        }, Number.MAX_SAFE_INTEGER );
        const maxX = Math.max( 0, self.data.reduce( function ( total, serie ) {
            return Math.max( total, serie.values.reduce( function ( total, tupla ) {
                return Math.max( total, transform( tupla[ 0 ], minX ) );
            }, 0 ) );
        }, 0 ) + 1 );
        const tooltip_w = 50;
        const tooltip_h = 50;
        const rad = self.attrs.point_diameter;

        let style = window.getComputedStyle( document.getElementById( self.config.svg.node.id ), null );
        self.config.dims.h = utils.extractNumber( style.height ) - self.attrs.padding;
        self.config.dims.w = utils.extractNumber( style.width );

        const tooltip = self.config.svg.group().hide();
        tooltip.rect( tooltip_w, tooltip_h ).center( tooltip.cx(), tooltip.cy() );
        tooltip.text( '' ); // Domain
        tooltip.text( '' ); // Range
        let dictQueuesAnim = {};
        let dictSeries = {};

        (function draw_axis() {
            if ( self.config.showAxis ) {
                let coords = getCoordinates( 0, 0, true );

                let asix_Y = self.config.svg.line( coords.x, self.attrs.padding, coords.x, self.config.dims.h );
                asix_Y.stroke( { color: self.attrs.axis_color, width: self.attrs.axis_width, linecap: 'round' } );

                let asix_X = self.config.svg.line( self.attrs.padding, coords.y, self.config.dims.w, coords.y );
                asix_X.stroke( { color: self.attrs.axis_color, width: self.attrs.axis_width, linecap: 'round' } );
            }
        })();

        function drawLegend() {
            //TODO
        }

        function drawGuides() {

            self.axisX.forEach( function ( x ) {
                let coords = getCoordinates( x, 0 );

                if ( self.config.showGuides ) {
                    let line = self.config.svg.line( coords.x, self.attrs.padding, coords.x, self.config.dims.h );
                    line.stroke( { color: self.attrs.guides_color, width: .5 } );
                    line.back();
                }

                if ( self.config.showLabels ) {
                    let text = self.config.svg.text( x.toString() );
                    text.font( { size: 12 } );
                    text.fill( self.attrs.axis_color );
                    text.y( coords.y + rad / 2 );
                    text.cx( coords.x );
                }
            } );
            self.axisY.forEach( function ( y ) {
                let coords = getCoordinates( 0, y );

                if ( self.config.showGuides ) {
                    let line = self.config.svg.line( self.attrs.padding, coords.y, self.config.dims.w, coords.y );
                    line.stroke( { color: self.attrs.guides_color, width: .5 } );
                    line.back();
                }

                if ( self.config.showLabels ) {
                    let text = self.config.svg.text( y.toString() );
                    text.font( { size: 12 } );
                    text.fill( self.attrs.axis_color );
                    text.x( coords.x - text.length() - rad / 2 );
                    text.cy( coords.y );
                }
            } );
        }

        function getCoordinates( x, y, normal ) {
            let actualY = self.config.dims.h - ((normal ? y : transform( y, minY )) * (self.config.dims.h - self.attrs.padding) / maxY);
            let actualX = self.attrs.padding + ((normal ? x : transform( x, minX )) * (self.config.dims.w - self.attrs.padding * 2) / maxX);
            return { x: actualX, y: actualY };
        }

        function drawLines( x1, y1, x2, y2, serie, last, point ) {
            function animateLine( l ) {
                if ( l ) {
                    l.l.animate( self.attrs.animatation_duration, '-', 0 ).plot( l.x1, l.y1, l.x2, l.y2 ).after( function () {
                        l.point.animate( 300, '<>', 0 ).size( rad );
                        animateLine( dictQueuesAnim[ serie.name ].shift() );
                    } );
                }
            }

            let line = self.config.svg.line( x1, y1, x1, y1 );
            line.stroke( { color: serie.color, width: self.attrs.line_width, linecap: 'round' } );
            line.style( 'cursor', 'pointer' );
            line.back();
            dictSeries[ serie.name ].push( line );
            dictSeries[ serie.name ].push( point );

            line.click( function () {
                let temp = [];
                dictSeries[ serie.name ].forEach( function ( item ) {
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
            } );

            if ( !(serie.name in dictQueuesAnim) ) {
                dictQueuesAnim[ serie.name ] = [];
            }
            dictQueuesAnim[ serie.name ].push( { l: line, x1: x1, x2: x2, y1: y1, y2: y2, point: point } );
            if ( last ) {
                animateLine( dictQueuesAnim[ serie.name ].shift() );
            }
        }

        function onMouseOver( serie, point, tuple ) {
            const textPadding = 8;
            return function () {
                let rect = tooltip.select( 'rect' ).first();
                rect.fill( self.attrs.bg );
                rect.stroke( serie.color );

                let textUp = tooltip.select( 'text' ).get( 0 );
                textUp.text( tuple[ 2 ] || '-' );
                textUp.fill( self.attrs.fg );
                let textDLen = textUp.length();

                let textDown = tooltip.select( 'text' ).get( 1 );
                let textRLen = 0;
                if ( self.config.showCoord.x || self.config.showCoord.y ) {
                    textDown.text( '(' + (self.config.showCoord.x ? tuple[ 0 ] + ', ' : '') + (self.config.showCoord.y ? tuple[ 1 ] : '') + ')' );
                    textDown.font( { size: 12 } );
                    textDown.fill( self.attrs.fg );
                    textRLen = textDown.length();
                }
                else {
                    textDown.hide();
                }

                let maxText = Math.max( textDLen, textRLen ) + textPadding;
                rect.width( maxText );
                textUp.move( rect.width() / 2 - textDLen / 2, textPadding );
                textDown.move( rect.width() / 2 - textRLen / 2, textPadding * 3 );

                let nY = point.cy() - (tooltip_h / 2) - (rad / 2);
                let nX = point.cx() + (rect.width() / 2);
                tooltip.center( nX > self.config.dims.w ? self.config.dims.w - (rect.width() / 2) - 1 : Math.max( rect.width() / 2, point.cx() ), (nY - (rect.height() / 2)) < 0 ? point.cy() + (tooltip_h / 2) + (rad / 2) : nY );
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
            return Math.abs( d - min + (min === 0 ? 0 : 1) );
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

                point.mouseover( onMouseOver( serie, point, tuple ) );
                point.mouseout( onMouseOut() );
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
                    point.animate( 300, '<>', 0 ).size( rad );
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

    if ( self.config.loadOnReady ) {
        SVG.on( document, 'DOMContentLoaded', function () {
            self.draw();
        } );
    }
};

// TODO: Fix Tranform & Negatives
// TODO: Legend
// TODO: Axis values

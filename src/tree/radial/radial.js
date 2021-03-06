/**
 * radial.js
 * Radial Tree Grapher using SVG.js http://svgjs.com/
 * tree.js is required. (See in datastructures: https://github.com/dnarvaez27/JavaScript-Graphics)
 *
 * @license Apache Licence, https://www.apache.org/licenses/LICENSE-2.0
 * @version 1.0
 * @author  David Narvaez Guerrero
 * @updated 2018-02-25
 * @link    https://github.com/dnarvaez27/JavaScript-Graphics
 *
 */

'use strict';

function Radial( container_id, loadOnReady ) {
    let self = this;
    let points = [];
    let utils = {
        extractNumber: function ( str ) {
            return str.match( /[0-9]+\.*[0-9]*/g )[ 0 ];
        },
        algebra: {
            prodPunto: function ( a, b ) {
                return (a.x * b.x) + (a.y * b.y);
            },
            normalVector: function ( a ) {
                let c1 = a.x;
                let c2 = a.y;
                return Math.sqrt( Math.pow( c1, 2 ) + Math.pow( c2, 2 ) );
            },
            angulo: function ( a, b ) {

                let angulo = Math.atan( (b.y - a.y) / (b.x - a.x) );

                if ( b.x <= a.x ) {
                    if ( b.y >= a.y ) {
                        return Math.PI + Math.abs( angulo );
                    }
                    else {
                        return Math.PI - Math.abs( angulo );
                    }
                }
                else {
                    if ( b.y >= a.y ) {
                        return (2 * Math.PI) - Math.abs( angulo );
                    }
                    else {
                        return Math.abs( angulo );
                    }
                }
            },
            anguloLR: function ( L, R ) {
                if ( R === 0 ) {
                    return 0;
                }
                return L / R;
            },
            getComps: function ( R, a ) {
                return [ R * Math.cos( a ), R * Math.sin( a ) ];
            },
            getDist: function ( a, b ) {
                return Math.sqrt( Math.pow( Math.abs( a.x - b.x ), 2 ) + Math.pow( Math.abs( a.y - b.y ), 2 ) );
            }
        }
    };

    this.radial_config = {
        container_id: container_id,
        tree: undefined,
        clickListener: undefined,
        loadOnReady: loadOnReady,
        ringStart: 0
    };
    this.radial_attrs = {
        inc: undefined,
        size: 25,
        padding: 10,
        style: {
            line: { color: '#212121', width: 2 },
            ring: {
                'stroke-dasharray': '1,2',
                fill: 'transparent',
                stroke: '#212121'
            },
            node: {
                bg: '#212121',
                fg: '#FFFFFF',
                anim: {
                    scale: 1.5,
                    textScale: .5
                }
            }
        }
    };
    if ( this.radial_config.loadOnReady ) {
        SVG.on( document, 'DOMContentLoaded', function () {
            self.radial_restart();
        } );
    }

    this.radial_restart = function () {
        let svg = SVG( self.radial_config.container_id ).size( '100%', '100%' );
        svg.style( { padding: (10 + self.radial_attrs.size) + 'px' } );

        let style = window.getComputedStyle( document.getElementById( svg.node.id ), null );
        let height = utils.extractNumber( style.height );
        let width = utils.extractNumber( style.width );
        let center = { x: width / 2, y: height / 2 };

        function Point( x, y, rad, nodo ) {
            this.x = x;
            this.y = y;
            this.rad = rad;
            this.nodo = nodo;
            this.draw = function () {
                let grupo = svg.group();
                grupo.style( 'cursor', 'pointer' );

                let circle = svg.circle( this.rad * 2 );
                circle.center( this.x, this.y );
                circle.attr( { fill: ((nodo.element.style && nodo.element.style.bg) || self.radial_attrs.style.node.bg) } );
                grupo.add( circle );

                let text, textContent = undefined;
                if ( this.nodo.element.display && (this.nodo.element.display.normal || this.nodo.element.display.normal_svg) ) {
                    if ( this.nodo.element.display.normal ) {
                        text = svg.text( this.nodo.element.display.normal.toString() );
                        text.style( { fill: ((nodo.element.style && nodo.element.style.fg) || self.radial_attrs.style.node.fg) } );
                        text.font( {
                                       family: 'Helvetica',
                                       size: 10
                                   } );
                        text.center( this.x, this.y );

                        textContent = svg.text( this.nodo.element.display.hover.toString() );
                        textContent.style( { fill: ((nodo.element.style && nodo.element.style.fg) || self.radial_attrs.style.node.fg) } );
                        textContent.font( {
                                              family: 'Helvetica',
                                              size: 10 * self.radial_attrs.style.node.anim.textScale
                                          } );
                        textContent.center( this.x, this.y );
                        textContent.hide();

                        grupo.add( textContent );
                    }
                    else {
                        let g = svg.group();
                        g.svg( this.nodo.element.display.normal_svg );
                        g.center( this.x, this.y );
                        grupo.add( g );
                    }
                }

                let emptyCircle = svg.circle( this.rad * 2 );
                emptyCircle.center( this.x, this.y );
                emptyCircle.attr( { fill: 'transparent' } );
                grupo.add( emptyCircle );

                grupo.click( function () {
                    if ( self.radial_config.clickListener ) {
                        self.radial_config.clickListener( nodo.element );
                    }
                } );
                grupo.mouseover( function () {
                    grupo.front();
                    if ( text ) {
                        text.hide();
                        textContent.show();
                    }
                    grupo.animate( { duration: 60 } ).scale( self.radial_attrs.style.node.anim.scale );
                } );
                grupo.mouseout( function () {
                    if ( text ) {
                        text.show();
                        textContent.hide();
                        text.front();
                    }
                    grupo.animate( { duration: 60 } ).scale( 1 );
                } );
            };
        }

        (function paintRings() {
            function paintRing( rad ) {
                let ring = svg.circle( rad * 2 );
                ring.attr( self.radial_attrs.style.ring );
                ring.center( center.x, center.y );
            }

            let treeHeight = self.radial_config.tree.height();
            if ( !self.radial_attrs.inc ) {
                self.radial_attrs.inc = height / (treeHeight - 1);
                self.radial_attrs.inc /= 2;
            }

            for ( let i = 1 + self.radial_config.ringStart; i <= treeHeight + self.radial_config.ringStart - 1; i++ ) {
                paintRing( i * self.radial_attrs.inc );
            }

            // for ( let i = treeHeight - 1; i > 0; i-- ) {
            //     paintRing( i * radial_attrs.inc );
            // }
        })();
        (function paint( nodo, angulo, radio ) {
            let childPoints = [];
            let actualAngulo = angulo;

            if ( nodo.childs && nodo.childs.length !== 0 ) {
                nodo.childs.forEach( function ( child ) {
                    let point = paint( child, actualAngulo, radio + self.radial_attrs.inc );
                    actualAngulo = point.angulo;

                    if ( !child.element.hide ) {
                        childPoints.push( point.pos );
                    }
                } );
                if ( nodo.childs.length === 1 ) {
                    actualAngulo += utils.algebra.anguloLR( self.radial_attrs.padding * 2, radio );
                }
            }
            else {
                actualAngulo += utils.algebra.anguloLR( (self.radial_attrs.size * 2) + self.radial_attrs.padding, radio );
            }

            let comp = utils.algebra.getComps( radio, angulo );
            if ( nodo.childs.length > 1 ) {
                comp = utils.algebra.getComps( radio, angulo + ((actualAngulo - angulo) / 2) - (utils.algebra.anguloLR( self.radial_attrs.size, radio )) );
            }

            if ( nodo.element && !nodo.element.hide ) {
                childPoints.forEach( function ( point ) {
                    let origenX = center.x + comp[ 0 ];
                    let origenY = center.y - comp[ 1 ];
                    let destinoX = center.x + point[ 0 ];
                    let destinoY = center.y - point[ 1 ];

                    let a = utils.algebra.angulo( { x: origenX, y: origenY }, { x: destinoX, y: destinoY } );
                    let deltaY0 = self.radial_attrs.size * Math.sin( a );
                    let deltaX0 = self.radial_attrs.size * Math.cos( a );

                    origenX += deltaX0;
                    origenY -= deltaY0;
                    destinoX -= deltaX0;
                    destinoY += deltaY0;

                    let line = svg.line( origenX, origenY, destinoX, destinoY );
                    line.stroke( self.radial_attrs.style.line );
                } );

                let p = new Point( center.x + comp[ 0 ], center.y - comp[ 1 ], self.radial_attrs.size, nodo );
                p.draw();
                points.push( p );
            }
            return { angulo: actualAngulo, pos: comp };
        })( self.radial_config.tree.root, 0, self.radial_config.ringStart * self.radial_attrs.inc );

        return svg;
    };
}

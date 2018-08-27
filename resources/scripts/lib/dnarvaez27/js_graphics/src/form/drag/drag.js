'use strict';

function DragForm( container_id ) {
    let form = this;
    this.drag_config = {
        svg: SVG( container_id ).size( '100%', '100%' ),
        question: '',
        description: ''
    };
    this.drag_attrs = {
        padding: { x: 25, y: 15 },
        style: {
            success: 'olive',
            error: 'brown',
            hover: '#00a9af',
            background: '#DDDDDD'
        }
    };
    this.utils = {
        extractNumber: function ( str ) {
            return str.match( /[0-9]+\.*[0-9]*/g )[ 0 ];
        },
    };

    let style = window.getComputedStyle( document.getElementById( form.drag_config.svg.node.id ), null );
    let height = form.utils.extractNumber( style.height );
    let width = form.utils.extractNumber( style.width );

    this.Draggable = function ( data, initX, initY ) {
        this.data = data;
        this.pos = { x: undefined, y: undefined };
        this.initPos = { x: initX, y: initY };
        this.group = undefined;
        this.draw = function () {
            this.group = form.drag_config.svg.group();

            let text = this.group.text( data );
            text.style( 'fill', 'white' );

            let rect = this.group.rect( text.bbox().width + form.drag_attrs.padding.x, text.bbox().height + form.drag_attrs.padding.y );
            rect.fill( '#212121' );
            rect.radius( 10 );

            text.center( rect.cx(), rect.cy() );
            this.group.style( 'cursor', 'pointer' );
            this.group.move( this.initPos.x, this.initPos.y );
            this.group.add( rect );
            this.group.add( text );

            return this.group;
        };
    };

    this.Response = function ( responses ) {
        let self = this;
        let margin = 3;
        let border = margin - 1;
        const padd = (form.drag_attrs.padding.x / 2) + 30;
        this.matches = [];

        (function () {
            responses.forEach( function ( item ) {
                let draggable = new form.Draggable( item.value, 0, 0 );
                draggable.draw();

                self.matches.push( draggable );
            } );

            resetDrags();
        })();

        let draggables = [];
        let actualX = padd;

        function resetDrags() {
            let getCoords = ( event ) => {
                let x = !event.detail.event.x && event.detail.event.changedTouches ? event.detail.event.changedTouches[ 0 ].pageX : event.detail.event.pageX;
                let y = !event.detail.event.y && event.detail.event.changedTouches ? event.detail.event.changedTouches[ 0 ].pageY : event.detail.event.pageY;
                return { x: x, y: y };
            };
            let inside = ( x, y ) => {
                let rbox = self.rect.rbox();
                return rbox.x <= x && rbox.y <= y && rbox.x + rbox.width >= x && rbox.y + rbox.height >= y;
            };

            let onmove = function ( a ) {
                return function ( event ) {
                    a.group.front();
                    let { x, y } = getCoords( event );
                    if ( inside( x, y ) ) {
                        self.rect.stroke( { color: form.drag_attrs.style.hover, width: border } );
                    }
                    else {
                        self.rect.stroke( form.drag_attrs.style.background );
                    }
                };
            };
            let onend = function ( a ) {
                return function ( event ) {
                    let { x, y } = getCoords( event );
                    if ( inside( x, y ) ) {
                        self.addDraggable( a );
                        self.rect.stroke( form.drag_attrs.style.background );
                    }
                    else {
                        self.removeDraggable( a );
                    }
                };
            };

            let xTemp = padd;
            let temp = self.matches.slice();
            temp.sort( () => 0.5 - Math.random() );
            temp.forEach( function ( item ) {
                item.group.draggable( function ( x, y ) {
                    return {
                        x: x >= 0 && x <= width - (form.drag_attrs.padding.x * 2.5),
                        y: y <= height - (form.drag_attrs.padding.y * 2) && y >= 0
                    };
                } );
                item.group.on( 'dragmove', onmove( item ) );
                item.group.on( 'dragend', onend( item ) );

                item.initPos = { x: xTemp, y: 0 };
                item.group.move( xTemp, 0 );
                xTemp += item.group.bbox().width + (form.drag_attrs.padding.x / 2);
            } );
        }

        this.length = (function () {
            return self.matches.reduce( function ( total, current ) {
                return total + current.group.bbox().width + (form.drag_attrs.padding.x / 2);
            }, 0 );
        })() + (form.drag_attrs.padding.x / 2);
        this.rect = undefined;

        this.addDraggable = function ( draggable ) {
            if ( !draggables.includes( draggable ) ) {
                draggable.group.x( actualX );
                draggable.group.cy( this.rect.cy() );
                draggable.pos = { x: actualX, y: this.rect.cy() };
                draggables.push( draggable );
                actualX += draggable.group.bbox().width + (form.drag_attrs.padding.x / 2);
            }
            else {
                draggable.group.x( draggable.pos.x );
                draggable.group.cy( draggable.pos.y );
            }
        };
        this.removeDraggable = function ( draggable ) {
            if ( draggables.includes( draggable ) ) {
                draggables.splice( draggables.indexOf( draggable ), 1 );
                actualX -= draggable.group.bbox().width + (form.drag_attrs.padding.x / 2);
                this.repaint();
            }
        };
        this.repaint = function () {
            let temp = draggables.slice();
            draggables = [];

            actualX = padd;
            temp.forEach( a => {
                this.addDraggable( a );
            } );
        };
        this.draw = function () {
            drawQuestion();

            this.rect = form.drag_config.svg.rect( this.length + 30, 55 );
            this.rect.move( margin, 50 );
            this.rect.fill( form.drag_attrs.style.background );
            this.rect.stroke( form.drag_attrs.style.background );
            this.rect.stroke( { width: 1 } );
            this.rect.radius( 10 );
            this.rect.back();

            let gCheck = form.drag_config.svg.group();
            let check = form.drag_config.svg.circle( 20 );
            check.fill( '#92b700' );
            check.center( margin + 15, this.rect.cy() - 12.5 );
            let svg_check = form.drag_config.svg.path( 'M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' );
            svg_check.fill( '#FFFFFF' );
            svg_check.center( margin + 15, check.cy() );
            svg_check.scale( .5 );
            gCheck.add( check );
            gCheck.add( svg_check );
            gCheck.style( 'cursor', 'pointer' );
            gCheck.click( () => self.check() );

            let gClear = form.drag_config.svg.group();
            let clear = form.drag_config.svg.circle( 20 );
            clear.fill( '#b71500' );
            clear.center( margin + 15, this.rect.cy() + 12.5 );
            let svg_clear = form.drag_config.svg.path( 'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' );
            svg_clear.fill( '#FFFFFF' );
            svg_clear.center( margin + 15, clear.cy() );
            svg_clear.scale( .5 );
            gClear.add( clear );
            gClear.add( svg_clear );
            gClear.style( 'cursor', 'pointer' );
            gClear.click( () => self.clear() );
        };
        this.clear = function () {
            self.matches.forEach( function ( item ) {
                item.group.select( 'rect' ).fill( '#212121' );
                item.group.move( item.initPos.x, item.initPos.y );
            } );
            draggables = [];
            actualX = padd;
            resetDrags();
        };
        this.check = function () {
            let temp = self.matches.slice();
            draggables.forEach( function ( item, i ) {
                if ( self.matches[ i ].data === draggables[ i ].data ) {
                    item.group.select( 'rect' ).fill( form.drag_attrs.style.success );
                    temp.splice( temp.indexOf( item ), 1 );
                }
                else {
                    item.group.select( 'rect' ).fill( form.drag_attrs.style.error );
                }
                item.group.draggable( false );
            } );
            temp.forEach( function ( item ) {
                item.group.select( 'rect' ).fill( form.drag_attrs.style.error );
                item.group.draggable( false );
            } );
        };
        // this.isOnDraggable = function ( x, y, drag ) {
        //     return draggables.some( function ( b, index ) {
        //         let rbox = b.group.rbox();
        //         let isOn = rbox.x <= x && rbox.y <= y && rbox.x2 >= x && rbox.y2 >= y;
        //         if ( isOn ) {
        //             let delta = drag.group.bbox().width;
        //             for ( let i = index; i < draggables.length; i++ ) {
        //                 let obj = draggables[ i ];
        //                 obj.group.x( obj.group.x() + delta );
        //             }
        //         }
        //         return isOn;
        //     } );
        // };
    };

    function drawQuestion() {
        let container = document.getElementById( container_id );
        container.setAttribute( 'style', 'margin-top: 0px' );

        let div_question = document.createElement( 'DIV' );
        div_question.setAttribute( 'class', 'question' );
        let question = document.createElement( 'H3' );
        question.appendChild( document.createTextNode( form.drag_config.question ) );
        div_question.appendChild( question );

        let description = document.createElement( 'SPAN' );
        description.appendChild( document.createTextNode( form.drag_config.description ) );
        description.setAttribute( 'class', 'description' );
        container.insertBefore( description, container.firstChild );
        container.insertBefore( div_question, container.firstChild );

    }
}

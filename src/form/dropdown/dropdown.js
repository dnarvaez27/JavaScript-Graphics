'use strict';

function DropDown( btn_id, onclick ) {
    const dropdown = this;

    function Nodo( element, parent ) {
        let self = this;
        self.parent = parent;
        self.element = element;
        self.childs = [];
        self.add = function ( child ) {
            let nodo = new Nodo( child, self );
            self.childs.push( nodo );
            return nodo;
        };
    }

    dropdown.style = {
        backArrow: undefined || '◄',
        frontArrow: undefined || '►'
    };

    let isShown = false;
    const button = document.getElementById( btn_id );
    const container = document.createElement( 'div' );
    let parent = button.parentElement;
    let subcontainer;
    let isButtonEvent = false;
    let delta = { x: 0, y: 0 };

    document.addEventListener( 'mouseup', function ( e ) {
        if ( e.which === 1 ) {
            if ( !isButtonEvent ) {
                let rect = container.getBoundingClientRect();
                if ( rect.height + rect.y < e.y || rect.y > e.y
                    || rect.x > e.x || (rect.x + rect.width) < e.x ) {
                    hide();
                }
            }
            isButtonEvent = false;
        }
    } );
    button.onmousedown = function () {
        isButtonEvent = true;
    };
    button.onclick = function () {
        if ( isShown ) {
            hide();
        }
        else {
            show();
        }
    };

    dropdown.menu = new Nodo( 'Menu-Root', undefined );
    dropdown.add = function ( obj ) {
        return dropdown.menu.add( obj );
    };
    dropdown.show = function ( nodo = dropdown.menu ) {
        init();

        let clear = function () {
            while ( container.firstChild ) {
                container.removeChild( container.firstChild );
            }
        };
        let createBackButton = function ( parent ) {
            let button = document.createElement( 'button' );
            button.innerHTML = dropdown.style.backArrow;
            button.setAttribute( 'class', 'dn-dropdown-button dn-dropdown-parent' );
            button.onclick = function () {
                dropdown.show( nodo.parent );
                if ( !nodo.parent ) {
                    checkHeight();
                }
            };

            let span = document.createElement( 'span' );
            span.appendChild( document.createTextNode( parent.value ) );
            span.style.fontWeight = 'bold';

            button.appendChild( span );
            container.appendChild( button );
            return button;
        };
        let createItem = function ( nodo ) {
            let div = document.createElement( 'div' );
            div.setAttribute( 'class', 'dn-dropdown-item' );
            div.appendChild( document.createTextNode( nodo.element.value ) );
            if ( nodo.childs.length !== 0 ) {
                let span = document.createElement( 'span' );
                span.classList.add( 'dn-dropdown-frontarrow' );
                span.innerHTML = dropdown.style.frontArrow;
                div.appendChild( span );
            }
            div.onclick = function () {
                if ( nodo.childs.length !== 0 ) {
                    dropdown.show( nodo );
                    container.classList.remove( 'dn-dropdown-scrollable' );
                }
                else {
                    hide();
                    onclick( nodo.element );
                }
            };
            return div;
        };
        let checkHeight = function ( elem ) {
            if ( extractNumber( getStyle( elem, 'height' ) ) ===
                extractNumber( getStyle( elem, 'max-height' ) ) ) {
                elem.classList.add( 'dn-dropdown-scrollable' );
            }
        };
        let extractNumber = function ( str ) {
            return parseInt( str.match( /[0-9]+\.*[0-9]*/g )[ 0 ] );
        };
        let getStyle = function ( elem, property ) {
            return window.getComputedStyle( elem, null ).getPropertyValue( property );
        };

        clear();
        if ( nodo.parent ) {
            let head = createBackButton( nodo.element );
            let maxContainer = extractNumber( getStyle( container, 'max-height' ) );

            subcontainer = document.createElement( 'div' );
            subcontainer.setAttribute( 'id', 'dn-dropdown-subcontainer' );
            subcontainer.setAttribute( 'style', 'max-height: ' + (maxContainer - extractNumber( getStyle( head, 'height' ) )) + 'px' );
            container.appendChild( subcontainer );
        }
        nodo.childs.forEach( function ( item ) {
            if ( !nodo.parent ) {
                container.appendChild( createItem( item ) );
            }
            else {
                subcontainer.appendChild( createItem( item ) );
            }
        } );
        if ( !nodo.parent ) {
            checkHeight( container );
        }
        else {
            checkHeight( subcontainer );
        }

        position();
    };
    dropdown.hide = function () {
        hide();
    };
    dropdown.clear = function () {
        dropdown.menu.childs = [];
    };
    dropdown.isShown = function () {
        return isShown;
    };
    dropdown.adjustPos = function ( yDelta, xDelta ) {
        delta.x = xDelta;
        delta.y = yDelta;
    };

    function init() {
        container.setAttribute( 'id', 'dn-dropdown-container' );
        parent.appendChild( container );
    }

    function position() {
        let rect = parent.getBoundingClientRect();
        let posY = (rect.height + rect.y);
        let posX = (button.offsetLeft);

        posY += delta.y;
        posX += delta.x;

        container.style.left = posX + 'px';
        container.style.top = posY + 'px';
    }

    function hide() {
        if ( isShown ) {
            parent.removeChild( container );
            isShown = false;
        }
    }

    function show() {
        isShown = true;
        dropdown.show();
    }
}

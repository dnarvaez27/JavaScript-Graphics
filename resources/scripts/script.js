'use strict';

import { data } from './data.js';

const gap = 10;

function extractNumber( str ) {
    return +str.match( /[0-9]+\.*[0-9]*/g )[ 0 ];
}

function init() {
    let container = document.getElementById( 'js-graphics-container' );

    while ( container.hasChildNodes() ) {
        container.removeChild( container.firstChild );
    }

    let c = 0;
    let prevHeight = 0;
    for ( let e in data ) {
        let element = data[ e ];

        let div = document.createElement( 'div' );
        div.setAttribute( 'class', 'js-item' );
        div.setAttribute( 'onClick', `goTo(${c++}, '${e}')` );
        div.style.top = (prevHeight + 81) + 'px';
        div.style.left = (c % 2 === 0 ? 0 : '50%');
        div.style.width = `calc(50% - 40px - ${c % 2 !== 0 ? 0 : 10}px)`;

        let name = document.createElement( 'h2' );
        name.innerText = element.name;
        div.appendChild( name );

        let description = document.createElement( 'span' );
        description.innerText = element.description;
        div.appendChild( description );

        let img = document.createElement( 'img' );
        img.setAttribute( 'src', element.img );
        div.appendChild( img );

        let subcontainer = document.createElement( 'div' );
        subcontainer.setAttribute( 'class', 'subcontainer hidden' );
        div.appendChild( subcontainer );

        container.appendChild( div );

        if ( c % 2 === 0 ) {
            let style = window.getComputedStyle( div, null );
            let h = extractNumber( style.getPropertyValue( 'height' ) );
            let p = extractNumber( style.getPropertyValue( 'padding-bottom' ) ) + extractNumber( style.getPropertyValue( 'padding-top' ) );
            prevHeight = h + p + gap;
        }
    }
}

function goTo( comp, e_key ) {

    let child = document.getElementById( 'js-graphics-container' ).childNodes[ comp ];

    let subcontainer = child.getElementsByClassName( 'subcontainer' )[ 0 ];
    let timeout = 350;

    if ( child.classList.contains( 'open' ) ) {
        child.style.zIndex = '2';
        setTimeout( () => child.style.zIndex = '1', 500 );

        child.childNodes.forEach( ( e ) => e.style.display = 'block' );
        subcontainer.style.display = 'none';

        data[ e_key ].close = undefined;
        setTimeout( () => child.setAttribute( 'onClick', `goTo( ${comp}, '${e_key}' )` ), 500 ); // To avoid propagation

        timeout = 50;

        document.getElementById( 'me' ).classList.remove( 'out' );
    }
    else {

        document.getElementById( 'me' ).classList.add( 'out' );

        child.style.zIndex = '100';

        child.childNodes.forEach( ( e ) => e.style.display = 'none' );
        subcontainer.style.display = 'block';

        child.setAttribute( 'onClick', undefined );
        data[ e_key ].close = `goTo( ${comp}, '${e_key}', true)`;

        setTimeout( () => $( subcontainer ).load( data[ e_key ].html,
                                                  () => setTimeout( () => data[ e_key ].onOpen(), 50 )
        ), 500 );
    }

    child.classList.toggle( 'open' );
    setTimeout( () => subcontainer.classList.toggle( 'hidden' ), timeout );
}

$( () => init() );
window.goTo = goTo;
window.init = init;

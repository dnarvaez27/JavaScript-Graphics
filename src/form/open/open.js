'use strict';

function OpenForm( container_id ) {
    this.open_config = {
        question: undefined,
        description: '',
        answers: []
    };

    let form = this;
    let container = document.getElementById( container_id );

    this.start = function () {
        let div_question = document.createElement( 'DIV' );
        div_question.setAttribute( 'class', 'question' );
        let question = document.createElement( 'H3' );
        question.appendChild( document.createTextNode( form.open_config.question + ' ' ) );
        let status = document.createElement( 'SPAN' );
        status.appendChild( document.createTextNode( '' ) );
        question.appendChild( status );
        div_question.appendChild( question );

        let description = document.createElement( 'SPAN' );
        description.appendChild( document.createTextNode( form.open_config.description ) );
        description.setAttribute( 'class', 'description' );
        div_question.appendChild( description );

        let div_answrs = document.createElement( 'DIV' );
        let txt_area = document.createElement( 'TEXTAREA' );
        txt_area.setAttribute( 'class', 'answr-input' );
        txt_area.setAttribute( 'title', 'Answer' );
        div_answrs.appendChild( txt_area );

        let sbmt = document.createElement( 'BUTTON' );
        sbmt.setAttribute( 'class', 'sbmt-btn' );
        sbmt.appendChild( document.createTextNode( 'Check' ) );
        $( sbmt ).click( function () {
            txt_area.setAttribute( 'disabled', 'true' );

            let answr = normalize( $( txt_area ).val() );
            let isCorrect = form.open_config.answers.some( function ( item ) {
                return item.toUpperCase() === answr;
            } );
            if ( isCorrect ) {
                $( status ).text( 'OK' ).toggleClass( 'answr-ok', true ).toggleClass( 'answr-not-ok', false );
            }
            else {
                $( status ).text( 'Not Ok' ).toggleClass( 'answr-not-ok', true ).toggleClass( 'answr-ok', false );
            }
        } );

        container.appendChild( div_question );
        container.appendChild( div_answrs );
        container.appendChild( sbmt );
    };

    function normalize( str ) {
        let rta = str.toUpperCase();
        rta = rta.replace( /([.,:;])/g, '' );
        rta = rta.trim();
        return rta.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' );
    }
}

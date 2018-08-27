'use strict';

function ChoiceForm( container_id ) {
    this.choice_config = {
        question: undefined,
        description: '',
        answer: undefined
    };
    this.choice_attrs = {};

    let form = this;
    let container = document.getElementById( container_id );
    let answ_div = document.createElement( 'DIV' );
    let selected = undefined;
    let answered = false;

    this.start = function () {
        let div = document.createElement( 'DIV' );
        div.setAttribute( 'class', 'question' );

        let question = document.createElement( 'H3' );
        question.appendChild( document.createTextNode( form.choice_config.question ) );
        div.appendChild( question );

        let description = document.createElement( 'SPAN' );
        description.appendChild( document.createTextNode( form.choice_config.description ) );
        description.setAttribute( 'class', 'description' );
        div.appendChild( description );

        let check = document.createElement( 'BUTTON' );
        check.appendChild( document.createTextNode( 'Check' ) );
        check.setAttribute( 'class', 'btn-check' );

        container.appendChild( div );
        container.appendChild( answ_div );
        container.appendChild( check );

        $( check ).click( function () {
            if ( selected.id === form.choice_config.answer ) {
                $( selected.div_answr ).toggleClass( 'correct-answr', true );
            }
            else {
                $( selected.div_answr ).toggleClass( 'wrong-answr', true );
            }
            answered = true;
        } );
    };

    this.Answer = function ( id, content ) {
        let self = this;
        this.id = id;
        this.content = content;
        this.div_answr = document.createElement( 'DIV' );
        this.div_answr.setAttribute( 'class', 'answr-choice' );
        let idB = document.createElement( 'B' );
        idB.appendChild( document.createTextNode( id + '. ' ) );

        this.div_answr.appendChild( idB );
        this.div_answr.appendChild( document.createTextNode( content ) );

        answ_div.appendChild( this.div_answr );

        $( this.div_answr ).click( function () {
            if ( !answered ) {
                if ( selected ) {
                    $( selected.div_answr ).toggleClass( 'answr-choice-sel', false ).toggleClass( 'wrong-answr', false ).toggleClass( 'correct-answr', false );
                }
                selected = self;
                $( selected.div_answr ).toggleClass( 'answr-choice-sel', true );
            }
        } );
    };
}

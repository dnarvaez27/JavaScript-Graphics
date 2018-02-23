'use strict';

let RoundProgress = function ( x, y ) {
    let self = this;
    // PRIVATE ATTRIBUTES
    let animFrameId;
    let ctx;
    let actualProgress = 0;
    let tempActualProgress = 0;

    const starterAngle = Math.PI * 1.5;

    let moveListener = function ( e ) {
        if ( isOn( e.offsetX, e.offsetY ) ) {
            self.canvas.style.cursor = 'pointer';
        }
        else {
            self.canvas.style.cursor = 'auto';
        }
    };
    let clickListener = function ( e ) {
        if ( self.clickListener && isOn( e.offsetX, e.offsetY ) ) {
            self.clickListener();
        }
    };

    // ATTRIBUTES
    self.canvas = undefined;
    self.x = x;
    self.y = y;
    self.radius = 100;
    self.progress = 100;
    self.background = /*'#eaeaea'*/'rgba(0,0,0,0.08)';
    self.accent = '#019bba';
    self.lineWidth = 5;
    self.font = 'bold 15px Arial';
    self.clickListener = undefined;

    self.init = function () {
        ctx = self.canvas.getContext( '2d' );
        ctx.lineWidth = self.lineWidth;
        ctx.font = self.font;

        self.progress = self.progress > 100 ? 100 : self.progress;

        listeners();
        requestAnimationFrame( animate );
    };

    function animate() {
        ctx.clearRect( 0, 0, self.canvas.width, self.canvas.height );
        animFrameId = requestAnimationFrame( animate );

        if ( tempActualProgress >= self.progress ) {
            cancelAnimationFrame( animFrameId );
        }
        // actualProgress = Math.PI + ( ( tempActualProgress++ / 100 ) * ( Math.PI * 2) );
        actualProgress = starterAngle + ((tempActualProgress++ / 100) * (Math.PI * 2));
        draw();
    }

    function draw() {
        drawBaground();

        ctx.strokeStyle = self.accent;
        ctx.fillStyle = self.accent;

        let text = (tempActualProgress - 1) + '%';
        let fontSize = ctx.font.match( /[0-9]+/ )[ 0 ];
        let textWidth = ctx.measureText( text ).width;

        ctx.beginPath();
        // ctx.arc( self.x, self.y, self.radius, Math.PI, actualProgress );
        ctx.arc( self.x, self.y, self.radius, starterAngle, actualProgress );
        ctx.stroke();
        ctx.fillText( text, self.x - (textWidth / 2), self.y + (fontSize / 2) - 3 );
        ctx.closePath();
    }

    function drawBaground() {
        ctx.strokeStyle = self.background;
        ctx.beginPath();
        ctx.arc( self.x, self.y, self.radius, 0, Math.PI * 2 );
        ctx.stroke();
        ctx.closePath();
    }

    function isOn( x, y ) {
        let h = Math.sqrt( Math.pow( Math.abs( x - self.x ), 2 ) + Math.pow( Math.abs( y - self.y ), 2 ) );
        return h - (self.lineWidth / 2) < self.radius;
    }

    function listeners() {
        self.canvas.addEventListener( 'mousemove', moveListener, false );
        self.canvas.addEventListener( 'click', clickListener, false );
    }

    self.setClickListener = function ( listener ) {
        self.clickListener = listener;
    };

    self.removeListeners = function () {
        this.canvas.removeListener( 'mousemove', moveListener );
        this.canvas.removeListener( 'click', clickListener );
    };
};

let paint = function ( idContainer ) {
    let container = document.getElementById( idContainer );
    if ( parseInt( container.getAttribute( 'value' ) ) ) {
        const radio = parseInt( container.getAttribute( 'radio' ) );
        const canvas = container.querySelector( 'canvas' );
        const lineWidth = parseInt( container.getAttribute( 'stroke' ) ) || 5;

        let roundProgress = new RoundProgress( radio + (lineWidth / 2), radio + (lineWidth / 2) );

        canvas.width = (radio * 2) + lineWidth;
        canvas.height = (radio * 2) + lineWidth;
        container.style.height = canvas.height + 'px';
        container.style.width = canvas.width + 'px';

        if ( container.style.color ) {
            roundProgress.accent = container.style.color;
        }
        if ( container.style.textDecorationColor ) {
            roundProgress.background = container.style.textDecorationColor;
        }
        if ( container.style.font ) {
            roundProgress.font = container.style.font;
        }

        roundProgress.lineWidth = lineWidth;
        roundProgress.radius = radio;
        roundProgress.canvas = canvas;
        roundProgress.progress = container.getAttribute( 'value' );
        roundProgress.init();

        return roundProgress;
    }
};

let round_progress = {
    data: {
        round_progress_ids: [],
        round_progress_listener: undefined,
        append: function () {
            $( function () {
                round_progress.data.round_progress_ids.forEach( function ( idContainer ) {
                    let container = document.getElementById( idContainer );
                    if ( container ) {
                        while ( container.firstChild ) {
                            container.removeChild( this.firstChild );
                        }

                        let canvas = document.createElement( 'canvas' );
                        if ( container.getAttribute( 'canvas-id' ) ) {
                            canvas.id = this.getAttribute( 'canvas-id' );
                        }
                        container.style.display = 'inline-block';
                        container.appendChild( canvas );
                        let rProgress = paint( idContainer );

                        if ( rProgress ) {
                            rProgress.setClickListener( function () {
                                round_progress.data.round_progress_listener( JSON.parse( container.getAttribute( 'data' ) ) );
                            } );
                        }
                    }
                } );
            } );
        }
    },
    init: function ( parent ) {
        $( function () {
            round_progress.data.round_progress_ids = [];
            if ( parent ) {
                $( parent ).find( '[id^=\'round_progress\']' ).each( function ( i, item ) {
                    round_progress.data.round_progress_ids.push( item.id );
                } );
            }
            else {
                $( '[id^=\'round_progress\']' ).each( function ( index, item ) {
                    round_progress.data.round_progress_ids.push( item.id );
                } );
            }

            round_progress.data.append();
        } );
    }
};

round_progress.init( 'body' );

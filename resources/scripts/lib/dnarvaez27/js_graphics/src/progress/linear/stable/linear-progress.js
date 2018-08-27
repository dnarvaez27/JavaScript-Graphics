'use strict';

function Progress() {
    // Just a way of isolate the class
}

Progress.Linear = function () {
    let self = this;

    let LinearProgress = function () {
        let self = this;
        // PRIVATE ATTRIBUTES
        const textMargin = 2;
        const padding = 10;
        let animFrameId;
        let ctx;
        let actualProgress = 0;
        let tempActualProgress = 0;

        // ATTRIBUTES
        self.progress = 100;
        self.canvas = undefined;
        self.background = 'rgba(0, 0, 0, 0.08)';
        self.accent = '#019bba';
        self.lineWidth = 0;
        self.width = undefined;
        self.font = 'bold 15px Arial';

        self.init = function () {
            ctx = self.canvas.getContext( '2d' );
            ctx.font = self.font;
            let fontSize = ctx.font.match( /[0-9]+/ )[ 0 ];
            self.canvas.height = Math.max( self.lineWidth, parseInt( fontSize ) ) + padding;
            ctx.font = self.font;
            let textW = ctx.measureText( self.progress + '%' ).width + (textMargin * 2);

            self.canvas.width = self.width + textW + (self.lineWidth / 2);

            ctx.font = self.font;
            ctx.lineWidth = self.lineWidth;
            self.progress = self.progress > 100 ? 100 : self.progress;

            requestAnimationFrame( animate );
        };

        function animate() {
            ctx.clearRect( 0, 0, self.canvas.width, self.canvas.height );
            animFrameId = requestAnimationFrame( animate );

            if ( tempActualProgress >= self.progress ) {
                cancelAnimationFrame( animFrameId );
            }
            actualProgress = (tempActualProgress++ / 100) * (self.width - (self.lineWidth / 2));
            draw();
        }

        function draw() {
            drawBackground();

            ctx.strokeStyle = self.accent;
            ctx.fillStyle = self.accent;

            let end = (self.lineWidth / 2) + actualProgress;
            let text = (tempActualProgress - 1) + '%';
            let fontSize = ctx.font.match( /[0-9]+/ )[ 0 ];

            ctx.beginPath();
            ctx.arc( self.lineWidth / 2, (self.canvas.height / 2), self.lineWidth / 2, Math.PI * 0.5, Math.PI * 1.5 );
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo( self.lineWidth / 2, self.canvas.height / 2 );
            ctx.lineTo( end, self.canvas.height / 2 );
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc( end - 1, self.canvas.height / 2, self.lineWidth / 2, Math.PI * 1.5, Math.PI * 0.5 );
            ctx.fillText( text, end + (self.lineWidth / 2) + textMargin, (self.canvas.height / 2) + (fontSize / 3) );
            ctx.fill();
            ctx.closePath();
        }

        function drawBackground() {
            ctx.strokeStyle = self.background;
            ctx.fillStyle = self.background;

            ctx.beginPath();
            ctx.arc( self.lineWidth / 2, (self.canvas.height / 2), self.lineWidth / 2, Math.PI * 0.5, Math.PI * 1.5 );
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo( self.lineWidth / 2, (self.canvas.height / 2) );
            ctx.lineTo( self.width, (self.canvas.height / 2) );
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc( self.width, (self.canvas.height / 2), self.lineWidth / 2, Math.PI * 1.5, Math.PI * 0.5 );
            ctx.fill();
            ctx.closePath();
        }
    };

    let paint_linear = function ( idContainer ) {
        let container = document.getElementById( idContainer );
        if ( parseInt( container.getAttribute( 'value' ) ) ) {

            let linearProgress = new LinearProgress();
            linearProgress.canvas = container.querySelector( 'canvas' );
            linearProgress.lineWidth = parseInt( container.getAttribute( 'stroke' ) ) || 10;
            linearProgress.width = parseInt( container.getAttribute( 'width' ) ) ||
                parseInt( window.getComputedStyle( container, null ).getPropertyValue( 'width' ) );

            linearProgress.progress = container.getAttribute( 'value' );
            if ( container.style.color ) {
                linearProgress.accent = container.style.color;
            }
            if ( container.style.textDecorationColor ) {
                linearProgress.background = container.style.textDecorationColor;
            }
            if ( container.style.font ) {
                linearProgress.font = container.style.font;
            }

            linearProgress.init();
            container.style.height = linearProgress.canvas.height + 'px';
        }
    };

    this.linear_progress = {
        data: {
            linear_progress_ids: [],
            linear_progress_listener: undefined,
            append: function () {
                $( function () {
                    self.linear_progress.data.linear_progress_ids.forEach( function ( idContainer ) {
                        let container = document.getElementById( idContainer );
                        if ( container ) {
                            while ( container.firstChild ) {
                                container.removeChild( container.firstChild );
                            }

                            let canvas = document.createElement( 'canvas' );
                            if ( container.getAttribute( 'canvas-id' ) ) {
                                canvas.id = container.getAttribute( 'canvas-id' );
                            }
                            container.style.display = 'inline-block';
                            container.appendChild( canvas );
                            paint_linear( idContainer );
                        }
                    } );
                } );
            }
        },
        init: function ( parent ) {
            $( function () {
                self.linear_progress.data.linear_progress_ids = [];
                if ( parent ) {
                    $( parent ).find( '[id^=\'linear_progress\']' ).each( function ( i, item ) {
                        self.linear_progress.data.linear_progress_ids.push( item.id );
                    } );
                }
                else {
                    $( '[id^=\'linear_progress\']' ).each( function ( index, item ) {
                        self.linear_progress.data.linear_progress_ids.push( item.id );
                    } );
                }
                self.linear_progress.data.append();
            } );
        }
    };

    this.linear_progress.init( 'body' );
};

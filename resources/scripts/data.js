const img_path = './resources/scripts/lib/dnarvaez27/js_graphics/imgs';
export const data = {
    Charts: {
        name: 'Charts',
        description: 'Library to draw charts',
        img: 'https://raw.githubusercontent.com/dnarvaez27/JavaScript-Graphics/gh-pages/resources/scripts/lib/dnarvaez27/js_graphics/imgs/Charts_Linear.JPG',
        html: './modules/chart/chart.html',
        onOpen: function () {
            data.Charts.childs[ 0 ].code();

            document.getElementById( 'chart' )
                    .getElementsByClassName( 'content' )[ 0 ]
                .innerText = data.Charts.childs[ 0 ].description;
            document.getElementById( 'chart' )
                    .getElementsByClassName( 'explain' )[ 0 ]
                .innerText = data.Charts.childs[ 0 ].explain;
            document.getElementById( 'chart-code' )
                .innerText = data.Charts.childs[ 0 ].code;

            let chartTechs = document.getElementById( 'chart-techs' );
            data.Charts.childs[ 0 ].tech.forEach( ( item ) => {
                let tech = document.createElement( 'div' );
                tech.setAttribute( 'class', 'tech-item' );

                let tech_name = document.createElement( 'a' );
                tech_name.setAttribute( 'href', item.url );

                let tech_img = document.createElement( 'img' );
                tech_img.setAttribute( 'src', item.icon );
                tech_name.appendChild( tech_img );

                tech_name.appendChild( document.createElement( 'br' ) );

                tech_name.appendChild( document.createTextNode( item.name ) );

                tech.appendChild( tech_name );

                chartTechs.appendChild( tech );
            } );

            let chartImpls = document.getElementById( 'chart-implem' );
            data.Charts.childs[ 0 ].implementation.forEach( ( item ) => {
                let tech = document.createElement( 'div' );
                tech.setAttribute( 'class', 'tech-item' );

                let tech_img = document.createElement( 'img' );
                tech_img.setAttribute( 'src', item.icon );
                tech.appendChild( tech_img );

                tech.appendChild( document.createElement( 'br' ) );

                let tech_name = document.createElement( 'span' );
                tech_name.innerText = item.name;
                tech.appendChild( tech_name );

                chartImpls.appendChild( tech );
            } );

            document.getElementById( 'chart-close-btn' ).addEventListener( 'click', () => eval( data.Charts.close ) );
        },
        childs: [
            {
                name: 'Linear',
                description: 'A line chart that displays information as a series of points with 2 coordinates (2D) from different series',
                explain: 'In the example shown, there are three series (Blue, Yellow, Magenta) and share a common independent variable and are ploted in the y-axis. Hover on a point and see the detail of it. Below there is a sample of the code',
                img: `${img_path}/Charts_Linear.jpg`,
                code: function () {
                    let linear = new Chart.Linear( 'linear-container', false );
                    linear.config.rangeName = 'Y';
                    linear.config.domainName = 'X';
                    linear.attrs.chart.point_diameter = 15;
                    linear.attrs.legend.style.background = '#212121';
                    linear.attrs.legend.style.foreground = '#FFFFFF';
                    linear.axisX = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
                    linear.axisY = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110 ];
                    linear.config.onClick = function ( data ) {
                        console.log( data.obj );
                    };
                    linear.data.push( {
                                          name: 'Blue Series',
                                          color: '#009696',
                                          values: [
                                              [ 0, 90, 'Data 0 - Blue' ],
                                              [ 1, 70, 'Data 1 - Blue' ],
                                              [ 2, 50, 'Data 2 - Blue' ],
                                              [ 3, 40, 'Data 3 - Blue' ],
                                              [ 4, 80, 'Data 4 - Blue' ],
                                              [ 5, 20, 'Data 5 - Blue' ],
                                              [ 6, 10, 'Data 6 - Blue' ],
                                              [ 7, 60, 'Data 7 - Blue' ],
                                          ]
                                      } );
                    linear.data.push( {
                                          name: 'Yellow Series',
                                          color: '#f4f442',
                                          values: [
                                              [ 1, 20, 'Data 0 - Yellow' ],
                                              [ 2, 40, 'Data 1 - Yellow' ],
                                              [ 3, 20, 'Data 2 - Yellow' ],
                                              [ 4, 55, 'Data 3 - Yellow' ],
                                              [ 5, 10, 'Data 4 - Yellow' ],
                                              [ 6, 5, 'Data 5 - Yellow' ],
                                              [ 7, 20, 'Data 6 - Yellow' ],
                                              [ 8, 15, 'Data 7 - Yellow' ],
                                              [ 9, 80, 'Data 8 - Yellow' ],
                                              [ 10, 90, 'Data 9 - Yellow' ],
                                              [ 11, 100, 'Data 10 - Yellow' ]
                                          ]
                                      } );
                    linear.data.push( {
                                          name: 'Magenta Series',
                                          color: '#f42d88',
                                          values: [
                                              [ 0, 110, 'Data 0 - Magenta' ],
                                              [ 1, 45, 'Data 1 - Magenta' ],
                                              [ 2, 45, 'Data 2 - Magenta' ],
                                              [ 3, 5, 'Data 3 - Magenta' ],
                                              [ 4, 15, 'Data 4 - Magenta' ],
                                              [ 5, 10, 'Data 5 - Magenta' ],
                                              [ 6, 0, 'Data 6 - Magenta' ],
                                              [ 7, 10, 'Data 7 - Magenta' ],
                                              [ 8, 10, 'Data 8 - Magenta' ],
                                              [ 9, 20, 'Data 9 - Magenta' ],
                                              [ 10, 15, 'Data 10 - Magenta' ],
                                          ]
                                      } );
                    linear.draw();
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    },
                    {
                        name: 'svg.js',
                        url: 'http://svgjs.com/',
                        icon: 'http://svgjs.com/assets/images/logo-svg-js-01d-128.png'
                    },
                ],
                implementation: [
                    {
                        name: 'Teamwork tool for ISIS-2603',
                        icon: 'https://website-assets.teamwork.com/assets/downloads/presskit/teamwork/svg/teamwork-mark-brand-colours.svg'
                    }
                ]
            }
        ]
    },
    Forms: {
        name: 'Forms',
        description: 'Library to draw complex forms with validation mainly for tests',
        img: 'https://raw.githubusercontent.com/dnarvaez27/JavaScript-Graphics/gh-pages/resources/scripts/lib/dnarvaez27/js_graphics/imgs/FormDrag.JPG',
        html: './modules/form/form.html',
        onOpen: function () {
            function laod( index, prefix ) {
                data.Forms.childs[ index ].code();

                document.getElementById( prefix )
                        .getElementsByClassName( 'content' )[ 0 ]
                    .innerText = data.Forms.childs[ index ].description;
                document.getElementById( prefix )
                        .getElementsByClassName( 'explain' )[ 0 ]
                    .innerText = data.Forms.childs[ index ].explain;
                document.getElementById( prefix + '-code' )
                    .innerText = data.Forms.childs[ index ].code;

                let chartTechs = document.getElementById( prefix + '-techs' );
                data.Forms.childs[ index ].tech.forEach( ( item ) => {
                    let tech = document.createElement( 'div' );
                    tech.setAttribute( 'class', 'tech-item' );

                    let tech_name = document.createElement( 'a' );
                    tech_name.setAttribute( 'href', item.url );

                    let tech_img = document.createElement( 'img' );
                    tech_img.setAttribute( 'src', item.icon );
                    tech_name.appendChild( tech_img );

                    tech_name.appendChild( document.createElement( 'br' ) );

                    tech_name.appendChild( document.createTextNode( item.name ) );

                    tech.appendChild( tech_name );

                    chartTechs.appendChild( tech );
                } );

                let chartImpls = document.getElementById( prefix + '-implem' );
                data.Forms.childs[ index ].implementation.forEach( ( item ) => {
                    let tech = document.createElement( 'div' );
                    tech.setAttribute( 'class', 'tech-item' );

                    let tech_img = document.createElement( 'img' );
                    tech_img.setAttribute( 'src', item.icon );
                    tech.appendChild( tech_img );

                    tech.appendChild( document.createElement( 'br' ) );

                    let tech_name = document.createElement( 'span' );
                    tech_name.innerText = item.name;
                    tech.appendChild( tech_name );

                    chartImpls.appendChild( tech );
                } );
            }

            laod( 0, 'form' );
            laod( 1, 'form-drag' );
            laod( 2, 'form-open' );
            // laod( 3, 'form-drop' );

            document.getElementById( 'form-close-btn' ).addEventListener( 'click', () => eval( data.Forms.close ) );
        },
        childs: [
            {
                name: 'Choice',
                description: 'Allows to have a mutiple choice type answers for a question',
                explain: '',
                img: `${img_path}/Forms_Choice.jpg`,
                code: function () {
                    let choiceForm = new ChoiceForm( 'choice-form' );
                    choiceForm.choice_config.question = 'Pregunta: ¿Esto es una pregunta?';
                    choiceForm.choice_config.description = 'Puedes responder a la pregunta';
                    choiceForm.choice_config.answer = 'A';

                    choiceForm.start();
                    new choiceForm.Answer( 'A', 'Respuesta A' );
                    new choiceForm.Answer( 'B', 'Respuesta B' );
                    new choiceForm.Answer( 'C', 'Respuesta C' );
                    new choiceForm.Answer( 'D', 'Respuesta D' );

                    let choiceForm2 = new ChoiceForm( 'choice-form-2' );
                    choiceForm2.choice_config.question = 'Pregunta: ¿Esto es una pregunta?';
                    choiceForm2.choice_config.answer = 'A';

                    choiceForm2.start();
                    new choiceForm2.Answer( 'A', 'Respuesta A' );
                    new choiceForm2.Answer( 'B', 'Respuesta B' );
                    new choiceForm2.Answer( 'C', 'Respuesta C' );
                    new choiceForm2.Answer( 'D', 'Respuesta D' );
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    }
                ],
                implementation: [
                    {
                        name: 'German I and II blog',
                        icon: 'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png'
                    }
                ]
            },
            {
                name: 'Drag',
                description: 'Lets drag and drop words to form an answer',
                explain: '',
                img: `${img_path}/Forms_Drag.jpg`,
                code: function () {
                    let dragForm = new DragForm( 'drag-container' );
                    dragForm.drag_config.question = 'Organice las siguientes palabras';
                    dragForm.drag_config.description = 'Organice las siguientes palabras';

                    let resp = new dragForm.Response( [
                                                          { value: 'Hola' },
                                                          { value: 'Me' },
                                                          { value: 'Llamo' },
                                                          { value: 'David' },
                                                          { value: 'Hola' },
                                                          { value: 'Me' },
                                                          { value: 'Llamo' },
                                                          { value: 'David' }
                                                      ] );
                    resp.draw();

                    let dragForm2 = new DragForm( 'drag-container_2' );
                    dragForm2.drag_config.question = 'Organice las siguientes palabras 2';
                    dragForm2.drag_config.description = 'Organice las siguientes palabras 2';
                    let resp_2 = new dragForm2.Response( [
                                                             { value: 'Hola' },
                                                             { value: 'Me' },
                                                             { value: 'Llamo' },
                                                             { value: 'David' },
                                                             { value: 'Hola' },
                                                             { value: 'Me' },
                                                             { value: 'Llamo' },
                                                             { value: 'David' }
                                                         ] );
                    resp_2.draw();
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    },
                    {
                        name: 'svg.js',
                        url: 'http://svgjs.com/',
                        icon: 'http://svgjs.com/assets/images/logo-svg-js-01d-128.png'
                    },
                ],
                implementation: [
                    {
                        name: 'German I and II blog',
                        icon: 'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png'
                    }
                ]
            },
            {
                name: 'Open',
                description: 'Creates an open question',
                explain: '',
                img: `${img_path}/Forms_Open.jpg`,
                code: function () {
                    let openForm = new OpenForm( 'open-form' );
                    openForm.open_config.question = '¿Esto está bien?';
                    openForm.open_config.description = 'Cuál es la respuesta correcta? Ah?';
                    openForm.open_config.answers = [
                        'Si',
                        'No',
                        'Tal vez'
                    ];
                    openForm.start();

                    let openForm2 = new OpenForm( 'open-form-2' );
                    openForm2.open_config.question = '¿Esto está bien?';
                    openForm2.open_config.answers = [
                        'Si',
                        'No',
                        'Tal vez'
                    ];
                    openForm2.start();
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    },
                    {
                        name: 'svg.js',
                        url: 'http://svgjs.com/',
                        icon: 'http://svgjs.com/assets/images/logo-svg-js-01d-128.png'
                    },
                ],
                implementation: [
                    {
                        name: 'German I and II blog',
                        icon: 'https://cdn.countryflags.com/thumbs/germany/flag-round-250.png'
                    }
                ]
            }
        ]
    },
    Progress: {
        name: 'Progress',
        description: 'Library to draw progress graphics',
        img: 'https://raw.githubusercontent.com/dnarvaez27/JavaScript-Graphics/gh-pages/resources/scripts/lib/dnarvaez27/js_graphics/imgs/Progress_Round.JPG',
        html: './modules/progress/progress.html',
        onOpen: function () {
            (function () {
                data.Progress.childs[ 1 ].code();

                document.getElementById( 'progress' )
                        .getElementsByClassName( 'content' )[ 0 ]
                    .innerText = data.Progress.childs[ 1 ].description;
                document.getElementById( 'progress' )
                        .getElementsByClassName( 'explain' )[ 0 ]
                    .innerText = data.Progress.childs[ 1 ].explain;
                document.getElementById( 'progress-code' )
                    .innerText = data.Progress.childs[ 1 ].code;

                let treeTechs = document.getElementById( 'progress-techs' );
                data.Progress.childs[ 1 ].tech.forEach( ( item ) => {
                    let tech = document.createElement( 'div' );
                    tech.setAttribute( 'class', 'tech-item' );

                    let tech_name = document.createElement( 'a' );
                    tech_name.setAttribute( 'href', item.url );

                    let tech_img = document.createElement( 'img' );
                    tech_img.setAttribute( 'src', item.icon );
                    tech_name.appendChild( tech_img );

                    tech_name.appendChild( document.createElement( 'br' ) );

                    tech_name.appendChild( document.createTextNode( item.name ) );

                    tech.appendChild( tech_name );

                    treeTechs.appendChild( tech );
                } );

                let treeImpls = document.getElementById( 'progress-implem' );
                data.Progress.childs[ 1 ].implementation.forEach( ( item ) => {
                    let tech = document.createElement( 'div' );
                    tech.setAttribute( 'class', 'tech-item' );

                    let tech_img = document.createElement( 'img' );
                    tech_img.setAttribute( 'src', item.icon );
                    tech.appendChild( tech_img );

                    tech.appendChild( document.createElement( 'br' ) );

                    let tech_name = document.createElement( 'span' );
                    tech_name.innerText = item.name;
                    tech.appendChild( tech_name );

                    treeImpls.appendChild( tech );
                } );
            })();

            (function () {
                data.Progress.childs[ 0 ].code();

                document.getElementById( 'progress-l-c' )
                        .getElementsByClassName( 'content' )[ 0 ]
                    .innerText = data.Progress.childs[ 0 ].description;
                document.getElementById( 'progress-l-c' )
                        .getElementsByClassName( 'explain' )[ 0 ]
                    .innerText = data.Progress.childs[ 0 ].explain;
                document.getElementById( 'progress-code-l' )
                    .innerText = data.Progress.childs[ 0 ].code;

                let treeTechs = document.getElementById( 'progress-techs-linear' );
                data.Progress.childs[ 0 ].tech.forEach( ( item ) => {
                    let tech = document.createElement( 'div' );
                    tech.setAttribute( 'class', 'tech-item' );

                    let tech_name = document.createElement( 'a' );
                    tech_name.setAttribute( 'href', item.url );

                    let tech_img = document.createElement( 'img' );
                    tech_img.setAttribute( 'src', item.icon );
                    tech_name.appendChild( tech_img );

                    tech_name.appendChild( document.createElement( 'br' ) );

                    tech_name.appendChild( document.createTextNode( item.name ) );

                    tech.appendChild( tech_name );

                    treeTechs.appendChild( tech );
                } );

                let treeImpls = document.getElementById( 'progress-implem-linear' );
                data.Progress.childs[ 0 ].implementation.forEach( ( item ) => {
                    let tech = document.createElement( 'div' );
                    tech.setAttribute( 'class', 'tech-item' );

                    let tech_img = document.createElement( 'img' );
                    tech_img.setAttribute( 'src', item.icon );
                    tech.appendChild( tech_img );

                    tech.appendChild( document.createElement( 'br' ) );

                    let tech_name = document.createElement( 'span' );
                    tech_name.innerText = item.name;
                    tech.appendChild( tech_name );

                    treeImpls.appendChild( tech );
                } );
            })();


            document.getElementById( 'progress-close-btn' ).addEventListener( 'click', () => eval( data.Progress.close ) );
        },
        childs: [
            {
                name: 'Linear',
                description: 'Creates a progress line with the value specified (up to 100)',
                explain: 'The purpose is to create e line representing progress as a status. It is fully customizable (color, font, stroke)',
                img: `${img_path}/Progress_Linear.jpg`,
                code: function () {
                    let linear = new Progress.Linear();
                    linear.linear_progress.init( '#progress-linear' );
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    }
                ],
                implementation: [
                    {
                        name: 'Personal Web Page',
                        icon: 'https://avatars1.githubusercontent.com/u/12243937?s=460&v=4'
                    }
                ]
            },
            {
                name: 'Round',
                description: 'Creates a progress donut/gauge with the value specified (up to 100)',
                explain: 'The purpose is to create a gauge representing progress as a status. It is fully customizable (color, font, stroke) and allows click events',
                img: `${img_path}/Progress_Round.jpg`,
                code: function () {
                    let round = new Progress.Round();
                    round.round_progress.data.round_progress_listener = ( ev ) => console.log( ev );
                    round.round_progress.init( '#progress-round' );
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    }
                ],
                implementation: [
                    {
                        name: 'Personal Web Page',
                        icon: 'https://avatars1.githubusercontent.com/u/12243937?s=460&v=4'
                    }
                ]
            }
        ]
    },
    Tree: {
        name: 'Tree',
        description: 'Library to display trees',
        img: 'https://raw.githubusercontent.com/dnarvaez27/JavaScript-Graphics/gh-pages/resources/scripts/lib/dnarvaez27/js_graphics/imgs/RadialTree.JPG',
        html: './modules/tree/tree.html',
        onOpen: function () {
            data.Tree.childs[ 0 ].code();

            document.getElementById( 'tree' )
                    .getElementsByClassName( 'content' )[ 0 ]
                .innerText = data.Tree.childs[ 0 ].description;
            document.getElementById( 'tree' )
                    .getElementsByClassName( 'explain' )[ 0 ]
                .innerText = data.Tree.childs[ 0 ].explain;
            document.getElementById( 'tree-code' )
                .innerText = data.Tree.childs[ 0 ].code;

            let treeTechs = document.getElementById( 'tree-techs' );
            data.Tree.childs[ 0 ].tech.forEach( ( item ) => {
                let tech = document.createElement( 'div' );
                tech.setAttribute( 'class', 'tech-item' );

                let tech_name = document.createElement( 'a' );
                tech_name.setAttribute( 'href', item.url );

                let tech_img = document.createElement( 'img' );
                tech_img.setAttribute( 'src', item.icon );
                tech_name.appendChild( tech_img );

                tech_name.appendChild( document.createElement( 'br' ) );

                tech_name.appendChild( document.createTextNode( item.name ) );

                tech.appendChild( tech_name );

                treeTechs.appendChild( tech );
            } );

            let treeImpls = document.getElementById( 'tree-implem' );
            data.Tree.childs[ 0 ].implementation.forEach( ( item ) => {
                let tech = document.createElement( 'div' );
                tech.setAttribute( 'class', 'tech-item' );

                let tech_img = document.createElement( 'img' );
                tech_img.setAttribute( 'src', item.icon );
                tech.appendChild( tech_img );

                tech.appendChild( document.createElement( 'br' ) );

                let tech_name = document.createElement( 'span' );
                tech_name.innerText = item.name;
                tech.appendChild( tech_name );

                treeImpls.appendChild( tech );
            } );

            document.getElementById( 'tree-close-btn' ).addEventListener( 'click', () => eval( data.Tree.close ) );
        },
        childs: [
            {
                name: 'Radial (Unfinished)',
                description: 'Creates a radial tree. It is conformed by branches that are represented in circles of different radius. When a node of an upper (more centric) level relates to a lower (further from the center) one, a connection between them is created as shown.',
                explain: 'The example shown is a radial tree showing the subjects I have taken in the university by 2017. Each color represents a field of study. Also if the mouse is hovered over a node, the full name of the subject will show.',
                img: `${img_path}/Tree_Radial.jpg`,
                code: function () {
                    let styles = {
                        ISIS: { bg: '#324D5C', fg: '#FFFFFF' },
                        MATE: { bg: '#661620', fg: '#FFFFFF' },
                        FISI: { bg: '#E37B40', fg: '#212121' },
                        IELE: { bg: '#46B29D', fg: '#FFFFFF' },
                        IIND: { bg: '#A59484', fg: '#212121' },
                        LENG: { bg: '#F0CA4D', fg: '#362C10' },
                        HIST: { bg: '#EBDDC2', fg: '#212121' },
                        ARTE: { bg: '#F53855', fg: '#FFFFFF' },
                        MBIO: { bg: '#658F41', fg: '#F0F3F3' },
                        DEPO: { bg: '#086470', fg: '#F0F3F3' },
                        MUSI: { bg: '#994C46', fg: '#D8E0D7' },
                        DERE: { bg: '#272316', fg: '#EDF1F2' },
                    };
                    let getKnowledgeColor = function ( code ) {
                        return styles[ code.split( '-' )[ 0 ] ];
                    };

                    let tree = new Tree();
                    tree.add( { id: 0, data: { hide: true } }, undefined );

                    tree.add( {
                                  id: 'DERE-1300',
                                  data: {
                                      style: getKnowledgeColor( 'DERE-1300' ),
                                      display: {
                                          normal: 'DERE-1300',
                                          hover: 'Constitution and Democracy'
                                      },
                                      subject: {
                                          name: 'Constitution and Democracy',
                                          semester: '2015-20',
                                          code: 'DERE-1300',
                                          professor: [ 'Nelson Remolina Angarita' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'ISIS-1101',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1101' ),
                                      display: {
                                          normal: 'ISIS-1001',
                                          hover: 'Introduction to Systems \nand Computer Engineer'
                                      },
                                      subject: {
                                          name: 'Introduction to Systems and Computer Engineer',
                                          semester: '2015-20',
                                          code: 'ISIS-1001',
                                          professor: [ 'Francisco Rueda Fajardo' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'ISIS-1204',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1204' ),
                                      display: {
                                          normal: 'ISIS-1204',
                                          hover: 'Alorithms and\nObject-Oriented\nPrograming I (Honors)'
                                      },
                                      subject: {
                                          name: 'Alorithms and Object-Oriented Programing I (Honors)',
                                          semester: '2015-20',
                                          code: 'ISIS-1204',
                                          professor: [ 'Mario Eduardo Sanchez Puccini' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'DEPO-3248 (P)',
                                  data: {
                                      style: getKnowledgeColor( 'DEPO-3248 (P)' ),
                                      display: {
                                          normal: 'DEPO-3248',
                                          hover: 'Swimming for Beginners'
                                      },
                                      subject: {
                                          name: 'Swimming for Beginners',
                                          semester: '2015-20',
                                          code: 'DEPO-3248',
                                          professor: [ 'Leonardo Pulido Arjona' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'LENG-1103',
                                  data: {
                                      style: getKnowledgeColor( 'LENG-1103' ),
                                      display: {
                                          normal: 'LENG-1103',
                                          hover: 'English III'
                                      },
                                      subject: {
                                          name: 'English III',
                                          semester: '2015-20',
                                          code: 'LENG-1103',
                                          professor: [ 'Elena Paola Galeano Enciso' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'LENG-1501',
                                  data: {
                                      style: getKnowledgeColor( 'LENG-1501' ),
                                      display: {
                                          normal: 'LENG-1501',
                                          hover: 'Spanish'
                                      },
                                      subject: {
                                          name: 'Spanish',
                                          semester: '2015-20',
                                          code: 'LENG-1501',
                                          professor: [ 'Elena Paola Galeano Enciso' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'MATE-1201',
                                  data: {
                                      style: getKnowledgeColor( 'MATE-1201' ),
                                      display: {
                                          normal: 'MATE-1201',
                                          hover: 'Precalculus'
                                      },
                                      subject: {
                                          name: 'Precalculus',
                                          semester: '2015-20',
                                          code: 'MATE-1201',
                                          professor: [ 'Zeljka Ljujic' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'MUSI-1100A',
                                  data: {
                                      style: getKnowledgeColor( 'MUSI-1100A' ),
                                      display: {
                                          normal: 'MUSI-1100A',
                                          hover: 'Apreciation of the Music'
                                      },
                                      subject: {
                                          name: 'Apreciation of the Music',
                                          semester: '2015-20',
                                          code: 'MUSI-1100A',
                                          professor: [ 'Rondy Felipe Torres Lopez' ]
                                      }
                                  }
                              }, 0 );
                    tree.add( {
                                  id: 'noreq_1',
                                  data: {
                                      hide: true
                                  }
                              }, 0 );

                    tree.add( {
                                  id: 'ISIS-1209',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1209' ),
                                      display: {
                                          normal: 'ISIS-1209',
                                          hover: 'Alorithms and\nObject-Oriented\nPrograming II (Honors)'
                                      },
                                      subject: {
                                          name: 'Alorithms and Object-Oriented Programing II (Honors)',
                                          semester: '2016-10',
                                          code: 'ISIS-1209',
                                          professor: [ 'Alvaro Andres Gomez D\'alleman' ]
                                      }
                                  }
                              }, 'ISIS-1204' );
                    tree.add( {
                                  id: 'ISIS-1104',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1104' ),
                                      display: {
                                          normal: 'ISIS-1104',
                                          hover: 'Structural Mathematics \nand Logic'
                                      },
                                      subject: {
                                          name: 'Structural Mathematics and Logic',
                                          semester: '2016-10',
                                          code: 'ISIS-1104',
                                          professor: [ 'Silvia Takahashi Rodriguez' ]
                                      }
                                  }
                              }, 'noreq_1' );
                    tree.add( {
                                  id: 'MATE-1203',
                                  data: {
                                      style: getKnowledgeColor( 'MATE-1203' ),
                                      display: {
                                          normal: 'MATE-1203',
                                          hover: 'Differential Calculus'
                                      },
                                      subject: {
                                          name: 'Differential Calculus',
                                          semester: '2016-10',
                                          code: 'MATE-1203',
                                          professor: [ 'David Ricardo Riveros Pacheco' ]
                                      }
                                  }
                              }, 'MATE-1201' );
                    tree.add( {
                                  id: 'FISI-1018',
                                  data: {
                                      style: getKnowledgeColor( 'FISI-1018' ),
                                      display: {
                                          normal: 'FISI-1018',
                                          hover: 'Physics I'
                                      },
                                      subject: {
                                          name: 'Physics I',
                                          semester: '2016-10',
                                          code: 'FISI-1018',
                                          professor: [ 'Mikel Fernando Hurtado Morales' ]
                                      }
                                  }
                              }, 'noreq_1' );
                    tree.add( {
                                  id: 'ARTE-1105',
                                  data: {
                                      style: getKnowledgeColor( 'ARTE-1105' ),
                                      display: {
                                          normal: 'ARTE-1105',
                                          hover: 'Basic Photography I'
                                      },
                                      subject: {
                                          name: 'Basic Photography I',
                                          semester: '2016-10',
                                          code: 'ARTE-1105',
                                          professor: [ 'Javier Mauricio Vanegas Torres' ]
                                      }
                                  }
                              }, 'noreq_1' );
                    tree.add( {
                                  id: 'LENG-1301',
                                  data: {
                                      style: getKnowledgeColor( 'LENG-1301' ),
                                      display: {
                                          normal: 'LENG-1301',
                                          hover: 'German I'
                                      },
                                      subject: {
                                          name: 'German I',
                                          semester: '2016-10',
                                          code: 'LENG-1301',
                                          professor: [ 'Claudia Rocio Vargas Prada' ]
                                      }
                                  }
                              }, 'noreq_1' );
                    tree.add( {
                                  id: 'LENG-1104',
                                  data: {
                                      style: getKnowledgeColor( 'LENG-1104' ),
                                      display: {
                                          normal: 'LENG-1104',
                                          hover: 'English IV'
                                      },
                                      subject: {
                                          name: 'English IV',
                                          semester: '2016-10',
                                          code: 'LENG-1104',
                                          professor: [ 'Jovana Zivkovic' ]
                                      }
                                  }
                              }, 'LENG-1103' );
                    tree.add( {
                                  id: 'DEPO-3248 (I)',
                                  data: {
                                      style: getKnowledgeColor( 'DEPO-3248 (I)' ),
                                      display: {
                                          normal: 'DEPO-3248',
                                          hover: 'Intermediate Swimming'
                                      },
                                      subject: {
                                          name: 'Intermediate Swimming',
                                          semester: '2016-10',
                                          code: 'DEPO-3248',
                                          professor: [ 'Leonardo Pulido Arjona' ]
                                      }
                                  }
                              }, 'DEPO-3248 (P)' );
                    tree.add( {
                                  id: 'ISIS-2804_1',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2804_1' ),
                                      display: {
                                          normal: 'ISIS-2804',
                                          hover: 'Programming Marathons'
                                      },
                                      subject: {
                                          name: 'Programming Marathons',
                                          semester: '2016-10',
                                          code: 'ISIS-2804',
                                          professor: [ 'Mario Eduardo Sanchez Puccini' ]
                                      }
                                  }
                              }, 'noreq_1' );
                    tree.add( {
                                  id: 'noreq_2',
                                  data: {
                                      hide: true
                                  }
                              }, 'noreq_1' );

                    tree.add( {
                                  id: 'ISIS-1206',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1206' ),
                                      display: {
                                          normal: 'ISIS-1206',
                                          hover: 'Data Structures'
                                      },
                                      subject: {
                                          name: 'Data Structures',
                                          semester: '2016-20',
                                          code: 'ISIS-1206',
                                          professor: [ 'Dario Ernesto Correal Torres' ]
                                      }
                                  }
                              }, 'ISIS-1209' );
                    tree.add( {
                                  id: 'ISIS-1304',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1304' ),
                                      display: {
                                          normal: 'ISIS-1304',
                                          hover: 'Fundamentals of\nTechnological Infrastructure'
                                      },
                                      subject: {
                                          name: 'Fundamentals of Technological Infrastructure',
                                          semester: '2016-20',
                                          code: 'ISIS-1304',
                                          professor: [ 'Jesse Padilla Agudelo' ]
                                      }
                                  }
                              }, 'ISIS-1209' );
                    tree.add( {
                                  id: 'ISIS-1106',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1106' ),
                                      display: {
                                          normal: 'ISIS-1106',
                                          hover: 'Languages and Machines'
                                      },
                                      subject: {
                                          name: 'Languages and Machines',
                                          semester: '2016-20',
                                          code: 'ISIS-1106',
                                          professor: [ 'Nicolas Cardozo Alvarez' ]
                                      }
                                  }
                              }, 'ISIS-1104' );
                    tree.add( {
                                  id: 'LENG-1302',
                                  data: {
                                      style: getKnowledgeColor( 'LENG-1302' ),
                                      display: {
                                          normal: 'LENG-1302',
                                          hover: 'German II'
                                      },
                                      subject: {
                                          name: 'German II',
                                          semester: '2016-20',
                                          code: 'LENG-1302',
                                          professor: [ 'Natalia Rincon Barrero' ]
                                      }
                                  }
                              }, 'LENG-1301' );
                    tree.add( {
                                  id: 'noreq_3',
                                  data: {
                                      hide: true
                                  }
                              }, 'noreq_2' );

                    tree.add( {
                                  id: 'ISIS-2603',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2603' ),
                                      display: {
                                          normal: 'ISIS-2603',
                                          hover: 'Team Software Development'
                                      },
                                      subject: {
                                          name: 'Team Software Development',
                                          semester: '2017-10',
                                          code: 'ISIS-2603',
                                          professor: [ 'Rubby Casallas Gutierrez' ]
                                      }
                                  }
                              }, 'noreq_3' );
                    tree.add( {
                                  id: 'ISIS-2304',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2304' ),
                                      display: {
                                          normal: 'ISIS-2304',
                                          hover: 'Transactional Systems'
                                      },
                                      subject: {
                                          name: 'Transactional Systems',
                                          semester: '2017-10',
                                          code: 'ISIS-2304',
                                          professor: [ 'Claudia Lucia Jimenez Guarin' ]
                                      }
                                  }
                              }, 'noreq_3' );
                    tree.add( {
                                  id: 'ISIS-1404',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1404' ),
                                      display: {
                                          normal: 'ISIS-1404',
                                          hover: 'IT in Organizations'
                                      },
                                      subject: {
                                          name: 'IT in Organizations',
                                          semester: '2017-10',
                                          code: 'ISIS-1404',
                                          professor: [ 'Oscar Javier Avila Cifuentes' ]
                                      }
                                  }
                              }, 'noreq_2' );
                    tree.add( {
                                  id: 'IELE-2042B',
                                  data: {
                                      style: getKnowledgeColor( 'IELE-2042B' ),
                                      display: {
                                          normal: 'IELE-2042B',
                                          hover: 'Ironman Technology'
                                      },
                                      subject: {
                                          name: 'Ironman Technology',
                                          semester: '2017-10',
                                          code: 'IELE-2042B',
                                          professor: [ 'Johann Faccelo Osma Cruz' ]
                                      }
                                  }
                              }, 'noreq_3' );
                    tree.add( {
                                  id: 'HIST-2332A',
                                  data: {
                                      style: getKnowledgeColor( 'HIST-2332A' ),
                                      display: {
                                          normal: 'HIST-2332A',
                                          hover: 'History of Things'
                                      },
                                      subject: {
                                          name: 'History of Things',
                                          semester: '2017-10',
                                          code: 'HIST-2332A',
                                          professor: [ 'Ana Maria Otero Cleves' ]
                                      }
                                  }
                              }, 'noreq_3' );
                    tree.add( {
                                  id: 'LENG-1105',
                                  data: {
                                      style: getKnowledgeColor( 'LENG-1105' ),
                                      display: {
                                          normal: 'LENG-1105',
                                          hover: 'English V'
                                      },
                                      subject: {
                                          name: 'English V',
                                          semester: '2017-10',
                                          code: 'LENG-1105',
                                          professor: [ 'Valeriya Lytvychenko' ]
                                      }
                                  }
                              }, 'LENG-1104' );
                    tree.add( {
                                  id: 'ISIS-2804_2',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2804_2' ),
                                      display: {
                                          normal: 'ISIS-2804',
                                          hover: 'Programming Marathons'
                                      },
                                      subject: {
                                          name: 'Programming Marathons',
                                          semester: '2017-10',
                                          code: 'ISIS-2804',
                                          professor: [ 'Nicolas Cardozo Alvarez' ]
                                      }
                                  }
                              }, 'ISIS-2804_1' );

                    tree.add( {
                                  id: 'MATE-1105',
                                  data: {
                                      style: getKnowledgeColor( 'MATE-1105' ),
                                      display: {
                                          normal: 'MATE-1105',
                                          hover: 'Lineal Algebra I'
                                      },
                                      subject: {
                                          name: 'Lineal Algebra I',
                                          semester: '2017-19',
                                          code: 'MATE-1105',
                                          professor: [ 'Alex Rolando Bueno' ]
                                      }
                                  }
                              }, 'MATE-1203' );
                    tree.add( {
                                  id: 'MATE-1214',
                                  data: {
                                      style: getKnowledgeColor( 'MATE-1214' ),
                                      display: {
                                          normal: 'MATE-1214',
                                          hover: 'Integral Calculus and\nDifferential Equations'
                                      },
                                      subject: {
                                          name: 'Integral Calculus and Differential Equations',
                                          semester: '2017-19',
                                          code: 'MATE-1214',
                                          professor: [ 'David Ricardo Riveros Pacheco' ]
                                      }
                                  }
                              }, 'MATE-1203' );
                    tree.add( {
                                  id: 'ISIS-2503',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2503' ),
                                      display: {
                                          normal: 'ISIS-2503',
                                          hover: 'Software Architecture\nand Design'
                                      },
                                      subject: {
                                          name: 'Software Architecture and Design',
                                          semester: '2017-20',
                                          code: 'ISIS-2503',
                                          professor: [ 'Kelly Johany Garces Pernett' ]
                                      }
                                  }
                              }, 'ISIS-2603' );
                    tree.add( {
                                  id: 'ISIS-2403',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2403' ),
                                      display: {
                                          normal: 'ISIS-2403',
                                          hover: 'Business Architecture'
                                      },
                                      subject: {
                                          name: 'Business Architecture',
                                          semester: '2017-20',
                                          code: 'ISIS-2403',
                                          professor: [ 'Jorge Alberto Villalobos Salcedo' ]
                                      }
                                  }
                              }, 'ISIS-1404' );
                    tree.add( {
                                  id: 'ISIS-2007',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2007' ),
                                      display: {
                                          normal: 'ISIS-2007',
                                          hover: 'Product design and\ninnovation in IT'
                                      },
                                      subject: {
                                          name: 'Product design and innovation in IT',
                                          semester: '2017-20',
                                          code: 'ISIS-2007',
                                          professor: [ 'Jose Tiberio Hernandez Peñaloza', 'Maria Fernanda Zuñiga Zabala' ]
                                      },
                                  }
                              }, 'ISIS-1101' );
                    tree.add( {
                                  id: 'ISIS-2804_3',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2804_3' ),
                                      display: {
                                          normal: 'ISIS-2804',
                                          hover: 'Programming Marathons'
                                      },
                                      subject: {
                                          name: 'Programming Marathons',
                                          semester: '2017-20',
                                          code: 'ISIS-2804',
                                          professor: [ 'Nicolas Cardozo Alvarez' ]
                                      }
                                  }
                              }, 'ISIS-2804_2' );

                    tree.add( {
                                  id: 'ISIS-2203',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-2203' ),
                                      display: {
                                          normal: 'ISIS-2203',
                                          hover: 'Computational Infrastructure'
                                      },
                                      subject: {
                                          name: 'Computational Infrastructure',
                                          semester: '2018-10',
                                          code: 'ISIS-2203',
                                          professor: [ 'Harold Enrique Castro Barrera', 'Sandra Julieta Rueda Rodriguez' ]
                                      }
                                  }
                              }, 'ISIS-1304' );
                    tree.add( {
                                  id: 'MATE-1207',
                                  data: {
                                      style: getKnowledgeColor( 'MATE-1207' ),
                                      display: {
                                          normal: 'MATE-1207',
                                          hover: 'Vectorial Calculus'
                                      },
                                      subject: {
                                          name: 'Vectorial Calculus',
                                          semester: '2018-10',
                                          code: 'MATE-1207',
                                          professor: [ 'Sergio Miguel Adarve Delgado' ]
                                      }
                                  }
                              }, 'MATE-1214' );
                    tree.add( {
                                  id: 'FISI-1028',
                                  data: {
                                      style: getKnowledgeColor( 'FISI-1028' ),
                                      display: {
                                          normal: 'FISI-1028',
                                          hover: 'Physics II'
                                      },
                                      subject: {
                                          name: 'Physics II',
                                          semester: '2018-10',
                                          code: 'FISI-1028',
                                          professor: [ 'Luis Quiroga Puello' ]
                                      }
                                  }
                              }, 'FISI-1018' );
                    tree.add( {
                                  id: 'ISIS-1105',
                                  data: {
                                      style: getKnowledgeColor( 'ISIS-1105' ),
                                      display: {
                                          normal: 'ISIS-1105',
                                          hover: 'Design and Analysis\nof Algorithms'
                                      },
                                      subject: {
                                          name: 'Design and Analysis of Algorithms',
                                          semester: '2018-10',
                                          code: 'ISIS-1105',
                                          professor: [ 'Rodrigo Cardoso Rodriguez' ]
                                      }
                                  }
                              }, 'ISIS-1106' );
                    tree.add( {
                                  id: 'IIND-2106',
                                  data: {
                                      style: getKnowledgeColor( 'IIND-2106' ),
                                      display: {
                                          normal: 'IIND-2106',
                                          hover: 'Probability and Statistics I'
                                      },
                                      subject: {
                                          name: 'Probability and Statistics I',
                                          semester: '2018-10',
                                          code: 'IIND-2106',
                                          professor: [ 'Astrid Johanna Bernal Rueda' ]
                                      }
                                  }
                              }, 'noreq_3' );
                    tree.add( {
                                  id: 'MBIO-1100',
                                  data: {
                                      style: getKnowledgeColor( 'MBIO-1100' ),
                                      display: {
                                          normal: 'MBIO-1100',
                                          hover: 'Cell Biology'
                                      },
                                      subject: {
                                          name: 'Cell Biology',
                                          semester: '2018-10',
                                          code: 'MBIO-1100',
                                          professor: [ 'Martha Josefina Vives Florez' ]
                                      }
                                  }
                              }, 'noreq_3' );
                    tree.add( {
                                  id: 'DEPO-1527',
                                  data: {
                                      style: getKnowledgeColor( 'DEPO-1527' ),
                                      display: {
                                          normal: 'DEPO-1527',
                                          hover: 'Military Training'
                                      },
                                      subject: {
                                          name: 'Military Training',
                                          semester: '2018-10',
                                          code: 'DEPO-1527',
                                          professor: [ '' ]
                                      }
                                  }
                              }, 'noreq_2' );


                    let radial = document.getElementById( 'radial' );
                    radial = new Radial( radial, false );
                    radial.radial_config.tree = tree;
                    radial.radial_config.clickListener = ( elem ) => console.log( elem );
                    radial.radial_config.ringStart = 1;
                    radial.radial_attrs.inc = 60;
                    radial.radial_attrs.size = 21;
                    radial.radial_attrs.padding = 10;
                    radial.radial_attrs.style.node.anim.scale = 3;
                    radial.radial_attrs.style.node.anim.textScale = .3;
                    radial.radial_restart();
                },
                tech: [
                    {
                        name: 'HTML5',
                        url: 'https://developer.mozilla.org/es/docs/HTML/HTML5',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png'
                    },
                    {
                        name: 'JavaScript ES6',
                        url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Novedades_en_JavaScript/ECMAScript_6_support_in_Mozilla',
                        icon: 'https://user-images.githubusercontent.com/363164/39964557-738a8178-56a4-11e8-8920-a4eaaa15404c.png'
                    },
                    {
                        name: 'CSS3',
                        url: 'https://developer.mozilla.org/es/docs/Web/CSS/CSS3',
                        icon: 'http://tecnologiaenvivo.com/wp-content/uploads/2013/12/logo_CSS3-1.png'
                    },
                    {
                        name: 'svg.js',
                        url: 'http://svgjs.com/',
                        icon: 'http://svgjs.com/assets/images/logo-svg-js-01d-128.png'
                    },
                ],
                implementation: [
                    {
                        name: 'Personal Web Page',
                        icon: 'https://avatars1.githubusercontent.com/u/12243937?s=460&v=4'
                    }
                ]
            }
        ]
    }
};

# Open
This provides an easy way of adding an open answer form component

### Before You Start
Remember you must include [jQuery](https://github.com/dnarvaez27/JavaScript-Graphics/tree/master/src/external/jquery-3.3.1.min.js) 
in order to use this library

### Usage
The usage of this library is made through the ```OpenForm``` Object.  
The information captured from the input ````textarea```` component is normalized and compared without punctuation or diacritics accents     
**IMPORTANT:** This must be started when the document is ready

* ```new OpenForm(id)```: *Constructor*, requires the id of the ```div``` container.
* ```*.opem_config.question```: *[Required]* The question of the form component ```[String]```
* ```*.open_config.description```: *[Optional]* A description for the question ```[String]```
* ```*.open_config.answers```: *[Required]* An array of correct answers
* ```*.start()```: *[Required]*  Builds the basic info for the question (i.e: Question, description, ...)

### Code Sample
``` JavaScript
$( document ).ready( function () {
    let openForm = new OpenForm( 'open-form' );
    openForm.open_config.question = 'Write what you think about (...)';
    openForm.open_config.description = 'This is an open input, that accepts several correct answers';
    openForm.open_config.answers = [
        'Yes',
        'No',
        'Maybe'
    ];
    openForm.start();
});
```

### Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/FormOpen.JPG)

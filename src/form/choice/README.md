# Choice
> This provides an easy way of adding a multiple choice form component

### Before You Start
Remember you must include [jQuery](https://github.com/dnarvaez27/JavaScript-Graphics/tree/master/src/external/jquery-3.3.1.min.js) 
in order to use this library

### Usage
The usage of this library is made through the ```ChoiceForm``` Object.  
**IMPORTANT:** This must be started when the document is ready 
* ```new ChoiceForm(id)```: *Constructor*, requires the id of the ```div``` container.
* ```*choice_config.question```: *[Required]* The question of the form component ```[String]```
* ```*choice_config.description```: *[Optional]* A description for the question ```[String]```
* ```*.choice_config.answer```: *[Required]* The id of the correct answer
* ```*.start()```: *[Required]*  Builds the basic info for the question (i.e: Question, description, ...)
* ```new *.Answer(id, content)```:  Creates a new Answer for the form component with a unique id and the content of the answer
> Note: __\*.__, refers to the object returned from the constructor  
> More customization available soon

### Code Sample
``` JavaScript
$( document ).ready( function () {
    let choiceForm = new ChoiceForm( 'choice-form' );
    choiceForm.choice_config.question = 'Choose one of the following that (...)';
    choiceForm.choice_config.description = 'Only one answer is correct, you must select one of them';
    choiceForm.choice_config.answer = 'A';

    choiceForm.start();
    new choiceForm.Answer( 'A', 'Answer A' );
    new choiceForm.Answer( 'B', 'Answer B' );
    new choiceForm.Answer( 'C', 'Answer C' );
    new choiceForm.Answer( 'D', 'Answer D' );
});
``` 

### Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/FormChoice.JPG)

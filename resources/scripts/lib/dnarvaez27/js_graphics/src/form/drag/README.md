# Drag
This provides an easy way of adding a Drag and Drop form component using SVG

### Before You Start
Remember you must include [SVG.js](https://github.com/dnarvaez27/JavaScript-Graphics/tree/master/src/external/svg.min.js) 
and [SVG.js Draggable](https://github.com/dnarvaez27/JavaScript-Graphics/tree/master/src/external/svg.draggable.min.js)

### Usage
The use of this library is made through the ```DragComponent``` Object.  
**IMPORTANT:** This must be started when the document is ready

* ```new DragForm(id)```: *Constructor*, requires the id of the ```div``` container
* ```*.drag_config.question ```: *[Required]* The question of the form component ```[String]```
* ```*.drag_config.description```: *[Optional]* A description for the question ```[String]```
* ```new *.Response(boxes)```:  *[Required]* Creates a new Response box for the form component with an array of objects with ```values``` property with each word of the answer
* ```*.draw()```: *[Required]* Start the component and draws the SVG components

### Code Sample
``` JavaScript
SVG.on( document, 'DOMContentLoaded', function () {
    let dragForm = new DragForm( 'drag-container' );
    dragForm.drag_config.question = 'Sort the following sentences in order to form a (...)';
    dragForm.drag_config.description = 'Drag and Drop the words in the box';

    let resp = new dragForm.Response( [
                                          { value: 'This' },
                                          { value: 'Is' },
                                          { value: 'A' },
                                          { value: 'Long' },
                                          { value: 'Sentence' },
                                          { value: 'You' },
                                          { value: 'Must' },
                                          { value: 'Sort' }
                                      ] );
    resp.draw();
});
```

### Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/FormDrag.JPG)

# Round Progress
This library creates a graphical rounded progress in a easy way, implementing an HTML Canvas.

### Usage
To use this library make it through the ``round-progress`` custom HTML tag. This tag, has the following attributes:  
* ``value`` : Set the current progress for the round progress 
* ``stroke``: Set the stroke of the round progress
* ``radio`` : Set the ratio of the circunference of the round progress
* ``data`` : Sets the data associated to the round progress (Explained below)
* ``style`` : Has three library relevant styles:
    * ``color`` : Sets the color for the current progress for the round progress  
    * ``text-decoration-color`` : Sets the color for the track of the round progress, i.e: The progress left to 100% 
    * ``font`` : The font for the progress text

#### Data
Round progress can have an associated data in JSON format. This data can be retrieved when the user clicks on the round progress, to implement the Callback of this listener, just call the ``addMouseListener`` method, as following:  
```JavaScript
    document.getElementById( 'id_round' ).addMouseListener( function ( data ) {
                    console.log( data );
                } );
```

> This will print on console the data associated to the round progress whose id is 'id_round' when the user clicks on it.  

### Example
```HTML
 <round-progress
     id="1"
     value="50"
     radio=30"
     stroke="2"
     data='{"hola": 123}'
     style="color: #FCB13F; font: 25px Chiller, sans-serif"
 ></round-progress>
```

### Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/RoundProgress.JPG)

# Round Progress
This library creates a graphical rounded progress in a easy way, implementing an HTML Canvas.
<small>
> **Important:** This library was made using Custom Elements, from Web Components, which is ONLY supported in Chrome, Opera and Safari. 
    Firefox is developing its support and Edge is considering.  
    For more information see: https://www.webcomponents.org/  
    _Soon I will be uploading an all browser compatible library_ 
    
> If you are using **stable version** you must include jQuery in your libraries and include it before importing this one.
</small>

### Usage

#### Stable
* To use the stable version, include a ``div`` in your HTML, and give it an ``id`` that starts with ``round_progress``.  
* One the document is ready, the library calls the function ``round_progress.init(parent)``, with the parameter ``parent`` set to the ``'body'`` tag,
this will look for id's that matches the word, as discribed in the previous requirement, in parent's childs recursively, thus rendering the rounded progress.  
If you only want to render a specific or a set elements of "rounded progress", you can call the function by yourself and passing the parameter, as a [jQuery selector](https://api.jquery.com/category/selectors/),
to the **parent** of the progress bar

#### Experimental 
To use this library make it through the ``round-progress    `` custom HTML tag. This tag, has the following attributes:  
* ``value`` : Set the current progress for the round progress 
* ``stroke``: Set the stroke of the round progress
* ``radio`` : Set the ratio of the circunference of the round progress
* ``data`` : Sets the data associated to the round progress (Explained below)
* ``style`` : Has three library relevant styles:
    * ``color`` : Sets the color for the current progress for the round progress  
    * ``text-decoration-color`` : Sets the color for the track of the round progress, i.e: The progress left to 100% 
    * ``font`` : The font for the progress text

#### Data
Round progress can have an associated data in JSON format. This data can be retrieved when the user clicks on the round progress.

##### Stable
in stable version 
To implement the Callback of this listener, just set the attirbute ``round_progress_listener `` in ``round_progress.data``, as following:
```JavaScript
round_progress.data.round_progress_listener = function ( data ) {
            console.log( data );
};

```
 
##### Experimental 
To implement the Callback of this listener, just call the ``addMouseListener`` method, as following:  
```JavaScript
document.getElementById( 'id_round' ).addMouseListener( function ( data ) {
            console.log( data );
} );
```

> In the example above, data associated to the round progress whose id is 'id_round' will print on console when the user clicks on it.  

### Code Sample

#### Stable
```HTML
 <div id="round_progress_1"
      value="50"
      radio=30"
      stroke="3"
      data='{"greeting": "Hello"}'
      style="color: gold"
 ></div>
```
To render only a specific rounded progress 
```JavaScript
 round_progress.init( '#parent-of-the-rounded-progress' );
```

#### Experimental
```HTML
 <round-progress
     id="1"
     value="50"
     radio=30"
     stroke="3"
     data='{"greeting": "Hello"}'
     style="color: #FCB13F; font: 25px Chiller, sans-serif"
 ></round-progress>
```

### Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/RoundProgress.JPG)

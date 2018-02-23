# Linear Progress Bar
This library creates a graphical linear progress bar in a easy way, implementing an HTML Canvas.  
<small>
> **Important:** If you are using the **experimental version**, consider that this library was made using Custom Elements, from Web Components, which is ONLY supported in Chrome, Opera and Safari. 
    Firefox is developing its support and Edge is considering.  
    For more information see: https://www.webcomponents.org/
          
> If you are using **stable version** you must include jQuery in your libraries and include it before importing this one.
</small>

### Usage

#### Stable  
* To use the stable version, include a ``div`` in your HTML, and give it an ``id`` that starts with ``linear_progress``.  
* One the document is ready, the library calls the function ``linear_progress.init(parent)``, with the parameter ``parent`` set to the ``'body'`` tag,
this will look for id's that matches the word, as discribed in the previous requirement, in parent's childs recursively, thus rendering the progress bar.  
If you only want to render a specific or a set elements of "progress bar", you can call the function by yourself and passing the parameter, as a [jQuery selector](https://api.jquery.com/category/selectors/),
to the **parent** of the progress bar  

#### Experimental  
To use the experimental version make it through the ``linear-progress`` custom HTML tag.

#### Attributes
In both cases, the following attributes can be added:
* ``value`` : Set the current progress for the bar 
* ``width`` : Set the total width of the bar in _px_
* ``stroke``: Set the stroke of the bar
* ``style`` : Has three library relevant styles:
    * ``color`` : Sets the color for the current progress for the bar  
    * ``text-decoration-color`` : Sets the color for the track of the bar, i.e: The progress left to 100% 
    * ``font`` : The font for the progress text
    * ``width`` : Width of the element through css 

### Code Sample

#### Stable
```HTML
 <div id="linear_progress_1"
      value="50"
      width="189"
      style="color:#C2024F;"
      stroke="10">
 </div>
```
To render only a specific progress bar
```JavaScript
    linear_progress.init( '#parent-of-the-progress-bar' );
```


#### Experimental
```HTML
 <linear-progress
    value="50"
    width="100"
    style="color:#001520"
    stroke="3">
 </linear-progress>
```

### Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/LinearProgressBar.JPG)

---
> Working on attirbute change callback to render automatically

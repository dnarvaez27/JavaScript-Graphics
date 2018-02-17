# Linear Progress Bar
This library creates a graphical linear progress bar in a easy way, implementing an HTML Canvas.

### Usage
To use this library make it through the ``linear-progress`` custom HTML tag. This tag, has the following attributes:  
* ``value`` : Set the current progress for the bar 
* ``width`` : Set the total width of the bar
* ``stroke``: Set the stroke of the bar
* ``style`` : Has three library relevant styles:
    * ``color`` : Sets the color for the current progress for the bar  
    * ``text-decoration-color`` : Sets the color for the track of the bar, i.e: The progress left to 100% 
    * ``font`` : The font for the progress text

### Code Sample
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

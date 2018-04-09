# Linear Chart
This library provides an easy way of drawing a SVG Linear Chart

### Usage
The configuration and usage of this library is made through the ```Chart.Linear``` Object
**IMPORTANT:** This must be started when the document is ready

* ```new Chart.Linear( id_container, loadOnReady )```: *Constructor*, requires the ```id``` of the ```div``` container and a ```boolean``` to load the Chart when the document is ready (Default value is set to true )
* ```*.data.push({name:str, color: str, values: [ [x, y, str], ... ]})```:  Adds a new serie to the Chart with the values provided in the object pushed.
Values are arrays with the ```x``` and ```y``` coordinates and a String value to show in the chart. Note: Additional data can be added in the array
* ```*.axisX = [pointsOfX]```: Sets the points of X to appear in the axis
* ```*.axisX = [pointsOfY]```: Sets the points of Y to appear in the axis
* ```*.draw()```: Draws the Chart in case the ```loadOnReady``` argument is set to ```false```
* The following is the object responsible for the configuration of the Chart. You can change the following properties:  
```
    *.config = {
               rangeName: '', // Name of the Range of the Chart
               onClick: undefined, // Callback when a the user clicks on one point in the Chart
               showAxis: true, // To show the Axis of the Chart
               showLabels: true, // To show the Labels of the Chart 
               showGuides: true, // To show the guides of the Chart
               showLegend: true, // Not Implemented Yet
               showCoord: { x: true, y: true }, // TO show the Coordinate of the point on mouseover
               minHeight: 10 // Positive minimum Height of the Chart to show
           };
``` 
* The following is the object responsible for the style of the Chart. You can change the following properties: 
```
this.attrs = {
        padding: 30, // The padding of the Chart
        axis_width: 1, // Width of the Axis line
        line_width: 2, // Width of the lines of each Serie in the Chart
        animatation_duration: 150, // Duration of the animation when drawing the Chart
        point_diameter: 10, // Diameter of each point in the Chart
        axis_color: '#212121', // Color of the Axis of the Chart
        guides_color: '#DDDDDD', // Color of the Guides in the Chart
        bg: '#FFFFFF', // Background Color of the Chart and Popups
        fg: '#212121' // Foreground Color of the Chart and Popups
    };
```

### Code Sample
```Javascript
        let linear = new Chart.Linear( 'linear-container' );
        linear.config.rangeName = 'Y';
        linear.attrs.point_diameter = 15;
        linear.axisX = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        linear.axisY = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90 ];
        linear.config.onClick = function ( data ) {
            console.log( data.obj );
        };
        linear.config.showAxis = false;
        linear.config.showCoord = false;
        linear.data.push( {
                              name: 'Blue Series',
                              color: '#009696',
                              values: [
                                  [ 0, 10, 'Start!🏁' ],
                                  [ 1, 50, 'Growing' ],
                                  [ 2, 60 ],
                                  [ 3, 20 ],
                                  [ 4, 80 ],
                                  [ 5, 10, 'Hoo' ],
                                  [ 6, 0 ],
                                  [ 7, 10 ],
                                  [ 8, 10 ],
                                  [ 9, 20 ],
                                  [ 10, 15 ],
                              ]
                          } );
        linear.data.push( {
                              name: 'Yellow Series',
                              color: '#f4f442',
                              values: [
                                  [ 1, 20 ],
                                  [ 2, 40 ],
                                  [ 3, 20 ],
                                  [ 4, 55 ],
                                  [ 5, 10 ],
                                  [ 6, 5 ],
                                  [ 7, 20 ],
                                  [ 8, 15 ],
                                  [ 9, 80 ],
                                  [ 10, 90 ] ]
                          } );
```

### Result:
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/LinearChart0.JPG)

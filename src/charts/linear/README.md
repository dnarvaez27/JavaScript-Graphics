# Linear Chart
This library provides an easy way of drawing a SVG Linear Chart  
<small>More advanced features soon</small> 

### Usage
The configuration, customization and usage of this library is made through the ```Chart.Linear``` Object  
In order to see correctly the chart, you must import the [CSS](https://github.com/dnarvaez27/JavaScript-Graphics/tree/master/src/charts/linear/styles.css) to your webpage  
**IMPORTANT:** This must be started when the document is ready

* ```new Chart.Linear( id_container, loadOnReady )```: *Constructor*, requires the ```id``` of the ```div``` container and a ```boolean``` to load the Chart when the document is ready (Default value is set to true )
* ```*.data.push({name:str, color: str, values: [ [x, y, str], ... ]})```:  Adds a new serie to the Chart with the values provided in the object pushed.
Values are arrays with the ```x``` and ```y``` coordinates and a String value to show in the chart.  
Note: Additional data can be added in the array
* ```*.axisX = [pointsOfX]```: Sets the points of X to appear in the axis
* ```*.axisX = [pointsOfY]```: Sets the points of Y to appear in the axis
* ```*.draw()```: Draws the Chart in case the ```loadOnReady``` argument is set to ```false```
* The following is the object responsible for the configuration of the Chart. You can change the following properties:  
```
*.config = {
        rangeName: '', // Name of the Range of the Chart
        domainName: '', // Name of the Domain of the Chart
        svg: undefined, // Access Only! Gets the SVG Object
        onClick: undefined, // Callback when a the user clicks on one point in the Chart
        loadOnReady: loadOnReady // States that the SVG should be loadesd once the HTML is fully rendered or programaticaly loaded
     };
``` 
* The following is the object responsible for the style attributes of the Chart. You can change the following properties: 
```
*.attrs = {
        chart: {
            line_width: 2, // Width of the line in the Chart
            point_diameter: 10, // Diameter of the points in the Chart
            animation_duration: 150, Animation duration (ms) when drawing the Chart
            background: '#FFFFFF' // Background of the chart
        },
        axis: {
            show: true, // States if axis should be shown 
            width: 1, // Widht of the line of the axis
            color: '#CCCCCC', // Color of the axis
            y_min: 10 // Minimum point (Height) to show in the chart
        },
        guides: {
             show: true, // States if guide lines should be shown
             color: '#DDDDDD', // Colors of the Guides
             width: .5 // Width of the guides
        },
        labels: {
            show: { x: true, y: true }, // Sates for each component if the labels of the Chart should be shown
            font: {
                size: 10, // Font size of the labels
            family: 'Arial' // Font family of the labels
            },
            color: '#AAA', // Color of the labels
            gap: 5 // Space between the labels and the rest of the chart
        },
        tooltip: {
            fontUp: {
                size: 15, // Font size of the upper text in the tooltip
                family: 'Arial' // Font family of the upper text in the tooltip
            },
            fontDown: {
                size: 10, // Font size of the bottom text in the tooltip
                family: 'Arial' // Font family of the bottom text in the tooltip
            },
            padding: {
                lrSides: 20, // Left-Right Padding in the tooltip
                udSides: 10 // Up-Down Padding in the tooltip
            },
            coords: { x: true, y: true }, // States for each coordinate if it should be shown in the bottom text of the tooltip
            style: {
                background: '#FFFFFF', // Background of the tooltip 
                foreground: '#212121' // Foreground of the tootlip
            }
        },
        legend: {
            show: true, // States if the legend is shown or not
            style: {
                foreground: '#212121', // Foreground of the legend
                background: '#FFFFFF'  // Background of the legend
            }
        }
    };
```
* Also, legend styles can be manipulated through ```CSS``` with the classes:
    * ```.linear-chart-legend-bullet``` For the bullet of legend of the chart
    * ```.linear-chart-legend-text``` For the text of the legend of the chart
    * ```.linear-chart-legend-serie``` For the button/container of the text and bullet of the legend
    * ```.linear-chart-legend-container``` For the whole container of the legends of the chart

### Code Sample
```Javascript
let linear = new Chart.Linear( 'linear-container' );
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
```

### Result:
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/LinearChart0.JPG)

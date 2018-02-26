# Radial Tree

This library makes a radial representation of a tree data structure.

> Yet to do:
> * Automate selecting ring if there are too many nodes in that ring

### Before you Start
In order to make use of this library, you must include [tree.js](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/src/datastructures/tree/tree.js)
and [svg.js*](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/src/tree/radial/svg.min.js)

## Usage
1. You must have a ```div``` where the SVG will be contained
2. Configurate the library to your needs through the ```radial_config``` JS object, with the following options:  
    * ```container_id```: The ```id``` of the div which will contain the SVG radial tree
    * ```tree```: The Tree data structure configured with the information required. See more information below
    * ```clickListener```: An event handler when a node of the radial tree is clicked. The parameter associated to the handler is the data defined in the Tree node
    * ```loadOnReady```: Sets if the SVG will start render on ```document.ready```. To call the render manually, call the ```radial_restart()``` method. **This can be modified in the source code of the library**
3. Personalize the radial tree through the ```radial_attrs``` JS object with the following options:  
    * ```inc```: The increment in pixels of the different levels of the radial tree. By default, this attribute will be calculated to fit the container **height**
    * ```size```: The size of each node in the radial tree. By default it is configured to 25px
    * ```padding```: The padding between the nodes of the tree. By default it is configured to 10px
    * ```style```: Configures the style of the visual elements of the radial tree:
        * ```line```: Sets the SVG style for the lines between two nodes of the radial tree.
        * ```ring```: Sets the SVG style for the ring levels of the radial tree.
        * ```node```: Sets the different configurations for the nodes of the radial tree:
            * ```bg```: Sets the background color of every default node in the radial tree
            * ```fg```: Sets the foreground color of every default node in the radial tree
            * ```anim```: Sets the scale for the nodes when the mouse is over the nodes of the radial tree.
                          This **object** has two properties: 
                * ```scale```: Sets the scale of the whole node of the radial tree
                * ```textScale```: Sets the scale of the content of the radial tree's node

## Tree Data Structure
The Tree Data Structure, provides an easy way of adding nodes to the tree through the function ```add(node, parent)```
where the ```node``` parameter states for the node to be added, and the ```parent``` states for the ```id``` of the parent of the new node.  
Each node can contain the following attributes:
* ```id```: Id of the node
* ```data```: The data associated to the node, this can contain more information to display in the radial tree:
    * ```style```: This JS object, contains the data needed to set de ```bg``` (Background) and the ```fg``` (Foreground) of the node.
    * ```display```: This object contains the data that will be shown in the radial tree. This object has four fields:
        * ```normal```: The data that will be shown in each node.
        * ```hover```: The data that will be shown in the node when the user hovers the mouse
        * ```normal_svg```: **Experimental.** The data in SVG format that will be shown in each node.
        * ```hover_svg```: **Experimental.** The data in SVG format that will be shown in the node when the user hovers the mouse.

## Code Sample

``` JavaScript
let ntree = new Tree();
ntree.add( {
               id: 0,
               data: {
                   style: {
                       bg: '#009696',
                       fg: '#f2f7ff'
                   },
                   display: {
                       normal: 'Me',
                       hover: 'David\n Narvaez'
                   }
               }
           }, undefined ); // The first element does not have a parent
ntree.add( { id: 1, data: 1 }, 0 );
ntree.add( { id: 2, data: 2 }, 1 );
ntree.add( { id: 3, data: 3 }, 1 );


radial_config.tree = ntree;
radial_config.container_id = 'radial'
radial_config.clickListener = function ( elem ) {
    console.log( elem );
};
radial_attrs.inc = 80;
radial_attrs.size = 30;
radial_attrs.padding = 40;
radial_attrs.style.node.anim.scale = 2.5;
```
And for the HTML file, the container with its ```id```
``` HTML
<div id="radial"></div> 
```

## Result Sample
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/RadialTree.JPG)

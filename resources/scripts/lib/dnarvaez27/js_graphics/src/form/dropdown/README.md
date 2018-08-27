# DropDown
This library provides a HTML Component which represents a DropDown with multilevels (Submenu)

### Usage
The use of this library is made through the ```DropDown``` Object.  
**IMPORTANT:** This must be started when the document is ready

* ```new DropDown(btn_id, callback)```: *Constructor*, requires the ```id``` of the ```button``` that fires the dropdown and the ```callback``` that is called when a terminal node is clicked
* ```*.add({value: content})```: Adds a new element to the main menu. This method returns a ```Node``` (Item), calling the ```.add({value: content})``` method on this Node will add a submenu for this item
* ```*.clear()```: Removes all the entries in the menu
* ```*.isShown()```: Checks if the DropDown is shown or not
* ```*.adjustPos(x,y)```: Sets a delta for the ```x``` and ```y``` coordinates of the DropDown
* ```*.hide()```: Hides the DropDown
* ```*.show(node)```: Shows the Dropdown with from a given ```Node```. If no node is specified the main menu is used

### Style
Custom Style ```CSS``` can be used. In order to apply the styles use the following selectors
* ```.dn-dropdown-parent```: Applies a style to the parent back button
* ```#dn-dropdown-container```: Applies a style to the container (Items in the main menu)
* ```#dn-dropdown-subcontainer```: Applies a style to the container (Items in any submenu)   
* ```.dn-dropdown-item```: Applies any item in the dropdown   
Also arrows can be modified, as follow: 
* ```*.style.backArrow = str```
* ```*.style.frontArrow = str```

### Code Sample
``` JavaScrip
let dd = new DropDown( 'dropdown-1', ( e ) => console.log( e ) );
let o1 = dd.add( { value: 'Item 1' } );
let o11 = o1.add( { value: 'Sub-Item 1.1' } );
let o12 = o1.add( { value: 'Sub-Item 1.2' } );
let o2 = dd.add( { value: 'Item 2' } );
let o21 = o2.add( { value: 'Item 2.1' } );
```

### Result
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/DropDown0.JPG)
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/DropDown1.JPG)
![](https://github.com/dnarvaez27/JavaScript-Graphics/blob/master/imgs/DropDown2.JPG)

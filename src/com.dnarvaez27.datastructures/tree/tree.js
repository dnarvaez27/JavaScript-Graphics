const preString = '   ';

function Tree () {
  this.size = 0;
  this.root = undefined;
  this.add = function ( element, idParent ) {
    if( this.root === undefined ) {
      this.root = new Node( element );
    }
    else {
      if( this.root.addChild( element, idParent ) ) {
        this.size++;
      }
    }
  };
  this.printTree = function () {
    if( this.root !== undefined ) {
      return this.root.print( '' );
    }
    else {
      return 'empty tree!';
    }
  };
}

function Node ( element ) {
  this.element = element.data;
  this.id = element.id;
  this.childs = [];

  this.addChild = function ( element, idParent ) {
    if( this.id === idParent ) {
      this.childs.push( new Node( element ) );
      return true;
    }
    else {
      return this.childs.some( function ( child ) {
        return child.addChild( element, idParent );
      } );
    }
  };
  this.print = function ( pre ) {
    let build = pre + this.element + '\n';
    this.childs.forEach( function ( child ) {
      build += child.print( pre + preString );
    } );
    return build;
  };
}

// Test w/ IIFE
// (function () {
//   let tree = new Tree();
//   let arr = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   let actualParent = -1;
//   arr.reverse().forEach(function (item, index) {
//     if ((index + 1) % 2 === 0) {
//       actualParent++;
//     }
//     tree.add({data: item, id: index}, actualParent);
//   });
//   console.log(tree.printTree());
// })();
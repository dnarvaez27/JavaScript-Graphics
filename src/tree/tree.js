const size = 30;
const margin = 5;
const nodeBackground = '#212121';
const nodeForeground = '#FFFFFF';
const nodeBackgroundHover = '#009696';
const nodeForegroundHover = '#FFFFFF';

let canvas;
let ctx;
let height;
let width;

let tree;
let nodo;

(function () {
  canvas = document.getElementById( 'derCanvas' );
  ctx = canvas.getContext( '2d' );

  height = window.innerHeight;
  width = window.innerWidth;

  canvas.width = width;
  canvas.height = height;

  tree = new Tree();
  let arr = [];
  for( let i = 0; i < (2 ** 5) - 1; i++ ) {
    arr.push( i );
  }
  let actualParent = -1;
  arr.reverse().forEach( function ( item, index ) {
    if( (index + 1) % 2 === 0 ) {
      actualParent++;
    }
    tree.add( { data: item, id: index }, actualParent );
  } );
  console.log( tree.printTree() );

  nodo = new Nodo( tree.root );
  nodo.init();

  draw();
  addListeners();
})();

function draw () {
  ctx.clearRect( 0, 0, width, height );
  nodo.x = (width / 2);
  nodo.y = size * 3 / 2;
  nodo.paint();
}

function addListeners () {
  canvas.addEventListener( 'mousemove',
    function ( e ) {
      let nodeAt = nodo.getNodeAt( e.offsetX, e.offsetY );
      if( nodeAt !== undefined ) {
        nodo.resetColors();
        nodeAt.background = nodeBackgroundHover;
        nodeAt.foreground = nodeForegroundHover;
        document.body.style.cursor = 'pointer';
        draw();
      }
      else {
        nodo.resetColors();
        document.body.style.cursor = 'auto';
        draw();
      }
    }, false );

  canvas.addEventListener( 'mouseup',
    function ( e ) {
      let nodeAt = nodo.getNodeAt( e.offsetX, e.offsetY );
      if( nodeAt !== undefined ) {
        nodeAt.node.addChild( { data: 0, id: tree.size }, nodeAt.node.id );
        nodo.init();
        draw();
        console.log( nodeAt.node.element );
      }
    }, false );

  canvas.addEventListener( 'mousedown',
    function () {
    }, false );

  canvas.addEventListener( 'mouseout',
    function ( e ) {
    }, false );
}

function Nodo ( node ) {
  let self = this;

  self.node = node;
  self.weigth = size;
  self.height = size;
  self.x = 0;
  self.y = 0;
  self.childs = [];
  self.width = -1;
  self.background = nodeBackground;
  self.foreground = nodeForeground;

  self.calculateWidth = function () {
    let actualWidth = self.childs.length === 0 ? (self.weigth * 2) + ( margin  ) : 0;
    self.childs.forEach( function ( child ) {
      actualWidth += child.calculateWidth();
    } );
    return actualWidth + margin;
  };
  self.containsPoint = function ( x, y ) {
    let dX = Math.abs( x - self.x );
    let dY = Math.abs( y - self.y );
    return Math.sqrt( dX ** 2 + dY ** 2 ) < self.weigth;
  };
  self.getNodeAt = function ( x, y ) {
    if( self.containsPoint( x, y ) ) {
      return self;
    }
    for( let ch of self.childs ) {
      let resp = ch.getNodeAt( x, y );
      if( resp !== undefined ) {
        return resp;
      }
    }
  };
  self.paint = function () {
    if( self.x - self.weigth < 0 ) {
      width += Math.abs( self.weigth );
      canvas.width = width;
      draw();
    }
    if( self.x + self.weigth > width ) {
      width += Math.abs( self.weigth );
      canvas.width = width;
      draw();
    }

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc( self.x, self.y, size, 0, Math.PI * 2 );
    ctx.fillStyle = self.background;
    ctx.fill();
    ctx.fillStyle = self.foreground;
    ctx.fillText( self.node.element, self.x - ctx.measureText( self.node.element ).width / 2, self.y + (ctx.font.match( '([0-9]*)' )[ 0 ] / 4 ) );
    ctx.closePath();

    let tX = self.x - (self.width / 2 ) + self.weigth + margin;

    for( let i = 0; i < self.childs.length; i++ ) {
      let child = self.childs[ i ];

      child.x = tX;
      child.y = self.y + size * 3;
      child.paint();

      ctx.beginPath();
      ctx.lineWidth = 4;
      let dX = ( self.x - child.x );
      let dY = ( self.y - child.y );
      let rad = Math.atan( dY / dX );
      ctx.moveTo( self.x + ( Math.sign( rad ) * Math.cos( rad ) * size), self.y + (Math.abs( Math.sin( rad ) ) * size) );
      ctx.lineTo( child.x - ( Math.sign( rad ) * Math.cos( rad ) * size), child.y - (Math.abs( Math.sin( rad ) ) * size) );
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.closePath();

      // tX = self.x + (self.width / 2 ) - self.weigth + margin;
      tX = self.childs.length === 2 ? self.x + (self.width / 2 ) - self.weigth + margin : tX + Math.max( child.width, i + 1 < self.childs.length ? self.childs[ i + 1 ].width / 2 : -1 );
      // tX += child.width;
    }
  };

  self.resetColors = function () {
    self.background = nodeBackground;
    self.foreground = nodeForeground;

    self.childs.forEach( function ( child ) {
      child.resetColors();
    } );
  };
  self.init = function () {
    self.childs = [];
    node.childs.forEach( function ( child ) {
      let c = new Nodo( child );
      c.init();
      self.childs.push( c );
    } );
    self.width = self.calculateWidth() + margin;
  };
}
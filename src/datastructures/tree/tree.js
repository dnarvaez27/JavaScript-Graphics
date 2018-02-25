const preString = '   ';

function Tree() {
    this.size = 0;
    this.root = undefined;
    this.add = function ( element, idParent ) {
        if ( this.root === undefined ) {
            this.root = new Node( element );
        }
        else {
            if ( this.root.addChild( element, idParent ) ) {
                this.size++;
            }
        }
    };
    this.printTree = function () {
        if ( this.root !== undefined ) {
            return this.root.print( '' );
        }
        else {
            return 'empty tree!';
        }
    };
    this.height = function () {
        return this.root.height();
    };
    this.leafs = function () {
        return this.root.leafs();
    };
}

function Node( element ) {
    this.element = element.data;
    this.id = element.id;
    this.childs = [];

    this.addChild = function ( element, idParent ) {
        if ( this.id === idParent ) {
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
    this.height = function () {
        let max = 0;
        this.childs.forEach( function ( item ) {
            max = Math.max( max, item.height() );
        } );
        max++;
        return max;
    };
    this.leafs = function () {
        let cant = 0;
        if ( this.childs.length !== 0 ) {
            this.childs.forEach( function ( item ) {
                cant += item.leafs();
            } );
        }
        else {
            cant++;
        }
        return cant;
    };
}

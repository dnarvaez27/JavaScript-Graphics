const preString = '   ';

function Tree() {
    this.size = 0;
    this.root = undefined;
    this.add = function ( element, idParent ) {
        if ( this.root === undefined ) {
            this.root = new Tree.Node( element );
            this.size++;
            return this.root;
        }
        else {
            let child = this.root.addChild( element, idParent );
            if ( child ) {
                this.size++;
            }
            return child;
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

Tree.Node = function ( element ) {
    this.element = element.data;
    this.id = element.id;
    this.childs = [];

    this.add = function ( element ) {
        let node = new Tree.Node( element );
        this.childs.push( node );
        return node;
    };
    this.addChild = function ( element, idParent ) {
        if ( this.id === idParent ) {
            let node = new Tree.Node( element );
            this.childs.push( node );
            return node;
        }
        else {
            for ( let i = 0; i < this.childs.length; i++ ) {
                let addChild = this.childs[ i ].addChild( element, idParent );
                if ( addChild ) {
                    return addChild;
                }
            }
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
};

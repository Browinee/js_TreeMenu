function Tree(data) {
    var self = this;
    this.root = document.createElement("ul");
    this.root.setAttribute( "class", "clearBorder" );
    var cssLeaf = "leaf";
    traverse.call( this, data, this.root );

    //----------------------------------------

    function traverse(obj, pos) {
        var data = obj;

        if ( !Array.isArray(obj) ) {    // Not an array -> an object
            var name = obj.name;
            data = obj.data;
            var childLi = createLiAndShowName(name);
            pos.appendChild(childLi);

            if ( null == data || data.length == 0 ) {   // leaf node
                childLi.setAttribute( "class", cssLeaf );
                return;
            }
            // not leaf node, append <ul>
            var childUL = pos = document.createElement("ul");
            childLi.appendChild(childUL);
        }

        for ( var i = 0, l = data.length; i < l; i++ )
            traverse( data[i], pos);
    }

    //----------------------------------------

    function createLiAndShowName(itemName) {
        var newLI = document.createElement("li");
        newLI.innerHTML = itemName;
        return newLI;
    }

}   //--End class Tree


//----------------------------------------------------------------
//                            public
//----------------------------------------------------------------


Tree.prototype = {
    root: null,

    render: function(pos) {
        pos.appendChild(this.root);
    }
}

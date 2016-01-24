function Tree(data) {
    this.data = data;

    //----------------------------------------
    function traverse(obj, func, pos) {
        for ( var key in obj ) {

            if ( "name" === key ) {
                var isLeaf = obj.data === null ? true : false;  //currently a leaf node?
                pos.appendChild( func.apply( this, [ obj[key] ] ) );
            }

            if (isLeaf)  setClass4Leaf();

            if (  "object" === typeof(obj[key]) ) {
                // when key == [number]
                if (isLeaf === undefined) {
                    traverse(obj[key], func, pos);
                    continue;
                }
                // when key == "data" && not a leaf node
                if (!isLeaf) {
                    var newUL = document.createElement("ul");
                    pos.getElementsByTagName("li")[pos.getElementsByTagName("li").length - 1]
                       .insertAdjacentElement("beforeEnd", newUL);
                    var posNext =
                        pos.getElementsByTagName("ul")[pos.getElementsByTagName("ul").length - 1];
                    traverse(obj[key], func, posNext);
                 }
            }
        } //end for loop
    } //end traverse

    //----------------------------------------
    function createLiNode(itemName) {
        var newLI = document.createElement("li");
        var nameNode = document.createTextNode(itemName);
        newLI.appendChild(nameNode);
        return newLI;
    }

    //----------------------------------------
    function setClass4Leaf() {
        var allLI = document.getElementsByTagName("li");
        allLI[allLI.length - 1].setAttribute("class","clearPadding");
    }

    //----------------------------------------
    this.render = function(pos) {
        var firstUL = document.body.getElementsByTagName("ul")[0];
        if ( undefined == firstUL ) {
            var newUL = document.createElement("ul");
            document.body.appendChild(newUL);
            firstUL = document.body.getElementsByTagName("ul")[0];
            firstUL.setAttribute("class","clearBorder");
            traverse(data, createLiNode, firstUL);
        } else
            traverse(data, createLiNode, pos);
    }
}

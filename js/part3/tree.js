function Tree(data) {
    this.data = data;
    var cssHide = "hide";
    var cssShow = "show";

    //----------------------------------------
    function traverse(obj, func, pos) {
        for ( var key in obj ) {

            if ( "name" === key ) {
                var isLeaf = !obj.data ? true : false;  //currently a leaf node?
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
        /*
        newLI.className == '' ? newLI.setAttribute("class","icon-closed") :
                            newLI.className += " icon-closed";
        */
        addClass(newLI ,"icon-closed " + cssHide );
        return newLI;
    }

    //----------------------------------------
    function setClass4Leaf() {
        var allLI = document.getElementsByTagName("li");
        allLI[allLI.length - 1].setAttribute("class","clearPadding");
    }

    //----------------------------------------

    function hasClass(element, className) {
        var reg = new RegExp('(\s|^)'+className+'(\s|$)');
        return !element.className.match(reg) ? false : true;
    }

    function addClass(element, className) {
       if (!hasClass(element, className))
            element.className += " "+className;
    }

    function removeClass(element, className) {
        if (hasClass(element, className)) {
            var reg = new RegExp('(\s|^)'+className+'(\s|$)');
            element.className = element.className.replace(reg,' ');
        }
    }

    //----------------------------------------
    this.render = function(pos) {
        var firstUL = document.body.getElementsByTagName("ul")[0];
        if ( undefined == firstUL ) {
            var newUL = document.createElement("ul");
            document.body.appendChild(newUL);
            firstUL = document.body.getElementsByTagName("ul")[0];
            //firstUL.setAttribute("class","clearBorder");
            addClass(firstUL,"clearBorder");
            traverse(data, createLiNode, firstUL);
        } else
            traverse(data, createLiNode, pos);

        for ( var i = 0; i < firstUL.childNodes.length; i++ ) {
            firstUL.childNodes[i].className =
                firstUL.childNodes[i].className.replace(RegExp(cssHide), cssShow);
                // firstUL.childNodes[i].setAttribute("onclick","var tree = New Tree();tree.test()");
                firstUL.childNodes[i].onclick = test;

            }
    }

    var test = function(e){alert("ha");}

}

/*
    Tree.prototype.hasClass = function(element, className) {
        var reg = new RegExp('(\s|^)'+className+'(\s|$)');
        return element.className.match(reg);
    }

    Tree.prototype.addClass = function(element, className) {
        if (!this.hasClass(element, className))
            element.className += " "+className;
    }

    Tree.prototype.removeClass = function(element, className) {
        if (hasClass(element, className)) {
            var reg = new RegExp('(\s|^)'+className+'(\s|$)');
            element.className = element.className.replace(reg,' ');
        }
    }
*/

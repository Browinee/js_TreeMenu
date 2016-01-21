function Tree(data) {
    var self = this;
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
        self.addClass(newLI ,"icon-closed " + cssHide );
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
            self.addClass(firstUL,"clearBorder");
            traverse.call(this, data, createLiNode, firstUL);

        } else
            traverse(data, createLiNode, pos);

        bindFirstSetOfEvents(firstUL.childNodes);
    }

    //----------------------------------------

    function bindFirstSetOfEvents(targetArray) {
        for ( var i = 0; i < targetArray.length; i++ ) {
            targetArray[i].className =
                targetArray[i].className.replace(RegExp(cssHide), cssShow);
                self.addEvent(targetArray[i], "click", trigger);
                debugger;
        }
    }


    function trigger(target) {
        alert(123);
    }

}




    // private ///////////////////////////////////////////////////
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

    Tree.prototype.addEvent = function(obj, type, handle) {
        try {  // Versions above Chrome、FireFox、Opera、Safari、IE9.0
            obj.addEventListener(type, handle, false);
        }catch(e) {
            try {  // Versions below IE8.0
                obj.attachEvent('on' + type, handle);
            }catch(e) {  // Early browser
                obj['on' + type] = handle;
            }
        }
    }
    // private ///////////////////////////////////////////////////

    // public ////////////////////////////////////////////////////

    // public ////////////////////////////////////////////////////


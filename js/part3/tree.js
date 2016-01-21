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
                    var allLI = pos.getElementsByTagName("li");
                    var allUL = pos.getElementsByTagName("ul");
                    allLI[ allLI.length - 1 ].insertAdjacentElement("beforeEnd", newUL);
                    var posNext = allUL[ allUL.length - 1];
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
        self.addClass(newLI ,"icon-closed");
        self.addClass(newLI , cssHide);
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
            traverse.call(this, data, createLiNode, pos);

        eventSetup(firstUL.childNodes);
    }

    //----------------------------------------

    function eventSetup(targetArray) {
        for ( var i = 0, length = targetArray.length; i < length; i++ ) {
            targetArray[i].className =
                targetArray[i].className.replace(RegExp(cssHide), cssShow);
                self.addEvent(targetArray[i], "click", trigger);
                // debugger;
                // self.removeClass(targetArray[i].lastChild.firstChild, "hide")
               // trigger(targetArray[i].lastChild.firstChild);
                // debugger;
        }
    }


    function trigger(e) {
        // debugger;
        // alert(e.target);
        // var nodes = e.target.childNodes;
        // var length = nodes.length;

        if ( e.target.lastChild.nodeName == "UL" ) {
            var nodes = e.target.lastChild.childNodes;
            var length = nodes.length;
            for ( var i = 1; i < length; i++ ) {
                self.removeClass(nodes[0], "hide");
            }

        }




        // self.removeClass(v, "hide")
    }

}




    // private ///////////////////////////////////////////////////
    Tree.prototype.hasClass = function(element, className) {
        var reg = new RegExp('(\s|^)*'+className+'(\s|$)');
        //return !element.className.match(reg) ? false : true;
        return element === null ? false : element.className.match(reg);
    }

    Tree.prototype.addClass = function(element, className) {
        if (!this.hasClass(element, className)) {
            element.className += " "+className;
            element.className = element.className.trim();
        }
    }

    Tree.prototype.removeClass = function(element, className) {
        // debugger;
        if (this.hasClass(element, className)) {
            var reg = new RegExp('(\s|^)*'+className+'(\s|$)*');
            element.className = element.className.replace(reg,' ');
            element.className = element.className.trim();
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


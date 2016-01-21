function Tree(data) {
    var self = this;
    this.data = data;
    var cssHide = "hide";
    var cssShow = "show";
    var cssIconMinus = "icon-opened";
    var cssIconPlus = "icon-closed";

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
        } //--End for loop
    } //--End traverse

    //----------------------------------------

    function createLiNode(itemName) {
        var newLI = document.createElement("li");
        var nameNode = document.createTextNode(itemName);
        newLI.appendChild(nameNode);
        self.addClass(newLI, cssIconPlus);
        self.addClass(newLI, cssHide);
        return newLI;
    }

    //----------------------------------------

    function setClass4Leaf() {
        var allLI = document.getElementsByTagName("li");
        allLI[allLI.length - 1].setAttribute("class","leaf");
        self.addClass( allLI[allLI.length - 1], cssHide );
    }

    //----------------------------------------

    function eventSetup(targetArray) {
        for ( var i = 0, length = targetArray.length; i < length; i++ ) {
            self.removeClass( targetArray[i], cssHide );
            if ( targetArray[i].lastChild.innerHTML ) {
                self.addEvent(targetArray[i], "click", trigger);
            } else {
            // begins with a leaf node
                self.removeClass( targetArray[i], cssIconPlus );
                self.addClass( targetArray[i], "leaf" );
            }

        }
    }

    function trigger(e) {
        if ( e.target.lastChild.nodeName == "UL" ) {
            var nodes = e.target.lastChild.childNodes;
            var length = nodes.length;
            // Expand menu
            if ( self.hasClass( e.target, cssIconPlus ) )
                for ( var i = 0; i < length; i++ ) {
                    self.removeClass( nodes[i], cssHide );
                    self.removeClass( e.target, cssIconPlus );
                    self.addClass( e.target, cssIconMinus );
                }
            // Collapse menu
            else
                for ( var i = 0; i < length; i++ ) {
                    self.addClass( nodes[i], cssHide );
                    self.removeClass( e.target, cssIconMinus );
                    self.addClass( e.target, cssIconPlus );
                }
        }
    }

//----------------------------------------------------------------
//                            public
//----------------------------------------------------------------

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

}   //--End class Tree

    Tree.prototype.hasClass = function(element, className) {
        var reg = new RegExp('(\s|^)*'+className+'(\s|$)');
        return element === null ? false : element.className.match(reg);
    }

    Tree.prototype.addClass = function(element, className) {
        if (!this.hasClass(element, className)) {
            element.className += " "+className;
            element.className = element.className.trim();
        }
    }

    Tree.prototype.removeClass = function(element, className) {
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

function Tree(data) {
    var self = this;
    this.root = document.createElement("ul");
    var cssHide = "hide";
    var cssIconMinus = "icon-opened";
    var cssIconPlus = "icon-closed";
    var cssLeaf = "leaf";

    self.addClass( this.root, "clearBorder" );
    traverse.call( this, data, this.root );
    eventSetup(this.root.childNodes);

    //----------------------------------------

    function traverse(obj, pos) {
        var data = obj;

        if ( !Array.isArray(obj) ) {    // Not an array -> an object
            var name = obj.name;
            data = obj.data;
            var childLi = createLiAndShowName(name);
            pos.appendChild(childLi);

            if ( null == data || data.length == 0 ) {   // leaf node
                setClass4Leaf(childLi);
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
        self.addClass( newLI, cssIconPlus );
        self.addClass( newLI, cssHide );
        return newLI;
    }

    //----------------------------------------

    function setClass4Leaf(leaf) {
        leaf.setAttribute( "class", cssLeaf );
        self.addClass( leaf, cssHide );
    }

    //----------------------------------------

    function eventSetup(targetArray) {
        for ( var i = 0, length = targetArray.length; i < length; i++ ) {
            self.removeClass( targetArray[i], cssHide );
            if ( targetArray[i].lastChild.innerHTML )  // Not empty -> parent nodes
                self.addEvent( targetArray[i], "click", trigger );
            else {    // begins with a leaf node
                self.removeClass( targetArray[i], cssIconPlus );
                self.addClass( targetArray[i], cssLeaf );
            }
        }
    }

    //----------------------------------------

    function trigger(e) {
        if ( e.target.lastChild.nodeName == "UL" ) {
            var nodes = e.target.lastChild.childNodes;
            var length = nodes.length;

            if ( self.hasClass( e.target, cssIconPlus ) )   // Expand menu
                for ( var i = 0; i < length; i++ ) {
                    self.removeClass( nodes[i], cssHide );
                    self.removeClass( e.target, cssIconPlus );
                    self.addClass( e.target, cssIconMinus );
                }
            else   // Collapse menu
                for ( var i = 0; i < length; i++ ) {
                    self.addClass( nodes[i], cssHide );
                    self.removeClass( e.target, cssIconMinus );
                    self.addClass( e.target, cssIconPlus );
                }
        }
    }

}   //--End class Tree


//----------------------------------------------------------------
//                            public
//----------------------------------------------------------------


Tree.prototype = {
    root: null,

    render: function(pos) {
        pos.appendChild(this.root);
    },

    hasClass: function(element, className) {
        var reg = new RegExp('(\s|^)*'+className+'(\s|$)');
        return element == null ? false : element.className.match(reg);
    },

    addClass: function(element, className) {
        if (!this.hasClass(element, className)) {
            element.className += " "+className;
            element.className = element.className.trim();
        }
    },

    removeClass: function(element, className) {
        if (this.hasClass(element, className)) {
            var reg = new RegExp('(\s|^)*'+className+'(\s|$)*');
            element.className = element.className.replace(reg,' ');
            element.className = element.className.trim();
        }
    },

    addEvent: function(obj, type, handle) {
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

}

"use strict";

var data = [
  { name: "Animal", data: [
                  { name: "Mammal", data: [
                          { name: "Equine", data: [
                                  { name: "Horse", data: null },
                                  { name: "Zebra", data: null }
                                  ] },
                          { name: "Bovine", data: [
                                  { name: "Cow" }
                                  ] },
                          { name: "Canine", data: [
                                  { name: "Lassie" },
                                  { name: "Rintlntin" }
                                  ] }
                          ] },
                  { name: "Reptlle", data: [
                          { name: "Lizard", data: [
                                  { name: "Salamander" }
                                  ] },
                          { name: "Snake", data: null },
                          { name: "Bird", data: [
                                  { name: "Canary" }
                                  ] }
                          ] },
          ] },
  { name: "Human", data: [] }
];

//---------------------------------------------------------------------------------------

function Tree(data){
    this.data = constructor(data);

    function constructor(data) {
        var firstUL = myBody.getElementsByTagName("ul")[0];
        if ( undefined == firstUL ) {
            var newUL = document.createElement("ul");
            myBody.appendChild(newUL);
            firstUL = myBody.getElementsByTagName("ul")[0];
            firstUL.setAttribute("class","clearBorder");
            return firstUL;
        } else
            return data;
    }

    function traverse(obj, func, pos) {
        //  console.log("~~~~~~~~ round "+q+" ~~~~~~~~");
        //  q++;
        for ( var key in obj ) {

            console.log("key: "+key);

            if ( "name" === key ) {
                pos.appendChild( func.apply( this, [ obj[key] ] ) );
                console.log("set name = "+obj[key]+" at "+pos);
            }

            if ( "data" === key && null === obj[key] ){
                setClass4Leaf();
                console.log("data = null, add class");
            }

            if ( null !== obj[key]  ) { //&& "object" === typeof(obj[key])
                debugger;
                console.log("inside, key != null");

                if (key != 0 && key != 1 && key != 2) {
                    var ul = document.createElement("ul");
                    pos.insertAdjacentElement("beforeEnd", ul);
                    var posNext = pos.getElementsByTagName("ul")[pos.getElementsByTagName("ul").length-1];
                    console.log("ul added");
                    // console.log("next pos: "+posNext);
                    // debugger;
                    console.log("============== key= "+key+" | value="+obj[key]+"==============");
                    traverse(obj[key], func, posNext);
                } else if (key == 1 || key == 2) {
                    setClass4Leaf();
                    traverse(obj[key], func, pos);
                } else {
                    // console.log("next pos: "+pos);
                    console.log("============== key= "+key+" | value="+obj[key]+"==============");
                    traverse(obj[key], func, pos);
                }
            }
        }
    }

    function createLiNode(itemName) {
        var li = document.createElement("li");
        var nameNode = document.createTextNode(itemName);
        li.appendChild(nameNode);
        //console.log(li);
        return li;
    }

    function setClass4Leaf() {
        var liAll = document.getElementsByTagName("li");
        liAll[liAll.length - 1].setAttribute("class","clearPadding");
    }

    this.Render = function(pos) {
        traverse(data, createLiNode, pos);
    }
}

//---------------------------------------------------------------------------------------

// var q = 0;  // ----- for counting round -----

var myBody = document.getElementsByTagName("body")[0];
var tree = new Tree(data);
tree.Render(myBody);

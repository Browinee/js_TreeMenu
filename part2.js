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

var data2 = [
  { name: "Animal", data: [
                  { name: "Mammal", data: null },
                  { name: "Reptlle", data: [
                          { name: "Lizard", data: null }
                  ] } ] },
  { name: "Human", data: [] }
];

//---------------------------------------------------------------------------------------

function createLiNode(key, value) {
    var li = document.createElement("li");
    var nameNode = document.createTextNode(value);
    li.appendChild(nameNode);
    console.log(li);
    return li;
}

function setClass4Leaf() {
    var liAll = document.getElementsByTagName("li");
    liAll[liAll.length - 1].setAttribute("class","clearPadding");
}

function traverse(obj, func, pos) {
//  debugger;
//  console.log("~~~~~~~~ round "+q+" ~~~~~~~");
//  q++;
    for ( var i in obj ) {
        if ( "name" == i ) {
            pos.appendChild( func.apply( this, [i, obj[i] ] ) );
            console.log("set name = "+obj[i]+" at "+pos);
        }

        if ( i == "data" && obj[i] == null ){
            setClass4Leaf();
        }

        if ( obj[i] !== null && typeof(obj[i]) == "object" ) {

          console.log("inside, key: "+i);
            if (i != 0 && i != 1 && i != 2) {
                var ul = document.createElement("ul");
                pos.insertAdjacentElement("beforeEnd", ul);
                var posNext = pos.getElementsByTagName("ul")[pos.getElementsByTagName("ul").length-1];
                console.log("ul added");
                console.log("next pos: "+posNext);
                console.log("============== key= "+i+" | value="+obj[i]+"==============");
                traverse(obj[i], func, posNext);
            } else if (i == 1 || i == 2) {
                setClass4Leaf();
                traverse(obj[i], func, pos);
            } else {
                console.log("next pos: "+pos);
                console.log("============== key= "+i+" | value="+obj[i]+"==============");
                traverse(obj[i], func, pos);
            }
        }
    }
}

var myBody = document.getElementsByTagName("body")[0];
var newUL = document.createElement("ul");
myBody.appendChild(newUL);
var ul = myBody.getElementsByTagName("ul")[0];
ul.id = "clearBorder";

// var q = 0;  // ----- for debug -----

traverse(data,createLiNode, ul);

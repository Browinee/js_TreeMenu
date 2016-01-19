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

// function insertAfter(newNode, referenceNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }

function traverse(obj, func, pos) {
//  debugger;
//  console.log("~~~~~~~~ round "+q+" ~~~~~~~");
//  q++;
    for ( var i in obj ) {
        if ( "name" == i ) {
            pos.appendChild( func.apply( this, [i, obj[i] ] ) );
            console.log("set name = "+obj[i]+" at "+pos);
        }

        if ( obj[i] !== null && typeof(obj[i]) == "object" ) {

          console.log("inside, key: "+i);
            debugger;
            if (i != 0 && i != 1 && i != 2) {
                var ul = document.createElement("ul");
                pos.insertAdjacentElement("beforeEnd", ul);
   //debugger;
                var posNext = pos.getElementsByTagName("ul")[pos.getElementsByTagName("ul").length-1];
                console.log("ul added");
                console.log("next pos: "+posNext);
                console.log("============== key= "+i+" | value="+obj[i]+"==============");
      //                                      debugger;
                traverse(obj[i], func, posNext);
            } else {
                console.log("next pos: "+pos);
                console.log("============== key= "+i+" | value="+obj[i]+"==============");
 //                           debugger;
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

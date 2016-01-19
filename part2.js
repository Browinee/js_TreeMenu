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



function printAndRetrieve(obj, position) {
    //var theBody = document.getElementsByTagName("body")[0];
  /*
    if (obj[0].data) {
        theBody.appendChild(ul);
        ul.appendChild(li);
    } else {
        obj.parentNode.appendChild(ul);
        ul.appendChild(li);
    }

    if (obj[i].data[i] != null) printAndRetrieve(obj[i].data, i+1);
    */
    for (var i = 0; i < obj.length; i++) {
console.log(obj[i].name);
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        if ( position.getElementsByTagName('ul').length == 0 ) {
            position.appendChild(ul);
        }
        li.innerHTML = obj[i].name;
        ul.appendChild(li);
console.log("----------------------------");
        if (obj[i].data != null) {
            printAndRetrieve(obj[i].data, li);
        }
        else {
            if (obj[i+1].data != null)
                printAndRetrieve(obj[i+1].data, li);
        }
    }

}

//------------------------------
var lengthSub = 1;
var layer = 0;
var beganWithNullData = false;
var bypassNumbers = false;  // pass this round if key == 1 or 2
var tmpName, rollback;
//------------------------------

function printList(key, value) {
    var myBody = document.getElementsByTagName("body")[0];
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var ulAll = document.getElementsByTagName("ul");
    var liAll = document.getElementsByTagName("li");


    if ( myBody.getElementsByTagName('ul').length == 0 ) {
    //set root ul
        myBody.appendChild(ul);
        ul.appendChild(li);
        console.log("Add body");
        return;
    } else {
        switch (key) {
            case "0":
                console.log("0 == key, add ul, the val is: "+value);
                //---------------------------
                //ulAll[ulAll.length - 1].appendChild(ul);
                liAll[liAll.length - 1].appendChild(ul);
                console.log("Now we got "+ulAll.length+" ul");
                //---------------------------
                ul.appendChild(li);
                layer += 1;
                break;
            case "name":
                tmpName = value;
                console.log("set tmpName ="+tmpName);
                //---------------------------
                break;
            case "data":
                if ( value == null ) {  //at end-point
                    if (beganWithNullData) // Last one is a sibling, add li
                        insertAfter(li, liAll[liAll.length - 1]);
                        //liAll[liAll.length - 1].appendChild(li);
                    console.log("add child for null");
                    //---------------------------
                    debugger;
                    addNameIntoLi( liAll[liAll.length - 1] );
                    rollback = true;
                    bypassNumbers = true;
                    beganWithNullData = true;
                } else {
                    debugger;
                    beganWithNullData = false;
                     if (rollback) {
                     //it's parents node
                          rollback = false;
                          console.log("let's rise!");
                          //---------------------------
                          var LiTarget = document.getElementsByTagName("li");
                          for ( var i = 0; i < layer - 1; i++ ) {
                              console.log("Now, i="+i+", layer = "+layer);
                              console.log(LiTarget.length);
                              LiTarget[0] = i == layer - 2 ?
                                  LiTarget[0].getElementsByTagName("li")[LiTarget.length -1] :
                                  LiTarget[0].getElementsByTagName("li")[0];
                              console.log(LiTarget.length);
                            }
                          //addNameIntoLi(LiTarget);
                          var nameNode = document.createTextNode(tmpName);
                          li.appendChild(nameNode);
                          insertAfter(li, LiTarget[0]);
                          console.log("insert: "+li);
                          console.log(document.getElementsByTagName("li"));
                          layer -= 1;
                          console.log("Now, Layer = "+layer);
                     } else {
                        addNameIntoLi( liAll[liAll.length - 1] );
                        console.log("add name!");
                          //---------------------------
                     }
                }
                break;
            case "1":
            case "2":
                if (bypassNumbers) {
                    bypassNumbers = false;  break;
                }

                addNameIntoLi( liAll[liAll.length - 1] );
                console.log("added a child node in numbers.");
                // var nameNode = document.createTextNode(tmpName);
                // console.log("ID: "+nameNode+" / Sub: "+lengthSub);
                //---------------------------
                // liAll[liAll.length - lengthSub].appendChild(nameNode);
                // lengthSub+=1;
                // rollback = true;
                break;
            default:
                console.log("ERROR!!!");
        }

        /*
        if ( 0 == key ) {
          console.log("0 == key, add ul, the v is: "+value);
            ulAll[ulAll.length - 1].appendChild(ul);
          console.log("Now we got "+ulAll.length+" ul");
          ul.appendChild(li);
          layer += 1;
        } else {
          console.log("key= "+key+", v is: "+value);
            // var liAll = document.getElementsByTagName("li");
            // liAll[liAll.length - 1].innerHTML = value;
            if ( "name" == key ) {
                tmpName = value;
          console.log("set tmpName ="+tmpName);
            }

            if ( "data" == key && value == null ||
                  1 == key || 2 == key ) {
                    //beganWithNullData = true;
                //li.innerHTML = value;
                var nameNode = document.createTextNode(tmpName);
  console.log("ID: "+nameNode+" / Sub: "+lengthSub);
                liAll[liAll.length - lengthSub].appendChild(nameNode);
                // lengthSub+=1;
                // var LiTarget;
                // for (var i = 0; i < layer; i++)
                //     LiTarget = document.getElementsByTagName("li")[0];
              //  liAll[liAll.length - lengthSub].insertAfter(nameNode, liAll[liAll.length - lengthSub]);
                lengthSub+=1;
                rollback = true;


          } else {


          }
           */
    }
}


function addNameIntoLi(where) {
    var nameNode = document.createTextNode(tmpName);
    where.appendChild(nameNode);
}

//printAndRetrieve(data, document.getElementsByTagName("body")[0]);


function process(key,value) {
    console.log(key + " : "+value);
}
var q=0;
function traverse(obj,func) {
    console.log("~~~~~~~~obj: "+obj+"~~~~~~~");
    if (!obj) return; //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    for (var i in obj) {
        if ( "name" == i )
            func.apply( this, [i, obj[i] ] );
        if (obj[i] !== null && typeof(obj[i])=="object") {
            console.log("==============Round: "+q+" | key= "+i+" | val="+obj[i]+"=============="); q++;
            //going on step down in the object tree!!
            traverse(obj[i],func);
        }
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createLiNode(key, value) {
    var li = document.createElement("li");
    var nameNode = document.createTextNode(value);
    li.appendChild(nameNode);
    return li;
}








var myBody = document.getElementsByTagName("body")[0];
if ( myBody.getElementsByTagName('ul').length == 0 ) {
//set root ul
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    myBody.appendChild(ul);
    ul.appendChild(li);
    console.log("Add body");
}










// traverse(data,printList);
//traverse(data,process);
// traverse(data,createLiNode);


BackUpTraverse(data,process);














function BackUpTraverse(obj,func) {
  console.log("~~~~~~~~working on obj: "+obj+"~~~~~~~");
    for (var i in obj) {
        func.apply( this, [i, obj[i] ] );
        console.log("applied:"+ i +" and "+obj[i]);
        if (obj[i] !== null && typeof(obj[i])=="object") {
            console.log("==============Round: "+q+" | key= "+i+" | val="+obj[i]+"=============="); q++;
            //going on step down in the object tree!!
            traverse(obj[i],func);
        }
    }
}

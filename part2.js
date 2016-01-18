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

function printList(key, value) {
    var myBody = document.getElementsByTagName("body")[0];
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var ulAll = document.getElementsByTagName("ul");
    var lengthSub = 1;

    if ( myBody.getElementsByTagName('ul').length == 0 ) {
        myBody.appendChild(ul);
        ul.appendChild(li);
        console.log("Add body");
        return;
    } else {
        if ( 0 == key ) {
          console.log("Running 0 key, the key is: "+key);
            ulAll[ulAll.length - 1].appendChild(ul);
          console.log("Now we got "+ulAll.length+" ul");
        } else {
          console.log("Running li");
            // var liAll = document.getElementsByTagName("li");
            // liAll[liAll.length - 1].innerHTML = value;
            if ( "name" == key ) {
                li.innerHTML = value;
                ulAll[ulAll.length - lengthSub].appendChild(li);
            } else if ( "data" == null ) {
                lengthSub++;
          }
        }
    }
}


//printAndRetrieve(data, document.getElementsByTagName("body")[0]);


function process(key,value) {
    console.log(key + " : "+value);
}
var q=0;
function traverse(obj,func) {
    for (var i in obj) {
        func.apply( this, [i, obj[i] ] );
        if (obj[i] !== null && typeof(obj[i])=="object") {
            console.log("========================Round: "+q+" | i= "+i+" | val="+obj[i]+"========================"); q++;
            //going on step down in the object tree!!
            traverse(obj[i],func);
        }
    }
}

traverse(data,printList);
// traverse(data,process);

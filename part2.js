"use strict";

var data2 = [
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

var data = [
        { name: "系統保留 (C:)", data: [
                        { name: "Program Files", data: [
                                { name: "Java", data: [
                                        { name: "jdk1.8.0_60", data: null },
                                        { name: "jre1.8.0_60", data: null }
                                        ] },
                                { name: "Sublime Text 2", data: [
                                        { name: "Pristine Packages", data: [
                                                { name: "ActionScript.sublime-package" },
                                                { name: "C#.sublime-package" },
                                                { name: "C++.sublime-package" },
                                                { name: "CSS.sublime-package" }
                                                ] },
                                        { name: "sublime_text.exe" },
                                        { name: "python26.zip" },
                                        { name: "python26.dll" }
                                        ] },
                                { name: "Microsoft.Net", data: [
                                        { name: "ADOBD.NET", data: [
                                                { name: "100", data: [
                                                        { name: "Microsoft.AnalysisServices.AdomdClient.dll" }
                                                        ] }
                                                ] }
                                ] },
                        { name: "Program Files (x86)", data: [
                                { name: "Adobe", data: [
                                        { name: "Acrobat Reader DC", data: [
                                                { name: "Esl", data: [
                                                        { name: "AiodLite.dll" }
                                                        ] },
                                                { name: "Reader", data: [
                                                        { name: "plug_ins", data: [
                                                                { name: "AcroForm", data: [
                                                                        { name: "PMP", data: [
                                                                                { name: "AdobePDF417.pmp" },
                                                                                { name: "DataMatrix.pmp" },
                                                                                { name: "QRCode.pmp" }
                                                                                ] },
                                                                        { name: "adobepdf.xdc" }
                                                                        ] },
                                                                        { name: "Multimedia.api" }
                                                                ] },
                                                        { name: "ACE.dll" },
                                                        { name: "WebResources", data: [
                                                                { name: "Resource0", data: [
                                                                        { name: "static", data: [
                                                                                { name: "css", data: [
                                                                                        { name: "app", data: [
                                                                                                { name: "dev", data: [
                                                                                                        { name: "cef" },
                                                                                                        { name: "libs" }
                                                                                                        ] }
                                                                                                ] },
                                                                                        { name: "main.css" }
                                                                                        ] }
                                                                                ] },
                                                                        { name: "index.html" }
                                                                        ] }
                                                                ] }
                                                        ] },
                                                { name: "ReadMe.htm" },
                                                { name: "ReadMeCT.htm" }
                                                ] }
                                        ] }
                                ] }
                        ] }
                ] },
        { name: "本機磁碟 (D:)", data: [] }
];

//---------------------------------------------------------------------------------------

function Tree(data) {
    this.data = data;

    //----------------------------------------
    function traverse(obj, func, pos) {
        for ( var key in obj ) {

            if ( "name" === key ) {
                var leaf = !obj.data ? true : false;  //currently a leaf node?
                pos.appendChild( func.apply( this, [ obj[key] ] ) );
            }

            if (leaf)  setClass4Leaf();

            if (  "object" === typeof(obj[key]) ) {
                // when key == [number]
                if (leaf === undefined) {
                    traverse(obj[key], func, pos);
                    continue;
                }
                // when key == "data" && not a leaf node
                if (!leaf) {
                    var newUL = document.createElement("ul");
                    pos.insertAdjacentElement("beforeEnd", newUL);
                    var posNext = pos.getElementsByTagName("ul")[pos.getElementsByTagName("ul").length-1];
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
        return newLI;
    }

    //----------------------------------------
    function setClass4Leaf() {
        var allLI = document.getElementsByTagName("li");
        allLI[allLI.length - 1].setAttribute("class","clearPadding");
    }

    //----------------------------------------
    this.render = function(pos) {
        var firstUL = myBody.getElementsByTagName("ul")[0];
        if ( undefined == firstUL ) {
            var newUL = document.createElement("ul");
            myBody.appendChild(newUL);
            firstUL = myBody.getElementsByTagName("ul")[0];
            firstUL.setAttribute("class","clearBorder");
            traverse(data, createLiNode, firstUL);
        } else
            traverse(data, createLiNode, pos);
    }
} //End class Tree

//---------------------------------------------------------------------------------------

var myBody = document.getElementsByTagName("body")[0];
var tree = new Tree(data);
tree.render(myBody);

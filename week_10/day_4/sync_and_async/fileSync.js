//tell node to give us a file system object
var fs = require('fs');

//A buffer is a temporary memory store for our data
var buffer = fs.readFileSync("us-states.txt");
var bufferString = buffer.toString();

var newLineCount = bufferString.split("\n").length;

console.log("There are " + newLineCount + " lines in the file");
console.log("Oh, you've finished reading the file.");

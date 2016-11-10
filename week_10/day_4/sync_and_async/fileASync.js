var fs = require('fs');

fs.readFile("us-states.txt", "utf-8", function(err, data){
  if(err) 
    console.log("Uh oh! " + err);
  else
    var bufferString = data;
    
  console.log(bufferString.split("\n").length);
})

console.log("Oh, where has Oregon? She's gone to Oklahoma.");
 
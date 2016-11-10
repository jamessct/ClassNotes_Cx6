//read this http://www.datchley.name/es6-promises/
var fs = require('fs');

var readFile = function(fileName, result) {  
  return new Promise((resolve, reject) =>{
    fs.readFile(fileName, function(err, data) {
      if(err) return reject(err);
      resolve(result + data.toString());
    })
  });
}

readFile('1.txt', "")
  .then((result) => readFile('2.txt', result))
  .then((result) => readFile('3.txt', result))
  .then((result) => readFile('4.txt', result))
  .then((result) => readFile('5.txt', result))
  .then((result) => readFile('6.txt', result))
  .then((result) => console.log(result))
  .catch((err) => console.log("error: ", err.message));
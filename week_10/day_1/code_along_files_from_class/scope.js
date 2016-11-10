var globalVariable = 99;
var separateFunction = function(){
  var separateA = 2;
}

separateFunction();

var outerFunction = function(){
  separateFunction();
  var outerA = 1;
  var innerFunction = function(){
    separateFunction();
    console.log('outerA ', outerA);
    console.log('globalVariable', globalVariable)
    console.log('separateA ', separateA);
  }

  innerFunction()
}

outerFunction()














var displayText = function() {
  console.log(text)
}

displayText();

var greet = function (isHappy) {
  var text = "";
  if (isHappy) {
    text = "hello my friend";
  }
  else {
    text = "Mind your own business";
  }
  var displayText = function() {
    var name = "Craig";
    console.log(text);
    var thirdFunction = function() {
      console.log(text);
      var fourthFunc = function() {
        console.log(text);
      }
      fourthFunc();
    }
    thirdFunction();
  }
  displayText();
}

greet(true);

// var name = "Craig";

// var talk = function(){
//   var name = "Kiyo";
//   console.log("My name is " + name);
// }

// var walk = function(){
//   console.log(name + " is walking.");
// }

// talk();
// walk();

// console.log("trying to access name..." + name);
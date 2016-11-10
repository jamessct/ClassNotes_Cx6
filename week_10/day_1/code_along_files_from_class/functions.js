var greater = function(a, b){
  if (a > b) {
    return a;
  }
  return b;
}

var hello = function(){
  console.log("Hello sir!");
}

var functionCallingFunctions = function(functionToCall) {
  console.log(functionToCall);
  functionToCall();
}
functionCallingFunctions( hello );
hello()

// console.log(greater(3, 4))



// console.log("the return value is: " + greater(1, 2) )









// var sum = add(2, 5);


// var hi = function () {
//   console.log("Hello!");
// }
// hi()

// hiThere();

// function hiThere() {
//   console.log("HOISTED!!");
// }

// var myVar = hiThere;

// var number = 5
// hello();

// function sum(name) {
//   console.log(name);
//   var total = 0;
//   for (var i = 0; i < arguments.length; i++) {
//     total += arguments[i];
//   }
//   return total;
// }

// console.log( sum( 1,2, 3, 4, 5) );

// function printName(name, age) {
//   console.log(name + " is " + age + " years old");
// }

// printName("Zsolt", 27);

// printName(30, "Craig");

// printName("Craig");

// function add(number1, number2) {
//   return number1 + number2;
// }

// console.log( add() );

// console.log(add(5, 7));

// function hello() {
//   console.log("Hello everyone");
// }

// var hello = function(){
//   console.log("Hello everyone");
// }

// hello();

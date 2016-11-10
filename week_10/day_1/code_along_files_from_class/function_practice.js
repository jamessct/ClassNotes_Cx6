// - Create a function that takes in the first name and surname, and speaks eg "Howdy, I am Rick Henry"
var greeter = function(firstName, lastName){
  return "Howdy, I am " + firstName + " " + lastName;
}

// - Create a multiply function, returning the result.
var multiply = function(a, b){
  return a * b;
}

// - Create a function that takes in an array and returns the first element.
var getFirst = function(array){
  return array[0];
}

// - Create a function that takes in a list of names of any length, and prints them all to screen.
var printNames = function(names){
  for (var i = 0; i < names.length; i++){
    console.log(names[i]);
  }
}

// - Create an array of animal names and a function that adds the animals to a farm array and prints the names to the console.


var farm = [];
var printFarm = function(newAnimals) {
  for (var i = 0; i < newAnimals.length; i++){
    farm.push(newAnimals[i]);
    console.log(newAnimals[i]);
  }
  return farm;
}

var animals = ["Daisy", "Shaun"];
printFarm(animals)
printFarm(animals)
printFarm(animals)
console.log(farm)



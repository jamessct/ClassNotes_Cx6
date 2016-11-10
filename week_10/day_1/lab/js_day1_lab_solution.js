//Section 1

//what types are these? Write your answer in a comment beside it.

1; //number
"cat"; //string
true; //boolean
[]; //object
{}; //object
1.1; //number
undefined; //undefined

//Section 2

// what is the truthy/falsiness values of the following
// write your answer in a comment beside it
// you can use an if to test this...
1; //true
"cat"; //true
true; //true
NaN; //false
[]; //true
{}; //true
undefined; //false
""; //false
0; //false


//Section 3

//Using examples that are different from above...

//2.1 Assign a variable that is a number
var x = 4;
//2.2 Assign a variable that is a string
var s = "string";
//2.3 Assign a variable that is a boolean
var b = false;
//2.4 Assign a variable that is an object
var o = ["cat","dog"]

//Section 4
//4.1 Write a statement that writes "hello" to the console if it's true and "bye" if it is false
if(true) {
  console.log("hello")
}
else{
  console.log("bye")
}

//Section 5
var animals = ["raccoon","hedgehog","mouse","gerbil"];

//5.1. Assign the first element to a variable
var first = animals[0];

//5.2. Assign the last element to a variable
var last = animals[3];

//5.3. Assign the length of an array to a variable
var count = animals.length

//5.4. Add an item to the end of the array
animals.push("Pika");

//5.5. Add an item to the start of the array
animals.shift("Hamster")

//5.6. Assign the index of hedgehog to a variable
var index = animals.indexOf("hedgehog");

//Section 6

//6.1 Create an array of 5 vegetables
var vegetables = ["potato","carrot","broccoli","red pepper","cauliflower"]

//6.2 Loop over the array and write to the console using a "while"
index = 0;
while(index < vegetables.length)
{
  console.log(vegetables[index]);
  index++;
}

//6.3 Loop again using a "for" with a counter
for(var i = 0; i < vegetables.length;i++){
  console.log(vegetables[i]);
}

//6.4 Loop again using a "for in"
for(veggie in vegetables)
{
  console.log(veggie);
}

//Section 7
var accounts = [
  { name: 'jay',
    amount: 125.50,
    type: 'personal'
  },
  { name: 'val',
    amount: 55125.10,
    type: 'personal'
  },
  { name: 'marc',
    amount: 400.00,
    type: 'business'
  },
  { name: 'keith',
    amount: 220.25,
    type: 'personal'
  },
  { name: 'rick',
    amount: 1.00,
    type: 'personal'
  },
]

//7.1 Calculate the total cash in accounts
function total() {
  var totalSum = 0;
  for (var i=0; i<accounts.length;i++) {
    totalSum += accounts[i].amount;
  }
  return totalSum;
}
console.log(total());
//7.2 Find the amount of cash in the account with the largest balance
function maxValue() {
  var maxVal = -1;
  for (var i=0; i<accounts.length;i++) {
    if (accounts[i].amount > maxVal) {
      maxVal = accounts[i].amount;
    }
  }
  return maxVal;
}
console.log(maxValue());
//7.3 Find the name of the account with the smallest balance
function minBalance() {
  var minVal = accounts[0].amount;
  var accountName = accounts[0].name;
  for (var i=1;i<accounts.length;i++) {
    if (accounts[i].amount < minVal) {
      minVal = accounts[i].amount;
      accountName = accounts[i].name;
    }
  }
  return accountName;
}
console.log(minBalance());
//7.4 Calculate the average bank account value
function avgValue() {
  var totalSum = total();
  var avgSum = totalSum / accounts.length;
  return avgSum;
}
console.log(avgValue());
//7.5 Find the value of marcs bank account
function valueOfAccount(name) {
  for (var i=1;i<accounts.length;i++) {
    if (accounts[i].name == name) {
      return accounts[i].amount;
    }
  }
  return false;
}
console.log(valueOfAccount("marc"));
//7.6 Find the holder of the largest bank account
function maxHolder() {
  var maxVal = maxValue();
  for (var i=0;i<accounts.length;i++) {
    if (accounts[i].amount == maxVal) {
      return accounts[i].name;
    }
  }
  return false;
}
console.log(maxHolder());
//7.7 Calculate the total cash in business accounts
function totalBusiness() {
  var total = 0;
  for (var i=0;i<accounts.length;i++) {
    if (accounts[i].type == "business") {
      total += accounts[i].amount;
    }
  }
  return total;
}
console.log(totalBusiness());
//7.8 Find the largest personal account owner
function maxValuePersonal() {
  var maxVal = -1;
  for (var i=0; i<accounts.length;i++) {
    if (accounts[i].type == "personal") {
      if (accounts[i].amount > maxVal) {
        maxVal = accounts[i].amount;
      }
    }
  }
  return maxVal;
}

function maxValuePersonalHolder() {
  var maxVal = maxValuePersonal();
  for (var i=1;i<accounts.length;i++) {
    if (accounts[i].amount == maxVal) {
      return accounts[i].name;
    }
  }
  return false;
}
console.log(maxValuePersonalHolder());
//Section 8
//Assign a hash to variable myPerson, giving them a name, height favourate food
var myPerson = {
  name: 'Marc',
  height: 1.72,
  food: 'Spaghetti'
}

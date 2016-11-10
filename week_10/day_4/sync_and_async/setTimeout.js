//CUSTOMER 1
console.log('Customer: Can I order a latte please.');

console.log("Server: I'll hand it off to the barista");
setTimeout(function coffeeIsReady(){
    console.log("You're latte is ready");
}, 4000);  

//CUSTOMER 2
console.log('Customer: Can I order an espresso please.');

console.log("Server: I'll hand it off to the barista");
setTimeout(function coffeeIsReady(){
    console.log("Your espresso is ready");
}, 2000);  

var Chef = require('./chef')

var Restaurant = function(name){
  this.mealsServed = 0;
  this.chef = new Chef("Craig");

  this.chef.serve = (meal) => {
    console.log(meal+" is ready!");
    this.mealsServed++;
  }
}

Restaurant.prototype = {
  open: function(){
    this.chef.makeMeal("spaghetti bolognese", ["spaghetti", "pepper", "mince"]);
  }
}

var restaurant = new Restaurant("Jarrod's Diner");
restaurant.open();
console.log(restaurant.mealsServed);


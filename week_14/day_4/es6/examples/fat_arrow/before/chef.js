var Chef = function(name){
  this.name = name;
  this.serve = null; //needs to be set on caller
}

Chef.prototype = {
  cook: function(supplies){
    return supplies.map(function(item){
      return "cooked "+item;
    });
  },
  makeMeal: function(recipe, supplies){
    console.log("using: ", supplies);
    var prepped = this.cook(supplies);
    console.log("made: ", prepped);
    this.serve(recipe);
  }
}

module.exports = Chef;
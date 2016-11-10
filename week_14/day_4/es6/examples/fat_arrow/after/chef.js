var Chef = function(name){
  this.name = name;
  this.serve = null; //needs to be set on client
}

Chef.prototype = {
  cook: function(supplies){
    return supplies.map(x => "cooked "+x);
  },
  makeMeal: function(recipe, supplies){
    console.log("using: ", supplies);
    var prepped = this.cook(supplies);
    console.log("made: ", prepped);
    this.serve(recipe);
  }
}

module.exports = Chef;
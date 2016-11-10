var Athlete = function(name){
  this.whatAmI = "Athlete";
  this.name = name;
  this.celebrate = null;
}

Athlete.prototype = {
  compete: function() {
    this.sprint();
    if(this.celebrate) this.celebrate();
  },
  sprint: function(){
    console.log(this.name +" is running really fast");
  }
}

module.exports = Athlete;
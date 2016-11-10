var Race = function(athlete1, athlete2) { 
  this.whatAmI = "Race";
  this.name = "100 meters sprint";
  this.winner = null;

  athlete1.celebrate = function(){
    console.log("Mobot!");
  }.bind(this);

  athlete1.compete();
  athlete2.compete();
}

module.exports = Race;
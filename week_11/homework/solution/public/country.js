var Country = function(data) {
  this.name = data.name;
  this.area = data.area;
  this.population = data.population;
};

Country.prototype = {
  populationDensity: function() {
    return (this.population / this.area);
  }
};

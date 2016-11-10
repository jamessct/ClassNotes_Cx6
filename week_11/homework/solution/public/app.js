window.onload = function () {
    var url = 'https://restcountries.eu/rest/v1';
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countriesData = JSON.parse(jsonString);
            var countries = _.map(countriesData, function(countryData) {
              return new Country(countryData);
            });
            main(countries);
        }
    };
    request.send(null);
};

var main = function (countries) {
  createDensityChart(countries);
};

var createDensityChart = function(countries) {
  console.log('countries', countries);
  var container = document.body;

  var countriesWithArea = _.filter(countries, function(country) {
    return country.area > 0;
  });
  var categories = _.map(countriesWithArea, function(country) {
    return country.name;
  });

  var densitys = _.map(countriesWithArea, function(country) {
    return country.populationDensity();
  });

  console.log('densitys', densitys);
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: container,
      type: 'column'
    },
    title: {
      text: "Countries"
    },
    xAxis: {
         categories: categories,
    },
    series: [{
      name: 'Density',
      data: densitys
    }]
  });

};

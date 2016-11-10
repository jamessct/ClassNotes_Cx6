var React = require('react');
var CountrySelector = require('./CountrySelector');
var CountryDetail = require('./CountryDetail');

var CountryBox = React.createClass({
  getInitialState:function(){
    return { countries:[], focusCountry:null }
  },
  componentDidMount:function(){
    var url = "https://restcountries.eu/rest/v1/all";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      if(request.status === 200){
        var data = JSON.parse(request.responseText);
        this.setState({countries: data, focusCountry:data[0]});
      }
    }.bind(this)
    request.send(null);
  },
  setFocusCountry:function(country){
    this.setState({focusCountry: country})
  },
  render:function(){
    return(
      <div>
        <h2>Country Box</h2>
        <CountrySelector countries={this.state.countries} selectCountry={this.setFocusCountry}></CountrySelector>
        <CountryDetail country={ this.state.focusCountry }></CountryDetail>
      </div>
    )
  }
})


module.exports = CountryBox;
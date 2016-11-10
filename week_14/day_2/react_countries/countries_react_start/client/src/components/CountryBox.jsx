var React = require('react');
var CountrySelector = require('./CountrySelector');
var CountryDetail = require('./CountryDetail');

var CountryBox = React.createClass({
  getInitialState:function(){
    return { }
  },
  render:function(){
    return(
      <div>
        <h2>Country Box</h2>
        <CountrySelector></CountrySelector>
        <CountryDetail></CountryDetail>
      </div>
    )
  }
})


module.exports = CountryBox;
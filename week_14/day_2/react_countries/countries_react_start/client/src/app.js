var React = require('react');
var ReactDOM = require('react-dom');

var CountryBox = require('./components/CountryBox.jsx')

window.onload = function(){
  ReactDOM.render(
    <CountryBox></CountryBox>,
    document.getElementById('app')
  );
}

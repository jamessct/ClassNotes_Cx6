var React = require('react');
var ReactDOM = require('react-dom');

var BitcoinPricer = require('./components/BitcoinPricer.jsx');

window.onload = function(){
  ReactDOM.render(
    <BitcoinPricer url="http://api.coindesk.com/v1/bpi/currentprice.json" />,
    document.getElementById('app')
  );
}

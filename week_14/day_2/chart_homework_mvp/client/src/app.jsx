var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('./components/Chart.jsx')

window.onload = function(){
  ReactDOM.render(
    <Chart url="https://itunes.apple.com/gb/rss/topsongs/limit=20/json" />,
    document.getElementById('app')
  );
}

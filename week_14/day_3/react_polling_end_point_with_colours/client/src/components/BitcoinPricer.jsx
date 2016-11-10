var React = require('react');
var PriceDisplay = require('./PriceDisplay.jsx');

var BitcoinPricer = React.createClass({

  getInitialState: function(){
    return ({price: null});
  },

  componentDidMount: function(){
    this.getData();
    setInterval(this.getData, 10000);
  },

  getData: function(){
    var request = new XMLHttpRequest();
    request.open("GET", this.props.url);
    request.onload = function(){
      var priceData = JSON.parse(request.responseText);
      this.setState({price: priceData.bpi.GBP.rate_float});
    }.bind(this);
    request.send();
  },

  // componentWillUpdate: function(nextProps, nextState){
  //   if (!this.state.price) return;

  //   var pTag = document.querySelector('#price');

  //   var currentRate = this.state.price;
  //   var newRate = nextState.price;

  //   if (currentRate == newRate){
  //     console.log(newRate);
  //     console.log("No change");
  //   }
  //   else if (currentRate > newRate){
  //     console.log(nextState.price)
  //     console.log("Change!! Decreasing...")
  //     pTag.style.color = "red";
  //   }
  //   else if (currentRate <= newRate){
  //     console.log(nextState.price)
  //     console.log("Change!! Increasing...")
  //     pTag.style.color = "green";
  //   }
  // },

  render: function(){
    var priceInfo = <PriceDisplay price={this.state.price}/>;

    if(!this.state.price){ 
      priceInfo = "Loading..."
    }
    
    return(
      <div>
        <h2>GBP Bitcoin Price Index Rate:</h2>
        <p id="price">{priceInfo}</p>
      </div> 
      );
  }
});

module.exports = BitcoinPricer;

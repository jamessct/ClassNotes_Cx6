var React = require('react');

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
      console.log("Price is:", this.state.price);
    }.bind(this);
    request.send();
  },

  render: function(){
    console.log("Rendering...")
    var priceInfo = this.state.price;

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









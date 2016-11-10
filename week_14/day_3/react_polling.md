#Polling using React

[i]: Start with react_start_point

##What are we making

We're going to make a small React component that displays the current price of one Bitcoin in GBP. We've chosen this because there's a live updating API for this, which is simple to use. http://www.coindesk.com/api/

We're first going to add a link in our HTML file - CoinDesk asks that you do that when you're using their API, and even if this is just a test app to play around with we should be courteous and do this as it's good practice - also if you were to take this component and re-use it later on you might forget to put it in.

```
//index.html
<a href="http://www.coindesk.com/price/">Powered by CoinDesk</a><br><br>
```

We'll start by just having one component, a BitcoinPricer. 

```
//index.js
var React = require('react');
var ReactDOM = require('react-dom');
var BitcoinPricer = require('./components/BitcoinPricer.jsx');

window.onload = function(){
  ReactDOM.render(
    <BitcoinPricer url="http://api.coindesk.com/v1/bpi/currentprice.json" />,
    document.getElementById('app')
  );
}
```


```
//BitcoinPricer.jsx
var React = require('react');

var BitcoinPricer = React.createClass({

  getInitialState: function(){
    return ({price: null});
  },

  render: function(){
    console.log("Rendering...")
    var priceInfo = this.state.price;
    if(!this.state.price){ 
      priceInfo = "Loading..."
    }

    return (
      <div>
        <h2>GBP Bitcoin Price Index Rate:</h2>
        <p>{priceInfo}</p>
      </div> 
      )
  }
})
```

To get the data we're going to make a request to the API.

```
  componentDidMount: function(){
    var request = new XMLHttpRequest();
    request.open("GET", this.props.url);
    request.onload = function(){
      var priceData = JSON.parse(request.responseText);
      this.setState({price: priceData.bpi.GBP.rate_float});
    }.bind(this);
    request.send();
  }
```

OK, so now we have the data and are displaying it. However, this data will change very often - how do we keep our component up to date?

##Polling

The simplest way to simulate live updates is 'polling'.  Polling means we continuously make requests to the server to get the latest information.  There is nothing new here. We just make lots of requests, and continue to use the latest information.

We can do this using the setInterval function. Let's separate our request out from componentDidMount so that we can call it more than once. 

```
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
```

We can set this up so it is constantly updating.  This is free if nothing changes because of React's Virtual Dom. (nb: Do think about how often you are hitting an API - only do it as often as is necessary, ie this one only updates once a minute so once we've tested it out we should increase the time between requests.)

The one way flow of React makes this very easy. The Virtual DOM will make sure there are no expensive DOM updates if nothing changes. 

If we watch the elements tab in the devtools, we can see that even though we're updating the state and the render function is being called every 10 seconds, the element containing the price information is only being re-generated when the data has changed. (You can see it being regenerated as it flashes).

Task: 

- Make the price change colour to green when it's increased and red when it's decreased.
HINT: You can either use componentWillUpdate to check incoming state, or separate the price display into its own component and use componentWillReceiveProps to check its new props.
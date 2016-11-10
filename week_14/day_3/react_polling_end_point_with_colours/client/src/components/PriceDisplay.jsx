var React = require('react');

var PriceDisplay = React.createClass({

  getInitialState: function(){
    return ({activeClass: "increase"})
  },

  componentWillReceiveProps: function(nextProps){
    console.log("Next Price: ", nextProps.price);
    if(this.props.price == nextProps.price) return;

    var increased = this.props.price <= nextProps.price;
    this.setState({activeClass: increased ? "increase" : "decrease"});
    
    console.log("Price has changed. Is price same or higher?", increased);
  },

  render: function(){
    return(
        <span className={this.state.activeClass}>{this.props.price}</span>
      )
  }

})

module.exports = PriceDisplay;
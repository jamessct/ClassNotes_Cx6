var React = require('react');

var CountryDetail = React.createClass({
  render:function(){
    if(!this.props.country){return <h4> No Country Selected </h4>}
    return(
      <div>
        <h4> { this.props.country.name } </h4>
        <ul>
          <li> { this.props.country.population } </li>
          <li> { this.props.country.region } </li>
        </ul>
      </div>
    )
  }
})

module.exports = CountryDetail;

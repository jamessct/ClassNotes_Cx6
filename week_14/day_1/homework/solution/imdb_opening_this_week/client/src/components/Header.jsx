var React = require('react')

var Header = function(props){
    return(
      <div className='header'>
        {props.title}
      </div>
    )
}

module.exports = Header
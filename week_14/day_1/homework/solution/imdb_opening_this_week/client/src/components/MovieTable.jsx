var React = require('react')
var MovieRow = require('./MovieRow')

var MovieTable = function (props){

  var movieNodes = props.movies.map(function(movie) {
    return (
      <li>
        <MovieRow movie={movie} />
      </li>
    )
  })

  return(
    <div className='movie-table'>
      <ul>
        {movieNodes}
      </ul>
    </div>
  )
}

module.exports = MovieTable
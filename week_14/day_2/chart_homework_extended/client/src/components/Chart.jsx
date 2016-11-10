var React = require('react');
var Song = require('./Song.jsx');

var Chart = React.createClass({
  getInitialState: function(){
    return { songs: [] }
  },

  loadSongs: function(url){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var songsList = JSON.parse(jsonString);
            this.setState({songs: songsList.feed.entry});
        }
    }.bind(this)
    request.send(null);
  },

  componentDidMount: function(){
    this.loadSongs(this.props.url)
  },

  handleSelectChange: function(event){
    this.loadSongs(event.target.value);
  },

  render: function(){
    if(!this.state.songs){ return <p>Loading...</p> }

    var songs = this.state.songs.map(function(song, index){
      return ( 
      <Song 
        key={index} 
        position={index + 1} 
        title={song["im:name"].label} 
        artist={song["im:artist"].label}
        image={song["im:image"][1].label}
        audio={song.link[1].attributes.href}
      />)
    });

    return (
      <div>
      <h2>UK Top 20 Songs</h2>
      <select onChange={this.handleSelectChange}>
        <option value={this.props.url}>All Songs</option>
        <option value="https://itunes.apple.com/gb/rss/topsongs/limit=20/genre=21/json">Rock</option>
        <option value="https://itunes.apple.com/gb/rss/topsongs/limit=20/genre=17/json">Dance</option>
        <option value="https://itunes.apple.com/gb/rss/topsongs/limit=20/genre=6/json">Country</option>
      </select>
      {songs}
      </div>
      )
  }

});


module.exports = Chart;
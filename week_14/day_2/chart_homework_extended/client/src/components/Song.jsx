var React = require('react');

var Song = function(props){

  var playAudio = function(event){
    var audio = document.querySelector('#audio' + props.position);
    audio.paused ? audio.play() : audio.pause();
    event.target.classList.toggle('playing');
  }

  return (
    <div>
      <img className="audio-control" src="https://image.freepik.com/free-icon/play-button_318-42541.jpg" width="60" onClick={playAudio}/>
      <img src={props.image} />
      <div className="details">
        <h3>{props.position}. {props.title}</h3>
        <h4>{props.artist}</h4>
      </div>
      <audio id={'audio' + props.position} src={props.audio}>
      </audio>
    </div>
    )
  
};

module.exports = Song;
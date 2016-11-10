var React = require('react');

var CommentForm = React.createClass({
  getInitialState:function(){
    return {author:'', text:''};
  },
  handleAuthorChange: function(event){
    this.setState({author: event.target.value});
  },
  handleTextChange: function(event){
    this.setState({text: event.target.value});
  },
  handleSubmit: function(event){
    event.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    // this.setState( { author:author, text:text } );
    // this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
    this.props.onCommentSubmit(this.state);
  },
  render: function(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value = {this.state.author}
          onChange = {this.handleAuthorChange}/>
        <input
          type="text"
          placeholder="Say something..."
          value = {this.state.text}
          onChange = {this.handleTextChange}/>
        <input
          type="submit"
          value="Enter post " />
      </form>
    )
  }
});

module.exports = CommentForm;

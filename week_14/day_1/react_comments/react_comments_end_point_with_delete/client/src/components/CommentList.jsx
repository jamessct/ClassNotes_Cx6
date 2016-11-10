var React = require('react');
var Comment = require('./Comment.jsx');

var CommentList = React.createClass({
  render: function(){

    var commentNodes = this.props.data.map(function(comment){
      return (
        <Comment author={comment.author} id={comment.id} key={comment.id} onCommentDelete={this.props.onCommentDelete}>
          { comment.text }
        </Comment>
      )
    }.bind(this));

    return(
      <div>
        { commentNodes }
      </div>
    )
  }
});

module.exports = CommentList;
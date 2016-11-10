var React = require('react');

var Comment = React.createClass({

  handleDelete: function(){
    this.props.onCommentDelete(this.props.id);
  },

  render: function(){
    return(
      <div className="comment">
        <h4> { this.props.author } </h4>
        { this.props.children }
        <button onClick={ this.handleDelete } className="delete">Delete</button>
      </div>
    )
  }
})

module.exports = Comment;
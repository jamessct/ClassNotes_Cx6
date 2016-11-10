var React = require('react');
var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');

var sampleData = [
  {id:1, author: "Jay", text:"Cool asdfads"},
  {id:2, author: "Keith", text:"I stole Rubot, mwuhaha"}
];

var CommentBox = React.createClass({

  getInitialState:function(){
    return {data: sampleData};
  },

  handleCommentDelete:function(id){
    var filteredData = this.state.data.filter(function(comment){
      return comment.id != id
    })
    this.setState({data: filteredData});
  },

  handleCommentSubmit: function(comment) {
    comment.id = Date.now();
    var newComments = this.state.data.concat([comment]);
    this.setState( { data: newComments } );
  },

  render: function(){
    return(
      <div>
        <h2>Add a Comment </h2>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}></CommentForm>
        <CommentList data={this.state.data} onCommentDelete={this.handleCommentDelete}></CommentList>
      </div>
    )
  }
});

module.exports = CommentBox;
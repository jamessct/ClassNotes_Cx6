#React Comments

## Learning Objectives
- Create a multiple component React application
- Understand the difference between state and props
- Learn how to pass data between components


##Comments Application
We want to create a comments feature which displays a list of comments and has a form that allow us to add a comment. 

We do this in React by describing how the whole page should be drawn. 

There will be nothing more added to our HTML, the whole application will be drawn by Javascript using React. We do this by describing components for our UI in a component ***hierarchy***.

Let's first build a static application that will render based on a hard coded array of comments. This is often a good place to start with a React application.

##Application Skeleton
We are now going to create a skeleton hierarchy for our application.

[i]: Talk this through with class.
- CommentBox - State:comments
  - CommentForm State:author, text Props:handleCommentSubmit(function)
  - CommentList Props:comments
    - Comment Props:comment
    - Comment Props:comment
    - Comment Props:comment


Components can have child components.  The child components of our CommentBox are CommentList, and CommentForm. CommentList will have multiple Comment components nested inside it.

###First Component

[i]: Hand out react_startpoint. Can rename to comments_app.

```
npm install
cd client
npm install
```

Let's build our first component. It'll be the parent component for all our others.

React components implement a render method that return what to display. It is automatically called by React so we have to call it 'render'. This is part of the component lifecycle (https://facebook.github.io/react/docs/component-specs.html) 

```
  mkdir client/src/components
  touch CommentBox.jsx

  //CommentBox.jsx
  var React = require('react');
  var CommentBox = React.createClass({
    render: function() {
      return (
        <div className="comment-box">
          Hello, world! I am a CommentBox.
        </div>
      );
    }
  });

  module.exports = CommentBox;
```

```
  //app.js
  var React = require('react');
  var ReactDOM = require('react-dom');
  var CommentBox = require('./components/CommentBox.jsx');

  window.onload = function(){
    ReactDOM.render(
      <CommentBox />,
      document.getElementById('app')
    );
  }
```

Similarly we will make the empty components for CommentForm and CommentList.

```
touch CommentList.jsx
touch CommentForm.jsx

//CommentList.jsx
var React = require('react');
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="comment-list">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});
module.exports = CommentList;
```

```
var React = require('react');
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

module.exports = CommentForm;
```

We now want our box to use these components. Let's nest them in the hierarchy.

```
var React = require('react');
var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h2>Add a Comment</h2>
        <CommentForm />
        <CommentList />
      </div>
    );
  }
});

module.exports = CommentBox;
```

##Comment Component

###Properties
Let's create the Comment component, which will depend on data passed in from its parent. Data passed in from a parent component is available as a 'property' on the child component. These 'properties' are accessed through this.props. A special property is this.props.children, which refers to any text or elements written between the JSX opening and closing tags.

Properties are immutable,  components can not change their properties,  they are just given them. Using props, we will be able to read the data passed to the Comment from the CommentList, and render some markup:

touch Comment.jsx

```
var React = require('react');
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author}
        </h4>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Comment;

```

```
//CommentList.jsx
var React = require('react');
var Comment = require('./Comment.jsx')
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="comment-list">
        <Comment author="Rick Henry">Cool</Comment>
        <Comment author="Valerie Gibson">Nice</Comment>
      </div>
    );
  }
});
module.exports = CommentList;
```

##Data Model
We have hard coded the data in a list of comments.

We now want to create a simple array of comments which will be drawn by the view.

We are going to set up our CommentBox to be in control of the data.

It will handle the comment data, and later on updating it.

##State
Our CommentBox is going to be the master of the state of our application, the array of comments.

For now we'll just make some mock data.  Later we will get this from our server.

```
//commentBox
var sampleData = [
   {id: 1, author: "Rick Henry", text: "Cool"},
   {id: 2, author: "Valerie Gibson", text: "This is a comment"}
 ];
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: sampleData};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```

Our comment box controls state and creates a dumb list. 

This list has no state (things it can change), it just has the comments it has been given and uses as properties.  We'll create an array of comment components and give them the properties of the author and the text.

Any string put inside our tags can be accessed as children properties.  React wants a key element on array items to uniquely identify them.

```
  var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });
```

Great we have created a static application that renders a list of comments.

Now let's look at how we can alter the state of our application with adding new Comments.

[Break]

## Adding new Comments

We are displaying the comments nicely. Now we would like to be able to add comments.

Let's create a form:

```
  var CommentForm = React.createClass({
    render: function() {
      return (
        <form className="comment-form">
          <input type="text" placeholder="Your name" />
          <input type="text" placeholder="Say something..." />
          <input type="submit" value="Enter Post" />
        </form>
      );
    }
  });
```

##Making the form interactive

The form component should have state that reflects the current values.

The state of the form should update with any changes.

```
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
```
 We can now set up the form to use those state values for what it is showing.

```
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(event) {
    this.setState({author: event.target.value});
  },
  handleTextChange: function(event) {
    this.setState({text: event.target.value});
  },
  render: function() {
    return (
      <form className="commentForm">
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

Now when the form is submitted we can also set the state of the of our application

```
handleSubmit: function(event) {
  event.preventDefault();
  var author = this.state.author.trim();
  var text = this.state.text.trim();
  if (!text || !author) {
    return;
  }
  // TODO: update the list of comments
  this.setState({author: '', text: ''});
},
...

render: function() {
  return (
    <form className="commentForm" onSubmit={this.handleSubmit}>
    ...
```

##Updating the Comment List

When a user submits a comment a new comment should be added to our list of our comments. 

The state of our application should change and thus the whole page should re-render.  It is here we will start to see the benefits of the one-way flow design.

###Adding comment
The comment box controls the state of our application, the array of comments.  When the form adds a comment it will need to notify the CommentBox that new comment is added.

To do this we can make CommentBox pass a function to add a comment to the Form.  The CommentForm can then use this function to update the state of the box.

Let's first write the function to add the comment.

Everytime a component resets it's state and the state has changed, it will re-render itself and all the child components.

As our CommentBox is at the top of the chain this will cause a cascade re-rendering our whole display. One way flow.

This is efficient due to Virtual DOM.

//CommmentBox

```
handleCommentSubmit: function(comment) {
  comment.id = Date.now();//comments need an id, just going to use a date for now
  var newComments = this.state.data.concat([comment]);
  this.setState({data: newComments});
},
...
render: function() {
  return (
    <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>
  );
}
```

Now we want the CommentForm to call this function when a comment is submitted.

```
handleSubmit: function(event) {
  event.preventDefault();
  var author = this.state.author.trim();
  var text = this.state.text.trim();
  if (!text || !author) {
    return;
  }
  this.props.onCommentSubmit({author: author, text: text});
  this.setState({author: '', text: ''});
}
```

Fantastic we have our application dynamically updating using the React one way flow.

Exercise:

  - We haven't protected the properties of the components or checked their type. Add this.
  - Add a delete button to delete each comment.


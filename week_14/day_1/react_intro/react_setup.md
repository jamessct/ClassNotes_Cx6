#Setting up a React app

##Learning objectives
- Setup a React Application
- Render a 'Hello World' using React DOM
- Introduction to JSX
- Install Babel


[i] Hand out webpack start point.

First we need to install React so we can use it in our projects.

We will do this in our client folder, as it is a client (front-end) dependency.

```
  cd client
```


```
  npm install --save react react-dom
```

Let's create our bundle and get our app running.

```
  cd client
  npm install
  npm start
  >> new tab
  cd ..
  npm install
  npm start
```

##Our First React Application

Let's create an app div and use React to render a div into it. This is where our app is going to live in the DOM. We don't want to make the entire BODY our app because we might want to add another React app to this page. 

```
  //client/build/index.html
  <div id="app"></div>
```

And now let's use React to draw an H1 to our app element.

As we mentioned earlier we can use JSX to make creating new React components easier, but first we'll show a quick example of how we would do it without JSX. We use the React.createElement function which takes 3 arguments: a type of element to create (can be an HTML element or one we define ourselves), any attributes to pass to it, and its children (which may be text or other elements).

The ReactDOM object handles rendering to the DOM. React itself is not coupled to the DOM. It can be used for server-side rendering and native mobile apps too. So the DOM part of React was separated out into its own library. We call ReactDom.render() and pass it a React element to render, and a container to render it into. We can either render a React representation of an existing HTML element, or a component that we have made. 

```
  // index.js
  var React = require('react');
  var ReactDOM = require('react-dom');

  window.onload = function(){

    var header = React.createElement('h1', null, 'Hello World!');
    var appDiv = document.getElementById('app');

    ReactDOM.render(
      header,
      appDiv
    );
  }
```

If we check out or browser now - our first Hello World React app!

##Using React with JSX

As we mentioned, React uses an extension to the Javascript syntax, called JSX to allow for better reading and quicker coding.  We don't have to use JSX, but it does make things easier. There are mixed views on this. Some people don't like it initially but it kind of makes sense.

Right now when we make our H1 element it doesn't seem to complicated. However you can imagine once we make more complex components of our own that take in several properties and may have several children, it can get messy and confusing to read. So let's use JSX to make this easier:

```
  // index.js
  var React = require('react');
  var ReactDOM = require('react-dom');

  window.onload = function(){

    var appDiv = document.getElementById('app');

    ReactDOM.render(
      <h1>Hello World!</h1>,
      appDiv
    );
  }
```

It's important to note that JSX is NOT HTML, it just looks similar - we will come across some of the differences as we continue to learn React, but you need to remember it is not the same thing.

Oh dear.. this won't load now. That's because in order to use JSX we need a JSX transpiler. The browser doesn't know how to interpret JSX on its own, so we use a transpiler which converts the code back into regular JavaScript that it understands. 

##Babel

https://babeljs.io/
Babel is a javascript transpiler. It allows to write JSX files,  along with other extensions (we will see more of this later in the week, ES2015, ES2016) and transpile it to standard Javascript that our browsers can read.

We can see what Babel will do to the code we just wrote by using its live converter: https://babeljs.io/repl/

(paste in the new version using <h1> tags and see how it changes it back to the React.createElement version we intially wrote)

##Using Babel

We have been using Webpack to bundle up our programs for the browser.  Guess what, we can install a Webpack Babel loader, and tell it to transpile (translate) our code in the bundle step! 

###Compilation Setup

First we need to install Babel in our client folder so we can use it with Webpack.

Webpack uses loaders to handle compiling the code using React. The presets help in converting our code.

```
  npm install --save-dev babel babel-core babel-loader babel-preset-es2015 babel-preset-react
```

Now that we have all the dependencies we need to update the Webpack config file to compile for React.
[i]:  Common problem writing loader not loaders. Just hand out this code for them to copy/paste in.

```
  webpack.config.js

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
```

Restart webpack. Now our app should work using JSX tags!

[i]: JSX is just shorthand for calling React render functions

You can install the Babel package in Sublime which will colour your code.

```
cmd + Shift + p
Package Control: Install Package
Search for Babel
```



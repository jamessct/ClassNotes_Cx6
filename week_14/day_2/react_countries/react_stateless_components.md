#Stateless Components

##Learning objectives
- understand what a stateless react component is and why we might use one
- learn the syntax for writing a stateless component

##What is a stateless component?

If a React component does not need to have its own internal state and is only rendering data passed down to it through props, there is an alternative syntax that we can use for creating it. This type of component is called a stateless component or stateless function.

##Why would we use one?

There are a few reasons why we might use a stateless component. Firstly they usually take fewer lines of code to write so are both quicker to create and easier to read. Win!

Another reason is that because you can't use state in one, it makes you think more carefully about what you're putting into your React components and how you should stucture your app. Since the purpose of React is to keep all the state near the top of your component tree and have data flow down, any larger app will have plenty of components that only render data passed as props - most of these can be written as stateless components and doing so prevents you from adding unnecessary state too far down the hierarchy.

Finally, the React developers are aiming to make stateless components more efficient than full ones in the future by eliminating extra checks for lifecycle methods etc, so they're good to know about for the future if you're building a big app that needs to be optimized for performance.

[i]: Can link to article on benefits in resources section below.

##How do you write one? (syntax)

Instead of using the React.createClass() method to make our component, we can use a simple JavaScript function. This takes in one argument, which is the props that are being passed into it. 

```
var MyComponent = function(props){
}
```

Then instead of using the render method, whatever we return from the function is rendered as our component. We can wrap this in brackets ( ) to write it over multiple lines, using JSX as usual. Anything we want from props we can just get from the props parameter. 

```
var MyComponent = function(props){
  return (
    <h1>Hello {props.name}</h1>
    )
}
```

Any extra functionality we need, like event listeners or functions to compute the props before displaying them, you just include above the return like in any other function. 

##Code

[i]: Rewrite country detail to this:

```
var React = require('react');

var CountryDetail = function(props){
  
  if(!props.country){
    return <h3>No country</h3>
  }
  return(
    <h3>
    {props.country.name}
    </h3> //there may be more in the return depending on when this lesson is done
    )
  
}

module.exports = CountryDetail;
```

##Resources

Documentation:

https://facebook.github.io/react/docs/reusable-components.html#stateless-functions

Good article on the benefits of using stateless components:

https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.1ts0vetzf
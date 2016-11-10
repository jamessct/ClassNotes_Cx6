# Local Storage

## Learning Objectives
- Undertstand how to add an item to local storage
- Understand how to retrieve an item from local storage

## Duration
20 mins

# Intro

So far, we've been losing our state after ever page load. When we update text, click buttons etc anything we do is gone. Wouldn't it be nice if we could save some state easily in the browser?

[i:] Give out starter code

## Saving to local storage

Local storage is just a bit of memory we can access in the browser that we can use to store state. It acts just like a hash, with key value pairs.

If we run our little example app, we have a wee text box that we can type a favourite food in, and a button that updated the text to show it when we click it. However, this is all lost when we refresh the page. 

We're going to use local storage to persist our favourite food between requests. First, we need to store the data about the favourite food.

```js
var handleButtonClick = function(){
  var input = document.querySelector('input');
  setSpanText(input.value);
  localStorage.setItem("selection", input.value); //UPDATED
  input.value = "";
};
```

Next we want to set this on page load.

```js
var app = function(){
  var button = document.querySelector('button');
  button.onclick = handleButtonClick;

  var saved = localStorage.getItem("selection"); //UPDATED
  setSpanText(saved);
}
```

Whee! It saves our selection, super cool.

## Dev Tools

If we click on the Application tab -> local storage we can see our stored data! Neat right?
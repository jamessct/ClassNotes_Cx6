var buttonCounter = 0;

var handleButtonClick = function(){
  var pTag = document.querySelector('#button-result');
  buttonCounter++;
  pTag.innerText = 'clicked '+ buttonCounter +' times pal'
};

var handleKeyPress = function(){
  var pTag = document.querySelector('#text-result');
  pTag.innerText = this.value;
}

var handleSelectChanged = function(event){
  var pTag = document.querySelector('#select-result');
  pTag.innerText = "Ah luv "+this.value;
  console.log(event);
}

var app = function(){
  var button = document.querySelector('button');
  button.onclick = handleButtonClick;

  var input = document.querySelector('input');
  input.onkeyup = handleKeyPress;

  var select = document.querySelector('select');
  select.onchange = handleSelectChanged;
}

window.onload = app;

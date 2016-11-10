var tasks = ['Go to the pub'];

populateList = function(toDoList) {
  // populate toDoList with tasks.
}

app = function() {
  var toDoList = document.querySelector('#to-do-list');
  populateList(toDoList);
}

window.onload = app;

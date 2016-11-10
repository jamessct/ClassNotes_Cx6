var tasks = [];

clearList = function(toDoList) {
  while (toDoList.hasChildNodes()) {
    toDoList.removeChild(toDoList.firstChild);
  }

  // or...
  // toDoList.innerHTML = '';
}

populateList = function(toDoList) {
  for (var i = 0; i < tasks.length; i++) {
    var newTask = document.createElement('p');
    newTask.innerText = tasks[i];
    toDoList.appendChild(newTask);
  }
}

saveTasks = function() {
  var taskData = JSON.stringify(tasks);
  localStorage.setItem('toDoList', taskData);
}

loadTasks = function() {
  var taskData = JSON.parse(localStorage.getItem('toDoList'));
  if (taskData) tasks = taskData;
}

app = function() {
  var toDoList = document.querySelector('#to-do-list');
  var input = document.querySelector('input');
  var button = document.querySelector('button');

  loadTasks();
  populateList(toDoList);

  button.onclick = function(event) {
    clearList(toDoList);
    tasks.push(input.value);
    saveTasks();
    populateList(toDoList);
    input.value = '';
  }
}

window.onload = app;

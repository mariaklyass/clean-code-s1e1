const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.querySelector(".button-add"); //first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//helper function new element + class
function handleElementAndClass(el, elClasses) {
  const element = document.createElement(el);
  element.className = elClasses;
  return element;
}

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = handleElementAndClass("li", "task-item");
  //input (checkbox)
  const checkBox = handleElementAndClass("input", "input input-checkbox task"); //checkbox
  checkBox.type = "checkbox";
  //label
  const label = handleElementAndClass("label", "label task"); //label
  label.innerText = taskString;
  //input (text)
  const editInput = handleElementAndClass("input", "input input-text task"); //text
  editInput.type = "text";
  //button edit
  const editButton = handleElementAndClass("button", "button edit");
  editButton.innerText = "Edit";
  //button delete
  const deleteButton = handleElementAndClass("button", "button delete");
  deleteButton.innerHTML =
    '<img class="img-remove" src="./remove.svg" alt="delete Icon">';

  //and appending
  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (taskInput.value.trim() !== "") {
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }
};

//Edit an existing task.

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".input-text");
  const label = listItem.querySelector(".label");
  const editBtn = listItem.querySelector(".button.edit");
  const containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};

//Delete task.
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const list = listItem.parentNode;
  //Remove the parent list item from the ul.
  list.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".input-checkbox");
  const editButton = taskListItem.querySelector(".button.edit");
  const deleteButton = taskListItem.querySelector(".button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.

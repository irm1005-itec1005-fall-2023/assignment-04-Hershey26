/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */

// Initialize an empty array with the variable name todoItems
let todoItems = [];
todoId = 0;
// Function to add a todo to the list
function addToDoItem(text) {
  let todoItem = {
    id: todoId++,
    text: text,
    completed: false,
  };
  todoItems.push(todoItem);
  saveToLocalStorage();
}

// Function to remove a todo from the list
function removeToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
    }
  }
}

// Function to mark a task as completed
function markToDoItemAsCompleted(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems[i].completed = true;
    }
    saveToLocalStorage();
  }
}

// Function to delete a task from the array
function deleteToDoItem(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === todoId) {
      todoItems.splice(i, 1);
    }
    saveToLocalStorage();
  }
}

// Function to clear all completed tasks
function clearCompletedTasks() {
  todoItems = todoItems.filter(item => !item.completed);
  saveToLocalStorage();
}
//github copilot helped in making this function

// Get elements using IDs
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearCompletedBtn = document.getElementById("clear-completed");

// Event listener for adding a new todo
todoForm.addEventListener("submit", function (e) {
  // Prevent the default action of reloading the page
  e.preventDefault();
  // Add the new todo to the list
  addToDoItem(todoInput.value);
  // Render the list
  renderTodoList();
  // Clear the input field
  todoInput.value = "";
});

// Event listener for clearing completed tasks
clearCompletedBtn.addEventListener("click", function () {
  clearCompletedTasks();
  renderTodoList();
});

// Function to render the todo list
function renderTodoList() {
  // Clear the list
  todoList.innerHTML = "";
  // Render the list
  //.foreach is a function that is used to loop through the array
  //chatgpt helped me use it instead of a for loop
  todoItems.forEach(function (item) {
    // Create a div element
    const todoItemDiv = document.createElement("div");
    // Add the class todo-item to the div
    todoItemDiv.classList.add("todo-item");
    // Add the class completed to the div if the task is completed
    if (item.completed) {
      todoItemDiv.classList.add("completed");
    }
    // Create a div element for the buttons
    const todoButtonDiv = document.createElement("div");
    // Create a span element
    const todoText = document.createElement("span");
    // Add the text of the todo item to the span
    todoText.textContent = item.text;
    // Create a button element
    const deleteBtn = document.createElement("button");
    // Add the class delete-btn to the button
    deleteBtn.textContent = "❌";
    // Add an event listener to the button
    deleteBtn.addEventListener("click", function () {
      // Remove the todo item from the list
      deleteToDoItem(item.id);
      // Render the list
      renderTodoList();
    });
    // Create a button element
    const markCompletedBtn = document.createElement("button");
    // Add the class mark-completed-btn to the button 
    markCompletedBtn.textContent = "✅";
    // Add an event listener to the button
    markCompletedBtn.addEventListener("click", function () {
      // Mark the todo item as completed
      markToDoItemAsCompleted(item.id);
      // Render the list
      renderTodoList();
    });
    // Append the span and button to the div
    todoItemDiv.appendChild(todoText);
    todoButtonDiv.appendChild(deleteBtn);
    todoButtonDiv.appendChild(markCompletedBtn);
    todoItemDiv.appendChild(todoButtonDiv);
    todoList.appendChild(todoItemDiv);
  });
}
// Function to save the todo items to local storage
//from chat gpt
function saveToLocalStorage() {
  const todoItemsString = JSON.stringify(todoItems);
  localStorage.setItem('todos', todoItemsString);
}
// Function to load the todo items from local storage
//from chat gpt
function loadFromLocalStorage() {
  const todoItemsString = localStorage.getItem('todos');
  if (todoItemsString !== null) {
    todoItems = JSON.parse(todoItemsString);
  }
}
// Load the todo items from local storage
//from chat gpt
loadFromLocalStorage();
// Initial render
renderTodoList();

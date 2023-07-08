let todoInput = document.querySelector("input");
let addTodoButton = document.getElementById("addTodo");
let todosContainer = document.getElementById("todosContainer");
let emptyContainer = document.getElementById("emptyContainer");
let todoCountTag = document.getElementById("todoCount");
let completedTodoCountTag = document.getElementById("completedTodoCount");
let todos = [];

addTodoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addTodo();
});

function addTodo() {
  if (todoInput.value.trim().length !== 0) {
    let todo = {
      completed: false,
      text: todoInput.value.trim(),
      id: Date.now(),
    };
    console.log(todo.text);
    todoInput.value = null;
    todos.push(todo);
    createTodoElement(todo);
    setTodoCount();
    setCompletedTodoCount();
    checkEmpty();
  }
}

function createTodoElement(todoObj) {
  //! Create Todo Container
  let todoTag = document.createElement("div");
  todoTag.className = todoObj.completed ? "todo completed" : "todo";

  todoTag.addEventListener("click", () => {
    if (todoTag.className.includes("completed")) {
      todoTag.className = "todo";
    } else {
      todoTag.className = "todo completed";
    }
    todos = todos.map((todo) => {
      if (todo.id === todoObj.id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setCompletedTodoCount();
  });

  //! Create Todo Checkbox
  let checkBox = document.createElement("div");
  checkBox.className = "checkbox";
  let checkBoxSpan = document.createElement("span");
  let checkBoxSvg = document.createElement("img");
  checkBoxSvg.src = "./images/check.svg";

  checkBoxSpan.append(checkBoxSvg);
  checkBox.append(checkBoxSpan);
  todoTag.append(checkBox);

  //! Create Todo Text
  let todoText = document.createElement("p");
  todoText.innerText = todoObj.text;

  todoTag.append(todoText);

  //! Create Remove Button
  let removeButton = document.createElement("button");
  removeButton.addEventListener("click", () => {
    removeButton.parentElement.remove();
    todos = todos.filter((el) => el.id !== todoObj.id);
    setTodoCount();
    setCompletedTodoCount();
    checkEmpty();
  });

  let removeButtonSvg = document.createElement("img");
  removeButtonSvg.src = "./images/remove.svg";

  removeButton.append(removeButtonSvg);
  todoTag.append(removeButton);

  todosContainer.append(todoTag);
}

//! Set Todo Count
function setTodoCount() {
  todoCountTag.innerText = todos.length;
}

//! Set Completed Todo Count
function setCompletedTodoCount() {
  let todoCount = todos.length;
  let completedTodoCount = todos.filter((el) => el.completed).length;
  if (todoCount === completedTodoCount) {
    completedTodoCountTag.innerText = todoCount;
  } else {
    completedTodoCountTag.innerText = `${completedTodoCount} in ${todoCount}`;
  }
}

function checkEmpty() {
  if (todos.length === 0) {
    emptyContainer.style.display = "flex";
    todosContainer.style.display = "none";
  } else {
    emptyContainer.style.display = "none";
    todosContainer.style.display = "flex";
  }
}

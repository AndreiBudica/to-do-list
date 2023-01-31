"use strict";
//Element selectors
// window.addEventListener("load", function () {
const addButton = document.getElementById("add-button");
const textInput = document.getElementById("task-input");
const dropdown = document.getElementById("dropdown");
const todoContainer = document.querySelector(".todo-container");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addTodo);
todoContainer.addEventListener("click", deleteCheckEdit);
dropdown.addEventListener("change", filterTodo);

function addTodo(e) {
  e.preventDefault();

  todoContainer.insertAdjacentHTML(
    "beforeend",
    ` <div class="todo">
            <div class="content">
                 <input id="todo-text" type="text" class="text" value="${textInput.value}" readonly required></input>
             </div>
            <div class="actions">
                <button type ="submit" id="edit" class="list-button">Edit</button>
                <button type ="submit"  id="check" class="list-button>"><i class="fa-solid fa-check"></i></button>

                <button  id="delete" class="list-button"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
        </div> `
  );
  saveLocalTodos(textInput.value);
  textInput.value = "";
  const todo = document.querySelector(".todo:last-child");
  setTimeout(() => {
    todo.classList.add("show");
  }, 0);
  filterTodo(e);
}

function deleteCheckEdit(e) {
  const item = e.target;
  if (item.id === "delete") {
    const todo = item.parentElement.parentElement;

    setTimeout(function () {
      todo.classList.add("hidden");
      setTimeout(function () {
        todo.remove();
        removeLocalsTodos(todo);
      }, 550); // 500ms is the duration of the fade-out transition
    }, 0);
  }
  if (item.id === "check") {
    const todo = item.closest(".todo");
    todo.classList.toggle("checked");
    filterTodo(e);
  }
  if (item.id === "edit") {
    const input = item.parentElement.previousElementSibling.firstElementChild;
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");

      input.focus();
      item.textContent = "Done";
    } else {
      input.setAttribute("readonly", "readonly");
      item.textContent = "Edit";
    }
  }
}
function filterTodo(e) {
  const todo = document.querySelectorAll(".todo");
  const option = e.target.value;
  todo.forEach((todo) => {
    switch (option) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    todoContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="todo show">
            <div class="content">
                 <input id="todo-text" type="text" class="text" value="${todo}" readonly required></input>
                    </div>
                        <div class="actions">
                            <button type ="submit" id="edit" class="list-button">Edit</button>
                            <button type ="submit"  id="check" class="list-button>"><i class="fa-solid fa-check"></i></button>

                            <button  id="delete" class="list-button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </div> `
    );
  });
}
function removeLocalsTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].firstElementChild.value;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

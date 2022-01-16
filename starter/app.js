const appTitle = document.querySelector("#app-title");
appTitle.textContent = "My ToDo Lists";

// collect UI
// todoForm
const todoForm = document.querySelector("#todo-form");
// todoInput
const todoInput = document.querySelector("#todo-input");
// filterInput
const filterInput = document.querySelector("#filter-input");
// todoList
const todoList = document.querySelector("#todo-list");
// clearButton
const clearButton = document.querySelector("#clear-todos");

// Add EventListener
immediateLoadEventListener();

function immediateLoadEventListener() {
  document.addEventListener("DOMContentLoaded", getTodos);
  todoForm.addEventListener("submit", addTodo);
  todoList.addEventListener("click", deleteTodo);
  clearButton.addEventListener("click", clearTodos);
  filterInput.addEventListener("keyup", filterTodos);
}

// Reusability element
function createTodoElements(value) {
  // create li element
  const li = document.createElement("li");
  // add class for li
  li.className =
    "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";
  // append li child
  li.appendChild(document.createTextNode(value));
  // create delete button with anchor tag
  const a = document.createElement("a");
  // tambah attribute href
  a.href = "#";
  // add class
  a.className = "badge badge-danger delete-todo";
  // create child from a
  a.innerHTML = "Delete";

  // menyelipkan a menjadi child dari li
  li.appendChild(a);

  // menampilkan element ke browser dengan memasukan element ke dalam todoList
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

// get todo from localStorage and render at browser
function getTodos() {
  const todos = getItemFromLocalStorage();
  todos.forEach((todo) => {
    createTodoElements(todo);
  });
}

// function add todo
function addTodo(e) {
  e.preventDefault();

  // Handle supaya user tidak bisa menambah todo kosong
  if (todoInput.value) {
    createTodoElements(todoInput.value);
    // add toLocalStorage
    addToLocalStorage(todoInput.value);

    // Membersihkan todoInput setelah submit
    todoInput.value = "";
  } else {
    alert("Upps Sorry. Todo tidak boleh kosong !");
  }
}

// function add to localStorage
function addToLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();
  //   memasukan value dari input kedalam array todos
  todos.push(todoInputValue);
  //   menyimpan value input ke localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function delete todo
function deleteTodo(e) {
  e.preventDefault();

  // memastikan target yang di klik
  if (e.target.classList.contains("delete-todo")) {
    // konfirmasi sebelum menghapus
    if (confirm("Yakin mau di hapus ?")) {
      const parent = e.target.parentElement;

      // remove li atau parent dari a
      parent.remove();

      deleteFromLocalStorage(parent);
    }
  }
}

// delete todo from localStorage
function deleteFromLocalStorage(deletedElement) {
  const todos = getItemFromLocalStorage();

  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// function clear All todo
function clearTodos() {
  if (todoList.childElementCount != 0) {
    todoList.innerHTML = "";

    clearTodosFromLocalStorage();
  } else {
    alert("Kamu tidak punya ToDo hari ini");
  }
}
// clear all todo from localStorage
function clearTodosFromLocalStorage() {
  localStorage.clear();
}
// function Filter todos
function filterTodos(e) {
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    const textItem = item.firstChild.textContent.toLowerCase();

    if (textItem.indexOf(filterText) !== -1) {
      item.setAttribute("style", "display: block;");
    } else {
      item.setAttribute("style", "display: none !important;");
    }
  });
}

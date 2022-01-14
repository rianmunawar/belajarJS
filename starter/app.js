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

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteTodo);

// function add todo
function addTodo(e) {
    e.preventDefault();

    // create li element
    const li = document.createElement("li");
    // add class for li
    li.className =
        "list-group-item d-flex justify-content-between align-items-center mb-1";
    // append li child
    li.appendChild(document.createTextNode(todoInput.value));
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

// function delete todo
function deleteTodo(e) {
    e.preventDefault();

    // memastikan target yang di klik
    if (e.target.classList.contains("delete-todo")) {
        const parent = e.target.parentElement;

        // remove li atau parent dari a
        parent.remove();
    }
}
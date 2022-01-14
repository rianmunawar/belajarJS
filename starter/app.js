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
clearButton.addEventListener("click", clearTodos);
filterInput.addEventListener("keyup", filterTodos);

// function add todo
function addTodo(e) {
    e.preventDefault();

    // Handle supaya user tidak bisa menambah todo kosong
    if (todoInput.value) {
        // create li element
        const li = document.createElement("li");
        // add class for li
        li.className =
            "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";
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

        // Membersihkan todoInput setelah submit
        todoInput.value = "";
    } else {
        alert("Upps Sorry. Todo tidak boleh kosong !");
    }
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
        }
    }
}

// function clear All todo
function clearTodos() {
    if (todoList.childElementCount != 0) {
        todoList.innerHTML = "";
    } else {
        alert("Kamu tidak punya ToDo hari ini");
    }
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
const inputValue = document.getElementById('inputBox');
const addbtn2 = document.getElementById('addbtn');
const todoList = document.querySelector('.todoList');
const clearbtn = document.getElementById('clearbtn');
const pendingTasks = document.querySelector('.pendingTasks');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

console.log(todos);

// Render the todo list when the page is loaded
renderTodoList();

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

addbtn2.addEventListener("click", function (e) {
    const inputBox = inputValue.value;
    if (inputBox.trim() !== '') {
        // todos.push(inputBox);
        if (selectedTaskIndex !== null) {
            todos[selectedTaskIndex] = inputBox;
            selectedTaskIndex = null;
        } else {
            todos.push(inputBox);
        }
        inputValue.value = '';
        renderTodoList();
        updateLocalStorage();
    }
});

clearbtn.addEventListener("click", function (e) {
    todos = [];
    renderTodoList();
    updateLocalStorage();
});

let selectedTaskIndex = null;

function renderTodoList() {
    todoList.innerHTML = "";
    todos.forEach(function (item, index) {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", () => {
            selectedTaskIndex = (selectedTaskIndex === index) ? null : index;
            inputValue.value = (selectedTaskIndex !== null) ? item : '';
        });
        // Create delete button
        const deleteButton = document.createElement("div");
        deleteButton.textContent = "-";
        deleteButton.classList.add("icon"); // Add class to delete button
        deleteButton.addEventListener("click", function () {
            deleteTodoItem(index);
        });

        // Append delete button to the list item
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
    totalTask()
}

// Function to delete todo item
function deleteTodoItem(index) {
    todos.splice(index, 1);
    renderTodoList();
    inputValue.value = '';
    updateLocalStorage(); // Update local storage
}


function totalTask() {
    const task = todos.length;
    pendingTasks.textContent = task;
}


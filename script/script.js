document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task event listener
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value;
        if (taskText) {
            addTask(taskText);
            taskInput.value = ''; // Clear input
        }
    });

    // Task list click event (for edit/delete)
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('delete-btn')) {
            deleteTask(target.parentElement);
        } else if (target.classList.contains('task-item')) {
            editTask(target);
        }
    });

    function addTask(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.classList.add('task-item');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    function deleteTask(task) {
        taskList.removeChild(task);
        saveTasks();
    }

    function editTask(task) {
        const newTaskText = prompt('Edit task:', task.textContent);
        if (newTaskText) {
            task.firstChild.textContent = newTaskText;
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push(task.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});

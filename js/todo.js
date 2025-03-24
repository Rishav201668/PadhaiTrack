// Selecting elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener for adding a task
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Prevent adding empty tasks

    const taskItem = createTaskElement(taskText);

    // Append task to the list
    todoList.appendChild(taskItem);

    // Save task to localStorage
    saveTaskToLocalStorage(taskText);

    // Clear input field
    taskInput.value = '';
}

// Function to create a task element
function createTaskElement(taskText, completed = false) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('todo-item');
    if (completed) taskItem.classList.add('completed');

    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn"><i class="fas fa-check"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;

    // Event listener for completing a task
    taskItem.querySelector('.complete-btn').addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        updateTaskStatus(taskText);
    });

    // Event listener for deleting a task
    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        taskItem.remove();
        removeTaskFromLocalStorage(taskText);
    });

    return taskItem;
}

// Function to save tasks to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        todoList.appendChild(taskItem);
    });
}

// Function to update task status in localStorage
function updateTaskStatus(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove tasks from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

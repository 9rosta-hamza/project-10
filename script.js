document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const task = taskInput.value;
    taskInput.value = "";

    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${task}</span>
        <button onclick="removeTask(this)">Remove</button>
    `;

    taskList.appendChild(listItem);

    saveTaskToLocalStorage(task);
}

function removeTask(button) {
    const taskItem = button.parentNode;
    const taskText = taskItem.querySelector("span").innerText;

    taskItem.remove();

    removeTaskFromLocalStorage(taskText);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;

        taskList.appendChild(listItem);
    });
}
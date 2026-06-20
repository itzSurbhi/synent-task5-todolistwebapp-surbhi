const form = document.querySelector('form');
const allTask = document.querySelector('#allTask');
const input = document.querySelector('input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskObj, index) {
    const parent = document.createElement('div');

    const task = document.createElement('span');
    task.textContent = taskObj.text;

    if (taskObj.done) {
        task.classList.add('done');
    }

    const doneButton = document.createElement('button');
    doneButton.textContent = "Done";

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";

    parent.append(task, doneButton, deleteButton);
    allTask.append(parent);

    doneButton.addEventListener('click', () => {
        tasks[index].done = !tasks[index].done;

        if (tasks[index].done) {
            task.classList.add('done');
        } else {
            task.classList.remove('done');
        }

        saveTasks();
    });

    deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });
}

function renderTasks() {
    allTask.innerHTML = '';

    tasks.forEach((taskObj, index) => {
        createTaskElement(taskObj, index);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (text === '') return;

    tasks.push({
        text: text,
        done: false
    });

    saveTasks();
    renderTasks();

    form.reset();
});

renderTasks();

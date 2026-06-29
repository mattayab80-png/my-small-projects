const cursor = document.querySelector(".cursor");
document.addEventListener('mousemove', (e) =>{
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px'
});

const inputTask = document.getElementById('input-task');
const tasksList = document.getElementById('task-lists');
const taskBtn = document.getElementById('addTask');
const completedTasksList = document.getElementById('task-lists-completed');
const showCompletedBtn = document.getElementById('showCompleted');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Unique ID generator (safe enough for small apps)
function generateId() {
  return Date.now().toString();
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render UI
function renderTasks() {
  tasksList.innerHTML = tasks
    .map(
      (task) => `
      <li class="task-list" data-id="${task.id}">
        
        <span class="check-button">
          ${task.completed ? "✅" : "⬜"}
        </span>

        <span class="list-container ${task.completed ? "done" : ""}">
          ${task.text}
        </span>

        <span class="delete-button">🗑️</span>
      </li>
    `
    )
    .join('');
}

// Add task
function addTask() {
  const text = inputTask.value.trim();

  if (!text) {
    alert("Write something first.");
    return;
  }

  tasks.unshift({
    id: generateId(),
    text,
    completed: false
  });

  inputTask.value = "";
  inputTask.focus();

  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => 
      task.id !== id);

  saveTasks();
  renderTasks();
}

// Toggle task
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
  renderTasks();
}

function showCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  completedTasksList.innerHTML = completedTasks
    .map(
      (task) => `
      <li class="task-list-completed" data-id="${task.id}">
        <span class="list-container ${task.completed ? "done" : ""}">
          ${task.text}
        </span>
      </li>
    `
    )
    .join('');
   
    
   if ( completedTasksList.classList.toggle('active')){
     tasksList.classList.remove('active');
     completedTasksList.classList.add('active');
     showCompletedBtn.textContent = 'Show Tasks';
  }
  else {
    tasksList.classList.add('active');
     completedTasksList.classList.remove('active');
     showCompletedBtn.textContent = 'Show Completed';
   }
   
}
showCompletedBtn.addEventListener('click', showCompletedTasks);

// Events
taskBtn.addEventListener('click', addTask);

inputTask.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// Event delegation (correct + scalable)
tasksList.addEventListener('click', (e) => {
  const li = e.target.closest('.task-list');
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains('delete-button')) {
    deleteTask(id);
  }

  if (e.target.classList.contains('check-button')) {
    toggleTask(id);
  }
});

// Initial render
renderTasks();

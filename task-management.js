// Grab elements
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const filterStatus = document.getElementById('filterStatus');
const filterCategory = document.getElementById('filterCategory');
const sortOption = document.getElementById('sortOption');
const taskCount = document.getElementById('taskCount');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('internbot_tasks')) || [];

// ---------- Add Task ----------
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('taskName').value;
  const category = document.getElementById('taskCategory').value;
  const priority = document.getElementById('taskPriority').value;
  const deadline = document.getElementById('taskDeadline').value;

  tasks.push({ id: Date.now(), name, category, priority, deadline, done: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

// ---------- Filters & Sorting ----------
[filterStatus, filterCategory, sortOption].forEach(el => el.addEventListener('change', renderTasks));

// ---------- Task Actions ----------
taskList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.closest('.done-btn')) {
    const task = tasks.find(t => t.id === id);
    task.done = !task.done;
  }

  if (e.target.closest('.delete-btn')) {
    tasks = tasks.filter(t => t.id !== id);
  }

  saveTasks();
  renderTasks();
});

// ---------- Save ----------
function saveTasks() {
  localStorage.setItem('internbot_tasks', JSON.stringify(tasks));
}

// ---------- Render ----------
function renderTasks() {
  let filtered = [...tasks];

  if(filterStatus.value === 'active') filtered = filtered.filter(t => !t.done);
  if(filterStatus.value === 'done') filtered = filtered.filter(t => t.done);
  if(filterCategory.value !== 'all') filtered = filtered.filter(t => t.category === filterCategory.value);

  if(sortOption.value === 'priority') {
    const order = { high: 1, medium: 2, low: 3 };
    filtered.sort((a,b) => order[a.priority]-order[b.priority]);
  } else if(sortOption.value === 'deadline') {
    filtered.sort((a,b) => new Date(a.deadline)-new Date(b.deadline));
  }

  taskList.innerHTML = '';
  const today = new Date().toDateString();

  filtered.forEach(task => {
    const overdue = new Date(task.deadline) < new Date() && !task.done;
    const dueToday = new Date(task.deadline).toDateString() === today && !task.done;

    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = `flex justify-between items-center p-3 rounded-lg shadow hover:shadow-lg bg-white`;

    li.innerHTML = `
      <div>
        <span class="px-2 py-1 rounded text-white text-xs font-bold ${task.priority==='high'?'bg-red-500':task.priority==='medium'?'bg-orange-500':'bg-green-500'}">${task.priority.toUpperCase()}</span>
        <span class="ml-2 font-semibold ${task.done?'line-through text-gray-400':''}">${task.name}</span>
        <small class="text-gray-500 ml-2">${task.deadline}</small>
        ${overdue?'<span class="text-red-600 font-bold ml-2">(Overdue)</span>':''}
        ${dueToday&&!overdue?'<span class="text-orange-600 font-bold ml-2">(Due Today)</span>':''}
      </div>
      <div class="flex gap-2">
        <button class="done-btn text-green-500 hover:text-green-700 px-2 py-1 rounded">
          <i class="fas ${task.done?'fa-undo':'fa-check'}"></i>
        </button>
        <button class="delete-btn text-red-500 hover:text-red-700 px-2 py-1 rounded">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    taskList.appendChild(li);
  });

  taskCount.textContent = `Completed: ${tasks.filter(t=>t.done).length} / ${tasks.length}`;
}

// ---------- Initial render ----------
renderTasks();

const consumableList = document.getElementById('consumableList');
const consumableForm = document.getElementById('consumableForm');
const filterCategory = document.getElementById('filterCategory');
const sortOption = document.getElementById('sortOption');
const consumableCount = document.getElementById('consumableCount');

// Load stored items
let consumables = JSON.parse(localStorage.getItem('internbot_consumables')) || [];

// ---------- Add Item ----------
consumableForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('consumableName').value;
  const category = document.getElementById('consumableCategory').value;
  const quantity = Number(document.getElementById('consumableQuantity').value);

  consumables.push({ id: Date.now(), name, category, quantity });
  saveConsumables();
  renderConsumables();
  consumableForm.reset();
});

// ---------- Filters & Sorting ----------
[filterCategory, sortOption].forEach(el => el.addEventListener('change', renderConsumables));

// ---------- Real-time Sensor Simulation ----------
setInterval(() => {
  // Simulate stock changes from sensors
  consumables.forEach(item => {
    const change = Math.floor(Math.random()*3) - 1; // -1,0,+1
    item.quantity = Math.max(0, item.quantity + change);
  });
  renderConsumables();
  saveConsumables();
}, 5000); // every 5 seconds

// ---------- Save ----------
function saveConsumables() {
  localStorage.setItem('internbot_consumables', JSON.stringify(consumables));
}

// ---------- Render ----------
function renderConsumables() {
  let filtered = [...consumables];

  if(filterCategory.value !== 'all') filtered = filtered.filter(c => c.category === filterCategory.value);

  if(sortOption.value === 'quantity') filtered.sort((a,b)=>b.quantity-a.quantity);
  if(sortOption.value === 'name') filtered.sort((a,b)=>a.name.localeCompare(b.name));

  consumableList.innerHTML = '';

  filtered.forEach(item => {
    const li = document.createElement('li');
    li.dataset.id = item.id;
    li.className = "flex justify-between items-center p-3 rounded-lg shadow hover:shadow-lg bg-white";

    li.innerHTML = `
      <div>
        <span class="font-semibold">${item.name}</span>
        <small class="text-gray-500 ml-2">[${item.category}]</small>
        <span class="ml-2 text-gray-700">Qty: ${item.quantity}</span>
      </div>
      <div class="flex gap-2">
        <button class="delete-btn text-red-500 hover:text-red-700 px-2 py-1 rounded">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    consumableList.appendChild(li);
  });

  consumableCount.textContent = `Total Items: ${consumables.length}`;
}

// ---------- Delete Item ----------
consumableList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if(!li) return;
  const id = Number(li.dataset.id);

  if(e.target.closest('.delete-btn')){
    consumables = consumables.filter(c => c.id !== id);
    saveConsumables();
    renderConsumables();
  }
});

// Initial render
renderConsumables();

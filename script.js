const dropdownBtn = document.getElementById('dropdownBtn');
const physicalGrid = document.getElementById('physicalGrid');

dropdownBtn.addEventListener('click', () => {
  const isHidden = physicalGrid.style.display === 'none' || physicalGrid.style.display === '';
  physicalGrid.style.display = isHidden ? 'grid' : 'none';
  dropdownBtn.textContent = isHidden
    ? 'Hide Physical Robot Features ⬆'
    : 'Premium Physical Robot Features ⬇';
});

// ==================== Modal Feature System ==================== //
const tiles = document.querySelectorAll('.tile');
const modal = document.getElementById('featureModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('closeModal');

// Define feature content
const featureDetails = {
  "Personalized Task Management": "A smart task manager that adapts to your work style, priorities, and daily patterns.",
  "Priority-Based Scheduling": "Automatically sorts and schedules tasks based on deadlines and importance.",
  "Consumable Tracking": "Tracks inventory and consumable levels in real-time.",
  "Automatic Reordering": "Automatically places orders when consumables run low.",
  "Real-Time Item Location": "Displays real-time location of office resources on the dashboard.",
  "Robot Task Queue": "Shows and manages the robot's task queue for physical actions.",
  "Supply Delivery Automation": "Automates internal deliveries via the robot.",
  "AI-Assisted Interface": "Intuitive interface that uses AI to speed up operations."
};

// Open modal with the correct content
tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const featureName = tile.querySelector('span').textContent;
    modalTitle.textContent = featureName;
    modalDescription.textContent = featureDetails[featureName] || "Feature details coming soon.";
    modal.style.display = 'block';
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the box
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
const userType = "digital"; // "digital" or "full"

const proTiles = document.querySelectorAll('#physicalGrid .tile');
proTiles.forEach(tile => {
  if(userType === "digital") {
    tile.addEventListener('click', () => {
      alert("This feature is only available in the full Social-InternBot version.");
    });
    tile.style.cursor = "not-allowed";
    tile.style.opacity = "0.6";
  }
});


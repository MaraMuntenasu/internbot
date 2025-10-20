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
  if (userType === "digital") {
    tile.addEventListener('click', () => {
      alert("This feature is only available in the full Social-InternBot version.");
    });
    tile.style.cursor = "not-allowed";
    tile.style.opacity = "0.6";
  }
});


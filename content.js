let epicValues = [];
let currentIndex = 0;
let intervalId;

function highlightEpicElements() {
  const epicElements = document.querySelectorAll('[data-epic]');
  epicValues = [...new Set(Array.from(epicElements).map(el => el.dataset.epic))];

  createControlPanel();
  updateStats();
  animateCurrentEpic();

  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % epicValues.length;
    animateCurrentEpic();
  }, 3000);
}

function animateCurrentEpic() {
  document.querySelectorAll('.epic-highlight').forEach(el => el.remove());
  const currentValue = epicValues[currentIndex];
  const elements = document.querySelectorAll(`[data-epic="${currentValue}"]`);
  elements.forEach(el => {
    const highlightDiv = document.createElement('div');
    highlightDiv.className = 'epic-highlight active';
    el.appendChild(highlightDiv);
  });
  updateStats();
}

function createControlPanel() {
  const panel = document.createElement('div');
  panel.id = 'epic-control-panel';
  panel.innerHTML = `
    <button id="epic-prev">Previous</button>
    <button id="epic-next">Next</button>
    <div id="epic-stats"></div>
  `;
  document.body.appendChild(panel);

  document.getElementById('epic-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + epicValues.length) % epicValues.length;
    animateCurrentEpic();
    resetInterval();
  });

  document.getElementById('epic-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % epicValues.length;
    animateCurrentEpic();
    resetInterval();
  });
}

function updateStats() {
  const statsDiv = document.getElementById('epic-stats');
  statsDiv.textContent = `${currentIndex + 1}/${epicValues.length} epic values`;
}

function resetInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % epicValues.length;
    animateCurrentEpic();
  }, 3000);
}

highlightEpicElements();
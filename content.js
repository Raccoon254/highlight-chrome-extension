// content.js
function highlightEpicElements() {
  const epicElements = document.querySelectorAll('[data-epic]');
  const uniqueEpicValues = new Set();

  epicElements.forEach(el => uniqueEpicValues.add(el.dataset.epic));

  uniqueEpicValues.forEach((value, index) => {
    const elements = document.querySelectorAll(`[data-epic="${value}"]`);
    elements.forEach(el => {
      const highlightDiv = document.createElement('div');
      highlightDiv.className = 'epic-highlight';
      highlightDiv.style.setProperty('--highlight-color', `hsl(${index * 137.5 % 360}, 50%, 50%)`);
      el.appendChild(highlightDiv);
    });
  });
}

highlightEpicElements();
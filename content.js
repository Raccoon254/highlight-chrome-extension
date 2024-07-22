let currentIndex = 0;
let epicGroups = [];
let autoMode = false;
let autoInterval;

// Function to highlight elements with the same data-epic value
function highlightEpicElements() {
  const elements = document.querySelectorAll('[data-epic]');
  const groupedElements = {};

  elements.forEach(el => {
    const epicValue = el.getAttribute('data-epic');
    if (!groupedElements[epicValue]) {
      groupedElements[epicValue] = [];
    }
    groupedElements[epicValue].push(el);
  });

  epicGroups = Object.values(groupedElements).sort((a, b) => a[0].getAttribute('data-epic') - b[0].getAttribute('data-epic'));
}

function highlightCurrentGroup() {
  epicGroups.forEach((group, index) => {
    group.forEach(el => {
      if (index === currentIndex) {
        el.classList.add('epic-highlight');

        const beforeElement = el.querySelector('::before');
        // Dynamically set and adjust border radius
        const borderRadius = parseInt(window.getComputedStyle(el).borderRadius.replace('px', ''));
        const newBorderRadius = borderRadius + 2 === 2 ? 0 : borderRadius + 2;
        el.style.setProperty('--highlight-border-radius', `${newBorderRadius}px`);
      } else {
        el.classList.remove('epic-highlight');
      }
    });
  });
}

function nextHighlight() {
  currentIndex = (currentIndex + 1) % epicGroups.length;
  highlightCurrentGroup();
}

function prevHighlight() {
  currentIndex = (currentIndex - 1 + epicGroups.length) % epicGroups.length;
  highlightCurrentGroup();
}

function toggleAutoMode() {
  autoMode = !autoMode;
  if (autoMode) {
    autoInterval = setInterval(nextHighlight, 3000);
  } else {
    clearInterval(autoInterval);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'N' || event.key === 'n') {
    nextHighlight();
  } else if (event.key === 'P' || event.key === 'p') {
    prevHighlight();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'next') {
    nextHighlight();
  } else if (message.action === 'prev') {
    prevHighlight();
  } else if (message.action === 'toggleAuto') {
    toggleAutoMode();
  }
});

// Initial highlight setup
highlightEpicElements();
highlightCurrentGroup();
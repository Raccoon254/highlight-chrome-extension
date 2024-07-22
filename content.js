let currentIndex = 0;
let epicGroups = [];

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
  }
});

// Initial highlight setup
highlightEpicElements();
highlightCurrentGroup();
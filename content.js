// Function to highlight elements with the same data-epic value
function highlightEpicElements() {
  // Get all elements with the data-epic attribute
  const elements = document.querySelectorAll('[data-epic]');
  
  // Create a map to group elements by their data-epic value
  const epicGroups = {};

  elements.forEach(el => {
    const epicValue = el.getAttribute('data-epic');
    if (!epicGroups[epicValue]) {
      epicGroups[epicValue] = [];
    }
    epicGroups[epicValue].push(el);
  });

  // Get all unique data-epic values sorted numerically or alphabetically
  const epicValues = Object.keys(epicGroups).sort((a, b) => a - b);

  // Function to highlight elements in sequence
  function highlightNext(index) {
    if (index >= epicValues.length) return;

    const epicValue = epicValues[index];
    const group = epicGroups[epicValue];

    // Add highlight class to each element in the group
    group.forEach(el => {
      el.classList.add('epic-highlight');
    });

    // Remove highlight after 3 seconds
    setTimeout(() => {
      group.forEach(el => {
        el.classList.remove('epic-highlight');
      });
      // Move to the next group
      highlightNext(index + 1);
    }, 3000);
  }

  // Start highlighting from the first group
  highlightNext(0);
}

// Run the highlight function
highlightEpicElements();
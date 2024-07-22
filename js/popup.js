document.getElementById('prev-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'prev' });
});

document.getElementById('next-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'next' });
});

document.getElementById('auto-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'toggleAuto' });
});
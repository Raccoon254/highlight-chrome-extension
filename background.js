chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'next' || message.action === 'prev') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
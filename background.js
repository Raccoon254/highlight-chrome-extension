chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'next' || message.action === 'prev' || message.action === 'toggleAuto') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message to content script:', chrome.runtime.lastError);
          } else {
            sendResponse(response);
          }
        });
      } else {
        console.error('No active tabs found.');
      }
    });
    return true; // Indicate that the response will be sent asynchronously
  }
});
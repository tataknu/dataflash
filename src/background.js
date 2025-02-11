chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Inject the content script if it hasn't been injected yet
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['dist/main.bundle.js']
    });
    
    // Send message to activate the extension
    chrome.tabs.sendMessage(tab.id, { action: "activate_extension" });
  } catch (error) {
    console.error('Failed to execute content script:', error);
  }
}); 
// event to run execute.js content when extension's button is clicked
chrome.action.onClicked.addListener(execScript);

// update the icon to gray when not supported on current site
chrome.tabs.onActivated.addListener(updateIcon);
chrome.tabs.onUpdated.addListener(updateIcon);

chrome.runtime.onMessage.addListener(function(message) {
  if (message.type === 'showNotification') {    
    showNotification();
  }
});

// function to update the extension icon
function setIcon(color) {
  iconPath = {
    "16": "assets/jirul_16" + (color ? "_" + color : "") +  ".png",
    "24": "assets/jirul_32" + (color ? "_" + color : "") + ".png",
    "32": "assets/jirul_48" + (color ? "_" + color : "") + ".png",
    "128": "assets/jirul_128" + (color ? "_" + color : "") + ".png"
  };
  chrome.action.setIcon({path: iconPath});
}

async function updateIcon() {
  const tabId = await getTabId();
  const currentUrl = await getCurrentUrl(tabId);

  if (currentUrl.includes("aderant.atlassian.net")) {
    setIcon()
  } else {
    setIcon("gray")
  }
}

async function execScript() {
  const tabId = await getTabId();
  const currentUrl = await getCurrentUrl(tabId);

  if (currentUrl.includes("aderant.atlassian.net")) {
    setIcon()
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      files: ['execute.js']
    });
  } else {
    console.log("Extension is not supported on this site.");
    setIcon("gray")
  }
}

async function getCurrentUrl(tabId) {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  return (tabs.length > 0) ? tabs[0].url : null;
}

async function getTabId() {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  return (tabs.length > 0) ? tabs[0].id : null;
}

function showNotification() {
  try {
    console.log('Received notification')
    var opt = {
      type: 'basic',
      title: 'jirul',
      message: 'Please switch to the active tab to use this feature.',      
      iconUrl: '/assets/jirul_128.png',
      requireInteraction: true
    };

    chrome.notifications.create('notify1', opt, function (id) { 
      console.log("Last error:", chrome.runtime.lastError); }
    );
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}



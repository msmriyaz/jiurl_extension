function sendNotification() {
  chrome.runtime.sendMessage({type: 'showNotification'});
  console.log('Sent notification');
}

(function () {
  var currentUrl = window.location.href;
  var simplifiedUrl = currentUrl.toLowerCase();

  if (simplifiedUrl.indexOf("/jira/software/c/projects/appops/issues/") !== -1) {
    simplifiedUrl = simplifiedUrl.replace("/jira/software/c/projects/appops/issues/", "/browse/");
  } else if (simplifiedUrl.indexOf("/jira/servicedesk/projects/cloud/queues/custom/77/") !== -1) {
    simplifiedUrl = simplifiedUrl.replace("/jira/servicedesk/projects/cloud/queues/custom/77/", "/browse/");
  }

  if (simplifiedUrl.indexOf("?filter=myopenissues") !== -1) {
    simplifiedUrl = simplifiedUrl.replace('?filter=myopenissues', '');
  }

  if (document.hasFocus()) {
    navigator.clipboard.writeText(simplifiedUrl)
      .then(function () {
        console.log('Copied url to clipboard: ' + simplifiedUrl);
      })
      .catch(function (err) {
        console.error('Failed to write to clipboard:', err);
      });
  } else {
    // Display a notification to prompt the user to switch to the active tab
    sendNotification();
  }
})();
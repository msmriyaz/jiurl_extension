(function () {
  var currentUrl = window.location.href;  
  currentUrl = currentUrl.replace("/jira/software/c/projects/APPOPS/issues/", "/browse/");
  currentUrl = currentUrl.replace("/jira/servicedesk/projects/CLOUD/queues/custom/77/", "/browse/");
  simplifiedUrl = currentUrl.replace('?filter=myopenissues', '');
  navigator.clipboard.writeText(simplifiedUrl);
  console.log('Copied url to clipboard: ' + simplifiedUrl);
})();
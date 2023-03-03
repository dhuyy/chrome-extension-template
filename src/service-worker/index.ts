chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.getPlatformInfo(platformInfo => {
    chrome.storage.local.set({ currentOS: platformInfo.os }).catch(error => {
      console.error(error);
    });
  });
});

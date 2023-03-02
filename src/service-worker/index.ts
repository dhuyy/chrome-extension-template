chrome.runtime.onInstalled.addListener(async () => {
  chrome.runtime.getPlatformInfo(platformInfo => {
    chrome.storage.local.set({ currentOS: platformInfo.os }).then(() => {
      console.log('Info about the current OS has been saved.');
    });
  });
});

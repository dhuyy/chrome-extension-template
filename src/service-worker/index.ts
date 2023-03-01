chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF',
  });
});

chrome.action.onClicked.addListener(async ({ id: tabId }) => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  if (nextState === 'ON') {
    chrome.tabs.sendMessage(tabId, { shouldRenderBar: true });
  } else if (nextState === 'OFF') {
    chrome.tabs.sendMessage(tabId, { shouldRenderBar: false });
  }

  await chrome.action.setBadgeText({
    tabId,
    text: nextState,
  });
});

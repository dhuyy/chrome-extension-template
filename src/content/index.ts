import { prependBarElement, toggleBarVisibility } from './scripts/bar';
import { MessageSender } from '../enums';

interface OnMessageParams {
  sender: MessageSender;
}

prependBarElement();

chrome.runtime.onMessage.addListener(({ sender }: OnMessageParams) => {
  switch (sender) {
    case MessageSender.Popup:
      toggleBarVisibility();
      break;
    default:
      // https://stackoverflow.com/a/56483156
      return true;
  }
});

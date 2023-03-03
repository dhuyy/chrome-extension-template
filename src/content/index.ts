import { prependBarElement, setBarVisibility } from './scripts/bar';
import { MessageSender } from '../enums';
import type { ChromeRuntimeMessage } from './types';

prependBarElement();

chrome.runtime.onMessage.addListener(
  ({ barVisibility, sender }: ChromeRuntimeMessage) => {
    switch (sender) {
      case MessageSender.Popup:
        barVisibility
          ? setBarVisibility({ display: 'flex' })
          : setBarVisibility({ display: 'none' });
        break;
      default:
        // https://stackoverflow.com/a/56483156
        return true;
    }
  }
);

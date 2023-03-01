import { prependBarElement, setBarVisibility } from './scripts/dom';
import type { OnMessageListenerParams } from './types';

prependBarElement();

chrome.runtime.onMessage.addListener(
  ({ shouldRenderBar }: OnMessageListenerParams) =>
    shouldRenderBar
      ? setBarVisibility({ display: 'flex' })
      : setBarVisibility({ display: 'none' })
);

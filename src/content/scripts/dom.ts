import type { SetBarVisibilityParams } from '../types';

const appendStyles = (document: Document) => {
  const style = document.createElement('style');

  style.innerHTML = `
      .bar {
        display: none;
        width: 100%;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        line-height: 20px;
        padding: 6px 0;
        background-color: #2f3133;
      }
    `;

  document.head.appendChild(style);
};

export const prependBarElement = () => {
  const body = document.querySelector('body');

  if (body) {
    appendStyles(document);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.textContent =
      'This bar was added by the content script at the request of the service worker';

    body.prepend(bar);
  }
};

export const setBarVisibility = ({ display }: SetBarVisibilityParams) => {
  const bar = document.querySelector('.bar') as HTMLDivElement;

  bar.style.display = display;
};

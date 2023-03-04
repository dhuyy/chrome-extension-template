import React from 'react';
import { chrome } from 'jest-chrome';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fnWithCallbackMock } from '../../../__tests__/utils';
import { MessageSender } from '../../enums';

import Popup from './Popup';

describe('Popup component', () => {
  const tabs = [
    { id: 238213812, title: 'Google' },
    { id: 410310015, title: 'Microsoft Store' },
  ] as chrome.tabs.Tab[];

  const renderComponent = () => render(<Popup />);

  beforeEach(() => {
    chrome.tabs.query.mockImplementation(fnWithCallbackMock(tabs));
    chrome.tabs.sendMessage.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retrieves currentOS from storage and renders it when component is mounted', async () => {
    const currentOS = 'mac';
    chrome.storage.local.get.mockImplementation(() =>
      Promise.resolve({ currentOS })
    );

    expect(screen.queryByText(currentOS)).toBeNull();

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(currentOS)).toBeInTheDocument();
    });
  });

  it.each`
    hasOptionsPageBeenOpened | text
    ${true}                  | ${'The options page HAS BEEN opened since it was installed.'}
    ${false}                 | ${'The options page HAS NOT BEEN opened since it was installed.'}
  `(
    'renders $text when hasOptionsPageBeenOpened is $hasOptionsPageBeenOpened',
    async ({ hasOptionsPageBeenOpened, text }) => {
      chrome.storage.local.get.mockImplementation(() =>
        Promise.resolve({ hasOptionsPageBeenOpened })
      );

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(text)).toHaveTextContent(text);
      });
    }
  );

  it('renders bar when button to toggle bar visibility is clicked', async () => {
    renderComponent();

    const button = screen.getByRole('button', {
      name: 'Toggle Bar Visibility',
    });
    await userEvent.click(button);

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      {
        active: true,
        currentWindow: true,
      },
      expect.any(Function)
    );
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(238213812, {
      sender: MessageSender.Popup,
    });
  });
});
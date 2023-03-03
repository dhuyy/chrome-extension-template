import type { MessageSender } from '../enums';

export interface ChromeRuntimeMessage {
  barVisibility: boolean;
  sender: MessageSender;
}

export interface SetBarVisibilityParams {
  display: 'flex' | 'none';
}

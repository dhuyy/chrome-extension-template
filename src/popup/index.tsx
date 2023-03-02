import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './components/Popup';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Popup />
  </StrictMode>
);

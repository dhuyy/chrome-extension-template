import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './components/Popup';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Popup type="popup" />
  </StrictMode>
);

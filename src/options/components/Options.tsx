import React, { useEffect } from 'react';

import './Options.css';

const Options = () => {
  useEffect(() => {
    (async () => {
      await chrome?.storage?.local.set({ hasOptionsPageBeenOpened: true });
    })()
  }, []);

  return (
    <div className="container">
      <h2>This is the options page.</h2>
    </div>
  );
};

export default Options;

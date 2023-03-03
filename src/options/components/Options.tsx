import React, { useEffect } from 'react';

import './Options.css';

const Options = (): JSX.Element => {
  useEffect(() => {
    chrome?.storage?.local
      .set({ hasOptionsPageBeenOpened: true })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h2>This is the options page.</h2>
    </div>
  );
};

export default Options;

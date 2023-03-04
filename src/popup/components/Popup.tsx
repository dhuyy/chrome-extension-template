import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { MessageSender } from '../../enums';
import logo from '../../assets/images/logo.png';

import './Popup.css';

const Popup = (): JSX.Element => {
  const [os, setOS] = useState('');
  const [hasOptionsPageBeenOpened, setHasOptionsPageBeenOpened] =
    useState(false);

  useEffect(() => {
    chrome?.storage?.local
      .get(['currentOS', 'hasOptionsPageBeenOpened'])
      .then(({ currentOS, hasOptionsPageBeenOpened }) => {
        setOS(currentOS);
        setHasOptionsPageBeenOpened(!!(hasOptionsPageBeenOpened as boolean));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleToggleBarClick = (): void => {
    chrome?.tabs?.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        const tabId = tabs[0].id ?? 0;

        chrome?.tabs
          ?.sendMessage(tabId, {
            sender: MessageSender.Popup,
          })
          .catch(error => {
            console.error(error);
          });
      }
    );
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <Button variant="contained" onClick={handleToggleBarClick}>
        Toggle Bar Visibility
      </Button>
      {os !== '' && (
        <>
          <p className="small">Current OS:</p>
          <p className="small os">
            <b>{os}</b>
          </p>
        </>
      )}
      {hasOptionsPageBeenOpened ? (
        <p className="small">
          The options page HAS BEEN opened since it was installed.
        </p>
      ) : (
        <p className="small">
          The options page HAS NOT BEEN opened since it was installed.
        </p>
      )}
    </div>
  );
};

export default Popup;

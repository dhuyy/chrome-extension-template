import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { MessageSender } from '../../enums';
import logo from '../../commmon/images/logo.png';

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
      <Button variant="contained" size="small" onClick={handleToggleBarClick}>
        Toggle Bar
      </Button>
      {os !== '' && (
        <>
          <p className="small">
            <b>Current OS: </b>
            {os}
          </p>
        </>
      )}
      {hasOptionsPageBeenOpened ? (
        <p className="small">
          <b>Options page:</b> HAS ALREADY BEEN OPENED
        </p>
      ) : (
        <p className="small">
          <b>Options page:</b> HAS NOT BEEN OPENED
        </p>
      )}
    </div>
  );
};

export default Popup;

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { MessageSender } from '../../enums';
import logo from '../../assets/images/logo.png';

import './Popup.css';

const Popup = (): JSX.Element => {
  const [barVisibility, setBarVisibility] = useState(false);
  const [os, setOS] = useState('');
  const [hasOptionsPageBeenOpened, setHasOptionsPageBeenOpened] =
    useState(false);

  useEffect(() => {
    chrome?.tabs?.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        const [tab] = tabs;
        const tabId = tab.id ?? 0;

        chrome?.tabs
          ?.sendMessage(tabId, {
            barVisibility,
            sender: MessageSender.Popup,
          })
          .catch(error => {
            console.error(error);
          });
      }
    );

    chrome?.storage?.local
      .get('currentOS')
      .then(({ currentOS }) => {
        setOS(currentOS);
      })
      .catch(error => {
        console.error(error);
      });

    chrome?.storage?.local
      .get('hasOptionsPageBeenOpened')
      .then(result => {
        setHasOptionsPageBeenOpened(
          !!(result.hasOptionsPageBeenOpened as boolean)
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, [barVisibility]);

  const handleToggleBarClick = (): void => {
    setBarVisibility(!barVisibility);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <Button variant="contained" onClick={handleToggleBarClick}>
        Toggle Bar Visibility
      </Button>
      {barVisibility && (
        <>
          <p className="small">OS used to render the bar:</p>
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

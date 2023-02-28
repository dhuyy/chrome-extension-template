import React from 'react';

interface PopupProps {
  type: string;
}

const Popup = ({ type }: PopupProps) => <h1>Hello from the {type} page!</h1>;

export default Popup;

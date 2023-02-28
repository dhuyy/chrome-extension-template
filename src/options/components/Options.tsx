import React from 'react';

interface OptionsProps {
  type: string;
}

const Options = ({ type }: OptionsProps) => <h1>Hello from the {type} page!</h1>;

export default Options;

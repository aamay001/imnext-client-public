import React from 'react';
import logo from '../assets/logoWhite.svg';

export default function Logo(){
  return (
    <div id="logo">
      <img src={logo}
        alt="imNext logo."
        width="200px"
      />
    </div>
  );
}
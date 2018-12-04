import React from 'react';
import Tilt from 'react-tilt';

import logo from './Logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max: 50 }}>
        <div className="Tilt-inner">
          <img src={logo} alt="Your Face or Mine" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

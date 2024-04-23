import React from 'react';
import './Moon.css';
import moonImage from './assets/images/moon_15.png';

const Moon = () => {
  
    return (
        <div className="moon">
            <img src={moonImage} alt="moon" />
        </div>
    );
}

export default Moon;
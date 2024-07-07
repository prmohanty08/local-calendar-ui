import React from 'react';
import './LocationDisplay.css';

const LocationDisplay = ({ location, prefix, suffix }) => {
    return (
        <div className="location-container">
            {prefix && <span className="prefix">{prefix}</span>}
            <span className="location-text">{location}</span>
            {suffix && <span className="suffix">{suffix}</span>}
        </div>
    );
}

export default LocationDisplay;
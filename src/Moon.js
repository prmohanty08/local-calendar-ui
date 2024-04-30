import React from 'react';
import './Moon.css';

const Moon = ({ day }) => {
    const moonPhases = [
        { phase: 'new-moon', start: 1, end: 2 },
        { phase: 'waxing-crescent', start: 3, end: 6 },
        { phase: 'first-quarter', start: 7, end: 9 },
        { phase: 'waxing-gibbous', start: 10, end: 14 },
        { phase: 'full-moon', start: 15, end: 18 },
        { phase: 'waning-gibbous', start: 19, end: 23 },
        { phase: 'last-quarter', start: 24, end: 26 },
        { phase: 'waning-crescent', start: 27, end: 29 },
        { phase: 'new-moon', start: 30, end: 30 }
    ];

    const getMoonPhase = (day) => {
        const moonPhase = moonPhases.find((phase) => day >= phase.start && day <= phase.end);
        return moonPhase ? moonPhase.phase : '';
    };

    const phase = getMoonPhase(day);

    return (
        <div className={`moon ${phase}`}>
            <div className="light" />
            <div className="shadow" />
        </div>
    );
};

export default Moon;
import React from 'react';
import './DateDisplay.css';

const DateDisplay = ({ weekDayText, dateText, monthText, yearText }) => {
    return (
        <div className="date-container">
            <span className='the-weekday'>{weekDayText}</span><br />
            <span className='the-date'>{dateText}</span>&nbsp;
            <span className='the-month'>{monthText}</span>&nbsp;
            <span className='the-year'>{yearText}</span>
        </div>
    );
}

export default DateDisplay;
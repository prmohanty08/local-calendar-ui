import React, { useContext } from 'react';
import './OccasionDisplay.css';

import { getWeekdayLabel } from './CalendarMasterData.js';
import { useCalendarDateTime } from './DateTimeContext.js';
import { NumberMapContext } from './NumberMapContext.js';
import { MonthWiseDataContext } from './MonthwiseDataProvider.js';

import DateDisplay from './DateDisplay.js';
import Moon from './Moon.js';

const OccasionDisplay = () => {
  const { serverDateTime } = useCalendarDateTime();
  const { currentMonthData } = useContext(MonthWiseDataContext);
  const { convertToOdia } = useContext(NumberMapContext);
  if (serverDateTime && serverDateTime.day) {
    let tithi, naxatra = '';
    let lunarDay = 0;
    let specialMention = null;
    const day = serverDateTime.day;
    if (currentMonthData && currentMonthData.occasions && currentMonthData.occasions[day - 1]) {
      const theOccasion = currentMonthData.occasions[day - 1];
      tithi = theOccasion.tithi;
      naxatra = theOccasion.naxatra;
      lunarDay = theOccasion.lunarDay;
      specialMention = theOccasion.specialMention;
    }
    return (
      <div className="occasion-container">
        <div className="texts-container">
          <p className='the-label'>ଆଜି</p>
          <p className='the-special-mention'>{specialMention ? specialMention : ''}</p>
          <div className='tithi-container'>
            <div className='the-tithi'>
              <DateDisplay weekDayText={getWeekdayLabel(serverDateTime.weekday - 1, 'OR')}
                dateText={convertToOdia(day)}
                monthText={currentMonthData ? currentMonthData.description : ''}
                yearText={currentMonthData ? convertToOdia(serverDateTime.year) : ''} />
              <p className='the-occasion'>{tithi}</p>
            </div>
            <div>
              <Moon day={lunarDay} className="moonIcon" />
            </div>
          </div>
          <p className='the-occasion'>{naxatra}</p>
        </div>
      </div>
    );
  }
}

export default OccasionDisplay;
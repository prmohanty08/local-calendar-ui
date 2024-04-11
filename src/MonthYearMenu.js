import React, { useContext } from 'react';
import Arrow from './assets/icons/right-arrow.svg';

import { NumberMapContext } from './NumberMapContext';

import { MonthWiseDataContext } from './MonthwiseDataProvider';

import { monthNames } from './CalendarMasterData.js'

const MonthYearMenu = ({ year, month }) => {
  const { convertToOdia } = useContext(NumberMapContext);
  const { monthData } = useContext(MonthWiseDataContext);

  return (
    <div className="calendar-menu">
      <button className="arrow">
        <img src={Arrow} className="flip-horizontal" alt="previous" />
      </button>
      <div>{monthData?.description} {convertToOdia(year)}</div>
      <button className="arrow">
        <img src={Arrow} alt="next" />
      </button>
    </div>
  );
}

export default MonthYearMenu;
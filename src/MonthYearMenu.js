import React, { useContext, useEffect } from 'react';
import Arrow from './assets/icons/right-arrow.svg';

import { NumberMapContext } from './NumberMapContext';
import { getMonthLabel, pageTitle } from './CalendarMasterData.js'

import { MonthWiseDataContext } from './MonthwiseDataProvider';

import { useSelectedDateTime } from './DateTimeContext';

const MonthYearMenu = ({ year, month }) => {
  const { convertToOdia } = useContext(NumberMapContext);
  const { monthData } = useContext(MonthWiseDataContext);
  const { updateMonth } = useSelectedDateTime();

  const theMonthLabel = monthData ? monthData.description : getMonthLabel(month - 1, 'OR');
  const theYearLabel = convertToOdia(year);

  useEffect(() => {
    if (theMonthLabel) {
      document.title = pageTitle + ' - ' + theMonthLabel + ' ' + theYearLabel;
    }
  }, [theMonthLabel]);

  return (
    <div className="calendar-menu">
      <button className="arrow" onClick={() => updateMonth(-1)}>
        <img src={Arrow} className="flip-horizontal" alt="previous" />
      </button>
      <div>{theMonthLabel} {theYearLabel}</div>
      <button className="arrow" onClick={() => updateMonth(1)}>
        <img src={Arrow} alt="next" />
      </button>
    </div>
  );
}

export default MonthYearMenu;
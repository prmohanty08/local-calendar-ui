import React, { useContext } from 'react';
import './SelectedDateView.css';

import { NumberMapContext } from './NumberMapContext';
import { MonthWiseDataContext } from './MonthwiseDataProvider';

import { getWeekdayLabel } from './CalendarMasterData.js'

import { useSelectedDateTime } from './DateTimeContext';

const SelectedDateView = () => {
    const selectedDateTime = useSelectedDateTime();
    const { convertToOdia } = useContext(NumberMapContext);
    const { monthData } = useContext(MonthWiseDataContext);
    if (selectedDateTime) {
        return (
            <div className="column dark-pink-red center-aligned-content">
                <p>ଓଡି଼ଶାରେ ଆଜି</p>
                <p className='the-day'>{getWeekdayLabel(selectedDateTime.weekday - 1, 'OR')}</p>
                <p className='the-date'>{convertToOdia(selectedDateTime.day)}</p>
                <p className='the-occasion'>
                    {monthData
                        ? monthData.occasions[selectedDateTime.day - 1].tithi
                        + ' • ' + monthData.occasions[selectedDateTime.day - 1].naxatra
                        : ''
                    }
                </p>
            </div>
        );
    }
}

export default SelectedDateView;
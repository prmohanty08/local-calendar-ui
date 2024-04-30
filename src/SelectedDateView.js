import React, { useContext } from 'react';
import './SelectedDateView.css';

import { NumberMapContext } from './NumberMapContext';
import { MonthWiseDataContext } from './MonthwiseDataProvider';

import { getWeekdayLabel } from './CalendarMasterData.js'

import { useSelectedDateTime } from './DateTimeContext';
import Moon from './Moon.js';
import VerticalBanner from './VerticalBanner.js';

const SelectedDateView = () => {
    const { selectedDate } = useSelectedDateTime();
    const { convertToOdia } = useContext(NumberMapContext);
    const { monthData } = useContext(MonthWiseDataContext);
    if (selectedDate && selectedDate.date) {
        let tithi, naxatra = '';
        let lunarDay = 0;
        if (monthData && monthData.occasions) {
            tithi = monthData.occasions[selectedDate.date - 1]?.tithi;
            naxatra = monthData.occasions[selectedDate.date - 1]?.naxatra;
            lunarDay = monthData.occasions[selectedDate.date - 1]?.lunarDay;
        }

        return (
            <div className="column dark-pink-red center-aligned-content selected-date-view">
                <VerticalBanner />
                <p>ଓଡି଼ଶାରେ ଆଜି</p>
                <Moon day={lunarDay}></Moon>
                <p className='the-occasion'>{tithi}<br />{naxatra}</p>
                <p className='the-day'>{getWeekdayLabel(selectedDate.weekday - 1, 'OR')}</p>
                <p className='the-date'>{convertToOdia(selectedDate.date)}</p>
                <p>
                    {monthData ? monthData.description + ' ' + convertToOdia(selectedDate.year) : ''}
                </p>
            </div>
        );
    }
}

export default SelectedDateView;
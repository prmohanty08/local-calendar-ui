import React, { useContext } from 'react';
import './SelectedDateView.css';

import { NumberMapContext } from './NumberMapContext';
import { MonthWiseDataContext } from './MonthwiseDataProvider';

import { getWeekdayLabel } from './CalendarMasterData.js'

import { useSelectedDateTime } from './DateTimeContext';
import Moon from './Moon.js';

const SelectedDateView = () => {
    const { selectedDate } = useSelectedDateTime();
    const { convertToOdia } = useContext(NumberMapContext);
    const { monthData } = useContext(MonthWiseDataContext);
    if (selectedDate && selectedDate.date) {
        return (
            <div className="column dark-pink-red center-aligned-content">
                <p>ଓଡି଼ଶାରେ ଆଜି</p>
                <Moon></Moon>
                <p className='the-occasion'>
                    {monthData ? monthData.occasions[selectedDate.date - 1]?.tithi : ''}
                    <br />
                    {monthData ? monthData.occasions[selectedDate.date - 1]?.naxatra : ''}
                </p>
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
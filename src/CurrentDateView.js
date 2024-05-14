import React, { useContext } from 'react';
import './CurrentDateView.css';

import { NumberMapContext } from './NumberMapContext.js';
import { MonthWiseDataContext } from './MonthwiseDataProvider.js';

import { getWeekdayLabel } from './CalendarMasterData.js'

import { useCalendarDateTime } from './DateTimeContext.js';
import Clock from './Clock.js';
import Moon from './Moon.js';
import VerticalBanner from './VerticalBanner.js';

const CurrentDateView = () => {
    const { serverDateTime } = useCalendarDateTime();
    const { convertToOdia } = useContext(NumberMapContext);
    const { currentMonthData } = useContext(MonthWiseDataContext);

    if (serverDateTime && serverDateTime.day) {
        let tithi, naxatra = '';
        let lunarDay = 0;
        const day = serverDateTime.day;
        if (currentMonthData && currentMonthData.occasions) {
            tithi = currentMonthData.occasions[day - 1]?.tithi;
            naxatra = currentMonthData.occasions[day - 1]?.naxatra;
            lunarDay = currentMonthData.occasions[day - 1]?.lunarDay;
        }

        return (
            <div className="column dark-pink-red center-aligned-content current-date-view">
                <VerticalBanner />
                <p>ଓଡି଼ଶାରେ ଆଜି</p>
                <Moon day={lunarDay}></Moon>
                <p className='the-occasion'>{tithi}<br />{naxatra}</p>
                <p className='the-day'>{getWeekdayLabel(serverDateTime.weekday - 1, 'OR')}</p>
                <p className='the-date'>{convertToOdia(day)}</p>
                <p>
                    {currentMonthData ? currentMonthData.description + ' ' + convertToOdia(serverDateTime.year) : ''}
                </p>
                <Clock initialTime={serverDateTime}></Clock>
            </div>
        );
    }
}

export default CurrentDateView;
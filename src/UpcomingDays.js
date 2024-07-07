import React, { useContext, useState, useEffect } from 'react';
import './UpcomingDays.css';

import { useCalendarDateTime } from './DateTimeContext.js';
import { MonthWiseDataContext } from './MonthwiseDataProvider.js';

import { getWeekdayLabel } from './CalendarMasterData.js'
import { NumberMapContext } from './NumberMapContext.js';

const UpcomingDays = () => {
    const [nextMonthData, setNextMonthData] = useState(null);
    const { serverDateTime } = useCalendarDateTime();
    const { currentMonthData, getMonthDetails } = useContext(MonthWiseDataContext);

    const { convertToOdia } = useContext(NumberMapContext);

    const upcomingDaysFrom = 1;
    const upcomingDaysUpto = 6;

    const fetchDayDetails = (dateTime, monthData) => {
        const dayIndex = dateTime.day - 1;
        const dayDetails = {
            dateTime: dateTime,
            tithi: '',
            naxatra: '',
            lunarDay: null,
            specialMention: null
        };
        if (monthData && monthData.occasions && monthData.occasions[dayIndex]) {
            const theOccasion = currentMonthData.occasions[dayIndex];
            dayDetails.tithi = theOccasion.tithi;
            dayDetails.naxatra = theOccasion.naxatra;
            dayDetails.lunarDay = theOccasion.lunarDay;
            dayDetails.specialMention = theOccasion.specialMention;
        }
        return dayDetails;
    }

    let upcomingDaysDetails = [];
    if (serverDateTime && currentMonthData) {
        for (let i = upcomingDaysFrom; i <= upcomingDaysUpto; i++) {
            const nextDayDateTime = serverDateTime.plus({ days: i });

            let dayData;
            // Check if the next day is in the current month
            if (nextDayDateTime.month === serverDateTime.month) {
                dayData = fetchDayDetails(nextDayDateTime, currentMonthData);
            }
            else if (nextMonthData) {
                dayData = fetchDayDetails(nextDayDateTime, nextMonthData);
            }

            upcomingDaysDetails.push(dayData);
        }
    }

    useEffect(() => {
        if (serverDateTime) {
            const upcomingDaysDateTime = serverDateTime.plus({ days: upcomingDaysUpto });
            if (upcomingDaysDateTime.month !== serverDateTime.month) {
                // 6 days from now is in the next month, fetch next month's data
                getMonthDetails(upcomingDaysDateTime.month, upcomingDaysDateTime.year)
                    .then(data => setNextMonthData(data));
            }
        }
    }, []);

    return (
        <div className='upcoming-days-container'>
            <p className='the-label subsequent-label'>ଆଗାମୀ {convertToOdia(upcomingDaysUpto)} ଦିନ</p>
            <div className="cards">

                {upcomingDaysDetails.map((dayDetails, i) => (
                    dayDetails.dateTime &&
                    <div className="card" key={`upcomingDaysDetails_` + i}>
                        {getWeekdayLabel(dayDetails.dateTime.weekday - 1, 'OR')}<br />
                        {convertToOdia(dayDetails.dateTime.day)}
                        <p>{dayDetails.tithi}</p>
                        <p>{dayDetails.naxatra}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default UpcomingDays;
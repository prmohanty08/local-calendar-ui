import React, { useContext, useState, useEffect } from 'react';
import './UpcomingDays.css';

import { useCalendarDateTime } from './DateTimeContext.js';
import { MonthWiseDataContext } from './MonthwiseDataProvider.js';
import { getWeekdayLabel } from './CalendarMasterData.js';
import { NumberMapContext } from './NumberMapContext.js';

const UpcomingDays = () => {
    const { serverDateTime } = useCalendarDateTime();
    const { currentMonthData, getMonthDetails } = useContext(MonthWiseDataContext);
    const { convertToOdia } = useContext(NumberMapContext);

    const [monthDataArray, setMonthDataArray] = useState([]);
    const [upcomingDaysDetails, setUpcomingDaysDetails] = useState([]);

    const upcomingDaysFrom = 1;
    const upcomingDaysUpto = 6;

    function getFullMonthsDiff(startDateTime, endDateTime) {
        let diffResult = endDateTime.diff(startDateTime, ['months', 'days']).toObject();
        return Math.floor(diffResult.months) + (diffResult.days > 0 ? 1 : 0);
    }

    useEffect(() => {
        async function fetchAllMonthData(startDateTime, numDays) {
            const endDateTime = startDateTime.plus({ days: numDays });
            const monthsDifference = getFullMonthsDiff(startDateTime, endDateTime);
            let specificMonth = null;
            const monthsToFetch = [];
            for (let index = 1; index <= monthsDifference; index++) {
                specificMonth = startDateTime.plus({ months: index });
                monthsToFetch.push({ month: specificMonth.month, year: specificMonth.year });
            }
            const fetchedMonths = await Promise.all(monthsToFetch.map(({ month, year }) =>
                getMonthDetails(month, year)
            ));
            setMonthDataArray([currentMonthData, ...fetchedMonths]);
        }

        if (serverDateTime && currentMonthData) {
            fetchAllMonthData(serverDateTime, (upcomingDaysUpto - upcomingDaysFrom + 1));
        }
    }, [serverDateTime, currentMonthData]);

    useEffect(() => {
        if (!serverDateTime || !monthDataArray.length) return;

        let lastMonth = serverDateTime.month;
        let details = [];

        for (let i = upcomingDaysFrom; i <= upcomingDaysUpto; i++) {
            const nextDayDateTime = serverDateTime.plus({ days: i });
            const monthIndex = nextDayDateTime.month - serverDateTime.month;
            const applicableMonthData = monthDataArray[Math.max(monthIndex, 0)];

            const dayData = {
                monthChanged: false,
                dateTime: nextDayDateTime,
                dayDetails: null,
                monthDescription: null
            };

            if (applicableMonthData) {
                const dayIndex = nextDayDateTime.day - 1;
                const occasionData = applicableMonthData.occasions && applicableMonthData.occasions[dayIndex];
                dayData.dayDetails = {
                    tithi: occasionData ? occasionData.tithi : '',
                    naxatra: occasionData ? occasionData.naxatra : '',
                    lunarDay: occasionData ? occasionData.lunarDay : null,
                    specialMention: occasionData ? occasionData.specialMention : null
                };
            }

            if (nextDayDateTime.month !== lastMonth) {
                lastMonth = nextDayDateTime.month;
                dayData.monthChanged = true;
                dayData.monthDescription = applicableMonthData ? applicableMonthData.description : '';
            }

            details.push(dayData);
        }

        setUpcomingDaysDetails(details);
    }, [monthDataArray]);

    return (
        <div className='upcoming-days-container'>
            <p className='the-label subsequent-label'>ଆଗାମୀ {convertToOdia(upcomingDaysUpto)} ଦିନ</p>
            <div className="cards">
                {upcomingDaysDetails.map((dayData, index) => (
                    dayData.dateTime && dayData.dayDetails &&
                    <React.Fragment key={`upcomingDaysDetails_${index}`}>
                        {dayData.monthChanged && (
                            <div className="month-change">
                                {dayData.monthDescription} {convertToOdia(dayData.dateTime.year)}
                            </div>
                        )}
                        <div className={`card ${dayData.dayDetails.specialMention ? 'special-event' : ''}`}>
                            <div className="the-date-in-background">{convertToOdia(dayData.dateTime.day)}</div>
                            <div className="the-day-in-background">{getWeekdayLabel(dayData.dateTime.weekday - 1, 'OR')}</div>
                            {dayData.dayDetails.specialMention ? (
                                <div className="special-event-details">
                                    <div className="special-mention">{dayData.dayDetails.specialMention}</div>
                                </div>
                            ) : (
                                <div className="the-date-details">
                                    <span>{dayData.dayDetails.tithi}</span>
                                    <span> ※ </span>
                                    <span>{dayData.dayDetails.naxatra}</span>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default UpcomingDays;
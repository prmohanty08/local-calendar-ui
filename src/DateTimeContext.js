import React, { createContext, useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';

export const DateTimeContext = createContext();

export const CalendarDateTimeProvider = ({ children }) => {
    const [serverDateTime, setFetchedDateTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState({
        date: null,
        month: null,
        year: null,
        weekday: null
    });

    const setCurrentDateTime = (theDateTime) => {
        setFetchedDateTime(theDateTime);
        setSelectedDate({
            date: theDateTime.day,
            month: theDateTime.month,
            year: theDateTime.year,
            weekday: theDateTime.weekday
        });
    }

    const updateMonth = (value) => {
        setSelectedDate(prevState => {
            if (prevState && prevState.date && (value != 0 && (value < 11 && value > -11))) {
                const currentDateTime = DateTime.local(prevState.year, prevState.month, prevState.date);
                const updatedDate = currentDateTime.plus({ months: value });
                return {
                    date: updatedDate.day,
                    month: updatedDate.month,
                    year: updatedDate.year,
                    weekday: updatedDate.weekday
                };
            }
        });
    };

    useEffect(() => {
        const fetchCurrentTime = async () => {
            try {
                const response = await fetch('https://local-calendar-next-api-wine-delta-53.vercel.app/api/datetime');
                const data = await response.json();
                const currentDateTime = DateTime.fromISO(data.datetime, { zone: data.timezone });
                setCurrentDateTime(currentDateTime);
            } catch (error) {
                console.error('API failed, hence using client system date time:', error);
                setCurrentDateTime(DateTime.local());
            }
        }

        fetchCurrentTime();
    }, []);

    return (
        <DateTimeContext.Provider value={{ serverDateTime, selectedDate, updateMonth }}>
            {children}
        </DateTimeContext.Provider>
    );

}

export const useCalendarDateTime = () => {
    const context = useContext(DateTimeContext);
    if (context === undefined) {
        throw new Error('useCalendarDateTime must be used within a CalendarDateTimeProvider.');
    }
    return context;
}

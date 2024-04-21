import React, { createContext, useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';

export const DateTimeContext = createContext();

export const CalendarDateTimeProvider = ({ children }) => {
    const [fetchedDateTime, setFetchedDateTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState({
        date: null,
        month: null,
        year: null,
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

    const updateMonth = (n) => {
        setSelectedDate(prevState => {
            if (prevState && prevState.date && (n != 0 && (n < 11 && n > -11))) {
                console.log(JSON.stringify(prevState));
                const currentDateTime = DateTime.local(prevState.year, prevState.month, prevState.date);
                const updatedDate = currentDateTime.plus({ months: n });
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
        <DateTimeContext.Provider value={{ fetchedDateTime, selectedDate, updateMonth }}>
            {children}
        </DateTimeContext.Provider>
    );

}

export const useSelectedDateTime = () => {
    const context = useContext(DateTimeContext);
    if (context === undefined) {
        throw new Error('useSelectedDateTime must be used within a CalendarDateTimeProvider.');
    }
    return context;
}

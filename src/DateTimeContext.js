import React, { createContext, useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';

export const DateTimeContext = createContext();

export const CalendarDateTimeProvider = ({ children }) => {
    const [selectedDateTime, setCalendarDateTime] = useState(null);

    useEffect(() => {
        const fetchCurrentTime = async () => {
            try {
                const response = await fetch('https://local-calendar-next-api-wine-delta-53.vercel.app/api/datetime');
                const data = await response.json();
                const currentDateTime = DateTime.fromISO(data.datetime, { zone: data.timezone });
                setCalendarDateTime(currentDateTime);
            } catch (error) {
                console.error('API failed, hence using client system date time:', error);
                setCalendarDateTime(DateTime.local());
            }
        }

        fetchCurrentTime();
    }, []);

    return (
        <DateTimeContext.Provider value={selectedDateTime}>
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

import React, { createContext, useState, useEffect } from 'react';

import { monthNames } from './CalendarMasterData.js'

import { useSelectedDateTime } from './DateTimeContext';

export const MonthWiseDataContext = createContext();

export const MonthwiseDataProvider = ({ children }) => {
    const [monthData, setMonthData] = useState(null);
    const { selectedDate } = useSelectedDateTime();

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    const fetchData = async () => {
        try {
            if (selectedDate && selectedDate.date) {
                const response = await fetch(`${process.env.PUBLIC_URL}/data/${selectedDate.year}/${monthNames[selectedDate.month - 1]}.json`);
                if (!response.ok) { // check if response failed
                    throw new Error("Response failed!");
                }
                const monthDetails = await response.json();
                setMonthData(monthDetails);
            }
        } catch (error) {
            console.log(error);
            setMonthData(null);
        }
    };

    return (
        <MonthWiseDataContext.Provider value={{ monthData }}>
            {children}
        </MonthWiseDataContext.Provider>
    );
}

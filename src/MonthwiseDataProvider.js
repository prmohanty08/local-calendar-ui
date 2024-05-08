import React, { createContext, useState, useEffect } from 'react';

import { monthNames } from './CalendarMasterData.js'

import { useCalendarDateTime } from './DateTimeContext';

export const MonthWiseDataContext = createContext();

export const MonthwiseDataProvider = ({ children }) => {
    const [currentMonthData, setCurrentMonthData] = useState(null);
    const [selectedMonthData, setSelectedMonthData] = useState(null);
    const { serverDateTime, selectedDate } = useCalendarDateTime();

    useEffect(() => {
        if (serverDateTime) {
            fetchMonthData(serverDateTime.month, serverDateTime.year, setCurrentMonthData);
        }
    }, [serverDateTime]);

    useEffect(() => {
        if (selectedDate && serverDateTime) {
            if (selectedDate.year !== serverDateTime.year
                || selectedDate.month !== serverDateTime.month) {
                fetchMonthData(selectedDate.month, selectedDate.year, setSelectedMonthData);
            } else {
                setSelectedMonthData(currentMonthData);
            }
        }
    }, [selectedDate]);

    const fetchMonthData = async (month, year, setMonthData) => {
        try {
            if (month && year) {
                const response = await fetch(`${process.env.PUBLIC_URL}/data/${year}/${monthNames[month - 1]}.json`);
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
        <MonthWiseDataContext.Provider value={{ currentMonthData, selectedMonthData }}>
            {children}
        </MonthWiseDataContext.Provider>
    );
}

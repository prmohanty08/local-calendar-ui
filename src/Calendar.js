import React, { useState, useLayoutEffect } from 'react';
import './Calendar.css';

import { calendarWeekdaysHeader } from './CalendarMasterData'

import { useCalendarDateTime } from './DateTimeContext';

import Table from './Table';
import MonthYearMenu from './MonthYearMenu';
import SelectedMonthSummary from './SelectedMonthSummary'
import SelectedDateDetails from './SelectedDateDetails';

const createMonthCalendar = (year, month) => {
    const totalDays = new Date(year, month, 0).getDate();  // Get number of days in the month
    let firstDay = new Date(year, month - 1, 1).getDay();  // Get the weekday of the first day of the month
    let dayCounter = 1;

    // Initializing calendar with empty weeks
    let calendarArray = new Array(6).fill(null).map(() => new Array(7).fill(null));

    // Fill days of the month in the calendar array
    for (let week = 0; week < 6; week++) {
        for (let day = firstDay; day < 7; day++) {
            if (dayCounter <= totalDays) {
                calendarArray[week][day] = dayCounter++;
            } else {
                break;  // if all days of the month are filled, break the loop
            }
        }
        if (dayCounter > totalDays) break;  // if all days of the month are filled, break the loop
        firstDay = 0;  // Reset the start day of week from the second week
    }

    // Returning the calendar
    return calendarArray;
}

const Calendar = () => {
    const { selectedDate } = useCalendarDateTime();
    const [selectedDateDetailsVisible, setSelectedDateDetailsVisible] = useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

    const [autoSelectCalendarDate, setAutoSelectCalendarDate] = useState(true);

    useLayoutEffect(() => {
        if (autoSelectCalendarDate && selectedDate?.date) {
            handleCalendarDateClick(selectedDate.date);
        }
    }, [selectedDate]);

    const handleCalendarDateClick = (theCalendarDate) => {
        setSelectedCalendarDate(theCalendarDate);
        setSelectedDateDetailsVisible(true);
        setAutoSelectCalendarDate(false);
    }

    const handleSelectedDateDetailsClose = () => {
        setSelectedDateDetailsVisible(false);
        setSelectedCalendarDate(null);
    }

    if (selectedDate && selectedDate.date) {
        const dates = createMonthCalendar(selectedDate.year, selectedDate.month);

        return (
            <div className="column light-pink-red center-aligned-content-horizontal calendar-container">
                <MonthYearMenu year={selectedDate.year} month={selectedDate.month} />
                <Table headers={calendarWeekdaysHeader} cellData={dates} selectedValue={selectedCalendarDate} onDateClick={handleCalendarDateClick} />
                <SelectedMonthSummary />
                <SelectedDateDetails theDate={selectedCalendarDate} onClose={handleSelectedDateDetailsClose}
                    isVisible={selectedDateDetailsVisible} selectedMonth={selectedDate.month} />
            </div>
        );
    }
}

export default Calendar;
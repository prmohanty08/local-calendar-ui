import React, { useContext } from 'react';
import './SelectedDateDetails.css';

import { NumberMapContext } from './NumberMapContext';
import { MonthWiseDataContext } from './MonthwiseDataProvider';

import { getMonthLabel } from './CalendarMasterData.js'

const getComponentClasses = (isVisible) => {
    return `selected-date-details slide-transition ${isVisible ? 'open' : ''}`;
}

const findByDate = (list, date) => {
    let result = null;
    if (date && list) {
        date = date.toString();
        result = list.find(item => item.date === date);
    }
    return result;
}

const SelectedDateDetails = ({ theDate, onClose, isVisible, selectedMonth }) => {
    const { convertToOdia, composeItemsByIndex } = useContext(NumberMapContext);
    const { selectedMonthData } = useContext(MonthWiseDataContext);
    let tithi, naxatra, festivalDetails = '';
    if (selectedMonthData && selectedMonthData.occasions) {
        const theOccasion = selectedMonthData.occasions[theDate - 1];
        tithi = theOccasion?.tithi;
        naxatra = theOccasion?.naxatra;
        const theFestival = findByDate(selectedMonthData.festivals, theDate);
        if (theFestival) {
            festivalDetails = theFestival.details.map((item, itemIndex) => (
                composeItemsByIndex(item, itemIndex, theFestival.details.length)
            ));
        }
    }

    const theMonthLabel = selectedMonthData ? selectedMonthData.description : getMonthLabel(selectedMonth - 1, 'OR');

    return (
        <div className={getComponentClasses(isVisible)}>
            <button className='close-button' onClick={onClose}></button>
            <div className='date-details-wrapper'>
                <div className='calendar-icon'>
                    <div className='month'>{theMonthLabel}</div>
                    <div className='date'>{convertToOdia(theDate)}</div>
                </div>
                <div className='details-content lc-scroll'>
                    <div className='tithi-naxatra'>{tithi} {naxatra}</div>
                    <div className='festival'>{festivalDetails}</div>
                </div>
            </div>
        </div>
    );
}

export default SelectedDateDetails;
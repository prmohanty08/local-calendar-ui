import React, { useContext, useState } from 'react';
import { MonthWiseDataContext } from './MonthwiseDataProvider';
import { NumberMapContext } from './NumberMapContext';
import { useCalendarDateTime } from './DateTimeContext';

import './ImportantDays.css';

const ImportantDays = () => {
    const { selectedMonthData } = useContext(MonthWiseDataContext);
    const { convertToOdia, composeItemsByIndex } = useContext(NumberMapContext);
    const { selectedDate } = useCalendarDateTime();
    const [selectedFilterMenu, setSelectedFilterMenu] = useState('Festivals');

    const getDays = (filterMenu) => {
        if (selectedMonthData) {
            switch (filterMenu) {
                case 'Festivals': return selectedMonthData.festivals ? selectedMonthData.festivals : null;
                case 'Holidays': return selectedMonthData.govtHolidays ? selectedMonthData.govtHolidays : null;
                case 'AuspiciousDays': return selectedMonthData.auspiciousDays ? selectedMonthData.auspiciousDays : null;
                default: return null;
            }
        } else {
            return null;
        }
    };

    const importantDays = getDays(selectedFilterMenu);
    if (selectedDate.month && selectedDate.year) {
        return (
            <div className="column dark-pink-red">
                <div className="important-day-header">
                    ବିଶେଷ ଦିନ ଗୁଡିକ
                </div>
                <FilterMenu selected={selectedFilterMenu} setSelected={setSelectedFilterMenu} />
                <div className='important-day-details-container'>
                    <DaysList importantDays={importantDays} langConverter={convertToOdia} composeDays={composeItemsByIndex}></DaysList>
                </div>
            </div>
        );
    }
}

export default ImportantDays;

const DaysList = ({ importantDays, langConverter, composeDays }) => {
    if (importantDays && importantDays.length > 0) {
        return importantDays.map((day, dayIndex) => (
            <div key={dayIndex} className="transparent-div">
                <div key={`date-${dayIndex}`} className="flex-column date-column">
                    ତା{langConverter(day.date)}ରିଖ
                </div>
                <div key={`description-${dayIndex}`} className="flex-column description-column">
                    {
                        day.details.map((item, itemIndex) => (
                            <span key={`dd-${dayIndex}-${itemIndex}`}>
                                {composeDays(item, itemIndex, day.details.length)}
                            </span>
                        ))
                    }
                </div>
            </div>
        ))
    } else {
        return (
            <div className="transparent-div">
                <div className='no-days-available'></div>
            </div>
        );
    }
}

const FilterMenu = ({ selected, setSelected }) => {
    const setFilterMenuClasses = (filterMenu) => {
        let classes = 'filter-menu';
        if (filterMenu === selected) classes += ' selected';
        return classes;
    }

    return (
        <div className='filter-menu-container'>
            <div className={setFilterMenuClasses('Festivals')} onClick={() => setSelected('Festivals')}>ପର୍ବ ଦିନ</div>
            <div className={setFilterMenuClasses('Holidays')} onClick={() => setSelected('Holidays')}>ସରକାରୀ ଛୁଟି</div>
            <div className={setFilterMenuClasses('AuspiciousDays')} onClick={() => setSelected('AuspiciousDays')}>ବିବାହ ବ୍ରତ</div>
        </div>
    )
}
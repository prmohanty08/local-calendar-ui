import React, { useContext, useState } from 'react';
import { MonthWiseDataContext } from './MonthwiseDataProvider';
import { NumberMapContext } from './NumberMapContext';

import './ImportantDays.css';

const ImportantDays = () => {
    const { monthData } = useContext(MonthWiseDataContext);
    const { convertToOdia } = useContext(NumberMapContext);
    const [selectedFilterMenu, setSelectedFilterMenu] = useState('Festivals');

    const getDays = (filterMenu) => {
        if (monthData) {
            switch (filterMenu) {
                case 'Festivals': return monthData.festivals ? monthData.festivals : null;
                case 'Holidays': return monthData.govtHolidays ? monthData.govtHolidays : null;
                case 'AuspiciousDays': return monthData.auspiciousDays ? monthData.auspiciousDays : null;
                default: return null;
            }
        } else {
            return null;
        }
    };

    const importantDays = getDays(selectedFilterMenu);
    if (monthData) {
        return (
            <div className="column dark-pink-red">
                <div className="important-day-header">
                    ବିଶେଷ ଦିନ ଗୁଡିକ
                </div>
                <FilterMenu selected={selectedFilterMenu} setSelected={setSelectedFilterMenu} />
                <div className='important-day-details-container'>
                    <DaysList importantDays={importantDays} langConverter={convertToOdia}></DaysList>
                </div>
            </div>
        );
    }
}

export default ImportantDays;

const DaysList = ({ importantDays, langConverter }) => {
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
                                {itemIndex === day.details.length - 1 && day.details.length > 1 ? ' ଓ ' : ''}
                                {item}
                                {itemIndex !== day.details.length - 2 && itemIndex < day.details.length - 2 ? ', ' : ''}
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
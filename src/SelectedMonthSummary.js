import React, { useContext } from 'react';
import './SelectedMonthSummary.css';

import { MonthWiseDataContext } from './MonthwiseDataProvider';

const SelectedMonthSummary = () => {
    const { selectedMonthData } = useContext(MonthWiseDataContext);

    return (
        <div className="selected-month-summary">
            
        </div>
    );
}

export default SelectedMonthSummary;
import React from 'react';
import './CurrentDateView.css';
import { useCalendarDateTime } from './DateTimeContext.js';

import LocationDisplay from './LocationDisplay.js';
import OccasionDisplay from './OccasionDisplay.js';
import UpcomingDays from './UpcomingDays.js';

const CurrentDateView = () => {
    const { serverDateTime } = useCalendarDateTime();

    if (serverDateTime && serverDateTime.day) {
        const referredlocation = 'ଓଡି଼ଶା';
        const locationSuffix = 'ରେ';

        return (
            <div className="column dark-pink-red center-aligned-content current-date-view">
                <LocationDisplay location={referredlocation} suffix={locationSuffix} />
                <OccasionDisplay />
                <UpcomingDays />
            </div>
        );
    }
}

export default CurrentDateView;
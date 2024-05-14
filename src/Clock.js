import React, { useState, useEffect, useContext } from 'react';
import { DateTime } from 'luxon';

import { NumberMapContext } from './NumberMapContext.js';
import { getTimeOfDayLabel } from './CalendarMasterData.js';

const Clock = ({ initialTime }) => {
    const [clockTime, setClockTime] = useState(initialTime);
    const [isVisible, setIsVisible] = useState(document.visibilityState === 'visible');
    const [lastUpdated, setLastUpdated] = useState(DateTime.local());
    const [wasInactive, setInactiveTime] = useState(null);
    const { convertToOdia } = useContext(NumberMapContext);

    const clockIntervalInMillis = 60000;

    const handleVisibilityChange = () => {
        setIsVisible(document.visibilityState === 'visible')
    };

    useEffect(() => {
        if (isVisible) {
            let remainingMilliSecondsTillNextMinute = 0;

            if (wasInactive) {
                const elapsedTimeDuration = DateTime.local().diff(lastUpdated);
                const millisecondsPassedPostLastMinute = elapsedTimeDuration.milliseconds % clockIntervalInMillis;
                remainingMilliSecondsTillNextMinute = clockIntervalInMillis - millisecondsPassedPostLastMinute;

                setClockTime(prevClockTime => prevClockTime.plus({ milliseconds: elapsedTimeDuration.milliseconds }));
                setInactiveTime(null);

            } else {
                const now = DateTime.local();
                remainingMilliSecondsTillNextMinute = clockIntervalInMillis - (now.second * 1000 + now.millisecond);
            }

            // Schedule an immediate, one-time tick to happen at the next minute
            const immediateTimer = setTimeout(() => {
                // add remainingMilliSecondsTillNextMinute to the initialDate
                setClockTime(prevClockTime => prevClockTime.plus({ milliseconds: remainingMilliSecondsTillNextMinute }));

                // Schedule a tick every minute, using the incrementedTime as base
                const minuteTimer = setInterval(() => {
                    setClockTime(prevClockTime => prevClockTime.plus({ milliseconds: clockIntervalInMillis }));
                }, clockIntervalInMillis);

                // Clean up minuteTimer
                return () => {
                    clearInterval(minuteTimer);
                };

            }, remainingMilliSecondsTillNextMinute);

            // Clean up
            return () => {
                clearTimeout(immediateTimer);
            };

        } else {
            setInactiveTime(DateTime.local());
        }
    }, [isVisible, initialTime]);

    useEffect(() => {
        setLastUpdated(DateTime.local());
    }, [clockTime]);

    useEffect(() => {

        // Add an event listener to listen for visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Clean up
        return () => {
            // Remove the event listener on clean up
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const getHourIn12HourFormat = (hour) => {
        let result = hour;
        if (hour > 12) {
            result = hour - 12;
        } else if (hour === 0) {
            result = 12;
        }
        return result;
    };

    return (
        <div>
            ବର୍ତ୍ତମାନ ସମୟ<br />
            {getTimeOfDayLabel(clockTime, 'OR')}&nbsp;
            {convertToOdia(getHourIn12HourFormat(clockTime.hour))} ଟା
            {clockTime.minute > 0 && ' ବାଜି ' + convertToOdia(clockTime.minute) + ' ମିନିଟ୍'}
        </div>
    );
};

export default Clock;

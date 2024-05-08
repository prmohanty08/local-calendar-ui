import { NumberMapProvider } from './NumberMapContext';
import { CalendarDateTimeProvider } from './DateTimeContext';
import { MonthwiseDataProvider } from './MonthwiseDataProvider';

import CurrentDateView from "./CurrentDateView";
import Calendar from "./Calendar";
import ImportantDays from "./ImportantDays";
import Footer from "./Footer";

export default function initialize() {
    return <div className="row">
        <CalendarDateTimeProvider>
            <NumberMapProvider>
                <MonthwiseDataProvider>
                    <CurrentDateView />
                    <Calendar />
                    <ImportantDays />
                </MonthwiseDataProvider>
            </NumberMapProvider>
        </CalendarDateTimeProvider>
        <Footer />
    </div>;
}
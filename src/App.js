import { NumberMapProvider } from './NumberMapContext';
import { CalendarDateTimeProvider } from './DateTimeContext';
import { MonthwiseDataProvider } from './MonthwiseDataProvider';

import DisclaimerBanner from "./DisclaimerBanner";
import CurrentDateView from "./CurrentDateView";
import Calendar from "./Calendar";
import ImportantDays from "./ImportantDays";
import Footer from "./Footer";

const disclaimerTexts = ['ଏହା ଏକ ପରୀକ୍ଷା ମୂଳକ ପ୍ରାରମ୍ଭିକ ସଂସ୍କରଣ ଅଟେ', 'ଆପଣ ବ୍ୟବହାର କରିବା ସମୟରେ କିଛି ତ୍ରୁଟି ଦେଖିପାରନ୍ତି'];
const theSeparator = '✽';

export default function initialize() {
    return <div className="main-container">
        <DisclaimerBanner texts={disclaimerTexts} separator={theSeparator} />
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
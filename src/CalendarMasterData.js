export const pageTitle = "ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର";

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const calendarWeekdaysHeader = ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି'];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const odiaMonthNamesMap = {
    'January': 'ଜାନୁଆରୀ',
    'February': 'ଫେବୃଆରୀ',
    'March': 'ମାର୍ଚ୍ଚ',
    'April': 'ଏପ୍ରିଲ',
    'May': 'ମେ',
    'June': 'ଜୁନ',
    'July': 'ଜୁଲାଇ',
    'August': 'ଅଗଷ୍ଟ',
    'September': 'ସେପ୍ଟେମ୍ବର',
    'October': 'ଅକ୍ଟୋବର',
    'November': 'ନଭେମ୍ବର',
    'December': 'ଡିସେମ୍ବର'
};

export const getMonthLabel = (monthNumber, language) => {
    const englishMonthName = monthNames[monthNumber];
    if (language === 'OR') {
        return odiaMonthNamesMap[englishMonthName];
    }
    return englishMonthName;
}

const odiaWeekdaysMap = {
    'Monday': 'ସୋମବାର',
    'Tuesday': 'ମଙ୍ଗଳବାର',
    'Wednesday': 'ବୁଧବାର',
    'Thursday': 'ଗୁରୁବାର',
    'Friday': 'ଶୁକ୍ରବାର',
    'Saturday': 'ଶନିବାର',
    'Sunday': 'ରବିବାର'
};

export const getWeekdayLabel = (weekday, language) => {
    const englishWeekday = daysOfWeek[weekday];
    if (language === 'OR') {
        return odiaWeekdaysMap[englishWeekday];
    }
    return englishWeekday;
}

const getEnglishTimeOfDay = (date) => {
    const hour = date.hour;
    if (hour >= 3 && hour < 5) {
        return "Early Morning";
    } else if (hour > 5 && hour < 10) {
        return "Morning";
    } else if (hour >= 10 && hour < 12) {
        return "Prenoon";
    } else if (hour === 12) {
        return "Noon";
    } else if (hour > 12 && hour <= 16) {
        return "Afternoon";
    } else if (hour > 16 && hour <= 20) {
        return "Evening";
    } else {
        return "Night";
    }
}

const odiaTimesOfDayMap = {
    'Early Morning': 'ଭୋର',
    'Morning': 'ସକାଳ',
    'Prenoon': 'ପୂର୍ବାହ୍ନ',
    'Noon': 'ମଧ୍ୟାନ',
    'Afternoon': 'ଅପରାହ୍ନ',
    'Evening': 'ସନ୍ଧ୍ୟା',
    'Night': 'ରାତି'
};

export const getTimeOfDayLabel = (hour, language) => {
    const englishTimeOfDay = getEnglishTimeOfDay(hour);
    if (language === 'OR') {
        return odiaTimesOfDayMap[englishTimeOfDay];
    }
    return englishTimeOfDay;
}
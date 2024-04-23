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
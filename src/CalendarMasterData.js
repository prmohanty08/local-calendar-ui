export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const calendarWeekdaysHeader = ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି'];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
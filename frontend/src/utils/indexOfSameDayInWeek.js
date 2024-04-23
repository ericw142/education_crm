import isSameDay from "./isSameDay";

export default function indexOfSameDayInWeek(date, week) {
    const dateToCheck = new Date(date);

    for (let i = 0; i < week.length; i++) {
        const currentDate = new Date(week[i]);
        if (isSameDay(currentDate, dateToCheck)) {
            return i;
        }
    }

    return -1; // Not found
}
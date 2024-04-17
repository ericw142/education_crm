export default function getDatesForCurrentWeek() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay);

    let dates = [];
    for (let i = 0; i < 7; i++) {
        let date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + i);
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let dd = String(date.getDate()).padStart(2, '0');
        let yyyy = date.getFullYear();
        dates.push(`${mm}/${dd}/${yyyy}`);
    }

    return dates;
}
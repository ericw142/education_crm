const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export default function formatDate(dateString, returnYear) {
    const parts = dateString.split('/');
    const mm = parseInt(parts[0], 10);
    const dd = parseInt(parts[1], 10);
    const yyyy = parseInt(parts[2], 10);

    const monthName = monthNames[mm - 1];
    const daySuffix = getDaySuffix(dd);

    if (returnYear) return `${monthName} ${dd}${daySuffix}, ${yyyy}`;
    return `${monthName} ${dd}${daySuffix}`;
}
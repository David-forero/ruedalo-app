export function convertToDate(str) {
    const [datePart, timePart] = str.split(' ');
    const [month, day, year] = datePart.split('-');
    const timeValue = timePart.slice(0, -2);
    const period = timePart.slice(-2);
    let [hours, minutes] = timeValue.split(':');

    if (period === 'PM') {
        hours = (hours % 12) + 12;
    } else {
        hours = hours % 12;
    }

    return new Date(year, month - 1, day, hours, minutes);
}
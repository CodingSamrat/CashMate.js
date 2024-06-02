

// Function to get formatted date as DD/MM/YYYY
export function getDDMMYYYY(date, separator = '/') {
    const _date = new Date(date);
    const day = String(_date.getDate()).padStart(2, '0');
    const month = String(_date.getMonth() + 1).padStart(2, '0');
    const year = _date.getFullYear();

    return `${day}${separator}${month}${separator}${year}`;
}



// Function to get formatted date as HH:MM
export function getHHMM(date) {
    const _date = new Date(date);

    let hours = _date.getHours();
    let minutes = _date.getMinutes();

    // Add leading zeros to hours and minutes if needed
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return `${hours}:${minutes}`;
}

export function getFormattedDate(date) {
    return `${getDDMMYYYY(date)} ${getHHMM(date)}`;
}

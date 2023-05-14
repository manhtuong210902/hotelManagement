function formatDate(dateTimeStr) {
    const [dateStr, timeStr] = dateTimeStr.split("T");
    const [year, month, day] = dateStr.split("-");
    const formattedDateStr = `${day}/${month}/${year}`;
    return formattedDateStr;
}

export default formatDate;

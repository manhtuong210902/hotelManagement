function formatDate(dateTimeStr) {
    dateTimeStr = new Date(dateTimeStr)
    // const [dateStr, timeStr] = dateTimeStr.getDay() || dateTimeStr.split("T");
    // const [year, month, day] = dateStr.split("-");
    const formattedDateStr = `${dateTimeStr.getDate()}/${dateTimeStr.getMonth()}/${dateTimeStr.getFullYear()}`;
    return formattedDateStr;
}

export default formatDate;

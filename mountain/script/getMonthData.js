
function getMonthData(val, year, month) {
    let data = [];
    for (let day of val) {
        let date = day.date.split('-');
        let yy = date[0],
            mm = date[1],
            dd = date[2];
        if (yy == year && mm == month) {
            data.unshift([Math.round(dd), 250 - day.score]);
        }
    }
    return data;
}
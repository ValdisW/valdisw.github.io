function calcMonthlyData(val) {
    // data processing
    let aqi_monthly = [];
    let previous_month = 0;
    for (let day of val) {
        let date = day.date.split('/');
        let yy = date[0],
            mm = date[1],
            dd = date[2];
        if (mm != previous_month) {
            aqi_monthly.push({
                time: yy + '.' + mm,
                daily_aqi: [],
                average: 0
            })
        } else {
            aqi_monthly[aqi_monthly.length - 1].daily_aqi.push(parseInt(day.score));
            aqi_monthly[aqi_monthly.length - 1].average += parseInt(day.score);
        }
        previous_month = mm;
    }

    let aqi_per_month = [];
    for (let month of aqi_monthly) {
        month.average = (month.average / month.daily_aqi.length).toFixed(1);
        aqi_per_month.push([month.time, month.average])
    }
    return aqi_per_month;
}
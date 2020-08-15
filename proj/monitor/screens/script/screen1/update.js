setInterval(function () {
    //  更新数据
    wuxi.dataUpdate();
    // 更新地图信息
    $('#grid').html('网格数: ');
    $('#gridPeo').html('在线网格员数: ');
    $('#infoCollect').html('信息采集量(周): ');
    $('#gridNum').html(wuxi.gridSum);
    $('#gridPeoNum').html(wuxi.gridPeoNum_online);
    $('#infoCollectNum').html(wuxi.infoCollect);
    mapOption.series[0].data[0].value = wuxi.districts[0].infoCollect;
    mapOption.series[0].data[1].value = wuxi.districts[1].infoCollect;
    mapOption.series[0].data[2].value = wuxi.districts[2].infoCollect;
    mapOption.series[0].data[3].value = wuxi.districts[3].infoCollect;
    mapOption.series[0].data[4].value = wuxi.districts[4].infoCollect;
    mapOption.series[0].data[5].value = wuxi.districts[5].infoCollect;
    mapOption.series[0].data[6].value = wuxi.districts[6].infoCollect;
    mapChart.setOption(mapOption);
    // chart2
    option2.series[0].data[0] = (wuxi.gridPeoNum_online / wuxi.gridPeoNum).toFixed(4);
    chart2.setOption(option2);
    // chart3
    var week = new Array(7);
    var curDate = newDate;
    for (var i = week.length - 1; i >= 0; i--){
        curDate = new Date(curDate.getTime() - 24*60*60*1000);
        week[i] = curDate.getMonth() + 1 + '.' + curDate.getDate();
    }
    option3.xAxis.data = week;
    chart3.setOption(option3);
    // chart4
    option4.series.data[0] = wuxi.districts[0].eventF;
    option4.series.data[1] = wuxi.districts[1].eventF;
    option4.series.data[2] = wuxi.districts[2].eventF;
    option4.series.data[3] = wuxi.districts[3].eventF;
    option4.series.data[4] = wuxi.districts[4].eventF;
    option4.series.data[5] = wuxi.districts[5].eventF;
    option4.series.data[6] = wuxi.districts[6].eventF;
    chart4.setOption(option4);
    // chart5

    option5.series.data = [[wuxi.activeBureaus0[0].infoCollectPlus, wuxi.activeBureaus0[1].infoCollectPlus, wuxi.activeBureaus0[2].infoCollectPlus, wuxi.activeBureaus0[3].infoCollectPlus, wuxi.activeBureaus0[4].infoCollectPlus, wuxi.activeBureaus0[5].infoCollectPlus]];

    chart5.setOption(option5);
    // chart6
    option6.series.data[0] = wuxi.activeBureaus0[0].eventF;
    option6.series.data[1] = wuxi.activeBureaus0[1].eventF;
    option6.series.data[2] = wuxi.activeBureaus0[2].eventF;
    option6.series.data[3] = wuxi.activeBureaus0[3].eventF;
    option6.series.data[4] = wuxi.activeBureaus0[4].eventF;
    option6.series.data[5] = wuxi.activeBureaus0[5].eventF;
    option6.series.data[6] = wuxi.activeBureaus0[6].eventF;
    option6.series.data[7] = wuxi.activeBureaus0[7].eventF;
    option6.series.data[8] = wuxi.activeBureaus0[8].eventF;
    option6.series.data[9] = wuxi.activeBureaus0[9].eventF;
    chart6.setOption(option6);
    // chart7
    option7.series.data[0].value = wuxi.eventF;
    option7.series.data[2].value = wuxi.eventO;
    chart7.setOption(option7);
    // 更新事件总数
    $('#total').html('总事件数: <br/>');
    $('#totalNum').html(wuxi.eventSum);
    // 网格员实时工作状态
    var table = "<table border = '1'>";
    table += "<tr><th>时间</th>";
    table += "<th>内容</th>";
    table += "<th>网格员</th>";
    table += "<th>办理情况</th>";
    table += "</tr>";
    for (var i = 0; i < 10; i++) {
        if (levelRes[i]) {
            table += "<tr style='background-color: rgba(27, 153, 211, 0.6)'>";
            table += "<td>" + timeRes[i] + "</td>";
            table += "<td>" + categoryRes[i] + "</td>";
            table += "<td>" + gridPeoRes[i] + "</td>";
            table += "<td>" + statsRes[i] + "</td>";
            table += "</tr>";
        }else{
            table += "<tr style='background-color: rgba(1, 45, 206, 0.6)'>";
            table += "<td>" + timeRes[i] + "</td>";
            table += "<td>" + categoryRes[i] + "</td>";
            table += "<td>" + gridPeoRes[i] + "</td>";
            table += "<td>" + statsRes[i] + "</td>";
            table += "</tr>";
        }
    }
    table += "</table>";
    $("#table").html(table);
    timeRes.pop();
    categoryRes.pop();
    gridPeoRes.pop();
    statsRes.pop();
    levelRes.pop();
    timeRes.unshift(hour + ':' + minStr + ':' + secStr);
    categoryRes.unshift(category[Math.round(Math.random() * (category.length - 1 - 0) + 0)]);
    gridPeoRes.unshift(gridPeo[Math.round(Math.random() * (gridPeo.length - 1 - 0) + 0)]);
    statsRes.unshift(stats[Math.round(Math.random() * (stats.length - 1 - 0) + 0)]);
    levelRes.unshift(level[Math.round(Math.random() * (level.length - 1 - 0) + 0)]);
}, 3000);

function render() {
    requestAnimationFrame(render)
    // 更新时间
    newDate = new Date();
    year = newDate.getFullYear();
    month = newDate.getMonth() + 1;
    date = newDate.getDate();
    day = newDate.getDay();
    hour = newDate.getHours();
    minute = newDate.getMinutes();
    second = newDate.getSeconds();
    minStr = (minute < 10)?('0' + minute):(minute);
    secStr = (second < 10)?('0' + second):(second);
    var dateStr = year + '-' + month + '-' + date + ',星期' + dayChar[day] + ',' + hour + ' : ' + minStr;
    $('#date').html(dateStr);
}
render();
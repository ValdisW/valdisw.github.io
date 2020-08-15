var chart = echarts.init(document.getElementById('chart'));
var option = {
    xAxis: {
        type: 'category',
        axisLabel: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#FFF'
            }
        },
        axisTick: {show: false},
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#FFF',
            fontSize: 8
        },
        axisLine: {
            lineStyle: {
                color: '#FFF'
            }
        },
        axisTick: {show: false},
        splitLine: {
            show: false
        }
    },
    series: {
        type: 'line',
        smooth: true,
        symbol: 'none',
        itemStyle: {
            color: 'rgb(27, 153, 211)'
        },
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(27, 153, 211)'
            }, {
                offset: 1,
                color: 'rgba(27, 153, 211, 0.5)'
            }])
        },
        data: [12, 23, 14, 56, 21,12, 11, 9, 22]
    }
}
chart.setOption(option);
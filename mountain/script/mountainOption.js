function getMountainOption(city, data) {
    return {
        title: {
            text: 'Air Quality Index(AQI) of ' + city.toUpperCase()
        },
        xAxis: {
            data: data.map(function (item) {
                return item[0];
            }),
            show: false
        },
        yAxis: {
            splitLine: {
                show: false
            },
            show: false
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        animation: false,
        series: {
            name: city + ' AQI',
            type: 'line',
            smooth: false,
            itemStyle: {
                opacity: 0
            },
            lineStyle: {
                opacity: 0
            },
            data: data.map(function (item) {
                return item[1];
            }),
            // markLine: {
            //   silent: true,
            //   data: [{
            //     yAxis: 50
            //   }, {
            //     yAxis: 100
            //   }, {
            //     yAxis: 150
            //   }, {
            //     yAxis: 200
            //   }, {
            //     yAxis: 300
            //   }]
            // },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(80, 166, 191)'
                }, {
                    offset: 0.5,
                    color: 'rgb(156, 196, 139)'
                }, {
                    offset: 1,
                    color: 'rgb(179, 157, 83)'
                }]),
                opacity: 1
            },
        }
    }
};
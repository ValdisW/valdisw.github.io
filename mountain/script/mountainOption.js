function getMountainOption(city, data) {
    return {
        title: {
            text: 'Air Quality Index(AQI) of ' + city.toUpperCase()
        },
        xAxis: {
            data: data.map(function (item) {
                return item[0];
            }),
        },
        yAxis: {
            splitLine: {
                show: false
            },
        },
        tooltip: {
            trigger: 'axis'
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
        visualMap: {
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#096'
            }, {
                gt: 50,
                lte: 100,
                color: '#ffde33'
            }, {
                gt: 100,
                lte: 150,
                color: '#ff9933'
            }, {
                gt: 150,
                lte: 200,
                color: '#cc0033'
            }, {
                gt: 200,
                lte: 300,
                color: '#660099'
            }, {
                gt: 300,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        animation: false,
        series: {
            name: city + ' AQI',
            type: 'line',
            data: data.map(function (item) {
                return item[1];
            }),
            markLine: {
                silent: true,
                data: [{
                    yAxis: 50
                }, {
                    yAxis: 100
                }, {
                    yAxis: 150
                }, {
                    yAxis: 200
                }, {
                    yAxis: 300
                }]
            },
            // areaStyle: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 0,
            //         color: 'rgb(80, 166, 191)'
            //     }, {
            //         offset: 0.5,
            //         color: 'rgb(156, 196, 139)'
            //     }, {
            //         offset: 1,
            //         color: 'rgb(179, 157, 83)'
            //     }]),
            //     opacity: 1
            // },
        }
    }
};
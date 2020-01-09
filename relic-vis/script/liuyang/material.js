const materialChart = echarts.init(document.getElementById("material-chart"));
let option = {
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
            lineStyle: {
                color: '#c42c2c',
                width: 1.5,
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: '#c42c2c',
                type: 'dashed',
                width: 1.5,
            }
        },
        axisLabel: {
            color: '#000',
            fontFamily: '方正粗金陵',
            fontSize: 16
        }
    },
    yAxis: {
        type: 'category',
        data: ['土类', '石类', '丝类', '竹类', '木类', '革类', '匏类', '金类'],
        axisLine: {
            lineStyle: {
                color: '#c42c2c',
                width: 1.5,
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            // formatter: function (value) {
            //     return '{' + value + '| }\n{value|' + value + '}';
            // },
            // rich: {
            //     value: {
            //         lineHeight: 30,
            //         align: 'center'
            //     },
            //     Sunny: {
            //         height: 40,
            //         align: 'center',
            //         backgroundColor: {
            //             image: weatherIcons.Sunny
            //         }
            //     },
            //     Cloudy: {
            //         height: 40,
            //         align: 'center',
            //         backgroundColor: {
            //             image: weatherIcons.Cloudy
            //         }
            //     },
            //     Showers: {
            //         height: 40,
            //         align: 'center',
            //         backgroundColor: {
            //             image: weatherIcons.Showers
            //         }
            //     }
            // },
            color: '#000',
            fontFamily: '方正粗金陵',
            fontSize: 16
        }
    },
    series: {
        name: 'material',
        type: 'bar',
        data: [56, 8, 4, 4, 18, 11, 25, 2],
        label: {
            show: true,
            color: '#000',
            position: 'right',
            fontFamily: '方正粗金陵',
            fontSize: 16

        },
        itemStyle: {
            color: '#e3494e',
        },
        barWidth: 15
    }
};

materialChart.setOption(option);
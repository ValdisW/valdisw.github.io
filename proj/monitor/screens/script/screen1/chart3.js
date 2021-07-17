var option3 = {
    title: {
        text: '信息采集一周走势',
        top: '2%',
        left: 'center',
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        formatter: '{a}<br/>{b}: {c}',
        trigger: 'axis',
        axisPointer: {},
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(32, 32, 32, 0.8);'
    },
    xAxis: {
        type: 'category',
        data: ['', '', '', '', '', '', ''],
        axisLabel: {
            color: '#FFF',
            interval: 0,
            fontSize: 10
        },
        axisLine: {
            lineStyle: {
                color: 'rgb(50, 104, 182)'
            }
        },
        axisTick: {show: false}
    },
    yAxis: [{
        type: 'value',
        axisLabel: {
            color: '#FFF',
            fontSize: 6,
            margin: 2
        },
        axisLine: {
            lineStyle: {
                color: 'rgb(50, 104, 182)'
            }
        },
        axisTick: {show: false},
        splitLine: {
            lineStyle: {
                color: 'rgb(50, 104, 182)'
            }
        }
    },{
        axisLine: {
            lineStyle: {
                color: 'rgb(50, 104, 182)'
            }
        },
    }],
    series: [
        {
            name: '信息采集',
            type: 'line',
            data: [280000, 320000, 160000, 187000, 220900, 333000, 332000],
            itemStyle: {
                borderColor: colorList[6]
            },
            lineStyle: {
                color: '#FFF'
            }
        },
        {
            type:'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: 'rgb(27, 153, 211)'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgb(69, 147, 255)' }, {offset: 1, color: 'rgb(38, 69, 126)'}])
                }
            },
            data: [40000, 45000, 46000, 85000, 85000, 72000, 63000]
        }
    ]
};

var chart3 = echarts.init(block3, null, {renderer: 'svg'});
chart3.setOption(option3);

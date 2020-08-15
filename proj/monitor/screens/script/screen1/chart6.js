var option6 = {
    title: {
        text: '各局处理事件数',
        top: '2%',
        left: 'center',
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        formatter: '{a}<br/>{b}: {c}',
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(32, 32, 32, 0.8);'
    },
    xAxis: {
        type: 'category',
        data: ['公安局', '民政局', '卫计委', '邮政管理局', '综治办', '城管局', '工商局', '老龄委', '人社局', '组织部'],
        axisLabel: {
            color: '#FFF',
            rotate: 45,
            fontSize: 10,
            interval: 0
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
            fontSize: 8,
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
    series: {
        name: '各局处理事件数',
        type: 'bar',
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: colorList[5]}, {offset: 1, color: colorList0[5]}]),
            barBorderRadius: 10
        },
        barWidth: '50%',
        data: [wuxi.activeBureaus0[0].eventF, wuxi.activeBureaus0[1].eventF, wuxi.activeBureaus0[2].eventF, wuxi.activeBureaus0[3].eventF, wuxi.activeBureaus0[4].eventF, wuxi.activeBureaus0[5].eventF, wuxi.activeBureaus0[6].eventF, wuxi.activeBureaus0[7].eventF, wuxi.activeBureaus0[8].eventF, wuxi.activeBureaus0[9].eventF],
    }
};

var chart6 = echarts.init(block6);
chart6.setOption(option6);

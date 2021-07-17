var option4 = {
    title: {
        text: '各区处理事件数',
        top: '2%',
        left: 'center',
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal',
        }
    },
    tooltip: {
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(32, 32, 32, 0.8);'
    },
    xAxis: {
        type: 'category',
        data: wuxi.districtNames,
        axisLabel: {
            color: '#FFF',
            rotate: 30,
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
            margin: 2,
            fontSize: 8
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
        type: 'bar',
        itemStyle: {
            color: function (params){
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: colorList[params.dataIndex]}, {offset: 1, color: colorList0[params.dataIndex]}])
            },
            barBorderRadius: 10
        },
        barWidth: '50%',
        data: [wuxi.districts[0].eventF, wuxi.districts[1].eventF, wuxi.districts[2].eventF, wuxi.districts[3].eventF, wuxi.districts[4].eventF, wuxi.districts[5].eventF, wuxi.districts[6].eventF],
    }
};

var chart4 = echarts.init(block4, null, {renderer: 'svg'});
chart4.setOption(option4);

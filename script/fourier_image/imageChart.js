// echarts绘制图表
const originPointChart = echarts.init($('#originPoint')[0]);
const outputPointChart = echarts.init($('#outputPoint')[0]);
const dftAmplitudeChart = echarts.init($('#dftAmplitude')[0]);
const dftPhaseChart = echarts.init($('#dftPhase')[0]);
const originPointOption = {
    title: {
        text: '原图',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        },
        left: 'center'
    },
    xAxis: {
        name: 'r',
        type: 'value',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    yAxis: {
        name: 'i',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    series: {
        type: 'scatter',
        /*
                symbol: 'none',
                lineStyle: {
                    color: '#FFF',
                    width: 1
                }
        */
        symbolSize: 2,
        itemStyle: {color: '#FFF'}
    },
    animation: false
};

const outputPointOption = {
    title: {
        text: 'IDFT',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        },
        left: 'center'
    },
    xAxis: {
        name: 'r',
        type: 'value',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    yAxis: {
        name: 'i',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    series: {
        type: 'scatter',
/*
        symbol: 'none',
        lineStyle: {
            color: '#FFF',
            width: 1
        }
*/
        symbolSize: 2,
        itemStyle: {color: '#FFF'}
    },
    animation: false
};

const dftAmplitudeOption= {
    title: {
        text: '幅度谱',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        },
        left: 'center'
    },
    dataZoom: {
        type: 'slider',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fillerColor: 'rgba(64, 64, 64, 0.5)',
    },
    xAxis: {
        name: 'r',
        type: 'value',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    yAxis: {
        name: 'i',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    series: {
        type: 'bar',
        itemStyle: {color: '#FFF'},
    },
    animation: false
};

const dftPhaseOption= {
    title: {
        text: '相位谱',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        },
        left: 'center'
    },
    dataZoom: {
        type: 'slider',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fillerColor: 'rgba(64, 64, 64, 0.5)',
    },
    xAxis: {
        name: 'r',
        type: 'value',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    yAxis: {
        name: 'i',
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    series: {
        type: 'bar',
        itemStyle: {color: '#FFF'},
    },
    animation: false
};
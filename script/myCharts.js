// 画图
const block1 = document.getElementById('block1');
const block2 = document.getElementById('block2');
const block3 = document.getElementById('block3');
const block4 = document.getElementById('block4');
const block5 = document.getElementById('block5');
const chart1 = echarts.init(block1);
const chart2 = echarts.init(block2);
const chart3 = echarts.init(block3);
const chart4 = echarts.init(block4);
const chart5 = echarts.init(block5);

// 单位圆
let numOfCirclePoints = 5e2,
    circleStep = 2 * Math.PI / numOfCirclePoints;
const circle = new Array(numOfCirclePoints);
for (let i = 0, theta = 0; i < numOfCirclePoints; i++) {
    circle[i] = new Array(2);
    circle[i][0] = Math.cos(theta);
    circle[i][1] = Math.sin(theta);
    theta += circleStep;
}

const xAxisOption = {
    name: 'x',
    type: 'value',
    axisTick: {show: false},
    axisLine: {lineStyle: {color: '#FFF'}},
    splitLine: {lineStyle: {color: '#333'}}
};

const yAxisOption = {
    name: 'y',
    axisTick: {show: false},
    axisLine: {lineStyle: {color: '#FFF'}},
    splitLine: {lineStyle: {color: '#333'}}
};

let option1 = {                 // 原函数
    title: {
        text: '原函数',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: [{
        name: 'origin',
        type: 'line',
        symbol: 'none',
        lineStyle: {
            color: '#FFF',
            width: 1
        }
    },{
        type: 'scatter',
        symbolSize: 8,
        itemStyle: {color: '#0FF'}
    }],
    animation: false
};

let option2_continuous = {                 // 连续傅里叶
    title: {
        text: '连续傅里叶',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: {
        name: 'origin',
        type: 'line',
        symbol: 'none',
        smooth: 'true',
        lineStyle: {
            color: '#FFF',
            width: 1
        }
    },
    animation: false
};
let option2_discrete = {                 // 离散傅里叶
    title: {
        text: '离散傅里叶',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: {
        type: 'scatter',
        symbolSize: 8,
        itemStyle: {color: '#FF0'}
    },
    animation: false
};

let option3_continuous = {                 // 幅度谱
    title: {
        text: '连续幅度谱',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: {
        type: 'line',
        symbol: 'none',
        smooth: 'true',
        lineStyle: {
            color: '#FFF',
            width: 1
        }
    },
    dataZoom: {
        type: 'slider',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fillerColor: 'rgba(64, 64, 64, 0.5)',
    },
    animation: false
};

let option3_discrete = {                 // 幅度谱（离散）
    title: {
        text: '离散幅度谱',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: {
        type: 'bar',
        barMaxWidth: 7,
        itemStyle: {color: '#FFF'},
    },
    animation: false
};

let option4_continuous = {                 // 相位谱
    title: {
        text: '连续相位谱',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: {
        type: 'line',
        symbol: 'none',
        smooth: 'true',
        lineStyle: {
            color: '#FFF',
            width: 1
        }
    },
    dataZoom: {
        type: 'slider',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fillerColor: 'rgba(64, 64, 64, 0.5)',
    },
    animation: false,
};


let option4_discrete = {                 // 相位谱（离散）
    title: {
        text: '离散相位谱',
        textStyle: {
            color: '#FFF',
            fontWeight: 'lighter'
        }
    },
    xAxis: xAxisOption,
    yAxis: yAxisOption,
    series: {
        type: 'bar',
        barMaxWidth: 7,
        itemStyle: {color: '#FFF'},
    },
    animation: false
};

let option5 = {                     // 复平面
    title: {
        text: '复平面',
        textStyle: {color: '#FFF',fontWeight: 'lighter'}
    },
    xAxis: {
        name: 'r',
        type: 'value',
        min: -15, max: 15,
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    yAxis: {
        name: 'i',
        min: -15, max: 15,
        axisTick: {show: false},
        axisLine: {lineStyle: {color: '#FFF'}},
        splitLine: {lineStyle: {color: '#333'}}
    },
    animation: false,
    series: {
        type: 'scatter',
        symbolSize: 6,
        itemStyle: {color: '#FF0'}
    }
};

chart1.setOption(option1);
chart2.setOption(option2_continuous);
chart3.setOption(option3_continuous);
chart4.setOption(option4_continuous);
chart5.setOption(option5);

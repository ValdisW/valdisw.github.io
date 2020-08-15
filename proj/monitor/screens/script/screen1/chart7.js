var placeHolderStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
};

var option7 = {
    title: {
        text: '事件分类',
        top: '2%',
        left: 'center',
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        show: false
    },
    series: {
        name: '事件分类',
        type: 'pie',
        radius: ['60%', '63%'],
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'inside',
                    color: '#ddd',
                    textBorderColor: '#444',
                    textBorderWidth: 2,
                    formatter: function(params) {
                        var percent = 0;
                        var total = wuxi.eventF + wuxi.eventO;
                        percent = ((params.value / total) * 100).toFixed(2);
                        if (params.name !== '') return params.name + '\n{white|' + percent + '%}';
                        else return '';
                    },
                    rich: {
                        white: {
                            color: '#ddd',
                            align: 'center',
                            padding: [5, 0]
                        }
                    }
                },
                labelLine: {show: false}
            }
        },
        label: {
            position: 'inside'
        },
        data: [
            {
                value: wuxi.eventF,
                name: '已办结',
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 30,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                            offset: 0,
                            color: '#7777eb'
                        }, {
                            offset: 1,
                            color: '#70ffac'
                        }]),
                        shadowColor: 'rgba(142, 152, 241, 0.6)'
                    }
                }
            },
            {
                value: (wuxi.eventF + wuxi.eventO) / 20,
                name: '',
                itemStyle: placeHolderStyle
            },
            {
                value: wuxi.eventO,
                name: '处理中',
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 30,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                            offset: 0,
                            color: '#7777eb'
                        }, {
                            offset: 1,
                            color: '#70ffac'
                        }]),
                        shadowColor: 'rgba(142, 152, 241, 0.6)'
                    }
                }
            },
            {
                value: (wuxi.eventF + wuxi.eventO) / 20,
                name: '',
                itemStyle: placeHolderStyle
            }
        ]
    }
};

var chart7 = echarts.init(block7);
chart7.setOption(option7);

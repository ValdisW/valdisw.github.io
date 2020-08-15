var genderData = [
    {'name': '男', 'value': wuxi.gridPeoNum_male},
    {'name': '女', 'value': wuxi.gridPeoNum_female}
];
var educationData = [
    {'name': '大专及以下', 'value': wuxi.gridPeoNum_coll},
    {'name': '本科', 'value': wuxi.gridPeoNum_underg},
    {'name': '研究生', 'value': wuxi.gridPeoNum_postg}
];

var partisanData = [
    {'name': '共产党员', 'value': wuxi.gridPeoNum_com},
    {'name': '民主党派', 'value': wuxi.gridPeoNum_demo},
    {'name': '无党派', 'value': wuxi.gridPeoNum_null},
    {'name': '群众', 'value': wuxi.gridPeoNum_undef}
];

var placeHolderStyle = {
    normal: {
        label: {show: false},
        labelLine: {show: false},
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
};

var option2 = {
    title: {
        text: '网格员信息',
        top: '2%',
        left: 'center',
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal'
        }
    },
    tooltip : {
        show: true,
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        axisPointer : {
            type : 'shadow'
        },
        formatter: function(params) {
            var v = params.value;
            if (params.seriesName == '网格员在线率') v =  v * 100 + '%';
            return params.seriesName + '<br/>' + params.name + ' ' + v;
        },
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(32, 32, 32, 0.8);'
    },
    graphic: [
        {
            type: 'text',
            left: 'center',
            top: '21%',
            style: {
                text: '党派',
                fill: '#FFF'
            }
        },{
            type: 'text',
            left: 'center',
            top: '27.7%',
            style: {
                text: '学历',
                fill: '#FFF'
            }
        },{
            type: 'text',
            left: 'center',
            top: '34.5%',
            style: {
                text: '性别',
                fill: '#FFF'
            }
        }
    ],
    series: [
        {
            name: '网格员在线率',
            type: 'liquidFill',
            data: [(wuxi.gridPeoNum_online / wuxi.gridPeoNum).toFixed(4)],
            center: ['50%', '55%'],
            radius: '30%',
            outline: {show: false},
            label: {
                //formatter: '{a}\n\n{c}',
                fontSize: 12
            },
            itemStyle: {color: 'rgb(19, 136, 213)'},
            animationDuration: 0,
        },
        {
            name: '性别',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['40%', '41%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'inside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < genderData.length; i++) {
                                total += genderData[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if(params.name !== '') {
                                return params.name + '\n{white|' + percent + '%}';
                            }else {
                                return '';
                            }
                        },
                        rich: {
                            white: {
                                color: '#ddd',
                                align: 'center',
                                padding: [5, 0]
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: [
                {
                    value: wuxi.gridPeoNum / 13,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: genderData[0].value,
                    name: '男',
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
                    value: wuxi.gridPeoNum / 20,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: genderData[1].value,
                    name: '女',
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
                    value: wuxi.gridPeoNum / 13,
                    name: '',
                    itemStyle: placeHolderStyle
                }
            ]
        },
        {
            name: '学历',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['55%', '56%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'inside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < educationData.length; i++) {
                                total += educationData[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if(params.name !== '') {
                                return params.name + '\n{white|' + percent + '%}';
                            }else {
                                return '';
                            }
                        },
                        rich: {
                            white: {
                                color: '#ddd',
                                align: 'center',
                                padding: [5, 0]
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: [
                {
                    value: wuxi.gridPeoNum / 13,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: educationData[0].value,
                    name: '大专及以下',
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
                    value: wuxi.gridPeoNum / 20,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: educationData[1].value,
                    name: '本科',
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
                    value: wuxi.gridPeoNum / 20,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: educationData[2].value,
                    name: ' 研究生',
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
                    value: wuxi.gridPeoNum / 13,
                    name: '',
                    itemStyle: placeHolderStyle
                }
            ]
        },
        {
            name: '党派',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['70%', '71%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'inside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < partisanData.length; i++) {
                                total += partisanData[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if(params.name !== '') {
                                return params.name + '\n{white|' + percent + '%}';
                            }else {
                                return '';
                            }
                        },
                        rich: {
                            white: {
                                color: '#ddd',
                                align: 'center',
                                padding: [5, 0]
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: [
                {
                    value: wuxi.gridPeoNum / 13,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: partisanData[0].value,
                    name: '共产党员',
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
                    value: wuxi.gridPeoNum / 20,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: partisanData[1].value,
                    name: '民主党派',
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
                    value: wuxi.gridPeoNum / 20,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: partisanData[2].value,
                    name: '无党派',
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
                    value: wuxi.gridPeoNum / 20,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                {
                    value: partisanData[3].value,
                    name: '群众',
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
                    value: wuxi.gridPeoNum / 13,
                    name: '',
                    itemStyle: placeHolderStyle
                }
            ]
        }
    ]
};
var chart2 = echarts.init(block2);
chart2.setOption(option2);

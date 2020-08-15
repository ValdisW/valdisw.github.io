var eventData = [                   // value前两个维度是经纬坐标，第三个是事件级别
    {name: '党建工作', value: [119.877345,31.473843, 1]},
    {name: '公共安全', value: [120.377345,31.673843, 2]},
    {name: '社会矛盾', value: [120.477345,31.773843, 3]},
    {name: '公共服务', value: [119.777345,31.273843, 4]}
]

var levelColorMap = {
    '1': 'rgba(255, 0, 0, 1)',
    '2': 'rgba(255, 128, 0, 1)',
    '3': 'rgba(255, 255, 0, 1)',
    '4': 'rgba(0, 255, 0, 1)'
};

function regionStyle(borderColorIndex, insideColorIndex, outsideColorIndex){
    return {
        normal: {
            borderColor: colorList[borderColorIndex],
            borderWidth: 1,
            areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                    offset: 0,
                    color: colorList0[insideColorIndex]
                }, {
                    offset: 1,
                    color: colorList1[outsideColorIndex]
                }],
                globalCoord: false
            },
            shadowColor: colorList[borderColorIndex],
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
        },
        emphasis: {
            areaColor: colorList1[5]
        }
    }
}

var mapOption= {
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            return '<span style="font-weight: bold">网格信息采集数</span><br/>' + params.name  + ': ' + params.value;
        },
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(32, 32, 32, 0.8);'
    },
    geo: {
        map: '无锡',
        zoom: 1,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
            },
            emphasis: {
                areaColor: 'rgba(8, 166, 210, 0.7)',
                borderWidth: 0,
            }
        },
        regions: [
            {
                name: '江阴市',
                itemStyle: regionStyle(0, 0, 0)
            },
            {
                name: '宜兴市',
                itemStyle: regionStyle(1, 1, 1)
            },
            {
                name: '梁溪区',
                itemStyle: regionStyle(2, 2, 2)
            },
            {
                name: '锡山区',
                itemStyle: regionStyle(3, 3, 3)
            },
            {
                name: '惠山区',
                itemStyle: regionStyle(4, 4, 4)
            },
            {
                name: '滨湖区',
                itemStyle: regionStyle(5, 5, 5)
            },
            {
                name: '新吴区',
                itemStyle: regionStyle(6, 6, 6)
            }
        ]

    },
    series: [
        {
            type: 'map',
            map: '无锡',
            itemStyle: {areaColor: 'transparent'},
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                },
                label: {color: '#FFF'}
            },
            data: [
                {name: '江阴市', value: wuxi.districts[0].infoCollect},
                {name: '宜兴市', value: wuxi.districts[1].infoCollect},
                {name: '梁溪区', value: wuxi.districts[2].infoCollect},
                {name: '锡山区', value: wuxi.districts[3].infoCollect},
                {name: '惠山区', value: wuxi.districts[4].infoCollect},
                {name: '滨湖区', value: wuxi.districts[5].infoCollect},
                {name: '新吴区', value: wuxi.districts[6].infoCollect}
            ],
        },
        {
            name: '事件',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            tooltip: {
                formatter: function(params){
                    return '<span style="font-weight: bold; color: ' + params.color + '">' + params.name + '</span>' + '<br/>' + params.value[0] + '°E, ' + params.value[1] + '°N';
                }
            },
            rippleEffect: {
                period: 15,
                scale: 6,
                brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    color: function(params){
                        return levelColorMap[params.value[2]];
                    },
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: eventData
        }
    ]
};

var mapChart = echarts.init(map);
$.get('JSON/wuxi.json', function(wuxiJSON){
    echarts.registerMap('无锡', wuxiJSON);
    mapChart.setOption(mapOption);
});

var option5 = {
    title: {
        text: '数据更新增量',
        top: '2%',
        left: 'center',
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(32, 32, 32, 0.8);'
    },
    radar: {
        indicator: [
            {name: '公安局', max: 7},
            {name: '民政局', max: 7},
            {name: '城管局', max: 7},
            {name: '工商局', max: 7},
            {name: '人社局', max: 7},
            {name: '卫计委', max: 7}
        ],
        name: {
            textStyle: {
                fontSize: 10
            }
        },
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(27, 153, 211, .1)', 'rgba(27, 153, 211, .2)',
                    'rgba(27, 153, 211, .4)', 'rgba(27, 153, 211, .6)',
                    'rgba(27, 153, 211, .8)', 'rgba(27, 153, 211, 1)'
                ].reverse()
            }
        },
        splitArea: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: colorList[0]
            }
        },
        radius: '60%',
        center: ['50%','55%'],
    },
    series: {
        name: '数据更新增量',
        type: 'radar',
        symbol: 'none',
        itemStyle: {
            normal: {
                color: 'rgb(114,217, 190)'
            }
        },
        areaStyle: {
            normal: {
                opacity: 0.5
            }
        },
        data: [[wuxi.activeBureaus0[0].infoCollectPlus, wuxi.activeBureaus0[1].infoCollectPlus, wuxi.activeBureaus0[2].infoCollectPlus, wuxi.activeBureaus0[3].infoCollectPlus, wuxi.activeBureaus0[4].infoCollectPlus, wuxi.activeBureaus0[5].infoCollectPlus]],
    }
};
var chart5 = echarts.init(block5, null, {renderer: 'svg'});
chart5.setOption(option5);

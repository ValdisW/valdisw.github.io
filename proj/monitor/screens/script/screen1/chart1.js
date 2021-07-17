var option1 = {
    title: {
        text: '网格信息',
        left: 'center',
        top: '2%',
		
        textStyle: {
            color:  'rgb(255, 255, 255)',
            fontWeight: 'normal'
        }
    },
    tooltip: {
        formatter: function (params) {
            var areaName = params.name.split(',')[0];
            var propName = params.name.split(',')[1];
            return  '<span style="font-weight: bold; color :' + params.color + '">' + areaName + '</span>' +  '<br/>' + propName + ': ' + params.value;
        },
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        extraCssText: 'box-shadow: 0 0 10px  5px rgba(64, 64, 64, 0.8);'
    },
    series: [{
		name:'网格信息',
        type: 'treemap',
        top: 55,
        height: '70%',
        width: '70%',
        roam: false,
        nodeClick: false,
        breadcrumb: {show: false},
		itemStyle: {
            borderWidth: 0.2,
            borderColor: 'rgba(0, 0, 0, 0)'
        },
        label: {
            formatter: '{@value}'
        },
        data: [
            {
                name: '江阴市',
                //itemStyle: {color: 'rgb(30, 183, 140)'},
                children: [
					{name: '江阴市,综合网格', value: wuxi.districts[0].gridM, itemStyle: {color: colorList1[0]}},
                    {name: '江阴市,专属网格', value: wuxi.districts[0].gridP, itemStyle: {color: colorList1[0]}},
                ]
            },
            {
                name: '宜兴市',
                //itemStyle: {color: colorList[1]},
                children: [
                    {name: '宜兴市,综合网格', value: wuxi.districts[1].gridM, itemStyle: {color: colorList1[1]}},
                    {name: '宜兴市,专属网格', value: wuxi.districts[1].gridP, itemStyle: {color: colorList1[1]}},
                ]
            },
            {
                name: '梁溪区',
                //itemStyle: {color: colorList[2]},
                children: [
                    {name: '梁溪区,综合网格', value: wuxi.districts[2].gridM, label: {color: 'rgb(25, 33, 106)'}, itemStyle: {color: colorList1[2]}},
                    {name: '梁溪区,专属网格', value: wuxi.districts[2].gridP, label: {color: 'rgb(25, 33, 106)'}, itemStyle: {color: colorList1[2]}},
                ]
            },
            {
                name: '锡山区',
                //itemStyle: {color: colorList[3]},
                children: [
                    {name: '锡山区,综合网格', value: wuxi.districts[3].gridM, itemStyle: {color: colorList1[3]}},
                    {name: '锡山区,专属网格', value: wuxi.districts[3].gridP, itemStyle: {color: colorList1[3]}},
                ]
            },
            {
                name: '惠山区',
                //itemStyle: {color: colorList[4]},
                children: [
                    {name: '惠山区,综合网格', value: wuxi.districts[4].gridM, itemStyle: {color: colorList1[4]}},
                    {name: '惠山区,专属网格', value: wuxi.districts[4].gridP, itemStyle: {color: colorList1[4]}},
                ]
            },
            {
                name: '滨湖区',
                //itemStyle: {color: colorList[5]},
                children: [
                    {name: '滨湖区,综合网格', value: wuxi.districts[5].gridM, itemStyle: {color: colorList1[5]}},
                    {name: '滨湖区,专属网格', value: wuxi.districts[5].gridP, itemStyle: {color: colorList1[5]}},
                ]
            },
            {
                name: '新吴区',
                //itemStyle: {color: colorList[6]},
                children: [
                    {name: '新吴区,综合网格', value: wuxi.districts[6].gridM, itemStyle: {color: colorList1[6]}},
                    {name: '新吴区,专属网格', value: wuxi.districts[6].gridP, itemStyle: {color: colorList1[6]}},
                ]
            },
        ]
    }]
};
var chart1 = echarts.init(block1);
chart1.setOption(option1);

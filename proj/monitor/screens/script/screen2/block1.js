var dom = document.getElementById("block1");
var myChart = echarts.init(dom);
var app = {};


option = {
	title: {
		text: '网格员\n政治面貌',
		textStyle: {
			color: "#fff",
			fontSize: 12
		},
		x: 'center',
		y: 'center',
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},

	series: [{
		name: '网格员政治面貌',

		type: 'pie',
		radius: ['30%', '60%'],
		center: ['50%', '50%'],
		selectedMode: 'single',
		data: [{
				value: 446,
				name: '群众'
			}, {
				value: 123,
				name: '民主党派'
			}, {
				value: 86,
				name: '无党派'
			}, {
				value: 241,
				name: '共产党员'
			}

		],
		color: ['#1b99d3', '#5d49cd', '#19216a', '#012dce'],
		textStyle: {
			color: "#fff",
			fontSize: 8
		},
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};

if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

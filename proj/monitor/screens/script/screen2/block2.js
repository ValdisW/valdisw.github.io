var dom = document.getElementById("block2");
var myChart = echarts.init(dom);
var app = {};


option = {
	title: {
		text: '网格员\n全职兼职比例',
		textStyle: {
			color: "#fff",
			fontSize: '12',
			lineHeight: '10'
		},
		x: 'center', 
		y: 'center',
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},

	series: [{
		name: '网格员全职兼职比例',

		type: 'pie',
		radius: ['30%', '60%'],
		center: ['50%', '50%'],
		selectedMode: 'single',
		data: [
			//896人
			{
				value: 754,
				name: '全职'
			}, {
				value: 142,
				name: '兼职'
			}

		],
		color: ['#9184da', '#19216a'],
		textStyle: {
			color: "#fff",
			fontSize: '8'
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

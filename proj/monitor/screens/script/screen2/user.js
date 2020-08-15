var dom = document.getElementById("user");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '环形图';

option = {
	title: {
		text: '服务对象',
		left: 'center',
		textStyle: {
			color: "#fff",
		},
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},

	legend: {
		type: 'scroll',
		left: '8%',
		top: '90%',
		bottom: '20%',
		data: ['20岁以下', '20-30岁', '30-40岁', '40-50岁', '50-60岁', '60岁以上']
	},
	series: [{
		name: '服务对象',
		type: 'pie',
		radius: ['40%', '60%'],

		avoidLabelOverlap: false,
		label: {
			normal: {
				show: false,
				position: 'center'
			},
			emphasis: {
				show: true,
				textStyle: {
					fontSize: '20',
					fontWeight: 'bold'
				}
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		data: [{
			value: 235,
			name: '20岁以下'
		}, {
			value: 410,
			name: '20-30岁'
		}, {
			value: 634,
			name: '30-40岁'
		}, {
			value: 235,
			name: '40-50岁'
		}, {
			value: 348,
			name: '50-60岁'
		}, {
			value: 208,
			name: '60岁以上'
		}],
		color: ['#99e2e5', '#1b99d3', '#5d49cd', '#19216a', '#012dce', '#9184da', '#f285be']
	}]
};
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

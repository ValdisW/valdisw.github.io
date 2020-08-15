var dom = document.getElementById("dataRange");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	title: {
		text: '采集业务数据分类',
		left: 'center',
		textStyle: {
			color: "#fff",
		},
	},

	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		type: 'scroll',
		left: '8%',
		top: '90%',
		bottom: '20%',
		data: ['工商', '工商2', '工商3', '工商4', '工商5', '工商6', '工商7']
	},

	calculable: true,
	series: [{
		name: '采集业务数据分类',
		type: 'pie',
		radius: [10, 80],
		center: ['50%', '50%'],
		roseType: 'radius',
		label: {
			normal: {
				show: true
			},
			emphasis: {
				show: true
			}
		},
		lableLine: {
			normal: {
				show: true
			},
			emphasis: {
				show: true
			}
		},
		data: [{
			value: 50,
			name: '工商'
		}, {
			value: 45,
			name: '工商2'
		}, {
			value: 40,
			name: '工商3'
		}, {
			value: 35,
			name: '工商4'
		}, {
			value: 30,
			name: '工商5'
		}, {
			value: 25,
			name: '工商6'
		}, {
			value: 20,
			name: '工商7'
		}],
		color: ['#99e2e5', '#1b99d3', '#5d49cd', '#19216a', '#012dce', '#9184da', '#f285be']
	}]
};;
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

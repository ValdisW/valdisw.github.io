var dom = document.getElementById("serviceMode");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '服务方式';

option = {
	title: {
		text: '服务方式',
		left: 'center',
		top: '3%',
		textStyle: {
			color: "#fff",
		},

	},
	textStyle: {
		color: "#fff",
		fontSize: 10
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},

	grid: {
		top: '25%',
		left: '5%',
		right: '8%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		boundaryGap: [0, 0.01],
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 1,
			}
		}
	},
	yAxis: {
		type: 'category',
		data: ['其他', '社区服务', '上门服务', '网上服务'],
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 1,
			}
		}
	},
	series: [{
		type: 'bar',
		barWidth: '45%',
		color: '#7cc4e5',
		data: [2100, 1900, 800, 1200],
		itemStyle: {
			normal: {
				color: function (params) {
					var colorList = [
						'#19216a', '#012dce', '#9184da', '#f285be'
					];
					return colorList[params.dataIndex]
				}
			}
		},
		label: {
			normal: {
				show: true,
				position: 'right'
			}
		},
	}]
};
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

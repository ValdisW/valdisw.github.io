var dom = document.getElementById("age");
var myChart = echarts.init(dom);
option = null;

var date = [20];

var data = [Math.round(120)];

for (var age = 21; age < 25; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (431 - 225) + 225));
}
for (var age = 26; age < 30; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (1031 - 825) + 825));
}
for (var age = 30; age < 35; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (1231 - 1025) + 1025));
}
for (var age = 35; age < 40; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (1431 - 1225) + 1225));
}
for (var age = 40; age < 45; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (1231 - 925) + 925));
}
for (var age = 45; age < 50; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (931 - 525) + 525));
}
for (var age = 55; age < 60; age++) {

	date.push(age);
	data.push(Math.round(Math.random() * (431 - 15) + 85));
}
date.push(60);
data.push(Math.round(50));


option = {
	tooltip: {
		trigger: 'axis',
		position: function (pt) {
			return [pt[0], '10%'];
		}
	},
	title: {
		text: '网格员年龄',
		left: 'center',
		top: '3%',
		textStyle: {
			color: "#fff",
		},
	},
	grid: {
		top: '30%',
		left: '3%',
		right: '8%',
		bottom: '10%',
		containLabel: true
	},
	textStyle: {
		color: "#fff",
		fontSize: 10
	},
	axisLine: {
		lineStyle: {
			color: 'fff',
			width: 1,
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: date,
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 1,
			}
		}
	},
	yAxis: {
		type: 'value',
		max: 1600,
		min: 0,
		boundaryGap: [0.2, 0.2],
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 1,
			}
		}

		// boundaryGap: [0, '100%']
	},
	series: [{
		name: '人数',
		type: 'line',
		smooth: true,
		symbol: 'none',
		sampling: 'average',
		itemStyle: {
			normal: {
				color: 'rgb(1, 1, 1,0)'
			}
		},
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: '#2378f7'
				}, {
					offset: 1,
					color: '#83bff6'
				}])
			}
		},
		data: data
	}]
};;
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

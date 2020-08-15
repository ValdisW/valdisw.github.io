var rres = [187, 195, 200, 221, 233, 256, 289, 321, 342, 356];

var people2 = ['网格员11', '网格员244', '网格员13', '网格员4', '网格员50', '网格员66', '网格员37', '网格员98', '网格员119', '网格员108'];
var others = ['网格员3', '网格员26', '网格员44', '网格员90', '网格员3', '网格员12', '网格员1', '网格员94', '网格员32', '网格员113'];

var dom = document.getElementById("range");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	title: {
		text: '网格员排名',
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
	grid: {
		top: '20%',
		left: '8%',
		right: '15%',
		bottom: '5%',
		containLabel: true
	},
	xAxis: {
		show: false
	},
	yAxis: { //y轴自适应

		type: 'category',
		boundaryGap: true,
		data: people2,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		splitLine: {
			show: false
		}
	},
	series: [{
		data: rres,
		type: 'bar',
		barWidth: '45%',
		color: '#83bff6',
		label: {
			normal: {
				show: true,
				position: 'right'
			}
		}

	}]
};

setInterval(function () {
	rres.push(Math.round(Math.random() * (280 - 220) + 220));
	var rrestemp = rres[10];
	rres.sort(function (a, b) {
		return a - b
	}); //从小到大排序
	var rresindex = rres.indexOf(rrestemp); //记录添加进的数值下标
	people2.splice(rresindex, 0, others[Math.round(Math.random() * (9 - 0) + 0)]); //在下标为rresindex后添加新数据
	rres.shift();
	people2.shift();

	myChart.setOption(option);
	if (Math.max.apply(null, res) > maxY - 10)
		maxY = maxY + 10;
}, 3000); //每隔3s运行一次

if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

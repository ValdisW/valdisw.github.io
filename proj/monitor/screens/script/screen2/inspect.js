var res = [];

var len = 10;
while (len--) {
	res.push(Math.round(Math.random() * (31 - 25) + 25));
}
var maxY = 50;

var dom = document.getElementById("inspect");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	title: {
		text: '网格巡查数',
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
		top: '25%',
		left: '8%',
		right: '8%',
		bottom: '8%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		boundaryGap: true,
		//		data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 1,
			}
		}
	},
	yAxis: { //y轴自适应
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 1,
			}
		}
	},
	//    yAxis: {//限制y轴最大值
	//        type: 'value',
	//            scale: true,
	//            name: '价格',
	//           max: maxY,
	//            min: 0,
	//            boundaryGap: [0.2, 0.2]
	//          
	//    },
	series: [{
		data: res,
		type: 'bar',
		barWidth: '45%',
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: '#83bff6'
		}, {
			offset: 1,
			color: '#2378f7'
		}]),

	}]
};

setInterval(function () {

	res[0] = res[0] + Math.round(Math.random() * (5 - 0) + 0); //在0-5之间随机加
	res[1] = res[1] + Math.round(Math.random() * (2 - 0) + 0);
	res[2] = res[2] + Math.round(Math.random() * (1 - 0) + 0);
	res[3] = res[3] + Math.round(Math.random() * (5 - 0) + 0);
	res[4] = res[4] + Math.round(Math.random() * (4 - 0) + 0);
	res[5] = res[5] + Math.round(Math.random() * (5 - 0) + 0);
	res[6] = res[6] + Math.round(Math.random() * (4 - 0) + 0);
	res[7] = res[7] + Math.round(Math.random() * (5 - 0) + 0);
	res[8] = res[8] + Math.round(Math.random() * (2 - 0) + 0);
	res[9] = res[9] + Math.round(Math.random() * (5 - 0) + 0)

	myChart.setOption(option);
	if (Math.max.apply(null, res) > maxY - 10)
		maxY = maxY + 10;
}, 1600); //每隔1.6s运行一次

if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

var address = ["无锡市梁溪区1号", "无锡市梁溪区2号", "无锡市梁溪区3号", "无锡市梁溪区4号", "无锡市梁溪区5号", "无锡市梁溪区6号", "无锡市梁溪区7号", "无锡市梁溪区8号"];
var describe = ["上门服务1", "上门服务2", "上门服务3", "上门服务4"];
var nameR = ["杨某某", "王某某", "陈某某", "孙某某", "尹某某", "钱某某"];
var addressRes = [];
var describeRes = [];
var nameRes = [];
var dateRes = [];
for (var i = 0; i < 8; i++) {
	dateRes.push(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
	addressRes.push(address[Math.round(Math.random() * (7 - 0) + 0)]);
	describeRes.push(describe[Math.round(Math.random() * (3 - 0) + 0)]);
	nameRes.push(nameR[Math.round(Math.random() * (5 - 0) + 0)]);
}

var dom = document.getElementById("record");
var myChart = echarts.init(dom);
var app = {};

option = null;
option = {
	title: {
		text: '走访记录',
		left: 'center',
		top: '3%',
		textStyle: {
			color: "#fff",
		},
	}
}
if (option && typeof option === "object") {
	myChart.setOption(option, true);
}

setInterval(function () {
	var table = "<table border = '1'>";
	table += "<tr><th>" + "走访日期" + "</th>";
	table += "<th>" + "地址" + "</th>";
	table += "<th>" + "描述" + "</th>";
	table += "<th>" + "走访员" + "</th>";
	table += "</tr>";
	for (var i = 0; i < 8; i++) {
		table += "<tr>";
		table += "<td>" + dateRes[i] + "</td>";
		table += "<td>" + addressRes[i] + "</td>";
		table += "<td>" + describeRes[i] + "</td>";
		table += "<td>" + nameRes[i] + "</td>";
		table += "</tr>";
	}
	table += "</table>";

	$("#table").html(table);

	dateRes.pop();
	addressRes.pop();
	describeRes.pop();
	nameRes.pop();
	dateRes.unshift(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
	addressRes.unshift(address[Math.round(Math.random() * (7 - 0) + 0)]);
	describeRes.unshift(describe[Math.round(Math.random() * (3 - 0) + 0)]);
	nameRes.unshift(nameR[Math.round(Math.random() * (5 - 0) + 0)]);

}, 1000); //每隔1s运行一次

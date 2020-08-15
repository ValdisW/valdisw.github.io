var amount = 11590;
var online = 7180;
var mile = 1402324;

setInterval(function () {

	mile = mile + Math.round(Math.random() * (8000 - 7000) + 7000)
	var info1 = "网格数: <span id='totalNum'>" + amount + "</span>";
	var info2 = "网格员在线数: " + Math.round(Math.random() * (8000 - 7000) + 7000);
	var info3 = "网格员里程步数: " + (mile / 10000).toFixed(2) + "万步";
	$("#info1").html(info1);
	$("#info2").html(info2);
	$("#info3").html(info3);

}, 1200); //每隔1.2s运行一次

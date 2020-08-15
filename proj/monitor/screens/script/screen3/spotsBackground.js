var w = document.body.scrollWidth; //获取屏幕可见区域宽 -5是因为获取的不准确  获取值大于屏幕宽
var h = document.body.scrollHeight - 5; //获取屏幕可见区域高
//	console.log(w);
//	console.log(h);
//var h = 600;
//var w = 1346;
//--------------
var y1 = 0.288 * h;
var interval_1 = 0.043 * w;
var startx_1 = 0.37 * w;
var starty_1 = 0.288 * h;
var interval_2 = 0.056 * h;
var interval_3 = 0.01 * w;

var endx_1 = 0.37 * w;
var endy_1 = 0.81 * h;

var line1_y = 0.32 * h;
var line2_y = 0.64 * h;
var Y1;
var H;
var I;
var J;
var K;
var p;

var SPOTS = new Array();
var beforetime;
var millisecond;
//------------
var radius = 3;

function setup() {
	var canvas = createCanvas(w, h);
	//    imgy = loadImage('img/yellow.png');
	//    imgb = loadImage('img/blue.png');
	Y1 = createVector(0.438 * w, line1_y);
	H = createVector(0.438 * w, 0.384 * h);
	I = createVector(0.438 * w, 0.696 * h);
	J = createVector(0.514 * w, 0.633 * h);
	K = createVector(0.535 * w, 0.633 * h);
	P = createVector(0.438 * w, 0.74 * h);
	canvas.parent('myCanvasBack');
}

function draw() {
	background(0, 0, 0, 0);
	noStroke();
	smooth();
	fill(150, 150, 0);
	var x = startx_1;
	var y;
	for (var i = 0; i < 7; i++) {
		y = starty_1 + (line1_y - starty_1) / 3;
		for (var j = 0; j < 3; j++) {
			ellipse(x, y, radius);
			y = y + (line1_y - starty_1) / 3;
		}
		x = x + interval_1;
	}
	x = startx_1;
	y = line1_y;
	for (var i = 0; i < 24; i++) {
		x = x + interval_1 / 4;
		if (i != 5) {
			ellipse(x, y, radius);
		}
	}
	x = 0.438 * w;
	y = line1_y;
	for (var i = 0; i < 4; i++) {
		ellipse(x, y, radius);
		y = y + (0.384 * h - line1_y) / 3;
	}
	x = 0.438 * w;
	y = 0.696 * h;
	for (var i = 0; i < 4; i++) {
		ellipse(x, y, radius);
		y = y + (0.74 * h - 0.696 * h) / 3;
	}
	x = 0.514 * w;
	y = 0.633 * h;
	for (var i = 0; i < 4; i++) {
		ellipse(x, y, radius);
		x = x + (0.535 * w - 0.514 * w) / 3;
	}
	x = startx_1;
	y = 0.74 * h;
	for (var i = 0; i < 25; i++) {

		if (i != 5 && i != 6) {
			ellipse(x + interval_3, y, radius);
		}
		x = x + interval_1 / 4;
	}
	x = startx_1 + interval_3;
	y = 0.74 * h;
	for (var i = 0; i < 7; i++) {
		y = 0.74 * h;
		for (var j = 0; j < 9; j++) {
			if (i == 6 && (j == 8 || j == 7 || j == 6))
			;
			else {
				ellipse(x, y, radius);
			}
			y = y + (endy_1 + interval_2 * 2 - 0.74 * h) / 8;
		}
		x = x + interval_1;
	}
}

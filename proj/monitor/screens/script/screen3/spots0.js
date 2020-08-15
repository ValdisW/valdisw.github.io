var mycircle;
var imgy;
var imgb;
var Starts = new Array();
// for (var k = 0; k < 7; k++) {
// Starts[k]="";
// }//？？？？
var Ends = new Array(); //先声明一维
// for (var k = 0; k < 3; k++) { //一维长度为i,i为变量，可以根据实际情况改变
//   Ends[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
//   for (var j = 0; j < 7; j++) { //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
//     Ends[k][j] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
//   }
// }
var w = document.body.scrollWidth; //获取屏幕可见区域宽 -5是因为获取的不准确  获取值大于屏幕宽
var h = document.body.scrollHeight-5; //获取屏幕可见区域高
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

function setup() {
    var canvas = createCanvas(w, h);
    imgy = loadImage('img/yellow.png');
    imgb = loadImage('img/blue.png');
    Y1 = createVector(0.438 * w, line1_y);
    H = createVector(0.438 * w, 0.384 * h);
    I = createVector(0.438 * w, 0.696 * h);
    J = createVector(0.514 * w, 0.633 * h);
    K = createVector(0.535 * w, 0.633 * h);
    P = createVector(0.438 * w, 0.74 * h);
    canvas.parent('myCanvas');
    for (var i = 0; i < 7; i++) //起点
    {
        append(Starts, new part(startx_1 + i * interval_1, y1));
    }
    for (var ix = 0; ix < 7; ix++) {
        for (var iy = 0; iy < 3; iy++) {
            append(Ends, new part(endx_1 + ix * interval_1, endy_1 + iy * interval_2));
        }
    }

    background(0, 0, 0, 0);
    //circle参数依次对应：起始坐标x,y 。 targetpos不用管 0,0即可。小球颜色 1 yellow 2 blue。多少行多少列。
    mycircle = new circle(Starts[floor(random(0, 7))].x, y1, 500, 300, 1, 1, 2); //最后的参数是多少行多少列 指代到达的位置在图中的行列
    mycircle1 = new circle(Starts[floor(random(0, 7))].x, y1, 0, 0,1, 2, 5);
    //mycircle=new circle(Starts[2],Ends[2][4]);
}

function draw() {
    background(0, 0, 0, 0);
    for (var i = 0; i < Starts.length; i++) {
        ellipse(Starts[i].x, Starts[i].y, 15, 15);
    }
    for (var i = 0; i < Ends.length; i++) {
        ellipse(Ends[i].x, Ends[i].y, 15, 15);
    }
    show(mycircle);//for test
    show(mycircle1);
    beforetime= millis();
    millisecond = millisecond+50;
    if (abs(beforetime %50==1)) {
        append(SPOTS, new circle(Starts[floor(random(0, 7))].x, y1, 0, 0, 1,floor(random(0, 3)), floor(random(0, 7)))); //random左边包 右边不包
    }

    clear();
    for(var i=0;i<SPOTS.length;i++){
        show(SPOTS[i]);
    }
}

function show(mycircle) {
   	// clear(); //存在问题//会死亡
    if (mycircle.pos.y < line1_y) mycircle.postarget = createVector(mycircle.pos.x, line1_y);
    if (round(mycircle.pos.y) == round(line1_y)) mycircle.postarget = Y1;
    if (round(mycircle.pos.x) == round(Y1.x)) mycircle.postarget = P;

    //   if (round(mycircle.pos.y) == round(H.y)) {
    //   mycircle.postarget = H;
    // }
    if (mycircle.hassontag == false) {
        if (round(mycircle.pos.y) >= round(H.y)) {
            mycircle.son = new circle(J.x - 1, J.y, J.x, J.y, 1, 0, 0);
            mycircle.son.postarget = J;
            mycircle.hassontag = true;
        }
    }

    if (round(mycircle.pos.y) == round(P.y))
        mycircle.postarget = createVector(endx_1 + mycircle.col * interval_1 + interval_3, P.y);

    if (round(mycircle.pos.x) == round(endx_1 + mycircle.col * interval_1 + interval_3))
        mycircle.postarget = createVector(endx_1 + mycircle.col * interval_1 + interval_3, endy_1 + mycircle.row * interval_2);

    if (round(mycircle.pos.y) == round(endy_1 + mycircle.row * interval_2))
        mycircle.postarget = createVector(endx_1 + mycircle.col * interval_1, endy_1 + mycircle.row * interval_2);

    if ((round(mycircle.pos.x) < round(J.x) && round(mycircle.pos.y) < round(I.y) && round(mycircle.pos.y) > round(H.y)) || round(mycircle.pos.x) == round(endx_1 + mycircle.col * interval_1))
        mycircle.alive = false;
    else
        mycircle.alive = true;

    if (mycircle.son != null) {
        if (round(mycircle.son.pos.x) == round(J.x)) mycircle.son.postarget = K;
        mycircle.son.update();
        mycircle.son.display();
        if (round(mycircle.son.pos.x) == round(K.x)) mycircle.son = null;
    }

    mycircle.update();
    mycircle.display();

    // if (round(mycircle.pos.x) == round(mycircle.postarget.x)) {
    //   mycircle.alive = 0;
    // }

}

function circle(x, y, endx, endy, color, row, col) { //1 yellow ;2 blue
    this.pos = createVector(x, y);
    this.postarget = createVector(endx, endy);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.steer = createVector(0, 0);
    this.alive = true;
    this.son = null;
    this.row = row ;
    this.col = col ;
    this.hassontag = false;
    if (this.col == 6 && this.row == 2) //第三行第三列是没有部门的
        this.row = 1;

    if (color == 1) {
        this.image = imgy;
    } else this.image = imgb;

    var maxVel = 6;
    var maxforce = 1.5;
    var R = 10;
    //var R = random(10, 15);

    this.update = function() {
        var desired = p5.Vector.sub(this.postarget, this.pos);
        var d = desired.mag();
        if (d < 100) {
            var m = map(d, 0, 100, 0, maxVel);
            desired.setMag(m);
        } else {
            desired.setMag(maxVel);
        }
        steer = p5.Vector.sub(desired, this.vel);
        steer.limit(maxforce); // Limit to maximum steering force

        this.acc.add(steer);
        this.vel.add(this.acc);
        this.vel.limit(maxVel);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.display = function() {
        if (this.alive == true) {
            image(this.image, this.pos.x - R, this.pos.y - R, 2 * R, 2 * R);
        }
        //ellipse(this.pos.x, this.pos.y, 25, 25);
    }
}

function part(x, y) {
    this.x = x;
    this.y = y;
}
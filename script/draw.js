const getDistance = function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

const integer_random = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let brushRadius = 3;        // ui小圆的半径
let mouseX = 0,            // 鼠标坐标
    mouseY = 0;
let isClicked = false;             // 鼠标是否按下
const canvas = $('#canvas').get(0),         // Main canvas
    hoverCanvas = $('#hover').get(0);       // co-canvas
let previousTime = new Date().getTime(),
    previousX = void 0,
    previousY = void 0;
let speed = 0;          // 画笔速度

hoverCanvas.width = canvas.width = window.innerWidth;
hoverCanvas.height = canvas.height = window.innerHeight;

// Get context
const ctx = canvas.getContext('2d');
const hoverCtx = hover.getContext('2d');

// Initialize
ctx.strokeStyle = '#000';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = brushRadius * 2;


hoverCtx.strokeStyle = '#000';
hoverCtx.lineWidth = 1;

$('#canvas').mousedown(
    function (e) {
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

        previousTime = new Date().getTime();
        previousX = e.clientX;
        previousY = e.clientY;

        isClicked = true;
    }
).mouseup(
    function () {
        isClicked = false;
    }
).mousemove(
    function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (isClicked) {        // 鼠标做“拖拽”运动的场合
            // 画笔粗细
            let currentTime = new Date();
            speed = Math.ceil(getDistance(mouseX, mouseY, previousX, previousY) * 100/(currentTime.getTime() - previousTime));
            ctx.lineWidth = speed / 10;

            // 颜色随机
            let colorString = 'rgba(' + integer_random(0, 255) + ',' + integer_random(0, 255) + ',' + integer_random(0, 255) +','+ 0.7+')'
            ctx.strokeStyle = colorString;

            ctx.s

            ctx.beginPath();
            ctx.lineTo(mouseX, mouseY);
            ctx.moveTo(mouseX, mouseY);
            ctx.stroke();

            previousTime = currentTime.getTime();
            previousX = mouseX;
            previousY = mouseY;
        }
    }
);

// 滚轮调整画笔粗细
document.getElementById('canvas').onmousewheel = function (e) {
    if (e.wheelDelta > 0) brushRadius++;
    else if (ctx.lineWidth > 0) brushRadius--;
    ctx.lineWidth = brushRadius * 2;
};

// 选择颜色
$('#colorChoose').change(function () {
    ctx.fillStyle = this.value;
});

// 清空画布
$('#clearCanvas').click(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 渲染
let render = function () {
    requestAnimationFrame(render);
    hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);

    // 笔刷ui
    hoverCtx.beginPath();
    hoverCtx.arc(mouseX, mouseY, brushRadius, 0, Math.PI * 2);
    hoverCtx.stroke();
    hoverCtx.closePath();
/*
    if (isClicked) {
        ctx.beginPath();
        ctx.lineTo(mouseX, mouseY);
        ctx.moveTo(mouseX, mouseY);
        ctx.stroke();
    }*/
};
render();
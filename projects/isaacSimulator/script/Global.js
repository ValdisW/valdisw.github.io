//===============================================================
// 全局变量
//===============================================================
let room = void 0,
    player = void 0,
    enemies = [],
    time = 0,
    score = 0,
    stats,
    fallingAcceleration = 0.3;    // 下落的加速度（如子弹）

// 记录键位
let trigger = {
    up: false,
    down: false,
    left: false,
    right: false,
    w: false,
    a: false,
    s: false,
    d: false
};

// 时间格式转化
const timeFormatter = function(sec) {
    let min = parseInt(sec / 60),           // 总分钟数
        hours = parseInt(min / 60),         // 总小时数
        seconds = sec % 60,
        minutes = min % 60;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours < 10) hours = '0' + hours;
    if (seconds < 10) seconds = '0' + seconds;

    return hours + ':' + minutes + ':' + seconds;
}

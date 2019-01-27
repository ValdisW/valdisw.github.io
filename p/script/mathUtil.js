// 线性插值
const linearInterpolation = function (val1, val2, prop) {
    return val1 + prop * (val2 - val1);
}

// 生成一个(min, max]范围内的随机数
const randNum = function (min, max) {
    return min + Math.random() * (max - min);
}


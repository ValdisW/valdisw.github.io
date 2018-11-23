// 线性灰度变换
const linearGrayTrans = function (img, f1, f2, t1, t2) {
    let k = (t2 - t1) / (f2 - f1),
        b = (f1 * t2 - f2 * t1) / (f1 - f2);
    for (let i = 0; i < img.rows; i++) {
        for (let j = 0; j < img.cols; j++) {
            let pixelData = img.ucharPtr(i, j);
            for (let c = 0; c < 3; c++) {
                if (pixelData[c] >= f1 && pixelData[c] <= f2) {
                    let a = Math.round(k * pixelData[c]);
                    pixelData[c] = a + b;
                }
            }
        }
    }
    cv.imshow('currentImgCanvas', img);      // 显示
}

// 获取某通道的直方图数据
const getHistogramData = function (img, channel) {          // 0->R, 1->G, 2->B, 3->A
    let histogramData = new Array(256);
    for (let i = 0; i < 256; i++) histogramData[i] = 0;         // initialize
    // 逐行扫描
    for (let i = 0; i < img.rows; i++)
        for (let j = 0; j < img.cols; j++) {
            let pixelData = img.ucharPtr(i, j);
            let valueData = pixelData[channel];
            histogramData[valueData]++;
        }
    return histogramData;
}

// 直方图均衡化
const histogramEqualize = function (image, originHistogram, channel) {
    let distribution = new Array(originHistogram.length);       // 计算概率分布函数
    let pixels = image.cols * image.rows;
    for (let i = 0; i < distribution.length; i++) {
        distribution[i] = 0;
        for (let j = 0; j <= i; j++) distribution[i] += originHistogram[j];
        distribution[i] /= pixels;
        distribution[i] = Math.round(distribution[i]*255);
    }

    // 均衡化后的直方图
    let newHistogram = new Array(originHistogram.length);
    for (let i = 0; i < newHistogram.length; i++) newHistogram[i] = 0;
    for (let i = 0; i < newHistogram.length; i++) {
        let index = distribution[i];
        newHistogram[index] += originHistogram[i];
    }

    // 应用到图像
    for (let i = 0; i < image.rows; i++) {
        for (let j = 0; j < image.cols; j++) {
            let pixelData = image.ucharPtr(i, j);
            pixelData[channel] = distribution[pixelData[channel]];
        }
    }
    cv.imshow('currentImgCanvas', image);
    return newHistogram;
}

const setMoveable = function (id, top, left) {                 // 该元素最好是fixed
    let ele = $('#'+id);
    let mouseDown = false,              // 判断拖动
        mouseX = void 0,                    // 按下时鼠标坐标
        mouseY = void 0,
        preTop = void 0,                    // 按下时窗口的top
        preLeft = void 0;
    ele.css({
        'position': 'fixed',
        'top': top + 'px',
        'left': left + 'px',
    }).mousedown(function (e) {             // 鼠标按下
        e = e?e:window.event;
        mouseDown = true;
        mouseX = e.clientX; mouseY = e.clientY;
        preTop = parseInt(this.style.top); preLeft = parseInt(this.style.left);
    }).mousemove(function (e) {             // 鼠标拖动（移动
        e = e?e:window.event;
        if (mouseDown) {
            ele.css('top', preTop + e.clientY - mouseY+'px');
            ele.css('left', preLeft + e.clientX - mouseX+'px');
        }
    }).mouseup(function () {                 // 鼠标松开
        mouseDown = false;
    });
}
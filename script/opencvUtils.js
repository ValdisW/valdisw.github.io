// 获取数组最小值及下标
const getMinValue = function (arr) {
    let min = arr[0],
        index = 0;
    for (let i = 1; i < arr.length; i++)
        if (arr[i] < min) {
            min = arr[i];
            index = i;
        }
    return [min, index];
}

const logFunc = function (x, a, b, c) {
    
}

// 线性灰度变换
const linearGrayTrans = function (img, f1, f2, t1, t2) {
    let k = (t2 - t1) / (f2 - f1),
        b = (f1 * t2 - f2 * t1) / (f1 - f2);
    for (let i = 0; i < img.rows; i++)
        for (let j = 0; j < img.cols; j++) {
            let pixelData = img.ucharPtr(i, j);
            for (let c = 0; c < 3; c++)
                if (pixelData[c] >= f1 && pixelData[c] <= f2) {
                    let a = Math.round(k * pixelData[c]);
                    pixelData[c] = a + b;
                }
        }
}

// 对数变换
const logGrayTrans = function (img, a, b ,c) {
    for (let i = 0; i < img.rows; i++)
        for (let j = 0; j < img.cols; j++) {
            let pixelData = img.ucharPtr(i, j);
            for (let channel = 0; channel < 3; channel++) pixelData[channel] = Math.log(pixelData[channel] + 1) / (b * Math.log(c)) + a + 0.5;
        }
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

// 获取信息熵
const getEntropy = function (img, channel) {
    let histogramData = getHistogramData(img, channel);
    const imgSize = img.rows * img.cols;
    let grayArr = [];
    for (let i = 0; i < histogramData.length; i++)
        if (histogramData[i]) {         // 该灰度值有对应的像素点
            grayArr.push({
                gray: i,
                probability: histogramData[i] / imgSize,
            })
        }
    let sum = 0;
    for (let i = 0; i < grayArr.length; i++) sum += Math.log2(grayArr[i].probability) * grayArr[i].probability
    sum *= -1;
    return sum;
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

// 图像加法
const imgAddition = function (img1, img2) {
   // if (img1.rows === img2.rows && img1.cols === img2.cols) {;
        for (let i = 0; i < img1.rows; i++) {
            for (let j = 0; j < img1.cols; j++) {
                let pixelData1 = img1.ucharPtr(i, j);
                let pixelData2 = img2.ucharPtr(i, j);
                if (pixelData2) {
                    for (let c = 0; c < 3; c++) {
                        pixelData1[c] = Math.round((pixelData1[c] + pixelData2[c]) / 2);
                    }
                }
            }
        }
  //  }
}

// 图像减法
const imgSubduction = function (img1, img2) {
  //  if (img1.rows === img2.rows && img1.cols === img2.cols) {
        for (let i = 0; i < img1.rows; i++) {
            for (let j = 0; j < img1.cols; j++) {
                let pixelData1 = img1.ucharPtr(i, j);
                let pixelData2 = img2.ucharPtr(i, j);
                if (pixelData2) {
                    for (let c = 0; c < 3; c++) {
                        pixelData1[c] = Math.round(pixelData1[c] - pixelData2[c]);
                    }
                }
            }
        }
 //   }
}

// 椒盐噪声
const addSaltAndPepperNoise = function (img, quantity) {
    let imgHeight = img.rows;
    let imgWidth = img.cols;
    for (let i = 0; i < quantity; i++) {
        let noiseX = Math.round(Math.random() * imgWidth);
        let noiseY = Math.round(Math.random() * imgHeight);
        let colorValue = Math.round(Math.random()) * 255;
        for (let c = 0; c < 3; c++) img.ucharPtr(noiseY, noiseX)[c] = colorValue;
    }
}

// 高斯噪声（伪）
const addGaussianNoise = function (img, quantity) {
    let imgHeight = img.rows;
    let imgWidth = img.cols;
    for (let i = 0; i < quantity; i++) {
        let noiseX = Math.round(Math.random() * imgWidth);
        let noiseY = Math.round(Math.random() * imgHeight);
        let colorValue = (Math.round(Math.random()) * 2 - 1) * Math.round(Math.random() * 255);
        for (let c = 0; c < 3; c++) img.ucharPtr(noiseY, noiseX)[c] += colorValue;
    }
}

// 均值滤波
const averageSmooth = function (img, channel, templeteSize) {
    // 计算各像素点的新值
    let ouputImg = new Array(img.rows - templeteSize);
    for (let i = 0; i < ouputImg.length; i++) {
        ouputImg[i] = new Array(img.cols - templeteSize);
        for (let j = 0; j < img.cols - templeteSize; j++) {
            let averageValue = 0;   // 计算均值
            for (let m = 0; m < templeteSize; m++)
                for (let n = 0; n < templeteSize; n++)
                    averageValue += img.ucharPtr(i + m, j + n)[channel];
            averageValue = Math.round(averageValue / (templeteSize * templeteSize));
            ouputImg[i][j] = averageValue;
        }
    }
    // 应用到图像
    for (let i = 0; i < img.rows; i++)
        for (let j = 0; j < img.cols; j++)
            img.ucharPtr(i, j)[channel] = 0;

    for (let i = 0; i < img.rows - templeteSize; i++)
        for (let j = 0; j < img.cols - templeteSize; j++)
            img.ucharPtr(i + Math.round(templeteSize / 2), j + Math.round(templeteSize / 2))[channel] = ouputImg[i][j];
}

// 中值滤波
const midValueSmooth = function (img, channel, templeteSize) {
    // 计算各像素点的新值
    let ouputImg = new Array(img.rows - templeteSize);
    for (let i = 0; i < ouputImg.length; i++) {
        ouputImg[i] = new Array(img.cols - templeteSize);
        for (let j = 0; j < img.cols - templeteSize; j++) {
            let tempArr = [];
            for (let m = 0; m < templeteSize; m++)
                for (let n = 0; n < templeteSize; n++)
                    tempArr.push(img.ucharPtr(i + m, j + n)[channel]);
            tempArr.sort(function(a, b) {return a - b;});
            let middleValue = tempArr[Math.ceil(tempArr.length / 2)];
            ouputImg[i][j] = middleValue;
        }
    }
    // 应用到图像
    for (let i = 0; i < img.rows; i++)
        for (let j = 0; j < img.cols; j++)
            img.ucharPtr(i, j)[channel] = 0;

    for (let i = 0; i < img.rows - templeteSize; i++)
        for (let j = 0; j < img.cols - templeteSize; j++)
            img.ucharPtr(i + Math.round(templeteSize / 2), j + Math.round(templeteSize / 2))[channel] = ouputImg[i][j];
}

// Huffman编码
const huffmanCoding = function (img, channel) {
    let histogramData = getHistogramData(img, channel);
    const imgSize = img.rows * img.cols;
    let huffmanArr = [];
    for (let i = 0; i < histogramData.length; i++)
        if (histogramData[i]) {         // 该灰度值有对应的像素点
            huffmanArr.push({
                rank: 0,
                gray: i,
                originProbability: histogramData[i] / imgSize,
                probability: histogramData[i] / imgSize,
                code: ''
            })
        }
    huffmanArr.sort(function (a, b) {return a.probability - b.probability});        // 按概率升序排序
    for (let i = 0; i < huffmanArr.length; i++) huffmanArr[i].rank = i;

    for (let i = 0; i < huffmanArr.length - 1; i ++) {
        for (let k = 0; k < huffmanArr.length; k++) {
            if (huffmanArr[k].rank === huffmanArr[i].rank) huffmanArr[k].code = '1' + huffmanArr[k].code;
            if (huffmanArr[k].rank === huffmanArr[i + 1].rank) huffmanArr[k].code = '0' + huffmanArr[k].code;
        }

        huffmanArr[i + 1].probability += huffmanArr[i].probability;

        for (let k = 0; k < huffmanArr.length; k ++)
            if (huffmanArr[k].rank === huffmanArr[i].rank) huffmanArr[k].rank = huffmanArr[i + 1].rank;

        let newHuffmanArr = huffmanArr.slice(i + 1, huffmanArr.length);
        newHuffmanArr.sort(function (a, b) {return a.probability - b.probability});
        huffmanArr = huffmanArr.slice(0, i + 1).concat(newHuffmanArr);
    }

    huffmanArr.sort(function (a, b) {return a.gray - b.gray});        // 按灰度升序排序

    // 计算平均码字长度
    let averageLength = 0;
    for (let i = 0; i < huffmanArr.length; i++) averageLength += huffmanArr[i].originProbability * huffmanArr[i].code.length;
    return [huffmanArr, averageLength];
}

// Shannon-Fano编码
const shannonFanoCoding = function (img, channel) {
    let histogramData = getHistogramData(img, channel);
    const imgSize = img.rows * img.cols;
    let sfArr = [];
    for (let i = 0; i < histogramData.length; i++)
        if (histogramData[i]) {         // 该灰度值有对应的像素点
            sfArr.push({
                gray: i,                                                                             // 灰度
                originProbability: histogramData[i] / imgSize,          // 概率
                code: ''                                                                        // 编码序列
            })
        }
    sfArr.sort(function (a, b) {return b.originProbability - a.originProbability});        // 按概率降序排序

    const sfCoding = function (arr) {            // 递归函数
        if (arr.length > 1) {
            let tempArr = new Array(arr.length);
            for (let i = 0 ; i < tempArr.length; i++) {
                tempArr[i] = 0;
                for (let j = 0; j <= i; j++) tempArr[i] += arr[j].originProbability;
            }
            for (let i = 0; i < tempArr.length; i++) tempArr[i] = Math.abs(tempArr[i] - tempArr[tempArr.length - 1] / 2);
            let tempIndex = getMinValue(tempArr)[1] + 1;
            for (let i = 0; i < tempIndex; i++) arr[i].code += '0';
            for (let i = tempIndex; i < arr.length; i++) arr[i].code += '1';
            sfCoding(arr.slice(0, tempIndex));
            sfCoding(arr.slice(tempIndex, arr.length));
        }
    }
    sfCoding(sfArr);
    // 计算平均码字长度
    let averageLength = 0;
    for (let i = 0; i < sfArr.length; i++) averageLength += sfArr[i].originProbability * sfArr[i].code.length;
    return [sfArr, averageLength];
}

// 设置为可拖动
const setMoveable = function (id, top, left) {
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
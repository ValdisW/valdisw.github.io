let currentSelectedPixelCoors = [];

// 正态分布（高斯分布）
function normalRand(meanVal, std){          // 均值和标准差
    let u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do{
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    }while(w === 0.0 || w >= 1.0)
    c = Math.sqrt((-2 * Math.log(w)) / w);
    return meanVal + std * u*c;
}

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
};

const logFunc = function (x, a, b, c) {

};

// 二值化
const binarize = function (fromImg, toImg, threshold) {
    cv.cvtColor(fromImg, toImg, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(toImg, toImg, threshold, 255, cv.THRESH_BINARY);
};

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
};

// 对数变换
const logGrayTrans = function (img, a, b ,c) {
    for (let i = 0; i < img.rows; i++)
        for (let j = 0; j < img.cols; j++) {
            let pixelData = img.ucharPtr(i, j);
            for (let channel = 0; channel < 3; channel++) pixelData[channel] = Math.log(pixelData[channel] + 1) / (b * Math.log(c)) + a + 0.5;
        }
};

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
};

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
};

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
};

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
};

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
};

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
const addGaussianNoise = function (img) {
    // 获取原图的HSV版本
    let temp_mat = new cv.Mat();
    cv.cvtColor(img, temp_mat, cv.COLOR_RGBA2RGB, 0);
    cv.cvtColor(temp_mat, temp_mat, cv.COLOR_RGB2HSV, 0);

    for (let i = 0; i < temp_mat.rows; i++)
        for (let j = 0; j < temp_mat.cols; j++) {
            let pixelData = temp_mat.ucharPtr(i, j)[2];         // 获取V值
            temp_mat.ucharPtr(i, j)[2] = normalRand(pixelData, 5);
        }
    cv.cvtColor(temp_mat, img, cv.COLOR_HSV2RGB, 0);
};

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
};

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
};

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
};

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
    };
    sfCoding(sfArr);
    // 计算平均码字长度
    let averageLength = 0;
    for (let i = 0; i < sfArr.length; i++) averageLength += sfArr[i].originProbability * sfArr[i].code.length;
    return [sfArr, averageLength];
};

// 边缘检测
const robertsOperatorBorderDetect = function (fromImg, toImg, operator) {
    let temp_mat = new cv.Mat();

    cv.cvtColor(fromImg, toImg, cv.COLOR_RGBA2RGB, 0);
    cv.cvtColor(toImg, temp_mat, cv.COLOR_RGB2HSV, 0);
    if (operator === 0) {                       // Roberts算子
        for (let i = 1; i < temp_mat.rows - 1; i++)
            for (let j = 1; j < temp_mat.cols - 1; j++) {
                let x = temp_mat.ucharPtr(i, j)[2] - temp_mat.ucharPtr(i-1, j-1)[2];
                let y = temp_mat.ucharPtr(i-1, j)[2] - temp_mat.ucharPtr(i, j-1)[2];
                let t = Math.ceil(Math.sqrt(x*x + y*y));
                for (let c = 0; c < 3; c++) toImg.ucharPtr(i, j)[c] = t;
            }
    }
    else if (operator === 1) {              // Sobel算子
        for (let i = 1; i < temp_mat.rows - 1; i++)
            for (let j = 1; j < temp_mat.cols - 1; j++) {
                let x = (temp_mat.ucharPtr(i-1, j-1)[2] + 2 * temp_mat.ucharPtr(i-1, j)[2] + temp_mat.ucharPtr(i-1, j+1)[2] - temp_mat.ucharPtr(i+1, j-1)[2] - 2 * temp_mat.ucharPtr(i+1, j)[2] - temp_mat.ucharPtr(i+1, j+1)[2]) / 4;
                let y = (temp_mat.ucharPtr(i-1, j+1)[2] + 2 * temp_mat.ucharPtr(i, j+1)[2] + temp_mat.ucharPtr(i+1, j+1)[2] - temp_mat.ucharPtr(i-1, j-1)[2] - 2 * temp_mat.ucharPtr(i, j-1)[2] - temp_mat.ucharPtr(i+1, j-1)[2]) / 4;
                    let t = Math.ceil(Math.sqrt(x*x + y*y));
                for (let c = 0; c < 3; c++) toImg.ucharPtr(i, j)[c] = t;
            }
    }
    else if (operator === 2) {              // Prewitt算子
        for (let i = 1; i < temp_mat.rows - 1; i++)
            for (let j = 1; j < temp_mat.cols - 1; j++) {
                let x = (temp_mat.ucharPtr(i-1, j+1)[2] + temp_mat.ucharPtr(i, j+1)[2] + temp_mat.ucharPtr(i+1, j+1)[2] - temp_mat.ucharPtr(i-1, j-1)[2] - temp_mat.ucharPtr(i, j-1)[2] - temp_mat.ucharPtr(i+1, j-1)[2]) / 3;
                let y = (temp_mat.ucharPtr(i-1, j-1)[2] + temp_mat.ucharPtr(i-1, j)[2] + temp_mat.ucharPtr(i-1, j+1)[2] - temp_mat.ucharPtr(i+1, j-1)[2] - temp_mat.ucharPtr(i+1, j)[2] - temp_mat.ucharPtr(i+1, j+1)[2]) / 3;
                let t = Math.ceil(Math.sqrt(x*x + y*y));
                for (let c = 0; c < 3; c++) toImg.ucharPtr(i, j)[c] = t;
            }
    }
    else if (operator === 3) {              // Laplacian算子
        for (let i = 1; i < temp_mat.rows - 1; i++)
            for (let j = 1; j < temp_mat.cols - 1; j++) {
                let t = (4 * temp_mat.ucharPtr(i, j)[2] - temp_mat.ucharPtr(i+1, j)[2] - temp_mat.ucharPtr(i-1, j)[2] - temp_mat.ucharPtr(i, j+1)[2] - temp_mat.ucharPtr(i, j-1)[2]) / 4;
                for (let c = 0; c < 3; c++) toImg.ucharPtr(i, j)[c] = t;
            }
    }
    temp_mat.delete();
}

// 迭代阈值分割
const thresholdSplit = function (fromImg, toImg) {
    let temp_mat = new cv.Mat();
    cv.cvtColor(fromImg, temp_mat, cv.COLOR_RGBA2RGB, 0);
    cv.cvtColor(temp_mat, temp_mat, cv.COLOR_RGB2HSV, 0);

    let histoData = getHistogramData(temp_mat, 2);          // 获取明度的直方图信息
    let max_gray = void 0,              // 直方图的最大灰度值
        min_gray = void 0,                // 直方图的最小灰度值
        middle_gray = -1,          // 直方图的灰度中值
        new_middle_gray = void 0;
    // 先求初始的中值

    for (let i = 0; i < histoData.length; i++) if (histoData[i]) {min_gray = i;break};
    for (let i = histoData.length - 1; i >= 0; i--) if (histoData[i]) {max_gray = i; break};
    new_middle_gray = Math.round((max_gray + min_gray) / 2);


    // 迭代
    while (Math.abs(middle_gray - new_middle_gray) > 1){
        let temp = 0,
            smaller_part = 0,                  // 以中值对直方图分割，较小灰度值范围的灰度均值
            bigger_part = 0;                   // 以中值对直方图分割，较大灰度值范围的灰度均值

        middle_gray = new_middle_gray;

        // 求两部分的均值
        for (let i = 0; i < middle_gray; i++)  {
            smaller_part += histoData[i] * i;
            temp += histoData[i];
        }
        smaller_part /= temp;
        temp = 0;
        for (let i = middle_gray; i < histoData.length; i++)  {
            bigger_part += histoData[i] * i;
            temp += histoData[i];
        }
        bigger_part /= temp;

        new_middle_gray = Math.round((smaller_part + bigger_part) / 2);
    }
    console.log(new_middle_gray );
    binarize(fromImg, toImg, new_middle_gray);
}

// 区域生长分割
const regionGrowingSplit = function (fromImg, x, y, threshold) {
    // 原图的HSV版本
    let temp_mat = new cv.Mat();
    cv.cvtColor(fromImg, temp_mat, cv.COLOR_RGBA2RGB, 0);
    cv.cvtColor(temp_mat, temp_mat, cv.COLOR_RGB2HSV, 0);

    let currentValue = temp_mat.ucharPtr(x, y)[2];              // 获取原始像素点的明度，所有其他像素点与之比较

    currentSelectedPixelCoors = [];
    regionGrowingSplit_recur(temp_mat, currentValue, x, y, threshold);
    console.log(currentSelectedPixelCoors);
}

// 区域生长的递归函数，如果当前像素点的明度与原始像素点明度之差小于阈值，就将该点加入被选中的数组中，并向周围扩散调用
const regionGrowingSplit_recur = function (img, centerValue, x, y, threshold) {
    if (Math.abs(img.ucharPtr(x, y)[2] - centerValue) <= threshold) {
        currentSelectedPixelCoors.push([x, y].toString());
        if (x > 0 && (!currentSelectedPixelCoors.includes([x-1, y].toString()))) regionGrowingSplit_recur(img, centerValue, x - 1, y, threshold);
        if (y < img.rows && (!currentSelectedPixelCoors.includes([x, y+1].toString()))) regionGrowingSplit_recur(img, centerValue, x, y + 1, threshold);
        if (x < img.cols && (!currentSelectedPixelCoors.includes([x+1, y].toString()))) regionGrowingSplit_recur(img, centerValue, x + 1, y, threshold);
        if (y > 0 && (!currentSelectedPixelCoors.includes([x, y-1].toString()))) regionGrowingSplit_recur(img, centerValue, x, y - 1, threshold);
    }
}

// 设置为可拖动
const setMoveable = function (moveSelector, dragSelector, top, left) {
    let ele = $(moveSelector);
    let dragBar = $(dragSelector);
    let mouseDown = false,              // 判断拖动
        mouseX = void 0,                    // 按下时鼠标坐标
        mouseY = void 0,
        preTop = void 0,                    // 按下时窗口的top
        preLeft = void 0;
    ele.css({
        'position': 'fixed',
        'top': top + 'px',
        'left': left + 'px',
    });
    dragBar.mousedown(function (e) {             // 鼠标按下
        e = e?e:window.event;
        mouseDown = true;
        mouseX = e.clientX; mouseY = e.clientY;
        preTop = parseInt(ele.get(0).style.top); preLeft = parseInt(ele.get(0).style.left);
    }).mouseup(function () {                 // 鼠标松开
        mouseDown = false;
    });
    $(document).mousemove(function (e) {             // 鼠标拖动（移动
        e = e?e:window.event;
        if (mouseDown) {
            ele.css('top', preTop + e.clientY - mouseY+'px');
            ele.css('left', preLeft + e.clientX - mouseX+'px');
        }
    })
};
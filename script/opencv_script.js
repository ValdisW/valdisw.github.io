const colorArr = ['#F77', '#7F7', '#77F'];
let currentMat = void 0;

function onOpenCvReady() {
    $('#black, #waiting').fadeOut(300);
}

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

// 读取图片
const srcImg = $('#srcImg')[0];           // 原图的img标签
$('#srcImgInputButton').change(function(e) {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
});
srcImg.onload = function () {
    let srcMat = cv.imread(srcImg);
    currentMat = srcMat;
    $('#img_size').html(currentMat.size().width + '×' + currentMat.size().height);
    $('#img_channels').html(currentMat.channels());
    $('#img_depth').html(currentMat.depth());
    $('#img_type').html(currentMat.type());

    // 添加canvas元素用于显示打开的图像，并附加于div窗口上
    let imageCanvas = $('<canvas id="currentImgCanvas"></canvas>');
    $('#mainFrame').append(imageCanvas);
    let currentImgCanvas = $('#currentImgCanvas');
    let mouseDown = false,              // 判断拖动
        mouseX = void 0,                    // 按下时鼠标坐标
        mouseY = void 0,
        preTop = void 0,                    // 按下时窗口的top
        preLeft = void 0;
    currentImgCanvas.css({
        'display': 'inline-block',
        'cursor': 'move',
        'position': 'fixed',
        'top': '80px',
        'left': '80px',
    }).mousedown(function (e) {             // 鼠标按下
        e = e?e:window.event;
        mouseDown = true;
        mouseX = e.clientX; mouseY = e.clientY;
        preTop = parseInt(this.style.top); preLeft = parseInt(this.style.left);
    }).mousemove(function (e) {             // 鼠标拖动（移动
        e = e?e:window.event;
        if (mouseDown) {
            currentImgCanvas.css('top', preTop + e.clientY - mouseY+'px');
            currentImgCanvas.css('left', preLeft + e.clientX - mouseX+'px');
        }
    }).mouseup(function () {                 // 鼠标松开
        mouseDown = false;
    });
    cv.imshow('currentImgCanvas', srcMat);      // 显示
    //srcMat.delete();
};

// 灰度变换
$('#linearGrayTransButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else{
        $('#grayPanel, #black').css('display', 'block');
        let grayChartBlock = $('#grayChart').css({
            'width': '300px',
            'height': '300px'
        })[0];
        let grayChart = echarts.init(grayChartBlock);
        let grayOption = {
            xAxis: {
                type: 'value',
                max: 255,
                splitNumber: 3,
                axisTick: {show: false},
                axisLine: {lineStyle: {color: '#555'}},
                axisLabel: {color: '#DDD'},
                splitLine: {lineStyle: {color: '#555'}}
            },
            yAxis: {
                max: 255,
                splitNumber: 3,
                axisTick: {show: false},
                axisLine: {lineStyle: {color: '#555'}},
                axisLabel: {color: '#DDD'},
                splitLine: {lineStyle: {color: '#555'}}
            },
            series: {
                type: 'line',
                symbol: 'none',
                lineStyle: {
                    color: '#FFF',
                    width: 1
                },
                data: [[0, 0], [255, 255]]
            },
            animation: false
        };
        grayChart.setOption(grayOption);
    }
});
$('#grayPanel button').click(function () {
    linearGrayTrans(currentMat, 0, 128, 0, 32);
    $('#grayPanel, #black').css('display', 'none');
});

// 直方图变换
$('#histogramTransButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#histogramPanel, #black').css('display', 'block');       // 弹出窗口

        let channelMode = 0;

        // initialize
        let histogramData = getHistogramData(currentMat, channelMode);        // 获取直方图数据
        let histogramData_2 = new Array(getHistogramData.length);   // 转化成二维数组用于echarts绘制
        for (let i = 0; i < histogramData.length; i++) {
            histogramData_2[i] = new Array(2);
            histogramData_2[i][0] = i;
            histogramData_2[i][1] = histogramData[i];
        }

        let histogramChartBlock = $('#histogramChart').css({
            'width': '500px',
            'height': '300px'
        })[0];
        let histogramChart = echarts.init(histogramChartBlock);
        let histogramOption = {
            tooltip: {
                formatter: function (params){
                    return params[0].value[1];
                },
                trigger: 'axis',
                axisPointer: {},
            },
            xAxis: {
                name: 'x',
                type: 'value',
                max: 255,
                axisTick: {show: false},
                axisLine: {lineStyle: {color: '#555'}},
                axisLabel: {color: '#DDD'},
                splitLine: {lineStyle: {color: '#555'}}
            },
            yAxis: {
                name: 'y',
                axisTick: {show: false},
                axisLine: {lineStyle: {color: '#555'}},
                axisLabel: {color: '#DDD'},
                splitLine: {lineStyle: {color: '#555'}}
            },
            series: {
                type: 'bar',
                data: histogramData_2,
                barMaxWidth: 7,
                itemStyle: {color: colorArr[0]},
            }
        };
        histogramChart.setOption(histogramOption);

        let channelInputs = $('.channelInput');
        for (let channelInput = 0; channelInput < channelInputs.length; channelInput++) {
            channelInputs[channelInput].onchange = function () {
                histogramData = getHistogramData(currentMat, channelInput);        // 获取直方图数据
                histogramData_2 = new Array(getHistogramData.length);   // 转化成二维数组用于echarts绘制
                for (let i = 0; i < histogramData.length; i++) {
                    histogramData_2[i] = new Array(2);
                    histogramData_2[i][0] = i;
                    histogramData_2[i][1] = histogramData[i];
                }
                histogramOption.series.data = histogramData_2;
                histogramOption.series.itemStyle.color = colorArr[channelInput];
                histogramChart.setOption(histogramOption);
            }
            $('#ifEqualize').change(function () {
                if (this.checked) {             // checkbox被选中
                    histogramData = histogramEqualize(currentMat, getHistogramData(currentMat, channelInput), channelInput);
                    histogramData_2 = new Array(getHistogramData.length);   // 转化成二维数组用于echarts绘制
                    for (let i = 0; i < histogramData.length; i++) {
                        histogramData_2[i] = new Array(2);
                        histogramData_2[i][0] = i;
                        histogramData_2[i][1] = histogramData[i];
                    }
                    histogramOption.series.data = histogramData_2;
                    histogramOption.series.itemStyle.color = colorArr[channelInput];
                    histogramChart.setOption(histogramOption);
                }
            });
        }
    }
});
$('#histogramPanel button').click(function () {
    $('#histogramPanel, #black').css('display', 'none');
});
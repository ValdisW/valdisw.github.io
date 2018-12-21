const colorbarArr = ['#F77', '#7F7', '#77F'];
let currentMat = void 0;
let tempMat = void 0;               // 用于预览

function onOpenCvReady() {
    $('#black, #waiting').fadeOut(300);
}

// 读取图片
const srcImg = $('#srcImg')[0];           // 原图的img标签
$('#srcImgInputButton').change(function(e) {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
});
srcImg.onload = function () {
    let srcMat = cv.imread(srcImg);
    currentMat = srcMat;
    tempMat = new cv.Mat();

    // 添加canvas元素用于显示打开的图像，并附加于div窗口上
    let imageCanvas = $('<canvas id="currentImgCanvas"></canvas>');
    $('body').append(imageCanvas);
    let currentImgCanvas = $('#currentImgCanvas');
    let mouseDown = false,              // 判断拖动
        mouseX = void 0,                    // 按下时鼠标坐标
        mouseY = void 0,
        preTop = void 0,                    // 按下时窗口的top
        preLeft = void 0;
    currentImgCanvas.css({
        'display': 'inline-block',
        'cursor': 'move',
        'z-index': '10'
    });
    setMoveable('#currentImgCanvas', '#currentImgCanvas', 80, 180);
    cv.imshow('currentImgCanvas', srcMat);      // 显示
    //srcMat.delete();
};

// 灰度变换
let grayMode;
let grayOption;
$('#linearGrayTransButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else{
        $('#grayPanel, #black').css('display', 'block');
        setMoveable('#grayPanel', '#grayPanel .dragBar',100, 100);
        let grayChartBlock = $('#grayChart').css({
            'width': '300px',
            'height': '300px'
        })[0];
        let grayChart = echarts.init(grayChartBlock);
        grayMode = parseInt($('#grayModeSelect').val());

        let data_gray = [[0, 0], [255, 255]];
        let data_log = new Array(256);
        for (let i = 0; i < data_log.length; i++) {
            data_log[i] = new Array(2);
            data_log[i][0] = i;
            data_log[i][1] = Math.log(i + 1) / (parseFloat($('#para_b').val()) * Math.log(parseFloat($('#para_c').val()))) + parseFloat($('#para_a').val()) + 0.5;
        }
        grayOption = {
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
                data: data_gray
            },
            animation: false
        };
        grayChart.setOption(grayOption);

        $('#grayModeSelect').change(function () {
            grayMode = parseInt($('#grayModeSelect').val());
            // 面板切换
            if (grayMode) {                     // 对数
                $('#linearPart').css('display', 'none');
                $('#expPart').css('display', 'block');
                grayOption.series.data = data_log;
            } else {                                     // 线性
                $('#linearPart').css('display', 'block');
                $('#expPart').css('display', 'none');
                grayOption.series.data = data_gray;
            }
            // 图像切换
            grayChart.setOption(grayOption);
        })

        $('#para_a, #para_b, #para_c').change(function () {
            let data_log = new Array(256);
            for (let i = 0; i < data_log.length; i++) {
                data_log[i] = new Array(2);
                data_log[i][0] = i;
                data_log[i][1] = Math.log(i + 1) / (parseFloat($('#para_b').val()) * Math.log(parseFloat($('#para_c').val()))) + parseFloat($('#para_a').val()) + 0.5;
            }
            grayOption.series.data = data_log;
            grayChart.setOption(grayOption);
        });

        $('#from_min, #from_max, #to_min, #to_max').change(function () {
            grayOption.series.data[1][0] = parseInt($('#from_min').val());
            grayOption.series.data = [[0, 0], [parseInt($('#from_min').val()), parseInt($('#from_min').val())], [parseInt($('#from_min').val()), parseInt($('#to_min').val())], [parseInt($('#from_max').val()), parseInt($('#to_max').val())], [parseInt($('#from_max').val()), parseInt($('#from_max').val())], [255, 255]];
            grayChart.setOption(grayOption);
        });
    }
});

$('#grayPanel button').click(function () {      // 确定
    if (grayMode) {                 // 对数
        logGrayTrans(currentMat,
            parseInt($('#para_a').val()),
            parseInt($('#para_b').val()),
            parseInt($('#para_c').val())
        )
    }else {
        linearGrayTrans(currentMat,
            parseInt($('#from_min').val()),
            parseInt($('#from_max').val()),
            parseInt($('#to_min').val()),
            parseInt($('#to_max').val())
        );
    }
    cv.imshow('currentImgCanvas', currentMat);      // 显示
    $('#grayPanel, #black').css('display', 'none');
});

// 直方图变换
$('#histogramTransButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#histogramPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#histogramPanel', '#histogramPanel .dragBar', 100, 100);
        let channelMode = parseInt($('#histogramChannelSelect').val());

        // initialize
        //$('.channelInput:first')[0].checked = true;         // 默认通道选红色
        let histogramData = getHistogramData(currentMat, channelMode);        // 获取直方图数据
        let histogramData_2 = new Array(getHistogramData.length);                   // 转化成二维数组，用于echarts绘制
        for (let i = 0; i < histogramData.length; i++) {
            histogramData_2[i] = new Array(2);
            histogramData_2[i][0] = i;
            histogramData_2[i][1] = histogramData[i];
        }

        let histogramChartBlock = $('#histogramChart').css({            // 获取并设置直方图图表大小
            'width': '100%',
            'height': '300px',
            'margin': '0 auto'
        })[0];
        let histogramChart = echarts.init(histogramChartBlock);     // 初始绘图
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
                itemStyle: {color: colorbarArr[channelMode]},
            }
        };
        histogramChart.setOption(histogramOption);

        let currentChannel = parseInt($('#histogramChannelSelect').val());   // 当前通道

        $('#histogramChannelSelect').change(function () {         // 选择通道
            currentChannel = parseInt($('#histogramChannelSelect').val());                                                                          // 调整当前通道
            histogramData = getHistogramData(currentMat, currentChannel);        // 获取直方图数据
            histogramData_2 = new Array(getHistogramData.length);                      // 转化成二维数组用于echarts绘制
            for (let i = 0; i < histogramData.length; i++) {
                histogramData_2[i] = new Array(2);
                histogramData_2[i][0] = i;
                histogramData_2[i][1] = histogramData[i];
            }
            histogramOption.series.data = histogramData_2;
            histogramOption.series.itemStyle.color = colorbarArr[currentChannel];
            histogramChart.setOption(histogramOption);
        });
        $('#ifEqualize').click(function () {                // 单击“均衡化”
            histogramData = histogramEqualize(currentMat, getHistogramData(currentMat, currentChannel), currentChannel);
            histogramData_2 = new Array(getHistogramData.length);               // 转化成二维数组用于echarts绘制
            for (let i = 0; i < histogramData.length; i++) {
                histogramData_2[i] = new Array(2);
                histogramData_2[i][0] = i;
                histogramData_2[i][1] = histogramData[i];
            }
            histogramOption.series.data = histogramData_2;
            histogramOption.series.itemStyle.color = colorbarArr[currentChannel];
            histogramChart.setOption(histogramOption);
        });
    }
});
$('#histogramPanel button:last').click(function () {
    $('#histogramPanel, #black').css('display', 'none');
});

// 图像加减
let operationImg = $('#operationImg').get(0);
let operationMat = void 0;
let plusOrMinusMode;
$('#plusOrMinusButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#plusOrMinusPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#plusOrMinusPanel', '#plusOrMinusPanel .dragBar', 100, 100);
        plusOrMinusMode = 0;            // 默认为加法
    }
});

$('#plusOrMinusInputButton').change(function(e) {
    operationImg.src = URL.createObjectURL(e.target.files[0]);
});

$('#plusOrMinusSelect').change(function () {        // 更改模式
    plusOrMinusMode = parseInt($('#plusOrMinusSelect').val());
});

operationImg.onload = function () {
    let srcMat = cv.imread(operationImg);
    operationMat = srcMat;
}

$('#plusOrMinusPanel button:last').click(function () {
    $('#plusOrMinusPanel, #black').css('display', 'none');
    if (!operationMat) {
        alert('请选择要操作的图片！');
    }else{

        if (!plusOrMinusMode) {          // 加法
            imgAddition(currentMat, operationMat);
        } else {                  // 减法
            imgSubduction(currentMat, operationMat);
        }
        cv.imshow('currentImgCanvas', currentMat);      // 显示
    }
});

// 空域平滑滤波
let filterMode;
$('#spatialSmoothButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#spacialSmoothPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#spacialSmoothPanel', '#spacialSmoothPanel .dragBar', 100, 100);
        filterMode = 0;             // 默认为均值滤波
    }
});

$('#filterModeSelect').change(function () {        // 更改模式
    filterMode = parseInt($('#filterModeSelect').val());
});

$('#spacialSmoothPanel button:last').click(function () {
    if (!filterMode) for (let c = 0; c < 3; c++) averageSmooth(currentMat, c, parseInt($('#templetSize').val()));
    else for (let c = 0; c < 3; c++) midValueSmooth(currentMat, c, parseInt($('#templetSize').val()));
    cv.imshow('currentImgCanvas', currentMat);      // 显示
    $('#spacialSmoothPanel, #black').css('display', 'none');
});

// 添加噪声
let noiseIntensity, noiseType;
$('#addNoiseButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#addNoisePanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#addNoisePanel', '#addNoisePanel .dragBar', 100, 100);
        noiseIntensity = $("#noiseIntensity").val() / 100 * currentMat.cols * currentMat.rows;
        noiseType = 0;
    }
});

$('#noiseTypeSelect').change(function () {
    noiseType = parseInt($('#noiseTypeSelect').val());
});

$('#addNoisePanel button:last').click(function () {
    if (!noiseType) addSaltAndPepperNoise(currentMat, Math.round(noiseIntensity));
    else addGaussianNoise(currentMat);
    cv.imshow('currentImgCanvas', currentMat);      // 显示
    $('#addNoisePanel, #black').css('display', 'none');
});

// 编/解码
let codingAlgo, codingChannel, codingResult, codingResults;
$('#codingAndDecodingButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#codingAndDecodingPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#codingAndDecodingPanel', '#codingAndDecodingPanel .dragBar',100, 100);
        codingAlgo = 0;             // 默认为Huffman编码
        codingChannel = 0;       // 默认通道为红色
        $('#codingChannelSelect').change();
    }
});

$('#codingChannelSelect').change(function () {
    codingChannel = parseInt($('#codingChannelSelect').val());
    $('#entropy').val(getEntropy(currentMat, codingChannel));
    $('#codingAlgoSelect').change();
});

$('#codingAlgoSelect').change(function () {
    codingAlgo = parseInt($('#codingAlgoSelect').val());
    switch (codingAlgo) {
        case 0:                     // Huffman编码
            codingResults = huffmanCoding(currentMat, codingChannel);
            codingResult = codingResults[0];
            $('#averageCodeLength').val(codingResults[1]);
            $('#codingEfficiency').val(getEntropy(currentMat, codingChannel) / codingResults[1] * 100 + '%');
            break;
        case 1:                     // Shannon-Fano编码
            codingResults = shannonFanoCoding(currentMat, codingChannel);
            codingResult = codingResults[0];
            $('#averageCodeLength').val(codingResults[1]);
            $('#codingEfficiency').val(getEntropy(currentMat, codingChannel) / codingResults[1] * 100 + '%');
            break;
        case 2:                     // 算术编码
            break;
    }

    // 更新表格
    $('#codingTable table').empty();
    $('#codingTable table').append($('<tr><th>灰度</th><th>概率</th><th>编码</th><th>码字长度</th></tr>'));
    for (let i = 0; i < codingResult.length; i++) {
        $('#codingTable table').append($('<tr>' + '<td>' + codingResult[i].gray + '</td>' + '<td>' + codingResult[i].originProbability + '</td>' + '<td>' + codingResult[i].code + '</td>' + '<td>' + codingResult[i].code.length + '</td>' + '</tr>'));
    }
});

$('#codingAndDecodingPanel button:last').click(function () {
    $('#codingAndDecodingPanel, #black').css('display', 'none');
});

// 二值化
let threshold = void 0;
$('#binarizeButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#binarizePanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#binarizePanel', '#binarizePanel .dragBar', 100, 100);
        plusOrMinusMode = 0;            // 默认为加法
        $('#threshold').change();
    }
});
$('#binarizePanel .confirm').click(function () {         // 单击确定
    $('#binarizePanel, #black').css('display', 'none');
    currentMat = tempMat.clone();
    cv.imshow('currentImgCanvas', currentMat);
});
$('#binarizePanel .cancel').click(function () {         // 单击取消
    $('#binarizePanel, #black').css('display', 'none');
    cv.imshow('currentImgCanvas', currentMat);
});
$('#threshold').change(function () {
    threshold = parseInt($('#threshold').val());
    binarize(currentMat, tempMat, threshold);
    cv.imshow('currentImgCanvas', tempMat);
});

// 边缘检测
let operator = void 0;
$('#borderDetectButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#borderDetectPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#borderDetectPanel', '#borderDetectPanel .dragBar', 100, 100);
        $('#operatorSelect').change();
    }
});
$('#borderDetectPanel .confirm').click(function () {         // 单击确定
    $('#borderDetectPanel, #black').css('display', 'none');
    currentMat = tempMat.clone();
    cv.imshow('currentImgCanvas', currentMat);
});
$('#borderDetectPanel .cancel').click(function () {         // 单击取消
    $('#borderDetectPanel, #black').css('display', 'none');
    cv.imshow('currentImgCanvas', currentMat);
});
$('#operatorSelect').change(function () {
    operator = parseInt($('#operatorSelect').val());
    robertsOperatorBorderDetect(currentMat, tempMat, operator);
    cv.imshow('currentImgCanvas', tempMat);
});

// 图像分割
let splitAlgo = void 0;
$('#splitButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#splitPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#splitPanel', '#splitPanel .dragBar', 100, 100);
        $('#splitAlgoSelect').change();
    }
});
$('#splitPanel .confirm').click(function () {         // 单击确定
    $('#splitPanel, #black').css('display', 'none');
    currentMat = tempMat.clone();
    cv.imshow('currentImgCanvas', currentMat);
});
$('#splitPanel .cancel').click(function () {         // 单击取消
    $('#splitPanel, #black').css('display', 'none');
    cv.imshow('currentImgCanvas', currentMat);
});
$('#splitAlgoSelect').change(function () {
    splitAlgo = parseInt($('#splitAlgoSelect').val());
    if (splitAlgo === 0) {
        thresholdSplit(currentMat, tempMat);
        cv.imshow('currentImgCanvas', tempMat);
    }
    else if (splitAlgo === 1) {
        cv.imshow('currentImgCanvas', currentMat);
        $('#currentImgCanvas').click(function (e) {
            regionGrowingSplit(currentMat, e.clientX - parseInt($(this).css('left').slice(0, -2)), e.clientY - parseInt($(this).css('top').slice(0, -2)), 10);
        });
    }
});


//计数
$('#countingButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#countingPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('#splitPanel', '#splitPanel .dragBar', 100, 100);

    }
});
$('#countingPanel .confirm').click(function () {         // 单击确定
    $('#countingPanel, #black').css('display', 'none');
    currentMat = tempMat.clone();
    cv.imshow('currentImgCanvas', currentMat);
});
$('#countingPanel .cancel').click(function () {         // 单击取消
    $('#countingPanel, #black').css('display', 'none');
    cv.imshow('currentImgCanvas', currentMat);
});


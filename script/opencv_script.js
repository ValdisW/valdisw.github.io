const colorArr = ['#F77', '#7F7', '#77F'];
let currentMat = void 0;

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
        'z-index': '10'
    });
    setMoveable('currentImgCanvas', 80, 80);
    cv.imshow('currentImgCanvas', srcMat);      // 显示
    //srcMat.delete();
};

// 灰度变换
$('#linearGrayTransButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else{
        $('#grayPanel, #black').css('display', 'block');
        setMoveable('grayPanel', 100, 100);
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
                data: [[0, 0], [0, 0], [255, 255], [255, 255]]
            },
            animation: false
        };
        grayChart.setOption(grayOption);

        $('.grayModeInput:first, .grayModeInput:last').click(function () {
            if ($('.grayModeInput:first')[0].checked) {

            }
            if ($('.grayModeInput:last')[0].checked) {

            }
        })

        $('#from_min').change(function () {
            grayOption.series.data[1][0] = parseInt($('#from_min').val());
            grayChart.setOption(grayOption);
        });
        $('#from_max').change(function () {
            grayOption.series.data[2][0] = parseInt($('#from_max').val());
            grayChart.setOption(grayOption);
        });
        $('#to_min').change(function () {
            grayOption.series.data[1][1] = parseInt($('#to_min').val());
            grayChart.setOption(grayOption);
        });
        $('#to_max').change(function () {
            grayOption.series.data[2][1] = parseInt($('#to_max').val());
            grayChart.setOption(grayOption);
        });
    }
});

$('#grayPanel button').click(function () {
    linearGrayTrans(currentMat,
        parseInt($('#from_min').val()),
        parseInt($('#from_max').val()),
        parseInt($('#to_min').val()),
        parseInt($('#to_max').val())
    );
    $('#grayPanel, #black').css('display', 'none');
});

// 直方图变换
$('#histogramTransButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#histogramPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('histogramPanel', 100, 100);
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
        let currentChannel = 0;
        for (let channelInput = 0; channelInput < channelInputs.length; channelInput++) {
            channelInputs[channelInput].onchange = function () {
                currentChannel = channelInput;
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
            $('#ifEqualize').click(function () {
                histogramData = histogramEqualize(currentMat, getHistogramData(currentMat, currentChannel), currentChannel);
                histogramData_2 = new Array(getHistogramData.length);   // 转化成二维数组用于echarts绘制
                for (let i = 0; i < histogramData.length; i++) {
                    histogramData_2[i] = new Array(2);
                    histogramData_2[i][0] = i;
                    histogramData_2[i][1] = histogramData[i];
                }
                histogramOption.series.data = histogramData_2;
                histogramOption.series.itemStyle.color = colorArr[currentChannel];
                histogramChart.setOption(histogramOption);
            });
        }
    }
});
$('#histogramPanel button:last').click(function () {
    $('#histogramPanel, #black').css('display', 'none');
});

// 图像加减
$('#plusOrMinusButton').click(function () {
    if (!currentMat) alert('请先选择一张图片！');
    else {
        $('#plusOrMinusPanel, #black').css('display', 'block');       // 弹出窗口
        setMoveable('plusOrMinusPanel', 100, 100);
    }
});
$('#plusOrMinusPanel button:last').click(function () {
    $('#plusOrMinusPanel, #black').css('display', 'none');
});
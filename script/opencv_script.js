function onOpenCvReady() {
    $('#black').fadeOut(300);
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

const srcImg = $('#srcImg')[0];           // 原图的img标签
$('#srcImgInputButton').change(function(e) {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
});
srcImg.onload = function () {
    let srcMat = cv.imread(srcImg);
    $('#img_size').html(srcMat.size().width + '×' + srcMat.size().height);
    $('#img_channels').html(srcMat.channels());
    $('#img_depth').html(srcMat.depth());
    $('#img_type').html(srcMat.type());

    cv.imshow('currentImgCanvas', srcMat);
    srcMat.delete();
}
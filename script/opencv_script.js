function onOpenCvReady() {
    $('#black').css('display', 'none');
}

// 获取某通道的直方图数据
const getHistogramData = function (img, channel) {          // 0->R, 1->G, 2->B, 3->A
    let histogramData = new Array(256);
    for (let i = 0; i < 256; i++) histogramData[i] = 0;         // initialize
    // 逐行扫描
    for (let i = 0; i < img.rows; i++) {
        for (let j = 0; j < img.cols; j++) {
            let pixelData = img.ucharPtr(i, j);
            let valueData = pixelData[channel];
            histogramData[valueData]++;
        }
    }
    return histogramData;
}

const srcImg = document.getElementById('srcImg');           // 原图的img标签
document.getElementById('srcImgInputButton').onchange = function(e) {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
}
srcImg.onload = function () {
    let srcMat = cv.imread(srcImg);
    document.getElementById('img_size').innerHTML = srcMat.size().width + '×' + srcMat.size().height;
    document.getElementById('img_channels').innerHTML = srcMat.channels();
    document.getElementById('img_depth').innerHTML = srcMat.depth();
    document.getElementById('img_type').innerHTML = srcMat.type();

    cv.imshow('currentImgCanvas', srcMat);
    srcMat.delete();
}
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

    let pixel = srcMat.ucharPtr(200, 200);
    let R = pixel[0];
    let G = pixel[1];
    let B = pixel[2];
    let A = pixel[3];
    console.log(pixel);
    console.log(R);
    console.log(G);
    console.log(B);
    console.log(A);

    cv.imshow('currentImgCanvas', srcMat);
    srcMat.delete();
}
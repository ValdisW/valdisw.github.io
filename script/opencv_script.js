const currentImg = document.getElementById('currentImg');           // 原图的img标签
document.getElementById('srcImgInputButton').onchange = function(e) {
    currentImg.src = URL.createObjectURL(e.target.files[0]);
}
currentImg.onload = function () {
    let srcMat = cv.imread(currentImg);
    console.log(srcMat);
    cv.imshow('currentImgCanvas', srcMat);
    srcMat.delete();
}
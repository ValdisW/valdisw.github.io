// scroll绑定
// DOM
function marginToRight(distance, selector) {
    let e = d3.select(selector)
        .style("margin-left", "0")
        .style("opacity", 0);

    scrollama().setup({
        step: selector,
        offset: 0.6,
        threshold: 0.4,
        progress: true,
        debug: false
    }).onStepEnter(function (res) {
        // console.log(res);
    }).onStepExit(function (res) {
        // console.log(res);
    }).onStepProgress(function (res) {
        d3.select(res.element)
            .style("margin-left", distance * res.progress + "px")
            .style("opacity", res.progress);
    });
}

function positionHori(sensor_selector, obj_selector, distance, offset) {
    let originLeft = parseInt($(obj_selector).css("opacity", "0").css("left").substr(0, 3)) - distance;
    scrollama().setup({
        step: sensor_selector,
        offset: offset,
        threshold: 0.4,
        progress: true,
        debug: false
    }).onStepEnter(function (res) {
        // console.log(res);
    }).onStepExit(function (res) {
        // if (res.direction == "up")
        //     $(obj_selector).css({
        //         "opacity": 0
        //     })
        // if (res.direction == "down")
        //     $(obj_selector).css({
        //         "opacity": 1
        //     })
    }).onStepProgress(function (res) {
        $(obj_selector).css({
            "left": originLeft + distance * res.progress + "px",
            "opacity": res.progress
        })
    });
}

function positionVert(sensor_selector, obj_selector, distance, offset) {
    let originTop = parseInt($(obj_selector).css("opacity", "0").css("top").substr(0, 3)) - distance;
    scrollama().setup({
        step: sensor_selector,
        offset: offset,
        threshold: 0.4,
        progress: true,
        debug: false
    }).onStepEnter(function (res) {
        // console.log(res);
    }).onStepExit(function (res) {
        // console.log(res);
    }).onStepProgress(function (res) {
        $(obj_selector).css({
            "top": originTop + distance * res.progress + "px",
            "opacity": res.progress
        })
    });
}

positionHori("#timeLine1", "#timeLabel1", 100, 0.8);
positionHori("#timeLine2", "#timeLabel2", 100, 0.8);
positionHori("#timeLine3", "#timeLabel3", 100, 0.8);
positionHori("#timeLine1", "#eventLabel1", -150, 0.8);
positionHori("#timeLine2", "#eventLabel2", -150, 0.8);
positionHori("#timeLine3", "#eventLabel3", -150, 0.8);
positionHori("#timeLine1", "#timePoint1", 0, 0.8);
positionHori("#timeLine2", "#timePoint2", 0, 0.8);
positionHori("#timeLine3", "#timePoint3", 0, 0.8);
positionHori("#cloud1", "#cloud1", -300, 0.35);
positionHori("#cloud2", "#cloud2", 300, 0.5);
positionHori("#cloud3", "#cloud3", -300, 0.5);
positionHori("#ranking-figure", "#ranking-figure", 0, 0.6);


positionVert('#part1 .subtitle', '#part1 .subtitle', -60, 0.6);
positionVert('#part2 .subtitle', '#part2 .subtitle', -60, 0.6);
positionVert('#part3 .subtitle', '#part3 .subtitle', -60, 0.6);
positionVert('#part4 .subtitle', '#part4 .subtitle', -60, 0.6);
positionVert('#part5 .subtitle', '#part5 .subtitle', -60, 0.6);
positionVert('#part6 .subtitle', '#part6 .subtitle', -60, 0.6);

positionVert('#startTime', '#startTime', -100, 1);


// scrollama().setup({
//     step: sensor_selector,
//     offset: offset,
//     threshold: 0.4,
//     progress: true,
//     debug: false
// }).onStepEnter(function (res) {
//     // console.log(res);
// }).onStepExit(function (res) {
//     // console.log(res);
// }).onStepProgress(function (res) {
//     $(obj_selector).css({
//         "top": originTop + distance * res.progress + "px",
//         "opacity": res.progress
//     })
// });
// // SVG
// scrollama().setup({
//     step: '#timeAxis',
//     offset: 0.6,
//     threshold: 0.4,
//     progress: true,
//     debug: true
// }).onStepEnter(function (res) {
//     // console.log(res);
// }).onStepExit(function (res) {
//     // console.log(res);
// }).onStepProgress(function (res) {
//     console.log(res.progress);
//     d3.select(res.element)
//         .style("opacity", res.progress);
// });

// Blink
// scrollama().setup({
//     step: sensor_selector,
//     offset: offset,
//     threshold: 0.4,
//     progress: true,
//     debug: false
// }).onStepEnter(function (res) {
//     // console.log(res);
// }).onStepExit(function (res) {
//     // console.log(res);
// }).onStepProgress(function (res) {
//     $(obj_selector).css({
//         "top": originTop + distance * res.progress + "px",
//         "opacity": res.progress
//     })
// });
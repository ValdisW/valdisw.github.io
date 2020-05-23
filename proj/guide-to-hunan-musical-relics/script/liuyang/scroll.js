// scroll绑定
// DOM
function marginToRight(distance, selector) {
  let e = d3.select(selector).style("margin-left", "0").style("opacity", 0);

  scrollama()
    .setup({
      step: selector,
      offset: 0.6,
      threshold: 0.4,
      progress: true,
      debug: false,
    })
    .onStepEnter(function (res) {
      // console.log(res);
    })
    .onStepExit(function (res) {
      // console.log(res);
    })
    .onStepProgress(function (res) {
      d3.select(res.element)
        .style("margin-left", distance * res.progress + "px")
        .style("opacity", res.progress);
    });
}

function positionHori(sensor_selector, obj_selector, distance, offset, debug) {
  let originLeft = parseInt($(obj_selector).css("opacity", "0").css("left")) - distance;
  scrollama()
    .setup({
      step: sensor_selector,
      offset: offset,
      threshold: 0.4,
      progress: true,
      debug: debug,
    })
    .onStepEnter(function (res) {
      // console.log(res);
    })
    .onStepExit(function (res) {
      // if (res.direction == "up")
      //     $(obj_selector).css({
      //         "opacity": 0
      //     })
      // if (res.direction == "down")
      //     $(obj_selector).css({
      //         "opacity": 1
      //     })
    })
    .onStepProgress(function (res) {
      $(obj_selector).css({
        left: originLeft + distance * res.progress + "px",
        opacity: res.progress,
      });
    });
}

function positionVert(sensor_selector, obj_selector, distance, offset) {
  let originTop = parseFloat($(obj_selector).css("opacity", "0").css("top")) - distance;
  scrollama()
    .setup({
      step: sensor_selector,
      offset: offset,
      threshold: 0.4,
      progress: true,
      debug: false,
    })
    .onStepEnter(function (res) {})
    .onStepExit(function (res) {})
    .onStepProgress(function (res) {
      $(obj_selector).css({
        top: originTop + distance * res.progress + "px",
        opacity: res.progress,
      });
    });
}

positionHori("#timeLine1", "#timeLabel1", 100, 0.8, false);
positionHori("#timeLine2", "#timeLabel2", 100, 0.8, false);
positionHori("#timeLine3", "#timeLabel3", 100, 0.8, false);
positionHori("#timeLine1", "#eventLabel1", -150, 0.8, false);
positionHori("#timeLine2", "#eventLabel2", -150, 0.8, false);
positionHori("#timeLine3", "#eventLabel3", -150, 0.8, false);
positionHori("#timeLine1", "#timePoint1", 0, 0.8, false);
positionHori("#timeLine2", "#timePoint2", 0, 0.8, false);
positionHori("#timeLine3", "#timePoint3", 0, 0.8, false);

positionVert("#dachengdian-pin", "#dachengdian-pin", 50, 0.5, false);
positionVert("#left-pavilion-pin", "#left-pavilion-pin", 50, 0.5, false);
positionVert("#right-pavilion-pin", "#right-pavilion-pin", 50, 0.5, false);
positionVert("#stair-pin", "#stair-pin", -50, 0.9, false);
positionVert("#left-drum-pin", "#left-drum-pin", -50, 0.9, false);
positionVert("#right-drum-pin", "#right-drum-pin", -50, 0.9, false);

positionHori("#cloud1", "#cloud1", -300, 0.7, false);
positionHori("#cloud2", "#cloud2", 300, 0.8, false);
// positionHori("#ranking-figure", "#ranking-figure", 0, 0.6, false);

positionVert("#startTime", "#startTime", -50, 0.8, false);
// positionHori("#clothes-pin-hat", "#clothes-pin-hat", -50, 0.9, false);
// positionHori("#clothes-pin-shirt", "#clothes-pin-shirt", -50, 0.9, false);
// positionHori("#clothes-pin-shoes", "#clothes-pin-shoes", -50, 1, false);
// positionHori("#clothes-pin-trousers", "#clothes-pin-trousers", -50, 1, false);

// positionVert("#introduction .subtitle", "#introduction .subtitle", -60, 0.6);
// positionVert("#group .subtitle", "#group .subtitle", -60, 0.8);
// positionVert("#part3 .subtitle", "#part3 .subtitle", -60, 0.8);
// positionVert("#part4 .subtitle", "#part4 .subtitle", -60, 0.8);
// positionVert("#part5 .subtitle", "#part5 .subtitle", -60, 0.8);
// positionVert("#part6 .subtitle", "#part6 .subtitle", -60, 0.8);

// positionVert('#startTime', '#startTime', -100, 1);

// 娼戏艺走席
// scrollama()
//   .setup({
//     step: "#part3",
//     offset: 0.8,
//     threshold: 0.4,
//     progress: true,
//     debug: false,
//   })
//   .onStepEnter(function (res) {})
//   .onStepExit(function (res) {})
//   .onStepProgress(function (res) {
//     $("#review-icon-false").css({
//       opacity: 1 - 0.9 * res.progress,
//     });
//   });

// 白花
let originTop = parseFloat($("#flower1").css("top"));
scrollama()
  .setup({
    step: "#introduction",
    offset: 1,
    threshold: 0.4,
    progress: true,
    debug: false,
  })
  .onStepEnter(function (res) {})
  .onStepExit(function (res) {})
  .onStepProgress(function (res) {
    $("#flower1").css({
      top: originTop - 700 * res.progress + "px",
    });
  });

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

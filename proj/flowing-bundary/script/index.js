/*============================================*
 * 主控制
 *--------------------------------------------
 * 全局UI控件功能、全局音频等全局信息的控制
 *============================================*/

/*--------------------------------------------*
 * ▲ 全局变量
 *--------------------------------------------*/
let cursor;
let prev_button, next_button;
let audio_control_button, bgm, bgs;
let current_pos = 0; // 当前所在位置，0--加载界面，1--标题界面，2--第一章，3--第二章，4--第三章，5--第4章
let label_num, label_num_tween;
// sos
let help_container;

/*--------------------------------------------*
 * ▲ 数学函数
 *--------------------------------------------*/
// 映射。将num从[a1, b1]区间映射到[a2, b2]区间
function dataMap(num, a1, b1, a2, b2) {
  return a2 + ((b2 - a2) / (b1 - a1)) * (num - a1);
}

/*--------------------------------------------*
 * ▲ 全局UI过渡
 *--------------------------------------------*/
// 数字标签
label_num = { val: 0 };
label_num_tween = new TWEEN.Tween(label_num)
  .easing(TWEEN.Easing.Quadratic.Out)
  .delay(0)
  .onUpdate(function () {});

// 隐藏全局UI
function hideGlobalUI() {
  $("#info,#language,#audio-control").animate({ top: "-10vmin" }, 500);
  $("#prev-button,#next-button,#chapter-buttons").animate({ right: "-10vmax" }, 500);
}

function showGlobalUI() {
  $("#info,#language,#audio-control").animate({ top: "6vmin" }, 500);
  $("#prev-button,#next-button").animate({ right: "5.25vmax" }, 500);
  $("#chapter-buttons").animate({ right: "4.95vmax" }, 500);
}

/*--------------------------------------------*
 * ▲ 鼠标圆环跟随
 *--------------------------------------------*/
cursor = $("#cursor");
document.onmousemove = function (e) {
  let l = parseFloat(cursor.css("left")),
    t = parseFloat(cursor.css("top"));
  let dl = e.clientX - l,
    dt = e.clientY - t;
  cursor.css({
    left: e.clientX + "px",
    top: e.clientY + "px",
  });
};

/*--------------------------------------------*
 * ▲ 音频控制
 *--------------------------------------------*/
bgm = document.getElementById("bgm");
bgs = document.querySelector("#bgs");
bgm.play();
audio_control_button = document.getElementById("audio-control");
audio_control_button.onclick = function () {
  $(audio_control_button).toggleClass("mute");
  $(bgm).stop();
};

/*--------------------------------------------*
 * ▲ 开篇小诗
 *--------------------------------------------*/
$(".opening").click(function (e) {
  $(this).fadeOut(1000);
});

/*--------------------------------------------*
 * ▲ 章节选择按钮
 *--------------------------------------------*/
prev_button = $("#prev-button");
next_button = $("#next-button");
let chapter_buttons = document.querySelectorAll("#chapter-buttons > div");
chapter_buttons[0].onclick = function () {
  $(chapter_buttons).css("background-color", "transparent");
  chapter_buttons[0].style.backgroundColor = "#fff";
  casesStartup();
  helpDestroy();
  rainDestroy();
  $("#bloom").fadeOut(1000);
};
chapter_buttons[1].onclick = function () {
  $(chapter_buttons).css("background-color", "transparent");
  chapter_buttons[1].style.backgroundColor = "#fff";
  casesDestroy();
  helpStartup();
  rainDestroy();
  $("#bloom").fadeOut(1000);
};
chapter_buttons[2].onclick = function () {
  $(chapter_buttons).css("background-color", "transparent");
  chapter_buttons[2].style.backgroundColor = "#fff";
  casesDestroy();
  helpDestroy();
  rainStartup();
  $("#bloom").fadeOut(1000);
};
chapter_buttons[3].onclick = function () {
  $(chapter_buttons).css("background-color", "transparent");
  chapter_buttons[3].style.backgroundColor = "#fff";
  casesDestroy();
  helpDestroy();
  rainDestroy();
  $("#bloom").fadeIn(1000);
};

// 上一页
prev_button.click(function () {
  bgs.play();
  switch (current_pos) {
    case 2:
      $("#title").fadeIn(1000);
      $("#cases").fadeOut(1000);
      TweenMax.to($("#next-button")[0], 0.5, { right: "50vw", bottom: "-90vh", width: "50px", height: "50px" });
      TweenMax.to($(this)[0], 0.5, { opacity: 0 });
      current_pos -= 1;
      break;
    case 3:
      chapter_buttons[0].onclick();
      break;
    case 4:
      chapter_buttons[1].onclick();
      break;
    case 5:
      break;
  }
});

// 下一页
next_button.click(function () {
  bgs.play();
  switch (current_pos) {
    case 1:
      cancelAnimationFrame(bg_animation);
      cancelAnimationFrame(title_text_animation);
      $("#title").fadeOut(1000);
      chapter_buttons[0].onclick();
      TweenMax.to($(this)[0], 0.5, { right: "5.25vmax", bottom: "-67vh", width: "35px", height: "35px" });
      TweenMax.to($("#prev-button")[0], 0.5, { opacity: 1 });
      TweenMax.to($("#chapter-buttons")[0], 0.5, { opacity: 1 });
      break;
    case 2:
      chapter_buttons[1].onclick();
      break;
    case 3:
      chapter_buttons[2].onclick();
      break;
    case 4:
      chapter_buttons[3].onclick();
      break;
    case 5:
      break;
  }
  if (current_pos < 5) current_pos++;
});

/*--------------------------------------------*
 * ▲ 侧边菜单
 *--------------------------------------------*/
let info = $("#info"),
  info_panel = $("#info-panel");

info.click(function () {});

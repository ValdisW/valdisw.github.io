// global variables
let cursor;
let prev_button, next_button;
let bgm, bgs;

cursor = $("#cursor");
// cursor
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
prev_button = $("#prev-button");
next_button = $("#next-button");

// 音频控制
bgm = document.querySelectorAll(".bgm");
bgs = document.querySelector("#bgs");
bgm.forEach((e) => {
  e.play();
});

// 章节按钮
let chapter_buttons = document.querySelectorAll("#chapter-buttons > div");
chapter_buttons[0].onclick = function () {
  casesStartup();
  helpDestroy();
  rainDestroy();
  $("#bloom").fadeOut(1000);
};
chapter_buttons[1].onclick = function () {
  casesDestroy();
  helpStartup();
  rainDestroy();
  $("#bloom").fadeOut(1000);
};
chapter_buttons[2].onclick = function () {
  casesDestroy();
  helpDestroy();
  rainStartup();
  $("#bloom").fadeOut(1000);
};
chapter_buttons[3].onclick = function () {
  casesDestroy();
  helpDestroy();
  rainDestroy();
  $("#bloom").fadeIn(1000);
};

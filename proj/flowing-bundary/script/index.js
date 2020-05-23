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

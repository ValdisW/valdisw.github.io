function helpStartup() {
  // 上一页
  prev_button.click(function () {
    bgs.play();
    $("#title").fadeIn(1000);
    $("#cases").fadeOut(1000);
    TweenMax.to($("#prev-button")[0], 0.5, { opacity: 0 });
    TweenMax.to($("#next-button")[0], 0.5, { left: "50%", top: "83%", width: "50px", height: "50px" });
  });

  // 下一页
  next_button.click(function () {
    bgs.play();
    $("#cases").fadeOut(1000);
    $("#sos").fadeIn(1000);
    TweenMax.to($(this)[0], 0.5, { left: "95%", top: "50%", width: "35px", height: "35px" });
    TweenMax.to($("#prev-button")[0], 0.5, { opacity: 1 });
  });
}

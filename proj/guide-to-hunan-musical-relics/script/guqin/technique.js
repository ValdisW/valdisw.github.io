let technique_hand = $("#technique-hand");
let buttons = $("#technique-buttons>li>div");
buttons.click(function (e) {
  technique_hand.fadeOut(300);
  setTimeout(() => {
    technique_hand.attr("src", "../images/png/hand-" + e.currentTarget.getAttribute("name") + ".png");
  }, 300);
  technique_hand.fadeIn(300);

  $("#hand-char").attr("src", `../images/png/char-${e.currentTarget.getAttribute("name")}.png`);
});

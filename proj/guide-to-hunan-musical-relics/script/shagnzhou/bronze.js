let bronze_img = $("#bronze");
let buttons = $("#buttons li button");

buttons.click(function (e) {
  $("#buttons li button").css({ "background-color": "#FFF4", color: "#e2c477", "border-color": "#fff" });
  $("#buttons li span").css("background-color", "#FFF");

  e.currentTarget.style.backgroundColor = "#e2c477";
  e.currentTarget.style.color = "#fff";
  e.currentTarget.style.borderColor = "#e2c477";
  $(e.currentTarget.parentElement.querySelectorAll("span")).css("background-color", "#000");

  bronze_img.fadeOut(200);
  setTimeout(() => {
    bronze_img.attr("src", `../images/png/bronze-${e.target.name}.png`);
  }, 200);
  bronze_img.fadeIn(200);
});
buttons[0].click();
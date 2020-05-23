let audioDOM = $("#audio");

const element_color_map = {
  fire: "#e3494e",
  wood: "#75af62",
  water: "#3fa7f9",
  earth: "#e2822b",
  metal: "#fed835",
};

const string_element_map = {
    gong: "earth",
    shang: "metal",
    jue: "wood",
    zhi: "fire",
    yu: "water",
    shaogong: "earth",
    shaoshang: "metal",
  },
  element_style_map = {
    fire: ["#e3494e", "#f06292"],
    wood: ["#37895c", "#75af62"],
    water: ["#7e57c2", "#3fa7f9"],
    earth: ["#f29b00", "#e2822b"],
    metal: ["#f29b00", "#fed835"],
  };

$(".string")
  .click(function (e) {
    $("#play-tip").fadeOut(500);
    let string_name = e.currentTarget.getAttribute("name");
    audioDOM.attr("src", "../audio/" + string_name + ".wav");
    audioDOM.get(0).play();

    $("#string-intro li").css("color", "#fef5e4");
    $("#intro-" + string_name).css("color", element_color_map[string_element_map[string_name]]);
    // $("#intro-" + string_name).css("color", "#91d8c0");

    $("#circle-outer").css({ "background-image": `linear-gradient(to right, ${element_style_map[string_element_map[string_name]][0]}, ${element_style_map[string_element_map[string_name]][1]})` });

    for (let s of ["fire", "wood", "water", "metal", "earth"]) $(`#symb-${s}`).attr("src", `../images/png/symb_${s}.png`);
    $(`#symb-${string_element_map[string_name]}`).attr("src", `../images/png/symb_${string_element_map[string_name]}_0.png`);
  })
  .mouseenter(function (e) {
    let string_name = e.currentTarget.getAttribute("name");
    $(this).css("background-color", element_color_map[string_element_map[string_name]]);
  })
  .mouseleave(function (e) {
    $(this).css("background-color", "#000");
  });

$("#circle-inner").mouseleave(function (e) {
  $("#play-tip").fadeIn(500);
});

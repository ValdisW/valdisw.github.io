const faction_map = {
  zhepai: {
    name_en: "Zhe",
    "birthplace-id": "zhejiang",
    "origin-time": "Southern Song Dynasty",
    birthplace: "Hangzhou, Zhejiang",
    representative: "Chuwang Guo",
    features: "Smooth and peaceful",
    offset: 36.85,
  },
  yushanpai: {
    name_en: "Yushan",
    "birthplace-id": "jiangsu",
    "origin-time": "Late Ming Dynasty",
    birthplace: "Changshu, Jiangsu",
    representative: "Zheng Yan",
    features: "Fresh and light",
    offset: 51.7,
  },
  guanglingpai: {
    name_en: "Guangling",
    "birthplace-id": "jiangsu",
    "origin-time": "Qing Dynasty",
    birthplace: "Yangzhou, Jiangsu",
    representative: "Changyu Xu",
    features: "Ups and downs",
    offset: 65.25,
  },
  puchengpai: {
    name_en: "Pucheng",
    "birthplace-id": "shaanxi",
    "origin-time": "Qing Dynasty",
    birthplace: "Weinan, Shaanxi",
    representative: "Tongjun Zhu",
    features: "Slow and moderate",
    offset: 65.25,
  },
  fanchuanpai: {
    name_en: "Fanchuan",
    "birthplace-id": "sichuan",
    "origin-time": "Qing Dynasty",
    birthplace: "Sichuan",
    representative: "Hexiu Zhang",
    features: "Unrestrained",
    offset: 65.25,
  },
  jiuyipai: {
    name_en: "Jiuyi",
    "birthplace-id": "beijing",
    "origin-time": "Late Qing Dynasty",
    birthplace: "Beijing",
    representative: "Zongji Yang",
    features: "Vigorous and solid",
    offset: 80.6,
  },
  meianpai: {
    name_en: "Mei'an",
    "birthplace-id": "shandong",
    "origin-time": "Qing Dynasty",
    birthplace: "Shandong",
    representative: "Binlu Wang",
    features: "Gorgeous and lingering",
    offset: 65.25,
  },
  zhuchengpai: {
    name_en: "Zhucheng",
    "birthplace-id": "shandong",
    "origin-time": "Qing Dynasty",
    birthplace: "Zhucheng, Shandong",
    representative: "Puchang Wang",
    features: "Gorgeous and lingering",
    offset: 65.25,
  },
  lingnanpai: {
    name_en: "Lingnan",
    "birthplace-id": "guangdong",
    "origin-time": "Qing Dynasty",
    birthplace: "Guangdong",
    representative: "Jingxing Huang",
    features: "Clean and elegant",
    offset: 65.25,
  },
};

$("#faction-list li").click(function (e) {
  $("svg path").css("fill", "#a7dccc");
  let temp_selector = "#" + faction_map[e.currentTarget.getAttribute("name")]["birthplace-id"];
  $(temp_selector).css("fill", "#204a46");

  $("#faction-list li").css({
    "background-color": "transparent",
    color: "#204a46",
  });

  let prop = faction_map[e.currentTarget.getAttribute("name")];

  e.currentTarget.style.backgroundColor = "#204a46";
  e.currentTarget.style.color = "#fef5e4";
  $("#faction-icon").attr("src", `../images/svg/guqin/icon-${prop["name_en"].toLowerCase()}.svg`);
  $("#faction-name").text(prop["name_en"]);
  $("#origin-time").text(prop["origin-time"]);
  $("#birthplace").text(prop["birthplace"]);
  $("#representative").text(prop["representative"]);
  $("#features").text(prop["features"]);

  $("#time-note").animate({"left": prop["offset"] + "vmax"}, 300);
});
$("#faction-list li:nth-child(1)").click();

window.onresize = function () {
  _autoZoom();
};
_autoZoom();
function _autoZoom() {
  var svg = document.getElementById("svg");
  if (svg) {
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.setAttribute("viewBox", "0 0 1452 860");
    svg.style.overflow = "hidden";
    var viewBoxVal = svg.getAttribute("viewBox");
    if (viewBoxVal) {
      var viewBoxWidth = viewBoxVal.split(" ")[2];
      var viewBoxHeight = viewBoxVal.split(" ")[3];
      svg.removeAttribute("width");
      svg.removeAttribute("height");

      var setWidth = document.body.clientWidth;
      var setHeight = (setWidth * viewBoxHeight) / viewBoxWidth;
      svg.setAttribute("width", setWidth);
      svg.setAttribute("height", setHeight);
    }
  }
}

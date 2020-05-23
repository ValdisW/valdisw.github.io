/*----------------------------------*
 * Global variables
 *----------------------------------*/
let current_icon; // 当前显示的乐器大图
let instruments = [], // 所有待选文物
  current_inst = {
    inst: null,
    graphics: {
      circle: null,
      text: null,
    },
  }, // 当前在展示的文物
  svg,
  instrument_sum,
  centerX,
  centerY,
  detail_centerX,
  detail_centerY,
  r1,
  r2,
  r3,
  r4,
  graphics = {
    base_frame: [],
  };

/*----------------------------------*
 * Data Structure
 *----------------------------------*/
class Instrument {
  constructor(config) {
    this.index = config.index;
    this.name = config.name;
    this.material = config.material;
    this.number = config.number | 0;
    this.intro = config.intro;
    this.graphics = {
      icon: null,
      background: null,
      name: null,
    };
  }
  static change(newIndex, oldIndex) {
    // update current instrument
    current_inst.inst = instruments[newIndex];
    // current_inst.graphics.text.text(instruments[newIndex].material);

    document.querySelector("#current-material").src = "../images/svg/liuyang/hex_" + instruments[newIndex].material + ".svg";
    current_icon.attr("xlink:href", "../images/svg/" + instruments[newIndex].name + ".svg");
    document.querySelector("#current-name").innerHTML = instruments[newIndex].name;
    document.querySelector("#current-info").innerHTML = instruments[newIndex].intro;

    // justify background
    instruments[oldIndex].graphics.background.attr("fill", "#F9E9E5");
    instruments[newIndex].graphics.background.attr("fill", "#c42c2c");
  }
}

/*----------------------------------*
 * Initialize
 *----------------------------------*/
function initialize(data) {
  // initialize instrument info
  for (let i = 0; i < data.length; i++) {
    instruments.push(
      new Instrument({
        index: i,
        name: data[i].name,
        material: data[i].material,
        number: data[i].number,
        intro: data[i].intro,
      })
    );
  }
  current_inst.inst = instruments[0]; // 浅拷贝

  // variables
  instrument_sum = instruments.length;
  detail_centerX = 300;
  detail_centerY = 653;
  r1 = 125;
  r2 = 150;
  r3 = 230;
  r4 = 330;
  centerX = r4 + 40;
  centerY = r4 + 40;
  svg = d3
    .select("#instruments")
    .append("svg")
    .attr("id", "instruments-circle")
    .attr("viewBox", `0 0 ${r4 * 2.25} ${r4 * 2.25}`)
    .style("height", r4 * 2.25)
    .style("width", r4 * 2.25)
    .style("position", "absolute")
    .style("right", "8vmax")
    .style("top", "51.4vmax");

  // Line frame
  for (let i = 0; i < 19; i++) {
    let cx4_frame = centerX + r4 * Math.cos(((i + 4) / 19) * 2 * Math.PI),
      cy4_frame = centerY + r4 * Math.sin(((i + 4) / 19) * 2 * Math.PI);
    graphics.base_frame.push(svg.append("line").attr("x1", centerX).attr("y1", centerY).attr("x2", cx4_frame).attr("y2", cy4_frame).attr("stroke", "#c42c2c").attr("stroke-width", 1));
  }

  graphics.base_frame = [
    svg.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r2).attr("stroke", "#F9E9E5").attr("stroke-width", 10).attr("fill", "transparent"),
    svg.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r3).attr("stroke", "#c42c2c").attr("stroke-width", "2").attr("fill", "transparent"),
    svg.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r4).attr("stroke", "#c42c2c").attr("stroke-width", "1").attr("fill", "transparent"),
    svg.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r1).attr("fill", "#F9E9E5"),
  ];

  for (let i = 0; i < instrument_sum; i++) {
    let cx4 = centerX + r4 * Math.cos(((i + 4) / instrument_sum) * 2 * Math.PI),
      cy4 = centerY + r4 * Math.sin(((i + 4) / instrument_sum) * 2 * Math.PI),
      cx2 = centerX + r3 * Math.cos(((i + 4) / instrument_sum) * 2 * Math.PI),
      cy2 = centerY + r3 * Math.sin(((i + 4) / instrument_sum) * 2 * Math.PI),
      cx3 = (cx2 + cx4) / 2,
      cy3 = (cy2 + cy4) / 2,
      cx1 = centerX + r2 * Math.cos(((i + 4) / instrument_sum) * 2 * Math.PI),
      cy1 = centerY + r2 * Math.sin(((i + 4) / instrument_sum) * 2 * Math.PI);

    // Instrument circle
    instruments[i].graphics.background = svg
      .append("circle")
      .attr("cx", cx4)
      .attr("cy", cy4)
      .attr("r", 30)
      .attr("fill", "#F9E9E5")
      .attr("index", i)
      .on("mousemove", function () {
        this.style.cursor = "pointer";
      })
      .on("click", function () {
        Instrument.change(this.getAttribute("index"), current_inst.inst.index);
      });

    // Instrument icon
    instruments[i].graphics.icon = svg
      .append("image")
      .attr("x", cx4 - 33)
      .attr("y", cy4 - 40)
      .attr("width", 66)
      .attr("height", 66)
      .attr("index", i)
      .attr("xlink:href", "../images/svg/" + instruments[i].name + ".svg")
      .on("mousemove", function () {
        this.style.cursor = "pointer";
      })
      .on("click", function () {
        Instrument.change(this.getAttribute("index"), current_inst.inst.index);
      });

    // Instrument name
    instruments[i].graphics.name = svg
      .append("text")
      .attr("x", cx4 - 40)
      .attr("y", cy4 - 20)
      .attr("font-size", 9)
      .attr("text-anchor", "right")
      .attr("fill", "#000")
      .text(instruments[i].name);

    // Number circle
    svg
      .append("circle")
      .attr("cx", cx2)
      .attr("cy", cy2)
      .attr("r", 2 * Math.log2(instruments[i].number + 1))
      .attr("fill", "#eab6b2");
    svg
      .append("text")
      .attr("x", cx2)
      .attr("y", cy2 + 2)
      .attr("font-size", 7)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .text(instruments[i].number);

    // Material circle
    svg.append("circle").attr("cx", cx3).attr("cy", cy3).attr("r", 6).attr("stroke-width", 1.5).attr("stroke", "#CC3D3E").attr("fill", "#FFF");
    svg
      .append("text")
      .attr("x", cx3)
      .attr("y", cy3 + 2)
      .attr("font-size", 7)
      .attr("text-anchor", "middle")
      .text(instruments[i].material);
  }

  // Current instrument icon
  current_icon = svg
    .append("image")
    .attr("x", centerX - 100)
    .attr("y", centerY - 100)
    .attr("width", 200)
    .attr("height", 200)
    .attr("xlink:href", "../images/svg/特钟.svg");

  // 材质的六边形背景
  let hex_str = "";
  for (let i = 0; i < 6; i++) {
    hex_str += (detail_centerX + 20 * Math.cos((i * Math.PI) / 3)).toFixed(1) + "," + (detail_centerY + 20 * Math.sin((i * Math.PI) / 3)).toFixed(1) + " ";
  }
  current_inst.graphics.circle = svg.append("polygon").attr("points", hex_str).attr("fill", "#F2F7D9");
}

// 乐器圈
d3.json("../json/instruments.json").then(function (data) {
  initialize(data);
});

///////////////
window.onresize = function () {
  console.log(2333);
  _autoZoom();
};
_autoZoom();
function _autoZoom() {
  var svg = document.querySelector("svg");
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

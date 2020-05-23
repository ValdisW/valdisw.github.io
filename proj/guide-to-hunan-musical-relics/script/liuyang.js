const material_color = {
  金: "#f7c768",
  石: "#3c3140",
  土: "#779fbe",
  革: "#c42c2c",
  丝: "#ef7903",
  木: "#dd9eb2",
  匏: "#174076",
  竹: "#026258",
};

const current_info = document.querySelector("#current-info"),
  current_name = document.querySelector("#current-name"),
  current_material = document.querySelector("#current-material");

d3.json("../json/instruments.json").then(function (data) {
  const radius = 330,
    r1 = 100,
    r2 = 125,
    r3 = 230,
    centerX = radius * 1.2,
    centerY = radius * 1.2,
    instruments_num = data.length;

  svg = d3
    .select("#instruments")
    .append("svg")
    .attr("id", "instruments-circle")
    .attr("viewBox", `0 0 ${radius * 2.5} ${radius * 2.5}`)
    .style("height", radius * 2.2)
    .style("width", radius * 2.2)
    .style("position", "absolute")
    .style("right", "8vmax")
    .style("top", "51.4vmax");

  // frame
  let frame = svg.append("g");
  frame.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r2).attr("stroke", "#F9E9E5").attr("stroke-width", 10).attr("fill", "transparent");
  frame.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r3).attr("stroke", "#c42c2c").attr("stroke-width", 0.6).attr("fill", "transparent");
  frame.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", radius).attr("stroke", "#c42c2c").attr("stroke-width", 1).attr("fill", "transparent");
  frame
    .selectAll("line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", (d, i) => centerX + radius * Math.cos((i / instruments_num) * 2 * Math.PI))
    .attr("y2", (d, i) => centerY + radius * Math.sin((i / instruments_num) * 2 * Math.PI))
    .attr("stroke", "#c42c2c")
    .attr("stroke-width", 1);
  frame.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", r1).attr("fill", "#F9E9E5");

  // amount
  let amount = svg.append("g").selectAll("circle").data(data).enter().append("g");
  amount
    .append("circle")
    .attr("cx", (d, i) => centerX + r3 * Math.cos((i / instruments_num) * 2 * Math.PI))
    .attr("cy", (d, i) => centerY + r3 * Math.sin((i / instruments_num) * 2 * Math.PI))
    .attr("r", (d) => 4 * Math.sqrt(d.number / Math.PI))
    .attr("fill", "#eabbb9");
  amount
    .append("text")
    .attr("x", (d, i) => centerX + r3 * Math.cos((i / instruments_num) * 2 * Math.PI))
    .attr("y", (d, i) => centerY + r3 * Math.sin((i / instruments_num) * 2 * Math.PI) + 3)
    .attr("font-size", 9)
    .attr("text-anchor", "middle")
    .style("font-family", "苹方字体")
    .style("font-weight", "bold")
    .text((d) => d.number);

  // material
  let material = svg.append("g");
  material
    .selectAll("circle")
    .data(data)
    .enter()
    .append("polygon")
    .attr("transform", (d, i) => {
      let tx = centerX + ((2 * r3 + radius) / 3) * Math.cos((i / instruments_num) * 2 * Math.PI),
        ty = centerY + ((2 * r3 + radius) / 3) * Math.sin((i / instruments_num) * 2 * Math.PI),
        angle = ((2 * Math.PI) / instruments_num) * i * (180 / Math.PI);
      return `translate(${tx},${ty}) rotate(${angle}) translate(${-tx},${-ty})`;
    })
    .attr("points", (d, i) => {
      let hex_str = "",
        xx = centerX + ((2 * r3 + radius) / 3) * Math.cos((i / instruments_num) * 2 * Math.PI),
        yy = centerY + ((2 * r3 + radius) / 3) * Math.sin((i / instruments_num) * 2 * Math.PI);
      for (let j = 0; j < 6; j++) hex_str += `${(xx + 10 * Math.cos((j * Math.PI) / 3)).toFixed(1)},${(yy + 10 * Math.sin((j * Math.PI) / 3)).toFixed(1)} `;
      return hex_str;
    })
    .attr("fill", (d) => material_color[d.material]);

  // instrument
  let instrument = svg.append("g");
  let icon = instrument
    .selectAll("circle")
    .data(data)
    .enter()
    .append("g")
    .classed("instrument", true)
    .attr("index", (d, i) => i)
    .on("mousemove", function () {
      this.style.cursor = "pointer";
    })
    .on("click", function (d, i) {
      d3.selectAll(".instrument").select("circle").attr("fill", "#eabbb9").attr("opacity", 0.3);
      d3.select(this).select("circle").attr("fill", material_color[d.material]).attr("opacity", "0.6");
      display.attr("xlink:href", `../images/svg/${data[i].name}.svg`);
      current_name.innerText = data[i].name;
      current_info.innerText = data[i].intro;
      current_material.setAttribute("src", `../images/svg/liuyang/hex_${data[i].material}.svg`);
    });
  icon
    .append("circle")
    .attr("cx", (d, i) => centerX + radius * Math.cos((i / instruments_num) * 2 * Math.PI))
    .attr("cy", (d, i) => centerY + radius * Math.sin((i / instruments_num) * 2 * Math.PI))
    .attr("r", 30)
    .attr("fill", "#eabbb9")
    .attr("opacity", "0.3");
  icon
    .append("image")
    .attr("x", (d, i) => {
      if (d.name == "瓷埙" || d.name == "编钟" || d.name == "镛钟") return centerX + radius * Math.cos((i / instruments_num) * 2 * Math.PI) - 26  ;
      else return centerX + radius * Math.cos((i / instruments_num) * 2 * Math.PI) - 33;
    })
    .attr("y", (d, i) => {
      if (d.name == "瓷埙" || d.name == "编钟" || d.name == "镛钟") return centerY + radius * Math.sin((i / instruments_num) * 2 * Math.PI) - 36;
      else return centerY + radius * Math.sin((i / instruments_num) * 2 * Math.PI) - 40;
    })
    .attr("width", (d) => {
      if (d.name == "瓷埙" || d.name == "编钟" || d.name == "镛钟") return 52;
      else return 66;
    })
    .attr("height", (d) => {
      if (d.name == "瓷埙" || d.name == "编钟" || d.name == "镛钟") return 56;
      else return 66;
    })
    .attr("xlink:href", (d, i) => `../images/svg/${data[i].name}.svg`);
  icon
    .append("text")
    .attr("x", (d, i) => centerX + (radius + 50) * Math.cos((i / instruments_num) * 2 * Math.PI))
    .attr("y", (d, i) => centerY + (radius + 50) * Math.sin((i / instruments_num) * 2 * Math.PI))
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text((d) => d.name);
  // display
  let display = svg
    .append("image")
    .attr("x", centerX - 100)
    .attr("y", centerY - 100)
    .attr("width", 200)
    .attr("height", 200)
    .attr("xlink:href", (d, i) => `../images/svg/${data[i].name}.svg`);
});

const materialChart = echarts.init(document.getElementById("material-chart"));
let option = {
  grid: {
    left: 65,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    axisLine: {
      lineStyle: {
        color: "#c42c2c",
        width: 1.5,
      },
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: "#c42c2c",
        type: "dashed",
        width: 0.8,
      },
    },
    axisLabel: {
      color: "#000",
      fontFamily: "方正粗金陵",
      fontSize: 16,
    },
  },
  yAxis: {
    type: "category",
    data: ["Soil", "Stone", "Silk", "Bamboo", "Wood", "Leather", "Gourd", "Gold"],
    axisLine: {
      lineStyle: {
        color: "#c42c2c",
        width: 1.5,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      // formatter: function (value) {
      //     return '{' + value + '| }\n{value|' + value + '}';
      // },
      // rich: {
      //     value: {
      //         lineHeight: 30,
      //         align: 'center'
      //     },
      //     Sunny: {
      //         height: 40,
      //         align: 'center',
      //         backgroundColor: {
      //             image: weatherIcons.Sunny
      //         }
      //     },
      //     Cloudy: {
      //         height: 40,
      //         align: 'center',
      //         backgroundColor: {
      //             image: weatherIcons.Cloudy
      //         }
      //     },
      //     Showers: {
      //         height: 40,
      //         align: 'center',
      //         backgroundColor: {
      //             image: weatherIcons.Showers
      //         }
      //     }
      // },
      color: "#000",
      fontFamily: "方正粗金陵",
      fontSize: 16,
    },
  },
  series: {
    name: "material",
    type: "bar",
    data: [2, 25, 11, 18, 4, 4, 8, 56],
    label: {
      show: true,
      color: "#000",
      position: "right",
      fontFamily: "方正粗金陵",
      fontSize: 16,
    },
    itemStyle: {
      normal: {
        color: (params) => {
          let colors = ["#779fbe", "#3c3140", "#ef7903", "#026258", "#dd9eb2", "#e3494e", "#174076", "#f7c768"];
          return colors[params.dataIndex];
        },
      },
    },
    barWidth: 15,
  },
};

materialChart.setOption(option);

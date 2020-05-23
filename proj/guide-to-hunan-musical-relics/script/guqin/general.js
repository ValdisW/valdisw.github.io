let chartBlock = document.getElementById("chart-block");
let chart = echarts.init(chartBlock, null, {
  renderer: "canvas",
});
let left_label_offset = {
  show: true,
  position: "left",
  fontFamily: "MinionPro-semibold",
  fontSize: 14,
  distance: 30,
};
let option = {
  series: [
    {
      type: "sankey",
      focusNodeAdjacency: "allEdges",
      nodeWidth: 3,
      left: 150.0,
      top: 20.0,
      right: 150.0,
      bottom: 25.0,
      data: [
        // 朝代
        { name: "Western Han", label: left_label_offset },
        { name: "Tang", label: left_label_offset },
        { name: "Song", label: left_label_offset },
        { name: "Ming", label: left_label_offset },
        { name: "Qing", label: left_label_offset },
        { name: "Republic of China", label: left_label_offset },
        // Shape
        { name: "灵机式" },
        { name: "凤势式" },
        { name: "仲尼式" },
        { name: "鹤鸣秋月式" },
        { name: "蕉叶式" },
        { name: "连珠式" },
        { name: "龙颌变体" },
        { name: "伶官式" },
        { name: "落霞式" },
        { name: "仲尼变体" },
        // Origin
        { name: "马王堆3号墓出土" },
        { name: "李伯仁藏琴" },
        { name: "陈维斌藏琴" },
        { name: "刘世珩藏琴" },
        { name: "李廷敬款" },
        { name: "余韶藏琴" },
        { name: "彭舜功制" },
        { name: "李文炤藏琴" },
        { name: "沈道宽监斫" },
        { name: "左宗棠藏琴" },
        { name: "谭嗣同藏琴" },
        { name: "浏阳礼乐局" },
        { name: "衡州马炜监制" },
        { name: "禹梦龄制" },
        { name: "闵如珏制" },
        { name: "龚承钧藏琴" },
        { name: "邱方岳跋" },
        { name: "不详" },
        // Name
        { name: "七弦琴" },
        { name: "独幽琴" },
        { name: "飞泉琴" },
        { name: "寒泉漱石琴" },
        { name: "昭陵精一子题琴" },
        { name: "万壑松风琴" },
        { name: "凤皇琴" },
        { name: "鹤鸣秋月琴" },
        { name: "朝阳鸣凤琴" },
        { name: "祝公望蕉叶琴" },
        { name: "山左昌乐石凤桐制琴" },
        { name: "九霄环佩琴" },
        { name: "万历十年明琴" },
        { name: "无名明琴" },
        { name: "声和流泉琴" },
        { name: "养中和性琴" },
        { name: "海月清晖琴" },
        { name: "醉涛琴" },
        { name: "写心琴" },
        { name: "炎陵文梓琴" },
        { name: "左宗棠家传七弦琴" },
        { name: "崩霆琴" },
        { name: "谭嗣同遗物——七弦琴" },
        { name: "浏阳礼乐局七弦琴" },
        { name: "回鹤琴" },
        { name: "无名清琴" },
        { name: "衡州府礼乐局造琴" },
        { name: "禹梦龄制琴" },
        { name: "圣节会闵如珏制琴" },
        { name: "流泉琴" },
        { name: "玉涧鸣泉琴" },
        { name: "龚承钧藏琴 " },
        { name: "古琴" },
        { name: "朱色琴" },
        { name: "程午加制琴" },
      ],
      links: [
        // 1
        { source: "Western Han", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "马王堆3号墓出土", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "马王堆3号墓出土", target: "七弦琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 2
        { source: "Tang", target: "灵机式", value: 1, lineStyle: { color: "#ffe757" } },
        { source: "灵机式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#ffe757" } },
        { source: "李伯仁藏琴", target: "独幽琴", value: 1, lineStyle: { color: "#ffe757" } },
        // 3
        { source: "Tang", target: "凤势式", value: 1, lineStyle: { color: "#e27dbe" } },
        { source: "凤势式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#e27dbe" } },
        { source: "李伯仁藏琴", target: "飞泉琴", value: 1, lineStyle: { color: "#e27dbe" } },
        // 4
        { source: "Tang", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李伯仁藏琴", value: 5, lineStyle: { color: "#91d8c0" } },
        { source: "李伯仁藏琴", target: "寒泉漱石琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 5
        { source: "Song", target: "仲尼式", value: 3, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 10, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "昭陵精一子题琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 6
        { source: "Song", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "李伯仁藏琴", target: "万壑松风琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 7
        { source: "Song", target: "仲尼式", value: 3, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "李伯仁藏琴", target: "凤皇琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 8
        { source: "Ming", target: "鹤鸣秋月式", value: 1, lineStyle: { color: "#f9b7aa" } },
        { source: "鹤鸣秋月式", target: "刘世珩藏琴", value: 1, lineStyle: { color: "#f9b7aa" } },
        { source: "刘世珩藏琴", target: "鹤鸣秋月琴", value: 1, lineStyle: { color: "#f9b7aa" } },
        // 9
        { source: "Ming", target: "仲尼式", value: 5, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "朝阳鸣凤琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 10
        { source: "Ming", target: "蕉叶式", value: 1, lineStyle: { color: "#2967cc" } },
        { source: "蕉叶式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#2967cc" } },
        { source: "李伯仁藏琴", target: "祝公望蕉叶琴", value: 1, lineStyle: { color: "#2967cc" } },
        // 11
        { source: "Ming", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "山左昌乐石凤桐制琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 12
        { source: "Ming", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李廷敬款", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "李廷敬款", target: "九霄环佩琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 13
        { source: "Ming", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "万历十年明琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 14
        { source: "Ming", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "无名明琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 15
        { source: "Ming", target: "连珠式", value: 1, lineStyle: { color: "#ffd8b8" } },
        { source: "连珠式", target: "余韶藏琴", value: 2, lineStyle: { color: "#ffd8b8" } },
        { source: "余韶藏琴", target: "声和流泉琴", value: 1, lineStyle: { color: "#ffd8b8" } },
        // 16
        { source: "Qing", target: "仲尼式", value: 24, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "养中和性琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 17
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "李伯仁藏琴", target: "海月清晖琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 18
        { source: "Qing", target: "龙颌变体", value: 1, lineStyle: { color: "#e7b0f4" } },
        { source: "龙颌变体", target: "彭舜功制", value: 1, lineStyle: { color: "#e7b0f4" } },
        { source: "彭舜功制", target: "醉涛琴", value: 1, lineStyle: { color: "#e7b0f4" } },
        // 19
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李文炤藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "李文炤藏琴", target: "写心琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 20
        { source: "Qing", target: "伶官式", value: 1, lineStyle: { color: "#a2e7ea" } },
        { source: "伶官式", target: "沈道宽监斫", value: 1, lineStyle: { color: "#a2e7ea" } },
        { source: "沈道宽监斫", target: "炎陵文梓琴", value: 1, lineStyle: { color: "#a2e7ea" } },
        // 21
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "左宗棠藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "左宗棠藏琴", target: "左宗棠家传七弦琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 22
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "谭嗣同藏琴", value: 2, lineStyle: { color: "#91d8c0" } },
        { source: "谭嗣同藏琴", target: "崩霆琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 23
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "谭嗣同藏琴", target: "谭嗣同遗物——七弦琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 24~27
        { source: "Qing", target: "仲尼式", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "浏阳礼乐局", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "浏阳礼乐局", target: "浏阳礼乐局七弦琴", value: 4, lineStyle: { color: "#91d8c0" } },
        // 28
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "李伯仁藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "李伯仁藏琴", target: "回鹤琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 29
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "无名清琴", value: 5, lineStyle: { color: "#91d8c0" } },
        // 30
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "无名清琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 31
        { source: "Qing", target: "伶官式", value: 1, lineStyle: { color: "#a2e7ea" } },
        { source: "伶官式", target: "陈维斌藏琴", value: 1, lineStyle: { color: "#a2e7ea" } },
        { source: "陈维斌藏琴", target: "无名清琴", value: 1, lineStyle: { color: "#a2e7ea" } },
        // 32
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "无名清琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 33
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "陈维斌藏琴", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "陈维斌藏琴", target: "无名清琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 34~39
        { source: "Qing", target: "仲尼变体", value: 4, lineStyle: { color: "#c5ebf9" } },
        { source: "仲尼变体", target: "衡州马炜监制", value: 4, lineStyle: { color: "#c5ebf9" } },
        { source: "衡州马炜监制", target: "衡州府礼乐局造琴", value: 4, lineStyle: { color: "#c5ebf9" } },
        // 40
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "禹梦龄制", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "禹梦龄制", target: "禹梦龄制琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 41~47
        { source: "Qing", target: "仲尼式", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "闵如珏制", value: 4, lineStyle: { color: "#91d8c0" } },
        { source: "闵如珏制", target: "圣节会闵如珏制琴", value: 4, lineStyle: { color: "#91d8c0" } },
        // 48
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "不详", value: 2, lineStyle: { color: "#91d8c0" } },
        { source: "不详", target: "流泉琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 49
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "不详", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "不详", target: "玉涧鸣泉琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 50
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "龚承钧藏琴", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "龚承钧藏琴", target: "龚承钧藏琴 ", value: 1, lineStyle: { color: "#91d8c0" } },
        // 51
        { source: "Qing", target: "仲尼式", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "仲尼式", target: "邱方岳跋", value: 1, lineStyle: { color: "#91d8c0" } },
        { source: "邱方岳跋", target: "古琴", value: 1, lineStyle: { color: "#91d8c0" } },
        // 52
        { source: "Qing", target: "落霞式", value: 4, lineStyle: { color: "#c2c2ff" } },
        { source: "落霞式", target: "余韶藏琴", value: 4, lineStyle: { color: "#c2c2ff" } },
        { source: "余韶藏琴", target: "朱色琴", value: 4, lineStyle: { color: "#c2c2ff" } },
        // 53
        { source: "Republic of China", target: "连珠式", value: 1, lineStyle: { color: "#ffd8b8" } },
        { source: "连珠式", target: "余韶藏琴", value: 1, lineStyle: { color: "#ffd8b8" } },
        { source: "余韶藏琴", target: "程午加制琴", value: 1, lineStyle: { color: "#ffd8b8" } },
      ],
      lineStyle: {
        curveness: 0.4,
        opacity: 0.5,
      },
      layoutIterations: 128,
      itemStyle: {
        normal: {
          color: "#204a46",
          borderColor: "#204a46",
        },
      },
      label: {
        fontSize: 11,
      },
    },
  ],
  tooltip: {
    trigger: "item",
  },
};
chart.setOption(option);

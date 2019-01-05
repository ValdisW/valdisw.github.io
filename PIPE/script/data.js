/*==========================================================================================
 *  ** 数据
 *==========================================================================================*/
const localWidth = 462, localHeight = 454;                      // 测量展示范围宽高
const blocks_data = [                                           // 各方块测量数据
    {id: '1', name: '提标硝化滤池', font: '16px Microsoft YaHei', x: 0, y: 0, w: 96, h: 62},
    {id: '1_attach', name: '', font: '16px Microsoft YaHei', x: 95, y: 0, w: 5, h: 10},
    {id: '2', name: '提标反硝化池', font: '16px Microsoft YaHei', x: 116, y: 0, w: 96, h: 62},
    {id: '2_attach', name: '', font: '16px Microsoft YaHei', x: 211, y: 0, w: 5, h: 10},
    {id: '3', name: '提标\n滤布\n滤池', font: '12px Microsoft YaHei', x: 232, y: 0, w: 22, h: 62},
    {id: '4', name: '扩建工程调节池', font: '16px Microsoft YaHei', x: 195, y: 428, w: 236, h: 26},
    {id: '4_attach', name: '', font: '16px Microsoft YaHei', x: 305, y: 424, w: 20, h: 5},
    {id: '5', name: '扩建\n滤布\n滤池', font: '12px Microsoft YaHei', x: 282, y: 91, w: 22, h: 36},
    {id: '6', name: '扩建硝化车间', font: '16px Microsoft YaHei', x: 134, y: 161, w: 120, h: 135},
    {id: '6', name: '扩建反硝化池', font: '16px Microsoft YaHei', x: 342, y: 161, w: 120, h: 135},
    {id: '7', name: '提标泵房\n及臭氧', font: '14px Microsoft YaHei', x: 268, y: -1, w: 42, h: 63},
    {id: '8', name: '曝气活性炭池', font: '16px Microsoft YaHei', x: 16, y: 91, w: 238, h: 51},
    {id: '9', name: '臭氧发生器', font: '14px Microsoft YaHei', x: 327, y: 90, w: 63, h: 41},
    {id: '10', name: '污泥浓缩池', font: '10px Microsoft YaHei', x: 323, y: 41, w: 43, h: 21},
    {id: '11', name: '脱水机房加\n药除臭系统', font: '13px Microsoft YaHei', x: 390, y: 4, w: 72, h: 57},
    {id: '12', name: '变电站', font: '16px Microsoft YaHei', x: 412, y: 89, w: 52, h: 54},
    {id: '13', name: '液氧站', font: '14px Microsoft YaHei', x: 344, y: 9, w: 16, h: 16},
    {id: '14_17', name: '综合控制室&综合进出水池', font: '14px Microsoft YaHei', x: 14, y: 338, w: 138, h: 66},
    {id: '14_17_attach', name: '', font: '16px Microsoft YaHei', x: 14, y: 329.5, w: 40, h: 10},
    {id: '15', name: '超滤车间', font: '16px Microsoft YaHei', x: 16, y: 163, w: 88, h: 135},
    {id: '16', name: '高效\n沉淀池', font: '14px Microsoft YaHei', x: 282, y: 161, w: 37, h: 75},
    {id: 'undefined', name: '', font: '14px Microsoft YaHei', x: 164, y: 148, w: 92, h: 5},
    {id: 'undefined', name: '', font: '14px Microsoft YaHei', x: 278, y: 148, w: 165, h: 5},

];
const pipe_radius = 2;
const pipes_segment_data = [
    // 1
    {group: 0, x: -5, y: 31, w: 5.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: -5, y: 31, w: pipe_radius, h: 296, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: -5, y: 326, w: 48, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},

    //{group: 0, x: 18, y: 326, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: 23, y: 326, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: -1},
    //{group: 0, x: 23, y: 326, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: 28, y: 326, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: -1},
    //{group: 0, x: 28, y: 326, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: 33, y: 326, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: -1},
    //{group: 0, x: 33, y: 326, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: 38, y: 326, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: -1},
    //{group: 0, x: 38, y: 326, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: 43, y: 326, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: -1},

    // 2
    {group: 1, x: -4, y: 67.5, w: 108, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 1, x: 102, y: 31, w: pipe_radius, h: 37, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 1, x: 102, y: 67.5, w: 117.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 1, x: 218, y: 31, w: pipe_radius, h: 37, color: '#FF0', time: 1000, flow_direction: -1},

    // 3
    {group: 2, x: 96, y: 31, w: 21, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 4
    {group: 3, x: 211.5, y: 31, w: 21, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 5
    {group: 4, x: 235, y: 62, w: pipe_radius, h: 10, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 4, x: 9, y: 71, w: 227, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 4, x: 9, y: 71, w: pipe_radius, h: 86, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 4, x: 9, y: 156, w: 92, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 4, x: 100, y: 156, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},

    // 6
    {group: 5, x: 254, y: 19, w: 14, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 7
    {group: 6, x: 257.5, y: 34, w: 10.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 6, x: 257.5, y: 34, w: pipe_radius, h: 54, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 12.5, y: 86, w: 246, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 6, x: 12.5, y: 86, w: pipe_radius, h: 61, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 13, y: 116, w: 4, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 12.5, y: 146, w: 72, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 84, y: 146, w: pipe_radius, h: 18, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 84, y: 146, w: 67, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 149, y: 141, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},

    // 8
    {group: 7, x: 93, y: 301, w: 28.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 7, x: 120, y: 146, w: pipe_radius, h: 156, color: '#FF0', time: 1000, flow_direction: 1},

    // 9
    {group: 8, x: 261.5, y: 57, w: 6.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 8, x: 261, y: 57, w: pipe_radius, h: 59, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 8, x: 253.5, y: 116, w: 8, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 8, x: 261, y: 116, w: pipe_radius, h: 30, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 8, x: 159, y: 144.5, w: 103, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 10
    {group: 9, x: 284, y: 61.5, w: pipe_radius, h: 29.5, color: '#FF0', time: 1000, flow_direction: -1},

    // 14
    {x: 159, y: 141, w: pipe_radius, h: 10, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 112, y: 150, w: 48.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 112, y: 150, w: pipe_radius, h: 80, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 104, y: 230, w: 9, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 112, y: 230, w: pipe_radius, h: 62, color: '#FF0', time: 1000, flow_direction: 1},

    // 17
    {x: 304, y: 108, w: 3, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 306, y: 108, w: pipe_radius, h: 48, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 108, y: 154, w: 199, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 108, y: 154, w: pipe_radius, h: 39, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 104, y: 192, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 18
    {x: 104, y: 291, w: 29, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 131, y: 291, w: pipe_radius, h: 47, color: '#FF0', time: 1000, flow_direction: 1},

    // 19
    {x: 93, y: 297, w: pipe_radius, h: 41, color: '#FF0', time: 1000, flow_direction: 1},

    // 20
    {x: 5, y: 120, w: 11, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 5, y: 120, w: pipe_radius, h: 232, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 5, y: 351, w: 9, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 23
    {x: 254, y: 19, w: 14, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 24
    {x: 254, y: 19, w: 14, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 25
    {x: 254, y: 19, w: 14, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 26
    {x: 254, y: 19, w: 14, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 27
    {x: 254, y: 19, w: 14, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},


    // 无数据
    // 1
    {x: 99.5, y: 3, w: 3.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 102, y: 3, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 99.5, y: 6, w: 3.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 102, y: 6, w: pipe_radius, h: 12, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 102, y: 17, w: 9, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 110, y: 17, w: pipe_radius, h: 49, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 110, y: 64, w: 169, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 64, w: pipe_radius, h: 37, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 100, w: 5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 100, w: pipe_radius, h: 14, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 113, w: 5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 113, w: pipe_radius, h: 30.5, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 142, w: 15, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 291, y: 142, w: pipe_radius, h: 19.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 2
    {x: 215.5, y: 3, w: 4, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 218, y: 3, w: pipe_radius, h: 4, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 215.5, y: 6, w: 4, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 218, y: 6, w: pipe_radius, h: 12, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 218, y: 17, w: 10, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 226, y: 17, w: pipe_radius, h: 49, color: '#FF0', time: 1000, flow_direction: 1},

    // 3
    {x: 253.5, y: 9, w: 2, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 255, y: 9, w: pipe_radius, h: 19, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 253.5, y: 27, w: 2, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 255, y: 27, w: pipe_radius, h: 19, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 253.5, y: 45, w: 2, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 255, y: 45, w: pipe_radius, h: 21, color: '#FF0', time: 1000, flow_direction: 1},

    // 4
    {x: 334, y: 37, w: 56, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 334, y: 37, w: pipe_radius, h: 4.5, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 355, y: 37, w: pipe_radius, h: 4.5, color: '#FF0', time: 1000, flow_direction: -1},

    // 5
    {x: 318.5, y: 209, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 323, y: 66, w: pipe_radius, h: 144, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 323, y: 66, w: 12, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 334, y: 66, w: 22.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 334, y: 61.5, w: pipe_radius, h: 6.5, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 355, y: 61.5, w: pipe_radius, h: 6.5, color: '#FF0', time: 1000, flow_direction: -1},

    // 6
    {x: 167, y: 142, w: pipe_radius, h: 6.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 7
    {x: 171, y: 152.5, w: pipe_radius, h: 9, color: '#FF0', time: 1000, flow_direction: 1},

    // 8
    {x: 231, y: 152.5, w: pipe_radius, h: 9, color: '#FF0', time: 1000, flow_direction: 1},

    // 9
    {x: 288, y: 152, w: pipe_radius, h: 9.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 10
    {x: 256, y: 150, w: 23, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 11
    {x: 379, y: 152, w: pipe_radius, h: 9.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 12
    {x: 439, y: 152, w: pipe_radius, h: 9.5, color: '#FF0', time: 1000, flow_direction: -1},


    // 13
    {x: 340, y: 158, w: 38, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 339, y: 158, w: pipe_radius, h: 140, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 376, y: 158, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 376, y: 158, w: 52, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 426, y: 158, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 14 （原11）
    {x: 264, y: 160, w: pipe_radius, h: 138, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 264, y: 296.5, w: 210, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 473, y: 296.5, w: pipe_radius, h: 143.5, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 431, y: 438, w: 43, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},

    // 15 （原16）
    {x: 208, y: 156, w: 92, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 300, y: 156, w: 91.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 298, y: 127, w: pipe_radius, h: 30, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 208, y: 156, w: pipe_radius, h: 5, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 390, y: 157, w: pipe_radius, h: 5, color: '#FF0', time: 1000, flow_direction: -1},

    // 16 （原21）
    {x: 160, y: 301, w: 300, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 160, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 168, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 220, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 228, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 368, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 376, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 428, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 436, y: 295.5, w: pipe_radius, h: 7, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 458, y: 301, w: pipe_radius, h: 121, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 313, y: 420, w: 146, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 313, y: 421, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 317, y: 421, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 321, y: 421, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: -1},

    // 17 （原22）
    {x: 431, y: 433, w: 38, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 469, y: 307, w: pipe_radius, h: 126, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 307, w: 191, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 204, w: pipe_radius, h: 103, color: '#FF0', time: 1000, flow_direction: 1},
    {x: 278, y: 204, w: 4, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {x: 278, y: 227, w: 4, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
];

// 将测量数据转化成绘制用数据
const magnification = (Math.floor(window.innerHeight) - 150) / localHeight;     // 缩放(一般是放大)倍数
const draw_blocks_data = [],
    draw_pipes_segment_data = [],
    draw_pipes_arc = [],
    draw_localHeight = localHeight * magnification,
    draw_localWidth = localWidth * magnification;
for (let i = 0; i < blocks_data.length; i++) {          // 方块数据
    draw_blocks_data[i] = {};
    draw_blocks_data[i].id = blocks_data[i].id;
    draw_blocks_data[i].name = blocks_data[i].name;
    draw_blocks_data[i].font = blocks_data[i].font;
    draw_blocks_data[i].x = (window.innerWidth - draw_localWidth) / 2 + Math.floor(blocks_data[i].x * magnification);
    draw_blocks_data[i].y = 50 + (window.innerHeight - draw_localHeight) / 2 + Math.floor(blocks_data[i].y * magnification);
    draw_blocks_data[i].w = Math.floor(blocks_data[i].w * magnification);
    draw_blocks_data[i].h = Math.floor(blocks_data[i].h * magnification);
}
for (let i = 0; i < pipes_segment_data.length; i++) {       // 管道数据
    draw_pipes_segment_data[i] = {};
    draw_pipes_segment_data[i].color = pipes_segment_data[i].color;
    draw_pipes_segment_data[i].time = pipes_segment_data[i].time;
    draw_pipes_segment_data[i].flow_direction = pipes_segment_data[i].flow_direction;
    draw_pipes_segment_data[i].x = (window.innerWidth - draw_localWidth) / 2 + Math.floor(pipes_segment_data[i].x * magnification);
    draw_pipes_segment_data[i].y = 50 + (window.innerHeight - draw_localHeight) / 2 + Math.floor(pipes_segment_data[i].y * magnification);
    draw_pipes_segment_data[i].w = Math.floor(pipes_segment_data[i].w * magnification);
    draw_pipes_segment_data[i].h = Math.floor(pipes_segment_data[i].h * magnification);
}
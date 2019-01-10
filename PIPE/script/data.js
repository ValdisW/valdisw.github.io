/*==========================================================================================
 *  ** 数据
 *==========================================================================================*/
const localWidth = 500, localHeight = 454;                      // 测量展示范围宽高
const blocks_data = [                                           // 各方块测量数据
    {id: '1', name: '提标硝化滤池', font: '16px Microsoft YaHei', x: 0, y: 0, w: 96, h: 62},
    {id: '1_attach', name: '', font: '16px Microsoft YaHei', x: 95, y: 0, w: 5, h: 20},
    {id: '2', name: '提标反硝化池', font: '16px Microsoft YaHei', x: 116, y: 0, w: 96, h: 62},
    {id: '2_attach', name: '', font: '16px Microsoft YaHei', x: 211, y: 0, w: 5, h: 20},

    {id: '3', name: '提标\n滤布\n滤池', font: '12px Microsoft YaHei', x: 242, y: 0, w: 22, h: 62},
    {id: '7', name: '提标泵房\n及臭氧', font: '14px Microsoft YaHei', x: 298, y: -1, w: 52, h: 63},

    {id: '4', name: '扩建工程调节池', font: '16px Microsoft YaHei', x: 195, y: 398, w: 236, h: 26},
    {id: '4_attach', name: '', font: '16px Microsoft YaHei', x: 308, y: 394, w: 20, h: 6},


    {id: '8', name: '曝气活性炭池', font: '16px Microsoft YaHei', x: 16, y: 101, w: 248, h: 51},
    {id: '5', name: '扩建\n滤布\n滤池', font: '12px Microsoft YaHei', x: 320, y: 101, w: 27, h: 36},
    {id: '9', name: '臭氧发生器', font: '14px Microsoft YaHei', x: 371, y: 101, w: 63, h: 41},
    {id: '12', name: '变电站', font: '16px Microsoft YaHei', x: 442, y: 101, w: 50, h: 54},
    {id: 'undefined', name: '', font: '14px Microsoft YaHei', x: 174, y: 178, w: 92, h: 5},
    {id: 'undefined', name: '', font: '14px Microsoft YaHei', x: 308, y: 178, w: 175, h: 5},

    {id: '13', name: '液氧站', font: '14px Microsoft YaHei', x: 364, y: 0, w: 30, h: 30},
    {id: '10', name: '污泥浓缩池', font: '14px Microsoft YaHei', x: 359, y: 41, w: 53, h: 30},
    {id: '11', name: '脱水机房加\n药除臭系统', font: '13px Microsoft YaHei', x: 420, y: 4, w: 72, h: 57},

    {id: '14_17', name: '综合控制室\n综合进出水池', font: '14px Microsoft YaHei', x: 14, y: 368, w: 138, h: 66},
    {id: '14_17_attach', name: '', font: '16px Microsoft YaHei', x: 14, y: 360, w: 40, h: 10},

    {id: '15', name: '超滤车间', font: '16px Microsoft YaHei', x: 16, y: 211, w: 88, h: 120},
    {id: '6', name: '扩建硝化车间', font: '16px Microsoft YaHei', x: 134, y: 211, w: 120, h: 135},
    {id: '6', name: '扩建反硝化池', font: '16px Microsoft YaHei', x: 372, y: 211, w: 120, h: 135},
    {id: '16', name: '高效\n沉淀池', font: '14px Microsoft YaHei', x: 312, y: 211, w: 37, h: 75},


];
const pipe_radius = 3;
const pipes_segment_data = [
    // 1
    {group: 0, x: -20, y: 31, w: 20.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 0, x: -20, y: 31, w: pipe_radius, h: 324, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: -20, y: 354, w: 64, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: 23, y: 354, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: 28, y: 354, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: 33, y: 354, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: 38, y: 354, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 0, x: 43, y: 354, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},

    // 2
    {group: 1, x: -19, y: 72.5, w: 240, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 1, x: 102, y: 31, w: pipe_radius, h: 42, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 1, x: 218, y: 31, w: pipe_radius, h: 42, color: '#FF0', time: 1000, flow_direction: -1},

    // 3
    {group: 2, x: 96, y: 31, w: 21, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 4
    {group: 3, x: 211.5, y: 31, w: 31, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 5
    {group: 4, x: 245, y: 62, w: pipe_radius, h: 22, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 4, x: -1, y: 81, w: 249.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 4, x: -1, y: 81, w: pipe_radius, h: 116, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 4, x: -1, y: 196, w: 102, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 4, x: 100, y: 196, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},

    // 6
    {group: 5, x: 264, y: 19, w: 34, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 7
    {group: 6, x: 280.5, y: 34, w: 17.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 6, x: 280, y: 34, w: pipe_radius, h: 59, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 8.5, y: 91, w: 274.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 6, x: 8.5, y: 91, w: pipe_radius, h: 77, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 9, y: 116, w: 7, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 8.5, y: 166, w: 143, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 84, y: 166, w: pipe_radius, h: 45, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 6, x: 149, y: 151, w: pipe_radius, h: 18, color: '#FF0', time: 1000, flow_direction: -1},

    // 8
    {group: 7, x: 93, y: 341, w: 30, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 7, x: 120, y: 151, w: pipe_radius, h: 191.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 9
    {group: 8, x: 289, y: 47, w: 9, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 8, x: 289, y: 47, w: pipe_radius, h: 120, color: '#FF0', time: 1000, flow_direction: 1},
   // {group: 8, x: 264, y: 57, w: 26.5, h: pipe_radius, color: '#F00', time: 1000, flow_direction: -1},
    {group: 8, x: 263.5, y: 116, w: 28, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 8, x: 159, y: 165, w: 133.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},

    // 10
    {group: 9, x: 329, y: 62, w: pipe_radius, h: 39, color: '#FF0', time: 1000, flow_direction: -1},

    // 11
    {group: 10, x: 29, y: 434, w: pipe_radius, h: 309, color: '#FF0', time: 1000, flow_direction: -1},

    // 12
    {group: 11, x: 108, y: 434, w: pipe_radius, h: 12, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 11, x: -29, y: 444, w: 140, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},

    // 13
    {group: 12, x: 128, y: 434, w: pipe_radius, h: 25, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 12, x: 85, y: 457, w: 46, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 12, x: 85, y: 444, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},

    // 14
    {group: 13, x: 159, y: 151, w: pipe_radius, h: 31, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 13, x: 114, y: 180, w: 48.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 13, x: 114, y: 180, w: pipe_radius, h: 132, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 13, x: 104, y: 260, w: 11, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 17
    {group: 16, x: 346, y: 118, w: 9, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 16, x: 354, y: 118, w: pipe_radius, h: 72, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 16, x: 108, y: 188, w: 249.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 16, x: 108, y: 188, w: pipe_radius, h: 39, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 16, x: 104, y: 226, w: 7, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 18
    {group: 17, x: 104, y: 311, w: 26, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 17, x: 128, y: 311, w: pipe_radius, h: 57, color: '#FF0', time: 1000, flow_direction: 1},

    // 19
    {group: 18, x: 93, y: 330.5, w: pipe_radius, h: 38, color: '#FF0', time: 1000, flow_direction: 1},

    // 20
    {group: 19, x: -10, y: 135, w: 26, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 19, x: -10, y: 135, w: pipe_radius, h: 255, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 19, x: -10, y: 388, w: 24, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},


    // 无数据
    // 1
    {group: 20, x: 99.5, y: 3, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 99.5, y: 15, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 104, y: 3, w: pipe_radius, h: 20, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 104, y: 22, w: 7, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 110, y: 22, w: pipe_radius, h: 44, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 110, y: 64, w: 199, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 308, y: 64, w: pipe_radius, h: 80, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 308.5, y: 110, w: 12, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 20, x: 308.5, y: 123, w: 12, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 20, x: 308, y: 142, w: 21, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 20, x: 328, y: 142, w: pipe_radius, h: 69, color: '#FF0', time: 1000, flow_direction: 1},

    // 2
    {group: 21, x: 215.5, y: 3, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 21, x: 215.5, y: 15, w: 6, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 21, x: 220, y: 3, w: pipe_radius, h: 21, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 21, x: 220, y: 22, w: 12, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 21, x: 230, y: 22, w: pipe_radius, h: 44, color: '#FF0', time: 1000, flow_direction: 1},

    // 3
    {group: 22, x: 270, y: 9, w: pipe_radius, h: 57, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 22, x: 264, y: 9, w: 7, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 22, x: 264, y: 27, w: 7, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 22, x: 264, y: 45, w: 7, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 4
    {group: 23, x: 374, y: 35, w: 46, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 23, x: 374, y: 36, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 23, x: 395, y: 36, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},

    // 5
    {group: 24, x: 348.5, y: 229, w: 15, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 24, x: 360, y: 77, w: pipe_radius, h: 154, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 24, x: 361, y: 77, w: 37.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 24, x: 374, y: 71.5, w: pipe_radius, h: 6.5, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 24, x: 395, y: 71.5, w: pipe_radius, h: 6.5, color: '#FF0', time: 1000, flow_direction: -1},

    // 6
    {group: 25, x: 177, y: 152, w: pipe_radius, h: 26.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 7
    {group: 26, x: 181, y: 182.5, w: pipe_radius, h: 29, color: '#FF0', time: 1000, flow_direction: 1},

    // 8
    {group: 27, x: 231, y: 182.5, w: pipe_radius, h: 29, color: '#FF0', time: 1000, flow_direction: 1},

    // 9
    {group: 28, x: 316, y: 182.5, w: pipe_radius, h: 28.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 10
    {group: 29, x: 266.5, y: 180, w: 41.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

    // 11
    {group: 30, x: 469, y: 182, w: pipe_radius, h: 29.5, color: '#FF0', time: 1000, flow_direction: 1},

    // 12
  //  {x: 469, y: 154.5, w: pipe_radius, h: 23.5, color: '#F00', time: 1000, flow_direction: -1},

    // 13
    {group: 31, x: 365, y: 205, w: pipe_radius, h: 145, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 31, x: 366, y: 205, w: 93, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 31, x: 406, y: 206, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 31, x: 456, y: 206, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: 1},

    // 14 （原11）
    {group: 32, x: 431, y: 410, w: 65.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 32, x: 493, y: 349, w: pipe_radius, h: 63, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 32, x: 274, y: 349, w: 220, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 32, x: 264, y: 140, w: 11, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 32, x: 274, y: 140, w: pipe_radius, h: 210, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 32, x: 167, y: 205, w: 108, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 32, x: 167, y: 205, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 32, x: 220, y: 205, w: pipe_radius, h: 6, color: '#FF0', time: 1000, flow_direction: -1},

    // 15 （原16）
    {group: 33, x: 208, y: 196, w: 132, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 33, x: 339.5, y: 196, w: 92, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 33, x: 338, y: 137, w: pipe_radius, h: 60, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 33, x: 208, y: 196, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 33, x: 430, y: 196, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},

    // 16 （原21）
    {group: 34, x: 160, y: 359, w: 300, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 160, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 168, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 220, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 228, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 378, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 386, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 438, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 446, y: 345.5, w: pipe_radius, h: 15, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 458, y: 359, w: pipe_radius, h: 32.5, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 313, y: 390, w: 149, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 34, x: 313, y: 391, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 317, y: 391, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 34, x: 321, y: 391, w: pipe_radius, h: 3.5, color: '#FF0', time: 1000, flow_direction: -1},

    // 17 （原22）
    {group: 35, x: 431, y: 403, w: 45.5, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 35, x: 473, y: 367, w: pipe_radius, h: 38, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 35, x: 302, y: 367, w: 172, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 35, x: 302, y: 234, w: pipe_radius, h: 134, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 35, x: 302, y: 234, w: 10, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},
    {group: 35, x: 302, y: 257, w: 10, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: -1},


    // 28
    {group: 36, x: 313, y: 424, w: pipe_radius, h: 10, color: '#FF0', time: 1000, flow_direction: 1},
    {group: 36, x: 313, y: 432, w: 192, h: pipe_radius, color: '#FF0', time: 1000, flow_direction: 1},

];

// zrender绘制数据
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
for (let i = 0; i < pipes_segment_data.length; i++) {       // 管道片段数据
    draw_pipes_segment_data[i] = {};
    draw_pipes_segment_data[i].group = pipes_segment_data[i].group;
    draw_pipes_segment_data[i].color = pipes_segment_data[i].color;
    draw_pipes_segment_data[i].time = pipes_segment_data[i].time;
    draw_pipes_segment_data[i].flow_direction = pipes_segment_data[i].flow_direction;
    draw_pipes_segment_data[i].x = (window.innerWidth - draw_localWidth) / 2 + Math.floor(pipes_segment_data[i].x * magnification);
    draw_pipes_segment_data[i].y = 50 + (window.innerHeight - draw_localHeight) / 2 + Math.floor(pipes_segment_data[i].y * magnification);
    draw_pipes_segment_data[i].w = Math.floor(pipes_segment_data[i].w * magnification);
    draw_pipes_segment_data[i].h = Math.floor(pipes_segment_data[i].h * magnification);
    draw_pipes_segment_data[i].flows = [];
}

// 整段管道数据
let group_id = [];          // 存放所有的group
let pipes = [];
for (let i = 0; i < draw_pipes_segment_data.length; i++) if (group_id.indexOf(draw_pipes_segment_data[i].group) === -1) group_id.push(draw_pipes_segment_data[i].group);
for (let i = 0; i < group_id.length; i++) pipes[i] = {group_ID: group_id[i], all_pipes: []};
for (let i = 0; i < draw_pipes_segment_data.length; i++) {
    for (let j = 0; j < pipes.length; j++) {
        if (pipes[j].group_ID === draw_pipes_segment_data[i].group) {
            pipes[j].all_pipes.push(draw_pipes_segment_data[i]);
            break;
        }
    }
}

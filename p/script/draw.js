//====================================================================
// ** draw.js
//--------------------------------------------------------------------
//    实际绘制（标题和管网）以及提示框的交互
//====================================================================
let zr = zrender.init($('#main')[0]);
let pipeInfoBlock =　new pipeInfoToolTip();       // 管道提示框
let blockInfoBlock = new blockInfoTooltip();      // 水池提示框

let pipe_drawData = new Array(pipeData_origin.length);
for (let i = 0; i < pipe_drawData.length; i++) {
    pipe_drawData[i] = new Array(pipeData_origin[i].vertices.length);
    for (let j = 0; j < pipeData_origin[i].vertices.length; j++) {
        pipe_drawData[i][j] = pipeData_origin[i].vertices[j].coor.slice(0);
    }
}

// 标题文字
let title = new zrender.Rect({
    shape: {
        x: 0, y: 0,
        width: window.innerWidth, height: 140,
    },
    style: {
        fill: 'transparent',
        text: '管网计算与预警系统',
        textFill: '#7BFFF8',
        font: '36px LEXUS 简粗黑 U',
        fontWeight: 'lighter',
        textAlign: 'center'
    },
    silent: true
});
zr.add(title);

// 绘制管道
let pipe_num = pipe_drawData.length;
let pipes = new Array(pipe_num);         // 保存所有管道
let pipes_flow = new Array(pipe_num);    // 保存所有管道的流动效果
for (let i = 0; i < pipe_num; i++) {
    // 管道本体
    pipes[i] = new zrender.Polyline({
        shape: {points: pipe_drawData[i]},
        style: {
            stroke: '#FF0',
            lineWidth: 5
        },
        zlevel: 1
    });
    pipes[i].on('mousemove', (e)=>{     // tooltip交互
        pipes[i].attr({
            style: { shadowBlur: 20, shadowColor: '#FF0'}     // 管线高亮（阴影）
        });
        // 计算鼠标指向位置的流速、温度、压力
        let m_speed = linearInterpolation(pipeData_origin[i].vertices[0].speed, pipeData_origin[i].vertices[pipeData_origin[i].vertices.length - 1].speed, Math.abs(e.offsetY - pipeData_origin[i].vertices[0].coor[0]) / Math.abs(pipeData_origin[i].vertices[pipeData_origin[i].vertices.length - 1].coor[1] - pipeData_origin[i].vertices[0].coor[0])).toFixed(2);
        let m_temperature = linearInterpolation(pipeData_origin[i].vertices[0].temperature, pipeData_origin[i].vertices[pipeData_origin[i].vertices.length - 1].temperature, Math.abs(e.offsetY - pipeData_origin[i].vertices[0].coor[0]) / Math.abs(pipeData_origin[i].vertices[pipeData_origin[i].vertices.length - 1].coor[1] - pipeData_origin[i].vertices[0].coor[0])).toFixed(2);
        let m_pressure = linearInterpolation(pipeData_origin[i].vertices[0].pressure, pipeData_origin[i].vertices[pipeData_origin[i].vertices.length - 1].pressure, Math.abs(e.offsetY - pipeData_origin[i].vertices[0].coor[0]) / Math.abs(pipeData_origin[i].vertices[pipeData_origin[i].vertices.length - 1].coor[1] - pipeData_origin[i].vertices[0].coor[0])).toFixed(2);
        pipeInfoBlock.display(e.offsetX, e.offsetY, m_speed + ' km/h', m_temperature + ' °C', m_pressure + ' N');
    }).on('mouseout', function () {
        pipes[i].attr({style: {shadowBlur: 0,}});
        pipeInfoBlock.vanish();
    });
    zr.add(pipes[i]);

    // 管道流动
    pipes_flow[i] = new zrender.Polyline({
        shape: {points: pipe_drawData[i]},
        style: {
            stroke: '#282C34',
            lineWidth: 3,
            lineDash: [5, 5],
            opacity: 0.7
        },
        zlevel: 1,
        silent: true,
    });
    //console.log(pipes_flow[i]);
    pipes_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10)}).done(function() {}).start();
    zr.add(pipes_flow[i]);
}

// 绘制水池
let block_num = blockData_fit.length;
let blocks_outer = new Array(block_num);
let blocks_inner = new Array(block_num);
for (let i = 0; i < block_num; i++) {
    // 外框
    blocks_outer[i] = new zrender.Rect({
        shape: {
            x: blockData_fit[i].vertex1[0],
            y: blockData_fit[i].vertex1[1],
            width: blockData_fit[i].vertex2[0] - blockData_fit[i].vertex1[0],
            height: blockData_fit[i].vertex2[1] - blockData_fit[i].vertex1[1],
        },
        style: {
            fill: '#3A66B6'
        },
        zlevel: 2
    });
    blocks_outer[i].on('mousemove', function (e) {
        blockInfoBlock.display(e.offsetX, e.offsetY, '26 km/h');
    }).on('mouseout', function () {
        blockInfoBlock.vanish();
    });
    zr.add(blocks_outer[i]);

    // 内框
    blocks_inner[i] = new zrender.Rect({
        shape: {
            x: blockData_fit[i].vertex1[0] + 4,
            y: blockData_fit[i].vertex1[1] + 4,
            width: blockData_fit[i].vertex2[0] - blockData_fit[i].vertex1[0] - 8,
            height: blockData_fit[i].vertex2[1] - blockData_fit[i].vertex1[1] - 8,
        },
        style: {
            fill: '#282c34',
            text: blockData_fit[i].name,
            textFill: '#7bfff8',
            font: blockData_fit[i].font,
        },
        zlevel: 2,
    });
    blocks_inner[i].on('mousemove', function (e) {
        blockInfoBlock.display(e.offsetX, e.offsetY, '26 km/h');
    }).on('mouseout', function () {
        blockInfoBlock.vanish();
    });
    zr.add(blocks_inner[i]);
}
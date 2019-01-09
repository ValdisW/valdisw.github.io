// 全局变量
let magnify = 1;        // 缩放倍数

// ZRender初始化
let zr = zrender.init(document.getElementById('main'));

// 标题文字
let title = new zrender.Rect({
    shape: {
        x: 0, y: 0,
        width: window.innerWidth, height: 140,
    },
    style: {
        fill: 'transparent',
        text: '管网计算与预警系统',
        textFill: '#7bfff8',
        font: '36px LEXUS 简粗黑 U',
        fontWeight: 'lighter',
        textAlign: 'center'
    },
    silent: true
});
zr.add(title);

// 缩放功能按钮
let magnifierIcon = new zrender.Image({
    style: {
        x: window.innerWidth / 3 * 2 + 3, y: 30 + 3,
        width: 30, height: 30,
        image: './icons/magnifier.png',
    },
    silent: true,
    zlevel: 3
});
zr.add(magnifierIcon);
let magnifierButton = new zrender.Rect({
    shape: {
        x: window.innerWidth / 3 * 2, y: 30,
        width: 36, height: 36,
        r: [8]
    },
    style: {
        fill: '#666'
    }
});
magnifierButton.on('click', ()=>{
    let selectFrame = new zrender.Rect({
        shape: {x: 0, y: 0, width: 0, height: 0},
        style: {fill: '#000', opacity: 0.4, lineWidth: 1, stroke: '#FFF', lineDash: [5]},
        zlevel: 10
    });
    // 开始鼠标框选
    let startSelect = false;
    let startX, startY, frameWidth, frameHeight;    // 选框起始位置与宽高
    $('#main').mousedown(function (e) {
        startSelect = true;
        zr.add(selectFrame);
        startX = e.clientX; startY = e.clientY;
        selectFrame.attr({shape: {x: startX, y: startY, width: 0, height: 0}});
    }).mousemove(function (e) {
        selectFrame.attr({shape: {width: e.clientX - startX, height: (e.clientX - startX) * window.innerHeight / window.innerWidth}});
    }).mouseup(function (e) {        // 框选完毕
        startSelect = false;
        frameWidth = e.clientX - startX; frameHeight = (e.clientX - startX) * window.innerHeight / window.innerWidth;
        zr.remove(selectFrame);    // 移除选框

        // 执行放大，改的是实际zrender矩形对象的数据，而不是原来的数据
        zr.remove(title);       // 去掉碍眼的标题文字
        for (let i = 0; i < blocks_outer.length; i++) {         // 更新块的位置
            blocks_outer[i].attr({
                shape: {
                    x: (blocks_outer[i].shape.x - startX) * window.innerWidth / frameWidth,
                    y: (blocks_outer[i].shape.y - startY) * window.innerHeight / frameHeight,
                    width: blocks_outer[i].shape.width * window.innerWidth / frameWidth,
                    height: blocks_outer[i].shape.height * window.innerHeight / frameHeight,
                }
            });
            blocks_inner[i].attr({
                shape: {
                    x: (blocks_inner[i].shape.x - startX) * window.innerWidth / frameWidth,
                    y: (blocks_inner[i].shape.y - startY) * window.innerHeight / frameHeight,
                    width: blocks_inner[i].shape.width * window.innerWidth / frameWidth,
                    height: blocks_inner[i].shape.height * window.innerHeight / frameHeight,
                },
                style: {
                    fill: '#282c34',
                    text: draw_blocks_data[i].name,
                    textFill: '#7bfff8',
                    font: draw_blocks_data[i].font,
                    textLineHeight: 200,
                    textRect: {
                        x: draw_blocks_data[i].x,
                        y: draw_blocks_data[i].y,
                        width: draw_blocks_data[i].w/1,
                        height: draw_blocks_data[i].h,
                    }
                }
            });
        }
        for (let i = 0; i < blocks_pipe.length; i++) {      // 更新管道的位置
            blocks_pipe[i].attr({
                shape: {
                    x: (blocks_pipe[i].shape.x - startX) * window.innerWidth / frameWidth,
                    y: (blocks_pipe[i].shape.y - startY) * window.innerHeight / frameHeight,
                    width: blocks_pipe[i].shape.width * window.innerWidth / frameWidth,
                    height: blocks_pipe[i].shape.height * window.innerHeight / frameHeight,
                }
            });
        }
    });
});
zr.add(magnifierButton);

// 提示框
let pipeInfoBlock =　new pipeInfoToolTip();
let blockInfoBlock = new blockInfoTooltip();

// 绘制方块
let blocks_outer = new Array(blocks_data.length);
let blocks_inner = new Array(blocks_data.length);
for (let i = 0; i < draw_blocks_data.length; i++) {
    blocks_outer[i] = new zrender.Rect({
        shape: {
            x: draw_blocks_data[i].x,
            y: draw_blocks_data[i].y,
            width: draw_blocks_data[i].w,
            height: draw_blocks_data[i].h,
        },
        style: {fill: '#3a66b6'},
        zlevel: 1,
    });
    zr.add(blocks_outer[i]);
    blocks_outer[i].on('mousemove', function (e) {
        blockInfoBlock.display(e.offsetX, e.offsetY, '26 km/h');
    }).on('mouseout', function () {
        blockInfoBlock.vanish();
    });

    blocks_inner[i] = new zrender.Rect({
        shape: {
            x: draw_blocks_data[i].x + 4,
            y: draw_blocks_data[i].y + 4,
            width: draw_blocks_data[i].w - 8,
            height: draw_blocks_data[i].h - 8,
        },
        style: {
            fill: '#282c34',
            text: draw_blocks_data[i].name,
            textFill: '#7bfff8',
            font: draw_blocks_data[i].font,
            textLineHeight: 200,
            textRect: {
                x: draw_blocks_data[i].x,
                y: draw_blocks_data[i].y,
                width: draw_blocks_data[i].w/1,
                height: draw_blocks_data[i].h,
            }
        },
        zlevel: 1,
    });
    zr.add(blocks_inner[i]);
}

// 绘制管道
let blocks_pipe = new Array(blocks_data.length);
for (let i = 0; i < draw_pipes_segment_data.length; i++) {
    blocks_pipe[i] = new zrender.Rect({
        shape: {
            x: draw_pipes_segment_data[i].x, y: draw_pipes_segment_data[i].y,
            width: draw_pipes_segment_data[i].w, height: draw_pipes_segment_data[i].h,
        },
        style: {fill: pipes_segment_data[i].color},
        zlevel: 0,
    });
    zr.add(blocks_pipe[i]);

    // 鼠标交互
    blocks_pipe[i].on('mousemove', function (e) {
        blocks_pipe[i].attr({            // 发光
            style: {
                shadowBlur: 20,
                shadowColor: pipes_segment_data[i].color
            }
        });
        pipeInfoBlock.display(e.offsetX, e.offsetY, '26 km/h', '89 °C', '8000 N');
    }).on('mouseout', function () {
        blocks_pipe[i].attr({style: {shadowBlur: 0,}});
        pipeInfoBlock.vanish();
    });

    addPipeFLow(draw_pipes_segment_data[i], 5, 5);      // 添加流动
}

$('#main').get(0).onmousewheel = (e)=>{
    for (let i = 0; i < blocks_outer.length; i++) {
        blocks_outer[i].attr({
            shape: {
                /*
                                    x: blocks_outer[i].x,
                                    y: blocks_outer[i].y,
                */
                width: blocks_outer[i].shape.width + 1 * thresholdFunc(e.zrDelta),
                height: blocks_outer[i].shape.height + blocks_outer[i].shape.height / blocks_outer[i].shape.width * thresholdFunc(e.zrDelta),
            },
        });
        blocks_inner[i].attr({
            shape: {
                x: blocks_inner[i].shape.x,
                y: blocks_inner[i].shape.y,
                width: blocks_inner[i].shape.width + 1 * thresholdFunc(e.zrDelta),
                height: blocks_inner[i].shape.height + blocks_inner[i].shape.height / blocks_inner[i].shape.width * thresholdFunc(e.zrDelta),
            },
        });
        blocks_pipe[i].attr({
            shape: {
                x: blocks_pipe[i].shape.x,
                y: blocks_pipe[i].shape.y,
                width: blocks_pipe[i].shape.width + 1 * thresholdFunc(e.zrDelta),
                height: blocks_pipe[i].shape.height + blocks_pipe[i].shape.height / blocks_pipe[i].shape.width * thresholdFunc(e.zrDelta),
            },
        })
    }
}
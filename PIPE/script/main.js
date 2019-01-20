// zrender实际绘图部分

// 全局变量
let magnify = 1;        // 缩放倍数
let totalMagnify = 1;
let magnifyMode = false;    // 框选放大模式

// ZRender初始化容器
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
        textFill: '#7BFFF8',
        font: '36px LEXUS 简粗黑 U',
        fontWeight: 'lighter',
        textAlign: 'center'
    },
    silent: true
});
zr.add(title);



// 框选缩放功能按钮
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
    let selectFrame = new zrender.Rect({        // 选框
        shape: {x: 0, y: 0, width: 0, height: 0},
        style: {fill: '#000', opacity: 0.4, lineWidth: 1, stroke: '#FFF', lineDash: [5]},
        zlevel: 10
    });
    // 开始鼠标框选
    let startSelect = false;
    let startX, startY, frameWidth, frameHeight;    // 选框起始位置与宽高
    let have_exec_mag = false;              // 标记是否已经执行过放大
    $('#main').mousedown(function (e) {
        if (!have_exec_mag) {
            startSelect = true;
            zr.add(selectFrame);
            startX = e.clientX;             // 选框位置
            startY = e.clientY;
            selectFrame.attr({shape: {x: startX, y: startY, width: 0, height: 0}});
        }
    }).mousemove(function (e) {
        if (!have_exec_mag) if(startSelect) selectFrame.attr({shape: {width: e.clientX - startX, height: e.clientY - startY}});
    }).mouseup(function (e) {        // 框选完毕
        if (!have_exec_mag) {
            startSelect = false;
            frameWidth = e.clientX - startX;
            frameHeight = (e.clientX - startX) * window.innerHeight / window.innerWidth;       // 获取选框最终宽高
            zr.remove(selectFrame);    // 移除选框
            magnifyMode = true;        // 放大模式
            totalMagnify = window.innerWidth / frameWidth;
            // 执行放大，改的是实际zrender矩形对象的数据，而不是原来的数据
            // 更新方块
            for (i = 0; i < blocks_outer.childCount(); i++) {
                blocks_outer.children()[i].attr({
                    shape: {
                        x: (blocks_outer.children()[i].shape.x - startX) * window.innerWidth / frameWidth,
                        y: (blocks_outer.children()[i].shape.y - startY) * window.innerHeight / frameHeight,
                        width: blocks_outer.children()[i].shape.width * window.innerWidth / frameWidth,
                        height: blocks_outer.children()[i].shape.height * window.innerHeight / frameHeight,
                    }
                });
                blocks_inner.children()[i].attr({
                    shape: {
                        x: (blocks_inner.children()[i].shape.x - startX) * window.innerWidth / frameWidth,
                        y: (blocks_inner.children()[i].shape.y - startY) * window.innerHeight / frameHeight,
                        width: blocks_inner.children()[i].shape.width * window.innerWidth / frameWidth,
                        height: blocks_inner.children()[i].shape.height * window.innerHeight / frameHeight,
                    },
                    style: {
                        font: parseInt(draw_blocks_data[i].font.slice(0, draw_blocks_data[i].font.indexOf('px')))*totalMagnify + draw_blocks_data[i].font.substr(draw_blocks_data[i].font.indexOf('px')),
                    }

                });
            }
            // 更新管道
            for (i = 0; i < blocks_pipe.childCount(); i++) {
                blocks_pipe.children()[i].attr({
                    shape: {
                        x: (blocks_pipe.children()[i].shape.x - startX) * window.innerWidth / frameWidth,
                        y: (blocks_pipe.children()[i].shape.y - startY) * window.innerHeight / frameHeight,
                        width: blocks_pipe.children()[i].shape.width * window.innerWidth / frameWidth,
                        height: blocks_pipe.children()[i].shape.height * window.innerHeight / frameHeight,
                    }
                });
            }
            // 更新动画
            for (let i = 0; i < draw_pipes_segment_data.length; i++) {
                for (let j = 0; j < draw_pipes_segment_data[i].flows.length; j++) zr.remove(draw_pipes_segment_data[i].flows[j]);
                addPipeFLow(                        // 添加流动
                    zr,                             // 容器对象
                    draw_pipes_segment_data[i],     // 流动方向、速度
                    blocks_pipe.children()[i],      // ZRender对象
                    5 * totalMagnify,               // 流动块宽度
                    5 * totalMagnify,               // 流动块间隔
                    0.5 * totalMagnify,             // 管壁间隙
                    totalMagnify                    // 速度
                );
            }
            // 按钮变化
            magnifierButton.hide();
            magnifierIcon.hide();
            resetIcon.show();
            resetButton.show();

            have_exec_mag = true;
        }
    });

});
zr.add(magnifierButton);

// 复位按钮
let resetIcon = new zrender.Image({
    style: {
        x: window.innerWidth / 3 * 2 + 4, y: 30 + 4,
        width: 28, height: 28,
        image: './icons/reset.png',
    },
    silent: true,
    zlevel: 3
});
zr.add(resetIcon);
let resetButton = new zrender.Rect({
    shape: {
        x: window.innerWidth / 3 * 2, y: 30,
        width: 36, height: 36,
        r: [8]
    },
    style: {
        fill: '#666'
    }
});
resetIcon.hide();
resetButton.hide();
resetButton.on('click', ()=>{
    magnifyMode = false;
    resetIcon.hide();
    resetButton.hide();
    magnifierIcon.show();
    magnifierButton.show();

    totalMagnify = 1;
    // 更新方块
    for (i = 0; i < blocks_outer.childCount(); i++) {
        blocks_outer.children()[i].attr({
            shape: {
                x: draw_blocks_data[i].x,
                y: draw_blocks_data[i].y,
                width: draw_blocks_data[i].w,
                height: draw_blocks_data[i].h,
            }
        });
        blocks_inner.children()[i].attr({
            shape: {
                x: draw_blocks_data[i].x + 4,
                y: draw_blocks_data[i].y + 4,
                width: draw_blocks_data[i].w - 8,
                height: draw_blocks_data[i].h - 8,
            },
            style: {
                font: parseInt(draw_blocks_data[i].font.slice(0, draw_blocks_data[i].font.indexOf('px')))*totalMagnify + draw_blocks_data[i].font.substr(draw_blocks_data[i].font.indexOf('px')),
            }

        });
    }
    // 更新管道
    for (i = 0; i < blocks_pipe.childCount(); i++) {
        blocks_pipe.children()[i].attr({
            shape: {
                x: draw_pipes_segment_data[i].x, y: draw_pipes_segment_data[i].y,
                width: draw_pipes_segment_data[i].w, height: draw_pipes_segment_data[i].h,
            }
        });
    }
    // 更新动画
    for (let i = 0; i < draw_pipes_segment_data.length; i++) {
        for (let j = 0; j < draw_pipes_segment_data[i].flows.length; j++) zr.remove(draw_pipes_segment_data[i].flows[j]);
        addPipeFLow(                        // 添加流动
            zr,                             // 容器对象
            draw_pipes_segment_data[i],     // 流动方向、速度
            blocks_pipe.children()[i],      // ZRender对象
            5 * totalMagnify,               // 流动块宽度
            5 * totalMagnify,               // 流动块间隔
            0.5 * totalMagnify,             // 管壁间隙
            totalMagnify                    // 速度
        );
    }
});
zr.add(resetButton);








// 提示框
let pipeInfoBlock =　new pipeInfoToolTip();
let blockInfoBlock = new blockInfoTooltip();

// 绘制方块
let blocks_outer = new zrender.Group();
let blocks_inner = new zrender.Group();
for (let i = 0; i < draw_blocks_data.length; i++) {     // 访问所有方块数据
    let blockRect_outer = new zrender.Rect({
        shape: {
            x: draw_blocks_data[i].x,
            y: draw_blocks_data[i].y,
            width: draw_blocks_data[i].w,
            height: draw_blocks_data[i].h,
        },
        style: {fill: '#3a66b6'},
        zlevel: 1,
    });
    blockRect_outer.on('mousemove', function (e) {
        blockInfoBlock.display(e.offsetX, e.offsetY, '26 km/h');
    }).on('mouseout', function () {
        blockInfoBlock.vanish();
    });
    //blocks_outer_minimap[i] = zrender.util.clone(blockRect_outer);      // 拷贝数据
    blocks_outer.add(blockRect_outer);

    blockRect_inner = new zrender.Rect({
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
        },
        zlevel: 1,
    });
    blockRect_inner.on('mousemove', function (e) {
        blockInfoBlock.display(e.offsetX, e.offsetY, '26 km/h');
    }).on('mouseout', function () {
        blockInfoBlock.vanish();
    });
    //blocks_inner_minimap[i] = zrender.util.clone(blockRect_inner);      // 拷贝数据
    blocks_inner.add(blockRect_inner);
}
zr.add(blocks_outer);
zr.add(blocks_inner);

// 绘制管道
let blocks_pipe = new zrender.Group();
for (let i = 0; i < draw_pipes_segment_data.length; i++) {              // 访问每段管道
    let blockRect_pipe = new zrender.Rect({
        shape: {
            x: draw_pipes_segment_data[i].x, y: draw_pipes_segment_data[i].y,
            width: draw_pipes_segment_data[i].w, height: draw_pipes_segment_data[i].h,
        },
        style: {fill: pipes_segment_data[i].color},
        zlevel: 0,
    });

    // 鼠标交互
    blockRect_pipe.on('mousemove', function (e) {
        blockRect_pipe.attr({            // 发光
            style: {
                shadowBlur: 20,
                shadowColor: pipes_segment_data[i].color
            }
        });
        pipeInfoBlock.display(e.offsetX, e.offsetY, '26 km/h', '89 °C', '8000 N');
    }).on('mouseout', function () {
        blockRect_pipe.attr({style: {shadowBlur: 0,}});
        pipeInfoBlock.vanish();
    });
    blocks_pipe.add(blockRect_pipe);
}
zr.add(blocks_pipe);
for (let i = 0; i < draw_pipes_segment_data.length; i++) {
    addPipeFLow(                       // 添加流动
        zr,
        draw_pipes_segment_data[i],
        blocks_pipe.children()[i],
        5,
        5,
        0.5,
        1
    );
}

// 缩放
$('#main').get(0).onmousewheel = (e)=>{
    if (magnifyMode) {
        magnify = 1 + Math.round(e.zrDelta) * 0.06;     // 倍数更新
        if (totalMagnify*magnify >= 5 || totalMagnify*magnify <= 0.8) magnify = 1;      // 缩放限制
        totalMagnify *= magnify;
        // 更新方块
        for (i = 0; i < blocks_outer.childCount(); i++) {
            blocks_outer.children()[i].attr({
                shape: {
                    x: magnify * (blocks_outer.children()[i].shape.x - e.clientX) + e.clientX,
                    y: magnify * (blocks_outer.children()[i].shape.y - e.clientY) + e.clientY,
                    width: blocks_outer.children()[i].shape.width * magnify,
                    height: blocks_outer.children()[i].shape.height * magnify,
                }
            });
            blocks_inner.children()[i].attr({
                shape: {
                    x: magnify * ((blocks_inner.children()[i].shape.x) - e.clientX) + e.clientX,
                    y: magnify * ((blocks_inner.children()[i].shape.y) - e.clientY) + e.clientY,
                    width: (blocks_inner.children()[i].shape.width) * magnify,
                    height: (blocks_inner.children()[i].shape.height) * magnify,
                },
                style: {
                    font: parseInt(draw_blocks_data[i].font.slice(0, draw_blocks_data[i].font.indexOf('px')))*totalMagnify + draw_blocks_data[i].font.substr(draw_blocks_data[i].font.indexOf('px')),
                }
            });
        }
        // 更新管道
        for (i = 0; i < blocks_pipe.childCount(); i++) {
            blocks_pipe.children()[i].attr({
                shape: {
                    x: magnify * (blocks_pipe.children()[i].shape.x - e.clientX) + e.clientX,
                    y: magnify * (blocks_pipe.children()[i].shape.y - e.clientY) + e.clientY,
                    width: blocks_pipe.children()[i].shape.width * magnify,
                    height: blocks_pipe.children()[i].shape.height * magnify,
                }
            });
        }
        // 更新动画
        for (let i = 0; i < draw_pipes_segment_data.length; i++) {
            for (let j = 0; j < draw_pipes_segment_data[i].flows.length; j++) zr.remove(draw_pipes_segment_data[i].flows[j]);
            addPipeFLow(                        // 添加流动
                zr,                             // 容器对象
                draw_pipes_segment_data[i],     // 流动方向、速度
                blocks_pipe.children()[i],      // ZRender对象
                5 * totalMagnify,               // 流动块宽度
                5 * totalMagnify,               // 流动块间隔
                0.5 * totalMagnify,             // 管壁间隙
                totalMagnify                    // 速度
            );
        }
    }
};

// 拖动
let mouseDrag = false;
$('#main').mousedown(function () {if (magnifyMode) mouseDrag = true;})
    .mouseup(function () {if (magnifyMode) mouseDrag = false;});
$('#main').mousemove(function (e) {
    if (mouseDrag) {
        console.log(e.originalEvent.movementX, e.originalEvent.movementY);
        // 更新方块
        for (i = 0; i < blocks_outer.childCount(); i++) {
            blocks_outer.children()[i].attr({
                shape: {
                    x: blocks_outer.children()[i].shape.x + e.originalEvent.movementX,
                    y: blocks_outer.children()[i].shape.y + e.originalEvent.movementY,
                }
            });
            blocks_inner.children()[i].attr({
                shape: {
                    x: blocks_inner.children()[i].shape.x + e.originalEvent.movementX,
                    y: blocks_inner.children()[i].shape.y + e.originalEvent.movementY,
                }
            });
        }
        // 更新管道
        for (i = 0; i < blocks_pipe.childCount(); i++) {
            blocks_pipe.children()[i].attr({
                shape: {
                    x: blocks_pipe.children()[i].shape.x + e.originalEvent.movementX,
                    y: blocks_pipe.children()[i].shape.y + e.originalEvent.movementY,
                }
            });
        }
        // 更新动画
        for (let i = 0; i < draw_pipes_segment_data.length; i++) {
            for (let j = 0; j < draw_pipes_segment_data[i].flows.length; j++) zr.remove(draw_pipes_segment_data[i].flows[j]);
            addPipeFLow(                        // 添加流动
                zr,                             // 容器对象
                draw_pipes_segment_data[i],     // 流动方向、速度
                blocks_pipe.children()[i],      // ZRender对象
                5 * totalMagnify,               // 流动块宽度
                5 * totalMagnify,               // 流动块间隔
                0.5 * totalMagnify,             // 管壁间隙
                totalMagnify                    // 速度
            );
        }
    }
});
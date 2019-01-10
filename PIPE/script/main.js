// zrender实际绘图部分

// 全局变量
let magnify = 1;        // 缩放倍数

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
let newCanvasWindow = void 0;
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
    let have_exec_mag = false;              // 标记是否已经执行过放大
    if (!have_exec_mag){
        $('#main').mousedown(function (e) {
            startSelect = true;
            zr.add(selectFrame);
            startX = e.clientX; startY = e.clientY;
            selectFrame.attr({shape: {x: startX, y: startY, width: 0, height: 0}});
        }).mousemove(function (e) {
            selectFrame.attr({shape: {
                    width: e.clientX - startX, height: e.clientY - startY
                }});
        }).mouseup(function (e) {        // 框选完毕

            startSelect = false;
            frameWidth = e.clientX - startX; frameHeight = (e.clientX - startX) * window.innerHeight / window.innerWidth;       // 获取选框最终宽高
            zr.remove(selectFrame);    // 移除选框




            //===================绘制小窗内容↓============================
            newCanvasWindow = $('<canvas id="newCanvasWindow"></canvas>');
            newCanvasWindow.attr({
                height: Math.abs(selectFrame.shape.height),
                width: Math.abs(selectFrame.shape.width),
            }).css({
                'background-color': '#282c34',
                'position': 'fixed',
                'top': 0, 'right': 0
            });
            console.log(selectFrame.shape.width);
            console.log(newCanvasWindow.get(0).width);
            $('body').append(newCanvasWindow);

            // 绘制新窗口内容
            let newWindow_zr = new zrender.init(newCanvasWindow[0]);
            blocks_outer.eachChild(function (ele) {
                let new_outer = new zrender.Rect({

                });
                console.log(ele);
                newWindow_zr.add(ele);
            });
            blocks_inner.eachChild(function (ele) {
                newWindow_zr.add(ele);
            });

            let index = 0;
            blocks_pipe.eachChild(function (ele) {
                newWindow_zr.add(ele);
                index++;
            });

            newCanvasWindow.css({
                'border': '2px solid #666',
                'border-radius': 20,
                'box-shadow': '0 0 10px 0 #666',
            });
            //===================绘制小窗内容↑============================


            // 执行放大，改的是实际zrender矩形对象的数据，而不是原来的数据
            title.hide();       // 去掉碍眼的标题文字
            // 按钮变化
            magnifierButton.hide();
            magnifierIcon.hide();
            resetIcon.show();
            resetButton.show();
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
                for (let j = 0; j < draw_pipes_segment_data[i].flows.length; j++) {
                    console.log(draw_pipes_segment_data[i].flows);
                    draw_pipes_segment_data[i].flows[i].attr({
                        shape: {
                            x: (draw_pipes_segment_data[i].flows[i].shape.x - startX) * window.innerWidth / frameWidth,
                            y: (draw_pipes_segment_data[i].flows[i].shape.y - startY) * window.innerHeight / frameHeight,
                            width: draw_pipes_segment_data[i].flows[i].shape.width * window.innerWidth / frameWidth,
                            height: draw_pipes_segment_data[i].flows[i].shape.height * window.innerHeight / frameHeight,
                        }
                    });
                }
            }
            have_exec_mag = true;
        });
    }
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
    title.show();
    resetIcon.hide();
    resetButton.hide();
    magnifierIcon.show();
    magnifierButton.show();
    $('#newCanvasWindow').remove();
    for (let i = 0; i < blocks_outer.length; i++) {         // 更新块的位置
        blocks_outer[i].attr({
            shape: {
                x: draw_blocks_data[i].x,
                y: draw_blocks_data[i].y,
                width: draw_blocks_data[i].w,
                height: draw_blocks_data[i].h,
            },
        });
        blocks_inner[i].attr({
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
        });
    }
    for (let i = 0; i < blocks_pipe.length; i++) {      // 更新管道的位置
        blocks_pipe[i].attr({
            shape: {
                x: draw_pipes_segment_data[i].x, y: draw_pipes_segment_data[i].y,
                width: draw_pipes_segment_data[i].w, height: draw_pipes_segment_data[i].h,
            },
        });
        for (let j = 0; j < draw_pipes_segment_data[i].flows.length; j++) {
            draw_pipes_segment_data[i].flows[i].attr({
                shape: {
                    x: draw_pipes_segment_data[i].flows[i].shape.x,
                    y: draw_pipes_segment_data[i].flows[i].shape.y,
                    width: draw_pipes_segment_data[i].flows[i].shape.width,
                    height: draw_pipes_segment_data[i].flows[i].shape.height,
                }
            });
        }
    }
});
zr.add(resetButton);

// 提示框
let pipeInfoBlock =　new pipeInfoToolTip();
let blockInfoBlock = new blockInfoTooltip();

// 绘制方块
let blocks_outer = new zrender.Group();
let blocks_inner = new zrender.Group();
let blocks_outer_minimap = new Array(blocks_data.length);       // 小窗显示用
let blocks_inner_minimap = new Array(blocks_data.length);       // 小窗显示用
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
let blocks_pipe_minimap = new Array(draw_pipes_segment_data.length);        // 小窗中使用
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
    //blocks_pipe_minimap[i] = zrender.util.clone(blocks_pipe[i]);        // 拷贝数据
    blocks_pipe.add(blockRect_pipe);
    //delete(blocks_pipe);
}
zr.add(blocks_pipe);
for (let i = 0; i < draw_pipes_segment_data.length; i++) addPipeFLow(draw_pipes_segment_data[i], 5, 5);      // 添加流动


/*
$('#main').get(0).onmousewheel = (e)=>{
    for (let i = 0; i < blocks_outer.length; i++) {
        blocks_outer[i].attr({
            shape: {
                /!*
                                    x: blocks_outer[i].x,
                                    y: blocks_outer[i].y,
                *!/
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
}*/

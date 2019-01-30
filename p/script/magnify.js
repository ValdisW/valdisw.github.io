//====================================================================
// ** magnify.js
//--------------------------------------------------------------------
//    框选放大、移动的视图操作
//====================================================================
let magnify = 1;            // 缩放倍数
let totalMagnify = 1;
let magnifyMode = false;    // 框选放大模式
let magnify_max = 6, magnify_min = 0.5;

// 框选缩放功能按钮
let magnifierIcon = new zrender.Image({
    style: {
        x: window.innerWidth / 3 * 2 + 3, y: 36 + 3,
        width: 30, height: 30,
        image: './icons/magnifier.png',
    },
    silent: true,
    zlevel: 3
});
zr.add(magnifierIcon);
let magnifierButton = new zrender.Rect({
    shape: {
        x: window.innerWidth / 3 * 2, y: 36,
        width: 36, height: 36,
        r: [8]
    },
    style: {
        fill: '#666'
    },
    zlevel: 2
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
            startX = selectFrame.shape.x;
            startY = selectFrame.shape.y;
            frameWidth = Math.abs(selectFrame.shape.width);
            frameHeight = frameWidth * window.innerHeight / window.innerWidth;       // 获取选框最终宽高
            zr.remove(selectFrame);    // 移除选框
            magnifyMode = true;        // 放大模式
            totalMagnify = ((window.innerWidth / frameWidth) > magnify_max) ? magnify_max : (window.innerWidth / frameWidth);

            // 放大方块
            for (let i = 0; i < block_num; i++) {
                blocks_outer[i].attr({
                    shape: {
                        x: (blocks_outer[i].shape.x - startX) * totalMagnify,
                        y: (blocks_outer[i].shape.y - startY) * totalMagnify,
                        width: blocks_outer[i].shape.width * totalMagnify,
                        height: blocks_outer[i].shape.height * totalMagnify,
                    }
                });
                blocks_inner[i].attr({
                    shape: {
                        x: (blocks_inner[i].shape.x - startX) * totalMagnify,
                        y: (blocks_inner[i].shape.y - startY) * totalMagnify,
                        width: blocks_inner[i].shape.width * totalMagnify,
                        height: blocks_inner[i].shape.height * totalMagnify,
                    },
                    style: {
                        font: parseInt(blockData_fit[i].font.slice(0, blockData_fit[i].font.indexOf('px')))*totalMagnify + blockData_fit[i].font.substr(blockData_fit[i].font.indexOf('px')),
                    }
                });
            }
            // 放大管道
            for (let i = 0; i < pipe_num; i++) {        // 每条管道
                let pipeNewCoors = new Array(pipes[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
                for (let j = 0; j < pipes[i].shape.points.length; j++) {
                    pipeNewCoors[j] = new Array(2);
                    pipeNewCoors[j][0] = (pipes[i].shape.points[j][0] - startX) * totalMagnify;
                    pipeNewCoors[j][1] = (pipes[i].shape.points[j][1] - startY) * totalMagnify;
                }
                pipes[i].attr({
                    shape: {points: pipeNewCoors},
                    style: {lineWidth: 5 * totalMagnify},
                });
                pipes_flow[i].attr({
                    shape: {points: pipeNewCoors},
                    style: {
                        lineWidth: 3 * totalMagnify,
                        lineDash: [5 * totalMagnify, 5 * totalMagnify],
                        lineDashOffset: 0,
                    },
                });
                pipes_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10 * totalMagnify)}).done(function() {}).start();
            }
            // 放大不带数据的管道
            for (let i = 0; i < pipes_noData_drawData.length; i++) {
/*
                for (let j = 0; j < pipes_noData_drawData[i].length; j++) {
                    pipes_noData_drawData[i][j][0] = (pipes_noData_drawData[i][j][0] - startX) * totalMagnify;
                    pipes_noData_drawData[i][j][1] = (pipes_noData_drawData[i][j][1] - startY) * totalMagnify;
                }
*/
                let pipeNewCoors_noData = new Array(pipes_noData[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
                for (let j = 0; j < pipes_noData[i].shape.points.length; j++) {
                    pipeNewCoors_noData[j] = new Array(2);
                    pipeNewCoors_noData[j][0] = (pipes_noData[i].shape.points[j][0] - startX) * totalMagnify;
                    pipeNewCoors_noData[j][1] = (pipes_noData[i].shape.points[j][1] - startY) * totalMagnify;
                }

                pipes_noData[i].attr({
                    shape: {points: pipeNewCoors_noData},
                    style: {lineWidth: 5 * totalMagnify},
                });
                pipes_noData_flow[i].attr({
                    shape: {points: pipeNewCoors_noData},
                    style: {
                        lineWidth: 3 * totalMagnify,
                        lineDash: [5 * totalMagnify, 5 * totalMagnify],
                        lineDashOffset: 0,
                    },
                });
                pipes_noData_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10 * totalMagnify)}).done(function() {}).start();
            }
            // 放大花里胡哨的节点
            //for (let i = 0; i < nodes.length; i++) {}
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
        x: window.innerWidth / 3 * 2 + 4, y: 36 + 4,
        width: 28, height: 28,
        image: './icons/reset.png',
    },
    silent: true,
    zlevel: 3
});
zr.add(resetIcon);
let resetButton = new zrender.Rect({
    shape: {
        x: window.innerWidth / 3 * 2, y: 36,
        width: 36, height: 36,
        r: [8]
    },
    style: {fill: '#666'},
    zlevel: 2
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
    // 还原方块
    for (let i = 0; i < block_num; i++) {
        blocks_outer[i].attr({
            shape: {
                x: blockData_fit[i].vertex1[0],
                y: blockData_fit[i].vertex1[1],
                width: blockData_fit[i].vertex2[0] - blockData_fit[i].vertex1[0],
                height: blockData_fit[i].vertex2[1] - blockData_fit[i].vertex1[1],
            }
        });
        blocks_inner[i].attr({
            shape: {
                x: blockData_fit[i].vertex1[0] + 4,
                y: blockData_fit[i].vertex1[1] + 4,
                width: blockData_fit[i].vertex2[0] - blockData_fit[i].vertex1[0] - 8,
                height: blockData_fit[i].vertex2[1] - blockData_fit[i].vertex1[1] - 8,
            },
            style: {
                font: blockData_fit[i].font,
            }
        });
    }
    // 还原管道
    for (let i = 0; i < pipe_num; i++) {        // 每条管道
        pipes[i].attr({
            shape: {points: pipe_drawData_origin[i]},
            style: {lineWidth: 5},
        });
        pipes_flow[i].attr({
            shape: {points: pipe_drawData_origin[i]},
            style: {
                lineWidth: 3,
                lineDash: [5, 5],
                lineDashOffset: 0,
            },
        });
        pipes_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10)}).done(function() {}).start();
    }
    // 还原不带数据的管道
    for (let i = 0; i < pipes_noData_flow.length; i++) {
        pipes_noData[i].attr({
            shape: {points: pipes_noData_drawData_origin[i]},
            style: {lineWidth: 5}
        });
        pipes_noData_flow[i].attr({
            shape: {points: pipes_noData_drawData_origin[i]},
            style: {
                lineWidth: 3,
                lineDash: [5, 5],
                lineDashOffset: 0,
            }
        });
        pipes_noData_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10)}).done(function() {}).start();
    }
});
zr.add(resetButton);


// 缩放
$('#main').get(0).onmousewheel = (e)=>{
    if (magnifyMode) {
        magnify = 1 + Math.round(e.zrDelta) * 0.06;     // 倍数更新
        if (totalMagnify*magnify >= magnify_max || totalMagnify*magnify <= magnify_min) magnify = 1;      // 缩放限制
        totalMagnify *= magnify;
        // 放大方块
        for (let i = 0; i < block_num; i++) {
            blocks_outer[i].attr({
                shape: {
                    x: magnify * (blocks_outer[i].shape.x - e.clientX) + e.clientX,
                    y: magnify * (blocks_outer[i].shape.y - e.clientY) + e.clientY,
                    width: blocks_outer[i].shape.width * magnify,
                    height: blocks_outer[i].shape.height * magnify,
                }
            });
            blocks_inner[i].attr({
                shape: {
                    x: magnify * (blocks_inner[i].shape.x - e.clientX) + e.clientX,
                    y: magnify * (blocks_inner[i].shape.y - e.clientY) + e.clientY,
                    width: blocks_inner[i].shape.width * magnify,
                    height: blocks_inner[i].shape.height * magnify,
                },
                style: {
                    font: parseInt(blockData_fit[i].font.slice(0, blockData_fit[i].font.indexOf('px')))*totalMagnify + blockData_fit[i].font.substr(blockData_fit[i].font.indexOf('px')),
                }
            });
        }
        // 放大管道
        for (let i = 0; i < pipe_num; i++) {        // 每条管道
            let pipeNewCoors = new Array(pipes[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
            for (let j = 0; j < pipes[i].shape.points.length; j++) {
                pipeNewCoors[j] = new Array(2);
                pipeNewCoors[j][0] = magnify * (pipes[i].shape.points[j][0] - e.clientX) + e.clientX;
                pipeNewCoors[j][1] = magnify * (pipes[i].shape.points[j][1] - e.clientY) + e.clientY;
            }
            pipes[i].attr({
                shape: {points: pipeNewCoors},
                style: {lineWidth: 5 * totalMagnify},
            });
            pipes_flow[i].attr({
                shape: {points: pipeNewCoors},
                style: {
                    lineWidth: 3 * totalMagnify,
                    lineDash: [5 * totalMagnify, 5 * totalMagnify],
                    lineDashOffset: 0,
                },
            });
            pipes_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10 * totalMagnify)}).done(function() {}).start();
        }
        // 放大无数据的管道
        for (let i = 0; i < pipes_noData_drawData.length; i++) {
            let pipeNewCoors_noData = new Array(pipes_noData[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
            for (let j = 0; j < pipes_noData[i].shape.points.length; j++) {
                pipeNewCoors_noData[j] = new Array(2);
                pipeNewCoors_noData[j][0] = magnify * (pipes_noData[i].shape.points[j][0] - e.clientX) + e.clientX;
                pipeNewCoors_noData[j][1] = magnify * (pipes_noData[i].shape.points[j][1] - e.clientY) + e.clientY;
            }

            pipes_noData[i].attr({
                shape: {points: pipeNewCoors_noData},
                style: {lineWidth: 5 * totalMagnify},
            });
            pipes_noData_flow[i].attr({
                shape: {points: pipeNewCoors_noData},
                style: {
                    lineWidth: 3 * totalMagnify,
                    lineDash: [5 * totalMagnify, 5 * totalMagnify],
                    lineDashOffset: 0,
                },
            });
            pipes_noData_flow[i].animate('style', true).when(1000, {lineDashOffset: -1 * (10 * totalMagnify)}).done(function() {}).start();
        }
    }
};

// 拖动
let mouseDrag = false;
$('#main').mousedown(function () {if (magnifyMode) mouseDrag = true;}).mouseup(function () {if (magnifyMode) mouseDrag = false;});
$('#main').mousemove(function (e) {
    if (mouseDrag) {
        //console.log(e.originalEvent.movementX, e.originalEvent.movementY);
        // 更新水池
        for (let i = 0; i < block_num; i++) {
            blocks_outer[i].attr({
                shape: {
                    x: blocks_outer[i].shape.x + e.originalEvent.movementX,
                    y: blocks_outer[i].shape.y + e.originalEvent.movementY,
                }
            });
            blocks_inner[i].attr({
                shape: {
                    x: blocks_inner[i].shape.x + e.originalEvent.movementX,
                    y: blocks_inner[i].shape.y + e.originalEvent.movementY,
                },
            });
        }
        // 更新管道
        for (let i = 0; i < pipe_num; i++) {        // 每条管道
            let pipeNewCoors = new Array(pipes[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
            for (let j = 0; j < pipes[i].shape.points.length; j++) {
                pipeNewCoors[j] = new Array(2);
                pipeNewCoors[j][0] = pipes[i].shape.points[j][0] + e.originalEvent.movementX;
                pipeNewCoors[j][1] = pipes[i].shape.points[j][1] + e.originalEvent.movementY;
            }
            pipes[i].attr({shape: {points: pipeNewCoors}});
            pipes_flow[i].attr({shape: {points: pipeNewCoors}});
        }
        // 更新无数据的管道
        for (let i = 0; i < pipes_noData_drawData.length; i++) {
/*
            for (let j = 0; j < pipes_noData_drawData[i].length; j++) {
                pipes_noData_drawData[i][j][0] = pipes_noData_drawData[i][j][0] + e.originalEvent.movementX;
                pipes_noData_drawData[i][j][1] = pipes_noData_drawData[i][j][1] + e.originalEvent.movementY;
            }
*/
/*
            let pipeNewCoors_noData = new Array(pipes_noData[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
            for (let j = 0; j < pipes_noData[i].shape.points.length; j++) {
                pipeNewCoors_noData[j] = new Array(2);
                pipeNewCoors_noData[j][0] = pipes_noData[i].shape.points[j][0] + e.originalEvent.movementX;
                pipeNewCoors_noData[j][1] = pipes_noData[i].shape.points[j][1] + e.originalEvent.movementY;
            }
            console.log(pipeNewCoors_noData);
            pipes_noData[i].attr({shape: {points: pipes_noData_drawData}});
            pipes_noData_flow[i].attr({shape: {points: pipes_noData_drawData}});
*/


            let pipeNewCoors_noData = new Array(pipes_noData[i].shape.points.length);     // 是一个n-by-2的数组，用于临时保存新的折线坐标
            for (let j = 0; j < pipes_noData[i].shape.points.length; j++) {
                pipeNewCoors_noData[j] = new Array(2);
                pipeNewCoors_noData[j][0] = pipes_noData[i].shape.points[j][0] + e.originalEvent.movementX;
                pipeNewCoors_noData[j][1] = pipes_noData[i].shape.points[j][1] + e.originalEvent.movementY;
            }
            pipes_noData[i].attr({shape: {points: pipeNewCoors_noData}});
            pipes_noData_flow[i].attr({shape: {points: pipeNewCoors_noData}});
        }
    }
});


$(document).keydown(function () {console.log(pipes_flow[0].style.lineDashOffset)});
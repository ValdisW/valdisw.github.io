/*==========================================================================================
 *  ** 工具
 *==========================================================================================*/

// 阈值函数
const thresholdFunc = function (x) {
    return (x>=0)?(1):(-1)
}

// 方块提示框 池内液体高度
class blockInfoTooltip{
    constructor() {
        this.infoBlock = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 200, height: 100,
                r: [10]
            },
            style: {
                fill: '#000',
                shadowBlur: 20,
                shadowColor: '#000',
                opacity: 0,
            },
            zlevel: 2
        });
        zr.add(this.infoBlock);

        // 标题
        this.title = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 200, height: 20,
            },
            style: {
                fill: 'transparent',
                text: '车间信息',
                textFill: '#DDD',
                font: '16px Microsoft YaHei',
                textAlign: 'center',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.title);
    }
    display(x, y, waterHeight) {
        this.infoBlock.attr({            // 显示提示框
            shape: {x: x + 5, y: y + 5},
            style: {opacity: 0.7}
        });
        this.title.attr({       // 显示提示框标题
            shape: {x: x + 5, y: y + 21},
            style: {opacity: 1}
        });
    }
    vanish () {
        this.infoBlock.attr({style: {opacity: 0}});
        this.title.attr({style: {opacity: 0}});
    }
}

// 管道提示框
class pipeInfoToolTip{
    constructor() {
        this.infoBlock = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 200, height: 200,
                r: [10]
            },
            style: {
                fill: '#000',
                shadowBlur: 20,
                shadowColor: '#000',
                opacity: 0,
            },
            zlevel: 2
        });
        zr.add(this.infoBlock);

        // 标题
        this.title = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 200, height: 20,
            },
            style: {
                fill: 'transparent',
                text: '管道信息',
                textFill: '#DDD',
                font: '16px Microsoft YaHei',
                textAlign: 'center',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.title);

        // 流速图标
        this.velocity_icon = new zrender.Image({
            style: {
                x: 0, y: 0,
                width: 35, height: 35,
                image: './icons/velocity.png',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.velocity_icon);

        // 流速标签
        this.velocity_label = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 30, height: 20,
            },
            style: {
                fill: 'transparent',
                text: '流速：',
                textFill: '#259DDE',
                font: '14px Microsoft YaHei',
                textAlign: 'center',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.velocity_label);

        // 流速数值
        this.velocity_value = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 30, height: 20,
            },
            style: {
                fill: 'transparent',
                text: 'null',
                textFill: '#DDD',
                font: '14px Microsoft YaHei',
                textAlign: 'left',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.velocity_value);

        // 温度图标
        this.temperature_icon = new zrender.Image({
            style: {
                x: 0, y: 0,
                width: 35, height: 35,
                image: './icons/temperature.png',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.temperature_icon);

        // 温度标签
        this.temperature_label = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 30, height: 20,
            },
            style: {
                fill: 'transparent',
                text: '温度：',
                textFill: '#F87115',
                font: '14px Microsoft YaHei',
                textAlign: 'center',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.temperature_label);

        // 温度数值
        this.temperature_value = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 30, height: 20,
            },
            style: {
                fill: 'transparent',
                text: 'null',
                textFill: '#DDD',
                font: '14px Microsoft YaHei',
                textAlign: 'left',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.temperature_value);

        // 压力图标
        this.pressure_icon = new zrender.Image({
            style: {
                x: 0, y: 0,
                width: 35, height: 35,
                image: './icons/pressure.png',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.pressure_icon);

        // 压力标签
        this.pressure_label = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 30, height: 20,
            },
            style: {
                fill: 'transparent',
                text: '压力：',
                textFill: '#2EE8B6',
                font: '14px Microsoft YaHei',
                textAlign: 'center',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.pressure_label);

        // 压力数值
        this.pressure_value = new zrender.Rect({
            shape: {
                x: 0, y: 0,
                width: 30, height: 20,
            },
            style: {
                fill: 'transparent',
                text: 'null',
                textFill: '#DDD',
                font: '14px Microsoft YaHei',
                textAlign: 'left',
                opacity: 0,
            },
            zlevel: 3
        });
        zr.add(this.pressure_value);
    }
    display(x, y, velocity, temperature, pressure) {
        this.infoBlock.attr({            // 显示提示框
            shape: {x: x + 5, y: y + 5},
            style: {opacity: 0.7}
        });
        this.title.attr({       // 显示提示框标题
            shape: {x: x + 5, y: y + 21},
            style: {opacity: 1}
        });
        this.velocity_icon.attr({        // 显示流速图标
            style: {
                x: x + 20, y: y + 55,
                opacity: 1
            }
        });
        this.velocity_label.attr({       // 显示流速标签
            shape: {x: x + 70, y: y + 65,},
            style: {opacity: 1}
        });
        this.velocity_value.attr({       // 显示流速数值
            shape: {x: x + 96, y: y + 65,},
            style: {text: velocity, opacity: 1}
        });
        this.temperature_icon.attr({     // 显示温度图标
            style: {
                x: x + 20, y: y + 105,
                opacity: 1
            }
        });
        this.temperature_label.attr({    // 显示温度标签
            shape: {x: x + 70, y: y + 115,},
            style: {opacity: 1}
        });
        this.temperature_value.attr({    // 显示温度数值
            shape: {x: x + 96, y: y + 115,},
            style: {text: temperature, opacity: 1}
        });
        this.pressure_icon.attr({        // 显示压力图标
            style: {
                x: x + 20, y: y + 155,
                opacity: 1
            }
        });
        this.pressure_label.attr({       // 显示压力标签
            shape: {x: x + 70, y: y + 165,},
            style: {opacity: 1}
        });
        this.pressure_value.attr({       // 显示压力数值
            shape: {x: x + 96, y: y + 165,},
            style: {text: pressure, opacity: 1}
        });
    }
    vanish() {
        this.infoBlock.attr({style: {opacity: 0}});
        this.title.attr({style: {opacity: 0}});
        this.temperature_icon.attr({style: {opacity: 0}});
        this.temperature_label.attr({style: {opacity: 0}});
        this.temperature_value.attr({style: {opacity: 0}});
        this.velocity_icon.attr({style: {opacity: 0}});
        this.velocity_label.attr({style: {opacity: 0}});
        this.velocity_value.attr({style: {opacity: 0}});
        this.pressure_icon.attr({style: {opacity: 0}});
        this.pressure_label.attr({style: {opacity: 0}});
        this.pressure_value.attr({style: {opacity: 0}});
    }
}

//======================================================================
//  ** 【traditional version】向管道中添加流动效果
//----------------------------------------------------------------------
//  pipe是管道对象，至少包括x,y,w,h,flows属性，前四个是横纵坐标和宽高，
//  最后一个flows数组用来保存流动方块的zrender.Rect对象
//======================================================================
const addPipeFLow = function (zr, pipe, pipe_zr, blockWidth, blockGap, sideGap, speed) {
    if (pipe.w > pipe.h) {      // 管道为横向
        let flow_num = Math.ceil(pipe_zr.shape.width / (blockWidth + blockGap));     // 先计算管道片段内的流动方块数
        for (let i = 0; i < flow_num; i++) {
            pipe.flows[i] = new zrender.Rect({
                shape: {
                    x: pipe_zr.shape.x + (blockWidth + blockGap) * i, y: pipe_zr.shape.y + sideGap,
                    width: blockWidth, height: pipe_zr.shape.height - sideGap*2,
                },
                style: {fill: '#282c34', opacity: 0.7},
                silent: true,
            });
            zr.add(pipe.flows[i]);
            pipe.flows[i].animate('shape', true).when(pipe.time, {x: pipe_zr.shape.x + (blockWidth + blockGap)*(i + pipe.flow_direction /** speed*/)}).done(function () {}).start();
        }
    }
    else {              // 管道为纵向
        let flow_num = Math.ceil(pipe_zr.shape.height / (blockWidth + blockGap));
        for (let i = 0; i < flow_num; i++) {
            pipe.flows[i] = new zrender.Rect({
                shape: {
                    x: pipe_zr.shape.x + sideGap, y: pipe_zr.shape.y + (blockWidth + blockGap) * i,
                    width: pipe_zr.shape.width - sideGap*2, height: blockWidth,
                },
                style: {fill: '#282c34', opacity: 0.7},
                silent: true,
            });
            zr.add(pipe.flows[i]);
            pipe.flows[i].animate('shape', true).when(pipe.time, {y: pipe_zr.shape.y + (blockWidth + blockGap)*(i + pipe.flow_direction/* * speed*/)}).done(function () {}).start();
        }
    }
};

/*
// 更新管道流动动画
const updatePipeFlowAnimation = function (pipe, pipe_zr, blockWidth, blockGap, speed) {
    if (pipe.w > pipe.h) {      // 管道为横向
        for (let i = 0; i < pipe.flows.length; i++)
            pipe.flows[i].animate('shape', true).when(pipe.time, {x: pipe_zr.shape.x + (blockWidth + blockGap)*(i)}).done(function () {}).start();
            //pipe.flows[i].animate('shape', true).when(pipe.time, {x: pipe_zr.shape.x + (blockWidth + blockGap)*(i + pipe.flow_direction * speed)}).done(function () {}).start();
    }
    else {              // 管道为纵向
        for (let i = 0; i < pipe.flows.length; i++)
            pipe.flows[i].animate('shape', true).when(pipe.time, {y: pipe_zr.shape.y + (blockWidth + blockGap)*(i + pipe.flow_direction * speed)}).done(function () {}).start();
    }
}*/

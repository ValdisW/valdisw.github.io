/**
 * 加载数据，主要是将数据集转换成二维坐标数据，以供drawMountain()函数绘制
 * @param {Array} dataset - 二维数组，包含时间和数值两个维度的数据
 */
function loadData(dataset) {
    let val_min = Number.MAX_VALUE,
        val_max = Number.MIN_VALUE;
    for (let d of dataset) {
        if (d[1] > val_max) val_max = d[1];
        if (d[1] < val_min) val_min = d[1];
    }

    // 外轮廓
    let gap = this.rect.w / (dataset.length - 1);
    for (let i = 0; i < dataset.length; i++) {
        this.outer_line.push([
            this.rect.x + gap * i,
            map(
                dataset[i][1],
                val_min, val_max,
                this.rect.y, this.rect.y + this.rect.h - this.base_height
            )
        ])
    }

    // 内轮廓
    for (let i = 1; i < dataset.length - 1; i++) {
        if (dataset[i][1] < dataset[i - 1][1] && dataset[i][1] < dataset[i + 1][1]) {
            this.inner_line.push([
                [this.rect.x + gap * (i - 1) + 10,
                    map(
                        dataset[i - 1][1],
                        val_min, val_max,
                        this.rect.y, this.rect.y + this.rect.h - this.base_height
                    ) + 30
                ],
                [this.rect.x + gap * i,
                    map(
                        dataset[i][1],
                        val_min, val_max,
                        this.rect.y, this.rect.y + this.rect.h - this.base_height
                    ) + 30
                ],
                [this.rect.x + gap * (i + 1) - 10,
                    map(
                        dataset[i + 1][1],
                        val_min, val_max,
                        this.rect.y, this.rect.y + this.rect.h - this.base_height
                    ) + 50
                ]
            ]);
        }
        if (dataset[i][1] > dataset[i - 1][1] && dataset[i][1] > dataset[i + 1][1]) {
            let k = (this.outer_line[i][1] - this.outer_line[i - 1][1]) / gap;
            let xstep = gap / 4;
            this.inner_line.push([
                [this.rect.x + gap * i,
                    map(
                        dataset[i][1],
                        val_min, val_max,
                        this.rect.y, this.rect.y + this.rect.h - this.base_height
                    )
                ],
                [this.rect.x + gap * i + xstep,
                    this.outer_line[i][1] + k * xstep
                ]
            ])
        }
    }
}


/**
 * 绘制
 * 
 */
function drawMountain() {
    // 渐变背景
    gradientRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h, [
        [color(80, 166, 191), 0],
        [color(156, 196, 139), 0.5],
        [color(179, 157, 83), 0.9],
        [color(239, 232, 222), 1],
    ], Y_AXIS);

    // 裁剪背景
    fill(239, 232, 222);
    stroke(239, 232, 222);
    beginShape();
    for (let i = 0; i < this.outer_line.length; i++) {
        vertex(this.outer_line[i][0], this.outer_line[i][1]);
    }
    vertex(this.rect.x + this.rect.w, this.rect.y);
    vertex(this.rect.x, this.rect.y);
    endShape(CLOSE);

    // 绘制外轮廓
    stroke(32);
    for (let i = 0; i < this.outer_line.length - 1; i++) {
        scribble.scribbleLine(
            this.outer_line[i][0], this.outer_line[i][1],
            this.outer_line[i + 1][0], this.outer_line[i + 1][1]
        )
    }

    // 绘制内轮廓
    stroke(32);
    for (let i = 0; i < this.inner_line.length; i++) {
        for (let j = 0; j < this.inner_line[i].length - 1; j++) {
            scribble.scribbleLine(
                this.inner_line[i][j][0], this.inner_line[i][j][1],
                this.inner_line[i][j + 1][0], this.inner_line[i][j + 1][1]
            )
        }
    }
}
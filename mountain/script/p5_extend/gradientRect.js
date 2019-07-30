/**
 * 绘制渐变矩形
 *  x,y,w,h - 和rect的属性一致
 * 
 */
function gradientRect(x, y, w, h, colors, axis) {
    noFill();
    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let cindex = 0; cindex < colors.length - 1; cindex++) {
            let y0 = y + h * colors[cindex][1];
            let y1 = y + h * colors[cindex + 1][1];
            for (let i = y0; i <= y1; i++) {
                let inter = map(i, y0, y1, 0, 1);
                let c = lerpColor(colors[cindex][0], colors[cindex + 1][0], inter);
                stroke(c);
                line(x, i, x + w, i);
            }
        }
        // Left to right gradient(unfinished)
    } else if (axis === X_AXIS) {
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}
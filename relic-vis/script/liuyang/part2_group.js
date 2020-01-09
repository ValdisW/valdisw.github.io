const group_matrix = [
    {x: 0, y: 0, t: 0},
    {x: 0, y: 1, t: 0},
    {x: 0, y: 2, t: 0},
    {x: 0, y: 3, t: 0},
    {x: 0, y: 8, t: 0},
    {x: 0, y: 9, t: 0},
    {x: 0, y: 10, t: 0},
    {x: 0, y: 11, t: 0},

    {x: 1, y: 0, t: 0},
    {x: 1, y: 1, t: 0},
    {x: 1, y: 2, t: 0},
    {x: 1, y: 3, t: 0},
    {x: 1, y: 8, t: 0},
    {x: 1, y: 9, t: 0},
    {x: 1, y: 10, t: 0},
    {x: 1, y: 11, t: 0},

    {x: 3, y: 0, t: 1},
    {x: 3, y: 1, t: 1},
    {x: 3, y: 2, t: 1},
    {x: 3, y: 3, t: 1},
    {x: 3, y: 8, t: 1},
    {x: 3, y: 9, t: 1},
    {x: 3, y: 10, t: 1},
    {x: 3, y: 11, t: 1},

    {x: 4, y: 1, t: 1},
    {x: 4, y: 9, t: 1},

    {x: 5, y: 3, t: 1},
    {x: 5, y: 9, t: 1},
    {x: 5, y: 8, t: 1},
    {x: 5, y: 11, t: 1},

    {x: 6, y: 0, t: 1},
    {x: 6, y: 1, t: 1},
    {x: 6, y: 2, t: 1},
    {x: 6, y: 3, t: 1},
    {x: 6, y: 8, t: 1},
    {x: 6, y: 9, t: 1},
    {x: 6, y: 10, t: 1},
    {x: 6, y: 11, t: 1},
    
    {x: 7, y: 0, t: 1},
    {x: 7, y: 1, t: 1},
    {x: 7, y: 2, t: 1},
    {x: 7, y: 3, t: 1},
    {x: 7, y: 8, t: 1},
    {x: 7, y: 9, t: 1},
    {x: 7, y: 10, t: 1},
    {x: 7, y: 11, t: 1},
    
    {x: 8, y: 1, t: 1},
    {x: 8, y: 2, t: 1},
    {x: 8, y: 9, t: 1},
    {x: 8, y: 10, t: 1},

    {x: 9, y: 3, t: 1},
    {x: 9, y: 8, t: 1},

    {x: 10, y: 0, t: 1},
    {x: 10, y: 11, t: 1},

    {x: 12, y: 0, t: 2},
    {x: 12, y: 1, t: 2},
    {x: 12, y: 2, t: 2},
    {x: 12, y: 3, t: 2},
    {x: 12, y: 8, t: 2},
    {x: 12, y: 9, t: 2},
    {x: 12, y: 10, t: 2},
    {x: 12, y: 11, t: 2},


    {x: 13, y: 0, t: 2},
    {x: 13, y: 1, t: 2},
    {x: 13, y: 2, t: 2},
    {x: 13, y: 3, t: 2},
    {x: 13, y: 8, t: 2},
    {x: 13, y: 9, t: 2},
    {x: 13, y: 10, t: 2},
    {x: 13, y: 11, t: 2},

    {x: 14, y: 0, t: 2},
    {x: 14, y: 1, t: 2},
    {x: 14, y: 2, t: 2},
    {x: 14, y: 3, t: 2},
    {x: 14, y: 8, t: 2},
    {x: 14, y: 9, t: 2},
    {x: 14, y: 10, t: 2},
    {x: 14, y: 11, t: 2},

    {x: 15, y: 0, t: 2},
    {x: 15, y: 1, t: 2},
    {x: 15, y: 2, t: 2},
    {x: 15, y: 3, t: 2},
    {x: 15, y: 8, t: 2},
    {x: 15, y: 9, t: 2},
    {x: 15, y: 10, t: 2},
    {x: 15, y: 11, t: 2},

    {x: 16, y: 0, t: 2},
    {x: 16, y: 1, t: 2},
    {x: 16, y: 2, t: 2},
    {x: 16, y: 3, t: 2},
    {x: 16, y: 8, t: 2},
    {x: 16, y: 9, t: 2},
    {x: 16, y: 10, t: 2},
    {x: 16, y: 11, t: 2},

    {x: 17, y: 0, t: 2},
    {x: 17, y: 1, t: 2},
    {x: 17, y: 2, t: 2},
    {x: 17, y: 3, t: 2},
    {x: 17, y: 8, t: 2},
    {x: 17, y: 9, t: 2},
    {x: 17, y: 10, t: 2},
    {x: 17, y: 11, t: 2},

    {x: 18, y: 0, t: 2},
    {x: 18, y: 1, t: 2},
    {x: 18, y: 2, t: 2},
    {x: 18, y: 3, t: 2},
    {x: 18, y: 8, t: 2},
    {x: 18, y: 9, t: 2},
    {x: 18, y: 10, t: 2},
    {x: 18, y: 11, t: 2},

    {x: 19, y: 0, t: 2},
    {x: 19, y: 1, t: 2},
    {x: 19, y: 2, t: 2},
    {x: 19, y: 3, t: 2},
    {x: 19, y: 8, t: 2},
    {x: 19, y: 9, t: 2},
    {x: 19, y: 10, t: 2},
    {x: 19, y: 11, t: 2},
];
const part2_colors = ["#e9c024", "#006156", "#c42c2c"];
let ranking_figure = document.querySelector('#ranking-figure');
ranking_figure.style.position = "relative";
ranking_figure.style.width = window.innerWidth / 3 + "px";
ranking_figure.style.height = window.innerWidth / 5 + "px";
for (let p of group_matrix) {
    let point = document.createElement("div");
    point.style.position = "absolute";
    point.style.left = p.x * 20 + "px";
    point.style.top = p.y * 20 + "px";
    point.style.width = "10px";
    point.style.height = "10px";
    point.style.backgroundColor = part2_colors[p.t];
    point.style.borderRadius = "50%";
    ranking_figure.appendChild(point);
}
//====================================================================
// ** coorMap.js
//--------------------------------------------------------------------
//    坐标映射（测量-->绘制）
//====================================================================
let title_height = 100;

let minX = Number.POSITIVE_INFINITY,
    maxX = Number.NEGATIVE_INFINITY,
    minY = Number.POSITIVE_INFINITY,
    maxY = Number.NEGATIVE_INFINITY;

for (let i = 0; i < pipeData_origin.length; i++) {
    for (let j = 0; j < pipeData_origin[i].vertices.length; j++) {
        if (pipeData_origin[i].vertices[j].coor[0] < minX) minX = pipeData_origin[i].vertices[j].coor[0];
        if (pipeData_origin[i].vertices[j].coor[0] > maxX) maxX = pipeData_origin[i].vertices[j].coor[0];
        if (pipeData_origin[i].vertices[j].coor[1] < minY) minY = pipeData_origin[i].vertices[j].coor[1];
        if (pipeData_origin[i].vertices[j].coor[1] > maxY) maxY = pipeData_origin[i].vertices[j].coor[1];
    }
}

for (let i = 0; i < blockVertexData.length; i++) {
    if (blockVertexData[i].vertex1[0] < minX) minX = blockVertexData[i].vertex1[0];
    if (blockVertexData[i].vertex2[0] > maxX) maxX = blockVertexData[i].vertex2[0];
    if (blockVertexData[i].vertex1[1] < minY) minY = blockVertexData[i].vertex1[1];
    if (blockVertexData[i].vertex2[1] > maxY) maxY = blockVertexData[i].vertex2[1];
}

// 调整各管线以适应屏幕
for (let node in pipeVertexData) {
    pipeVertexData[node].coor[0] = (pipeVertexData[node].coor[0] - minX) * window.innerWidth / (maxX - minX) / 2 + window.innerWidth / 4;
    pipeVertexData[node].coor[1] = (pipeVertexData[node].coor[1] - minY) * (window.innerHeight - title_height) / (maxY - minY) *0.98 + title_height;
}
let pipeVertexData_origin = JSON.parse(JSON.stringify(pipeVertexData));     // 保留原始坐标的拷贝

let pipes_noData_drawData = new Array(pipeData_noData.length);      // 无数据坐标点
for (let i = 0; i < pipes_noData_drawData.length; i++) {
    pipes_noData_drawData[i] = new Array(pipeData_noData[i].length);
    for (let segment = 0; segment < pipeData_noData[i].length; segment++) {
        pipes_noData_drawData[i][segment] = new Array(2);
        pipes_noData_drawData[i][segment][0] = (pipeData_noData[i][segment][0] - minX) * window.innerWidth / (maxX - minX) / 2 + window.innerWidth / 4;
        pipes_noData_drawData[i][segment][1] = (pipeData_noData[i][segment][1] - minY) * (window.innerHeight - title_height) / (maxY - minY) *0.98 + title_height;
    }
}
let pipes_noData_drawData_origin = new Array(pipes_noData_drawData.length);
for (let i = 0; i < pipes_noData_drawData_origin.length; i++) {
    pipes_noData_drawData_origin[i] = new Array(pipes_noData_drawData[i].length);
    for (let j = 0; j < pipes_noData_drawData_origin[i].length; j++) {
        pipes_noData_drawData_origin[i][j] = pipes_noData_drawData[i][j].slice(0);
    }
}

// 调整各水池以适应屏幕
let blockData_fit = blockVertexData.slice(0);
for (let i = 0; i < blockData_fit.length; i++){
    blockData_fit[i].vertex1[0] = (blockData_fit[i].vertex1[0] - minX) * window.innerWidth / (maxX - minX) / 2 + window.innerWidth / 4;
    blockData_fit[i].vertex2[0] = (blockData_fit[i].vertex2[0] - minX) * window.innerWidth / (maxX - minX) / 2 + window.innerWidth / 4;
    blockData_fit[i].vertex1[1] = (blockData_fit[i].vertex1[1] - minY) * (window.innerHeight - title_height) / (maxY - minY) *0.98 + title_height;
    blockData_fit[i].vertex2[1] = (blockData_fit[i].vertex2[1] - minY) * (window.innerHeight - title_height) / (maxY - minY) *0.98 + title_height;
}

// 调整花里胡哨的节点
let nodes_origin = new Array(nodes.length);
for (let i = 0; i < nodes.length; i++) {
    nodes[i][0] = (nodes[i][0] - minX) * window.innerWidth / (maxX - minX) / 2 + window.innerWidth / 4;
    nodes[i][1] = (nodes[i][1] - minY) * (window.innerHeight - title_height) / (maxY - minY) *0.98 + title_height;
    nodes_origin[i] = new Array(2);
    nodes_origin[i][0] = nodes[i][0];
    nodes_origin[i][1] = nodes[i][1];
}
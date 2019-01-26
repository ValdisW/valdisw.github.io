//====================================================================
// ** coorMap.js
//--------------------------------------------------------------------
//    坐标映射（测量-->绘制）
//====================================================================
let title_height = 140;

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
    pipeVertexData[node].coor[0] = (pipeVertexData[node].coor[0] - minX) * window.innerWidth / (maxX - minX) / 2 + 400;
    pipeVertexData[node].coor[1] = (pipeVertexData[node].coor[1] - minY) * (window.innerHeight - title_height) / (maxY - minY) / 8 * 7 + title_height;
}
let pipeVertexData_origin = JSON.parse(JSON.stringify(pipeVertexData));     // 保留原始坐标的拷贝

// 调整各水池以适应屏幕
let blockData_fit = blockVertexData.slice(0);
for (let i = 0; i < blockData_fit.length; i++){
    blockData_fit[i].vertex1[0] = (blockData_fit[i].vertex1[0] - minX) * window.innerWidth / (maxX - minX) / 2 + 400;
    blockData_fit[i].vertex2[0] = (blockData_fit[i].vertex2[0] - minX) * window.innerWidth / (maxX - minX) / 2 + 400;
    blockData_fit[i].vertex1[1] = (blockData_fit[i].vertex1[1] - minY) * (window.innerHeight - title_height) / (maxY - minY) / 8 * 7 + title_height;
    blockData_fit[i].vertex2[1] = (blockData_fit[i].vertex2[1] - minY) * (window.innerHeight - title_height) / (maxY - minY) / 8 * 7 + title_height;
}
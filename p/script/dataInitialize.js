//=====================================================
// ** dataInitialize.js
//-----------------------------------------------------
// 初始化数据点的相关属性（流速、温度、压力）
//=====================================================
for (let node in pipeVertexData) {
    pipeVertexData[node].speed = Math.random() * 100;
    pipeVertexData[node].temperature = Math.random() * 100;
    pipeVertexData[node].pressure = Math.random() * 100;
}
$.getJSON('./data/output.json', data => {
    for (let p of data) {
        console.log(p);
        pipeVertexData[pipe_id].speed = parseFloat(p.speed);
    }
})
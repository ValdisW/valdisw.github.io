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
        let pipe_id = 'g' + p.pipe;
        for (let map of node_pipe_map) {
            if (map['pipe_id'] == pipe_id) {
                pipeVertexData[map['node_id'][0]].speed = parseFloat(p.speed).toFixed(2);
                pipeVertexData[map['node_id'][1]].speed = parseFloat(p.speed).toFixed(2);
            }
        }
    }
})
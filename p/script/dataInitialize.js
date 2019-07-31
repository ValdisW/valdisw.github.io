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
        console.log('p.speed =', p.speed.toFixed(2));
        let speed = parseInt(p.speed).toFixed(2);
        let pipe_id = 'g' + p.pipe;
        for (let map of node_pipe_map) {
            if (map['pipe_id'] == pipe_id) {
                console.log('speed =', speed);
                pipeVertexData[map['node_id'][0]].speed = speed;
                pipeVertexData[map['node_id'][1]].speed = speed;
            }
        }
    }
    console.log(pipeVertexData);
})
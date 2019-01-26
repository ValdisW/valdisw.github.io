//=====================================================
// ** dataInitialize.js
//-----------------------------------------------------
// Initialize speed, temperature, pressure of data points
//=====================================================
for (let node in pipeVertexData) {
    pipeVertexData[node].speed = Math.random() * 100;
    pipeVertexData[node].temperature = Math.random() * 100;
    pipeVertexData[node].pressure = Math.random() * 100;
}
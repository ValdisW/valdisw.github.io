//=====================================================
// ** dataUpdate.js
//-----------------------------------------------------
//  Update speed, temperature, pressure of data points
//=====================================================
setInterval(function () {
    for (let node in pipeVertexData) {
        pipeVertexData[node].speed += randNum(-10, 10);
        pipeVertexData[node].temperature += randNum(-10, 10);
        pipeVertexData[node].pressure += randNum(-10, 10);
    }
}, 1000);
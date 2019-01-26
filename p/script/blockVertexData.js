const blockVertexData = [                                           // 各方块测量数据
    {id: '1', name: '提标硝化滤池', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.input1_1.coor.slice(0)[0], -180], vertex2: [pipeVertexData.output1_1.coor.slice(0)[0], -80]},
    {id: '1_attach', name: '', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.output1_1.coor.slice(0)[0], -180], vertex2: [pipeVertexData.output1_1.coor.slice(0)[0] + 20, -100]},
    {id: '2', name: '提标反硝化池', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.input2_1.coor.slice(0)[0], -180], vertex2: [pipeVertexData.output2_1.coor.slice(0)[0], -80]},
    {id: '2_attach', name: '', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.output2_1.coor.slice(0)[0], -180], vertex2: [pipeVertexData.output2_1.coor.slice(0)[0]+20, -80]},

    {id: '3', name: '提标\n滤布\n滤池', font: '10px Microsoft YaHei', vertex1: [pipeVertexData.input3_1.coor.slice(0)[0], -180], vertex2: [pipeVertexData.output3_1.coor.slice(0)[0], pipeVertexData.input3_2.coor.slice(0)[1]]},
    {id: '5', name: '扩建\n滤布\n滤池', font: '11px Microsoft YaHei', vertex1: [pipeVertexData.input6_1.coor.slice(0)[0], pipeVertexData.output5_1.coor.slice(0)[1]], vertex2: [pipeVertexData.input5_1.coor.slice(0)[0], pipeVertexData.output7_2.coor.slice(0)[1]]},
    {id: '6', name: '提标泵房\n及臭氧', font: '14px Microsoft YaHei', vertex1: [pipeVertexData.input6_1.coor.slice(0)[0], -180], vertex2: [pipeVertexData.input6_1.coor.slice(0)[0] + 100, pipeVertexData.input3_2.coor.slice(0)[1]]},
    {id: '7', name: '曝气活性炭池', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.input7_1.coor.slice(0)[0], pipeVertexData.output7_2.coor.slice(0)[1]-120], vertex2: [pipeVertexData.input7_2.coor.slice(0)[0], pipeVertexData.output7_2.coor.slice(0)[1]]},
    {id: '13', name: '综合进出水池', font: '14px Microsoft YaHei', vertex1: [pipeVertexData.input13_1.coor.slice(0)[0], pipeVertexData.output13_1.coor.slice(0)[1]], vertex2: [784, pipeVertexData.input13_2.coor.slice(0)[1]]},
    {id: '13_attach', name: '', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.input13_1.coor.slice(0)[0], pipeVertexData.output13_1.coor.slice(0)[1]-20], vertex2: [784, pipeVertexData.output13_1.coor.slice(0)[1]]},
    {id: '15', name: '超滤车间', font: '16px Microsoft YaHei', vertex1: [pipeVertexData.input7_1.coor.slice(0)[0], pipeVertexData.input15_1.coor.slice(0)[1]], vertex2: [pipeVertexData.output15_2.coor.slice(0)[0], pipeVertexData.output15_5.coor.slice(0)[1]]},
    {id: '17', name: '综合控制室', font: '16px Microsoft YaHei', vertex1: [780, pipeVertexData.output13_1.coor.slice(0)[1]], vertex2: [1184, pipeVertexData.input13_2.coor.slice(0)[1]]},

    {id: '11', name: '脱水机房加\n药除臭系统', font: '13px Microsoft YaHei', vertex1: [1687, -180], vertex2: [1784, -80]},


    /*
        {id: '4', name: '扩建工程调节池', font: '14px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: '4_attach', name: '', font: '16px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},

        {id: '9', name: '臭氧发生器', font: '14px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: '12', name: '变电站', font: '14px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: 'undefined', name: '', font: '14px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: 'undefined', name: '', font: '14px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},

        {id: '13', name: '液氧站', font: '12px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: '10', name: '污泥浓缩池', font: '12px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},


        {id: '6', name: '扩建硝化车间', font: '16px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: '6', name: '扩建反硝化池', font: '16px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
        {id: '16', name: '高效\n沉淀池', font: '14px Microsoft YaHei', vertex1: [587, -120], vertex2: [784, -80]},
    */
];
//====================================================================
// ** pipeData.js
//--------------------------------------------------------------------
//    整条管线数据
//====================================================================
let pipeData_origin = [
    {name: 'pipe1', vertices: [pipeVertexData.output13_1, pipeVertexData.j47, pipeVertexData.j46, pipeVertexData.j1, pipeVertexData.input1_1]},
    {name: 'pipe2', vertices: [pipeVertexData.j3, pipeVertexData.j4, pipeVertexData.j6]},
    {name: 'pipe3', vertices: [pipeVertexData.output1_1, pipeVertexData.input2_1]},
    {name: 'pipe4', vertices: [pipeVertexData.j4, pipeVertexData.j7, pipeVertexData.j9]},
    {name: 'pipe5', vertices: [pipeVertexData.output2_1, pipeVertexData.input3_1]},
    {name: 'pipe6', vertices: [pipeVertexData.output3_1, pipeVertexData.input6_1]},
    {name: 'pipe7', vertices: [pipeVertexData.output6_1, pipeVertexData.j14, pipeVertexData.j15, pipeVertexData.j16, pipeVertexData.j18, pipeVertexData.j20]},
    {name: 'pipe8', vertices: [pipeVertexData.j17, pipeVertexData.input7_1]},
    {name: 'pipe9', vertices: [pipeVertexData.output7_2, pipeVertexData.j22, pipeVertexData.j20]},
    {name: 'pipe10', vertices: [pipeVertexData.output15_1, pipeVertexData.j13, pipeVertexData.j12, pipeVertexData.j11, pipeVertexData.j10, pipeVertexData.input3_2]},
    {name: 'pipe11', vertices: [pipeVertexData.output6_2, pipeVertexData.j23, pipeVertexData.j24, pipeVertexData.input7_2]},
    {name: 'pipe12', vertices: [pipeVertexData.j24, pipeVertexData.j25_1, pipeVertexData.j25_2, pipeVertexData.j26, pipeVertexData.j27]},
    {name: 'pipe13', vertices: [pipeVertexData.output7_3, pipeVertexData.j28, pipeVertexData.j29, pipeVertexData.j30]},
    {name: 'pipe14', vertices: [pipeVertexData.output15_3, pipeVertexData.j30, pipeVertexData.j33]},
    {name: 'pipe15', vertices: [pipeVertexData.output15_4, pipeVertexData.j33, pipeVertexData.j34, pipeVertexData.j35, pipeVertexData.input17_2]},
    {name: 'pipe16', vertices: [pipeVertexData.output5_1, pipeVertexData.input6_2]},
    {name: 'pipe17', vertices: [pipeVertexData.j20, pipeVertexData.input15_1]},
    {name: 'pipe18', vertices: [pipeVertexData.j21, pipeVertexData.j37, pipeVertexData.j36]},
    {name: 'pipe19', vertices: [pipeVertexData.output15_5, pipeVertexData.j36, pipeVertexData.input17_1]},
    {name: 'pipe20', vertices: [pipeVertexData.output15_2, pipeVertexData.j38, pipeVertexData.j39, pipeVertexData.j40, pipeVertexData.j41, pipeVertexData.input5_1]},
    {name: 'pipe21', vertices: [pipeVertexData.output7_1, pipeVertexData.j42, pipeVertexData.j43, pipeVertexData.input13_1]},
    {name: 'pipe22', vertices: [pipeVertexData.output13_2, pipeVertexData.j48, pipeVertexData.j47]},
    {name: 'pipe23', vertices: [pipeVertexData.output13_3, pipeVertexData.j49, pipeVertexData.j48]},
    {name: 'pipe24', vertices: [pipeVertexData.output13_4, pipeVertexData.j50, pipeVertexData.j49]},
    {name: 'pipe25', vertices: [pipeVertexData.output13_5, pipeVertexData.j51, pipeVertexData.j50]},
    {name: 'pipe26', vertices: [pipeVertexData.output17_1, pipeVertexData.j59, pipeVertexData.j56/*, [805, 990]*/]},
    {name: 'pipe27', vertices: [pipeVertexData.output17_2, pipeVertexData.j52, pipeVertexData.j53, pipeVertexData.j55, pipeVertexData.j56]},
    //{name: 'pipe28', vertices: [[750, 1031], pipeVertexData.input13_2]},
    //{name: 'pipe29', vertices: [[789, 990], [761, 990]]}
];
let pipeData_noData = [
    [
        [pipeVertexData.output1_1.coor.slice(0)[0], -160],
        [pipeVertexData.output1_1.coor.slice(0)[0] + 30, -160],
        [pipeVertexData.output1_1.coor.slice(0)[0] + 30, -130],
        [pipeVertexData.output1_1.coor.slice(0)[0] + 60, -130],
        [pipeVertexData.output1_1.coor.slice(0)[0] + 60, -35],
        [pipeVertexData.input6_1.coor.slice(0)[0] + 20, -35],
        [pipeVertexData.input6_1.coor.slice(0)[0] + 20, 200],
        [pipeVertexData.input6_1.coor.slice(0)[0] + 70, 200],
        [pipeVertexData.input6_1.coor.slice(0)[0] + 70, pipeVertexData.input15_1.coor.slice(0)[1]],
    ],
    [[pipeVertexData.input6_1.coor.slice(0)[0] + 20, pipeVertexData.output5_1.coor.slice(0)[1] + 50],[pipeVertexData.input6_1.coor.slice(0)[0] + 50, pipeVertexData.output5_1.coor.slice(0)[1] + 50]],
    [[pipeVertexData.input6_1.coor.slice(0)[0] + 20, pipeVertexData.output5_1.coor.slice(0)[1] + 90],[pipeVertexData.input6_1.coor.slice(0)[0] + 50, pipeVertexData.output5_1.coor.slice(0)[1] + 90]],

    [[pipeVertexData.input7_2.coor.slice(0)[0], 235], [pipeVertexData.input6_1.coor.slice(0)[0], 235]],

    [[1700, 250], [1700, pipeVertexData.input15_1.coor.slice(0)[1]]],

    [[1150, 250], [1150, pipeVertexData.input15_1.coor.slice(0)[1]]],

    [[1020, 250], [1020, pipeVertexData.input15_1.coor.slice(0)[1]]],

    [[1300, 250], [1300, pipeVertexData.input15_1.coor.slice(0)[1]]],

    [[1400, 435], [1420, 435], [1420, 30],[1480, 30],[1480, -10]],
    [[1450, 30],[1450, -10]],
    [[1450, -100],[1450, -140], [1600, -140]],
    [[1480, -100],[1480, -140]],

    [[pipeVertexData.input6_1.coor.slice(0)[0], 435], [1230, 435], [1230, 700],[1700, 700],[1700, 800],[1600, 800]],
    [[pipeVertexData.input6_1.coor.slice(0)[0], 475], [1230, 475]],

    [
        [1670, pipeVertexData.input15_1.coor.slice(0)[1]],
        [1670, pipeVertexData.input15_1.coor.slice(0)[1]-30],
        [1480, pipeVertexData.input15_1.coor.slice(0)[1]-30],
        [1480, pipeVertexData.output7_2.coor.slice(0)[1]+450],
    ],
    [[1600, pipeVertexData.input15_1.coor.slice(0)[1]], [1600, pipeVertexData.input15_1.coor.slice(0)[1]-30]],
    [[pipeVertexData.input7_2.coor.slice(0)[0], pipeVertexData.output7_2.coor.slice(0)[1]-30],[pipeVertexData.input7_2.coor.slice(0)[0]+30, pipeVertexData.output7_2.coor.slice(0)[1]-30],[pipeVertexData.input7_2.coor.slice(0)[0]+30, pipeVertexData.output7_2.coor.slice(0)[1]+450],[pipeVertexData.input7_2.coor.slice(0)[0]+550, pipeVertexData.output7_2.coor.slice(0)[1]+450],[pipeVertexData.input7_2.coor.slice(0)[0]+550, pipeVertexData.output7_2.coor.slice(0)[1]+670],[1600, pipeVertexData.output7_2.coor.slice(0)[1]+670],],
    [[980, pipeVertexData.input15_1.coor.slice(0)[1]], [980, pipeVertexData.input15_1.coor.slice(0)[1]-30], [pipeVertexData.input7_2.coor.slice(0)[0]+30, pipeVertexData.input15_1.coor.slice(0)[1]-30], ],
    [[1080, pipeVertexData.input15_1.coor.slice(0)[1]], [1080, pipeVertexData.input15_1.coor.slice(0)[1]-30]],

    [[1635, pipeVertexData.input15_1.coor.slice(0)[1]], [1635, pipeVertexData.input15_1.coor.slice(0)[1]-60], [1350, pipeVertexData.input15_1.coor.slice(0)[1]-60], [1350, pipeVertexData.output7_2.coor.slice(0)[1]]],
    [[1050, pipeVertexData.input15_1.coor.slice(0)[1]], [1050, pipeVertexData.input15_1.coor.slice(0)[1]-60], [1350, pipeVertexData.input15_1.coor.slice(0)[1]-60]],

    [[1450, 900], [1450, 950], [1750, 950]],

    [[1420, 770], [1420, 740], [1650, 740], [1650, 670], [1650, 660], [1000, 660], [1000, pipeVertexData.output15_5.coor.slice(0)[1]]],
    [[1450, 770], [1450, 740]],
    [[1480, 770], [1480, 740]],
    [[1030, 660], [1030, pipeVertexData.output15_5.coor.slice(0)[1]]],
    [[1100, 660], [1100, pipeVertexData.output15_5.coor.slice(0)[1]]],
    [[1130, 660], [1130, pipeVertexData.output15_5.coor.slice(0)[1]]],
];

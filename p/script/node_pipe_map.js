/**
 * 管道和节点的映射
 */
const node_pipe_map = [{
        'pipe_id': 'g1',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g2',
        'node_id': ['j1', 'j3']
    },
    {
        'pipe_id': 'g3',
        'node_id': ['j3', 'j4']
    },
    {
        'pipe_id': 'g4',
        'node_id': ['j4', 'j6']
    },
    {
        'pipe_id': 'g5',
        'node_id': ['j4', 'j6']
    },
    {
        'pipe_id': 'g6',
        'node_id': ['output1_1', 'j6']
    },
    {
        'pipe_id': 'g7',
        'node_id': ['j6', 'input2_1']
    },
    {
        'pipe_id': 'g8',
        'node_id': ['j4', 'j7']
    },
    {
        'pipe_id': 'g9',
        'node_id': ['j7', 'j9']
    },
    {
        'pipe_id': 'g10',
        'node_id': ['j7', 'j9']
    },
    {
        'pipe_id': 'g11',
        'node_id': ['output2_1', 'j9']
    },
    {
        'pipe_id': 'g12',
        'node_id': ['j9', 'input3_1']
    },
    {
        'pipe_id': 'g13',
        'node_id': ['output3_1', 'input6_1']
    },
    {
        'pipe_id': 'g14',
        'node_id': ['j10', 'input3_2']
    },
    {
        'pipe_id': 'g15',
        'node_id': ['j11', 'j10']
    },
    {
        'pipe_id': 'g16',
        'node_id': ['j12', 'j11']
    },
    {
        'pipe_id': 'g17',
        'node_id': ['j13', 'j12']
    },
    {
        'pipe_id': 'g18',
        'node_id': ['output15_1', 'j13']
    },
    {
        'pipe_id': 'g19',
        'node_id': ['output6_1', 'j14']
    },
    {
        'pipe_id': 'g20',
        'node_id': ['j14', 'j15']
    },
    {
        'pipe_id': 'g21',
        'node_id': ['j15', 'j16']
    },
    {
        'pipe_id': 'g22',
        'node_id': ['j16', 'j17']
    },
    {
        'pipe_id': 'g23',
        'node_id': ['j18', 'j17']
    },
    {
        'pipe_id': 'g24',
        'node_id': ['j18', 'j20']
    },
    {
        'pipe_id': 'g25',
        'node_id': ['j18', 'j20']
    },
    {
        'pipe_id': 'g26',
        'node_id': ['j21', 'j20']
    },
    {
        'pipe_id': 'g27',
        'node_id': ['j22', 'j21']
    },
    {
        'pipe_id': 'g28',
        'node_id': ['output7_2', 'j22']
    },
    {
        'pipe_id': 'g29',
        'node_id': ['j17', 'input7_1']
    },
    {
        'pipe_id': 'g30',
        'node_id': ['output6_2', 'j23']
    },
    {
        'pipe_id': 'g31',
        'node_id': ['j23', 'j24']
    },
    {
        'pipe_id': 'g32',
        'node_id': ['j24', 'input7_2']
    },
    {
        'pipe_id': 'g33',
        'node_id': ['j24', 'j26']
    },
    {
        'pipe_id': 'g34',
        'node_id': ['j24', 'j26']
    },
    {
        'pipe_id': 'g35',
        'node_id': ['j26', 'j27']
    },
    {
        'pipe_id': 'g36',
        'node_id': ['output7_3', 'j27']
    },
    {
        'pipe_id': 'g37',
        'node_id': ['j27', 'j28']
    },
    {
        'pipe_id': 'g38',
        'node_id': ['j28', 'j29']
    },
    {
        'pipe_id': 'g39',
        'node_id': ['j29', 'j30']
    },
    {
        'pipe_id': 'g40',
        'node_id': ['output15_3', 'j30']
    },
    {
        'pipe_id': 'g41',
        'node_id': ['j30', 'j33']
    },
    {
        'pipe_id': 'g42',
        'node_id': ['j30', 'j33']
    },
    {
        'pipe_id': 'g43',
        'node_id': ['output15_4', 'j33']
    },
    {
        'pipe_id': 'g44',
        'node_id': ['j33', 'j34']
    },
    {
        'pipe_id': 'g45',
        'node_id': ['j34', 'j35']
    },
    {
        'pipe_id': 'g46',
        'node_id': ['j35', 'input17_2']
    },
    {
        'pipe_id': 'g47',
        'node_id': ['output15_5', 'j36']
    },
    {
        'pipe_id': 'g48',
        'node_id': ['j36', 'input17_1']
    },
    {
        'pipe_id': 'g49',
        'node_id': ['j37', 'j36']
    },
    {
        'pipe_id': 'g50',
        'node_id': ['j21', 'j37']
    },
    {
        'pipe_id': 'g51',
        'node_id': ['output15_2', 'j38']
    },
    {
        'pipe_id': 'g52',
        'node_id': ['j38', 'j39']
    },
    {
        'pipe_id': 'g53',
        'node_id': ['j39', 'j40']
    },
    {
        'pipe_id': 'g54',
        'node_id': ['j40', 'j41']
    },
    {
        'pipe_id': 'g55',
        'node_id': ['j41', 'input5_1']
    },
    {
        'pipe_id': 'g56',
        'node_id': ['output5_1', 'input6_2']
    },
    {
        'pipe_id': 'g57',
        'node_id': ['j20', 'input15_1']
    },
    {
        'pipe_id': 'g58',
        'node_id': ['output7_1', 'j42']
    },
    {
        'pipe_id': 'g59',
        'node_id': ['j42', 'j43']
    },
    {
        'pipe_id': 'g60',
        'node_id': ['j43', 'input13_1']
    },
    {
        'pipe_id': 'g61',
        'node_id': ['j46', 'j3']
    },
    {
        'pipe_id': 'g62',
        'node_id': ['j46', 'j3']
    },
    {
        'pipe_id': 'g63',
        'node_id': ['j46', 'j3']
    },
    {
        'pipe_id': 'g64',
        'node_id': ['j47', 'j46']
    },
    {
        'pipe_id': 'g65',
        'node_id': ['j48', 'j47']
    },
    {
        'pipe_id': 'g66',
        'node_id': ['j49', 'j48']
    },
    {
        'pipe_id': 'g67',
        'node_id': ['j50', 'j49']
    },
    {
        'pipe_id': 'g68',
        'node_id': ['j51', 'j50']
    },
    {
        'pipe_id': 'g69',
        'node_id': ['output13_5', 'j51']
    },
    {
        'pipe_id': 'g70',
        'node_id': ['output13_4', 'j50']
    },
    {
        'pipe_id': 'g71',
        'node_id': ['output13_3', 'j49']
    },
    {
        'pipe_id': 'g72',
        'node_id': ['output13_2', 'j48']
    },
    {
        'pipe_id': 'g73',
        'node_id': ['output13_1', 'j47']
    },
    {
        'pipe_id': 'g74',
        'node_id': ['output17_2', 'j52']
    },
    {
        'pipe_id': 'g75',
        'node_id': ['j52', 'j53']
    },
    {
        'pipe_id': 'g76',
        'node_id': ['j53', 'j55']
    },
    {
        'pipe_id': 'g77',
        'node_id': ['j53', 'j55']
    },
    {
        'pipe_id': 'g78',
        'node_id': ['j55', 'j56']
    },
    {
        'pipe_id': 'g79',
        'node_id': ['j59', 'j56']
    },
    {
        'pipe_id': 'g80',
        'node_id': ['j59', 'j56']
    },
    {
        'pipe_id': 'g81',
        'node_id': ['j59', 'j56']
    },
    {
        'pipe_id': 'g82',
        'node_id': ['output17_1', 'j59']
    },
    {
        'pipe_id': 'g83',
        'node_id': ['j56', 'outside']
    },
    {
        'pipe_id': 'g84',
        'node_id': ['j56', 'outside']
    },
    {
        'pipe_id': 'g85',
        'node_id': ['outside', 'input13_2']
    },
    // {
    //     'pipe_id': 'g86',
    //     'node_id': ['j1', 'input1_1']
    // },
    // {
    //     'pipe_id': 'g87',
    //     'node_id': ['j1', 'input1_1']
    // },
    // {
    //     'pipe_id': 'g88',
    //     'node_id': ['j1', 'input1_1']
    // },
]
/**
 * 管道和节点的映射
 */
const map = [{
        'pipe_id': 'g1',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g1',
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
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g7',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g8',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g9',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g10',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g11',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g12',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g13',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g14',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g15',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g16',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g17',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g18',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g19',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g20',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g21',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g2',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g23',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g24',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g25',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g26',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g27',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g28',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g29',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g30',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g31',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g32',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g33',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g34',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g35',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g36',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g37',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g38',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g39',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g40',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g41',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g42',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g43',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g44',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g45',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g46',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g47',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g48',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g49',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g50',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g51',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g52',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g53',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g54',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g55',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g56',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g57',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g58',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g59',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g60',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g61',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g62',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g63',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g64',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g65',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g66',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g67',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g68',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g69',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g70',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g71',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g72',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g73',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g74',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g75',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g76',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g77',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g78',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g79',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g80',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g81',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g82',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g83',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g84',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g85',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g86',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g87',
        'node_id': ['j1', 'input1_1']
    },
    {
        'pipe_id': 'g88',
        'node_id': ['j1', 'input1_1']
    },
]
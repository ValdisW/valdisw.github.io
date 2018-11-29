// 注意 函数都是复函数

const done = $('#done');
let isContinuousPattern = true;             // 最初默认为连续

done.click(function () {                // 单击确定，更新内容
    // 获取用户面板数据
    const
        f = functions[parseInt($('#signalsSelect').val())],        // 原函数
        min = parseFloat($('#min').val()),                                // 下限
        max = parseFloat($('#max').val()),                               // 上限
        fexp = fourierExpand(f, terms);                                   // 傅里叶展开
    freq = toFrequency(f, min, max)[0];                                // 幅度谱
    period = parseInt($('#period').val());

    if (isContinuousPattern) {                  // 当前是连续模式
        const terms = parseInt($('#terms').val());                        // 展开项数（连续）
        // 更新原函数
        let pointSamples;
        let originSamplesNum = 5e2,                 // 原函数采样点个数
            originStep = (max - min) / originSamplesNum;         // 步进值
        pointSamples = new Array(originSamplesNum);     // 计算原函数采样点
        for (let i = 0; i < pointSamples.length; i++) {
            pointSamples[i] = new Array(2);
            pointSamples[i][0] = min + i * originStep;
            pointSamples[i][1] = f(pointSamples[i][0]).real;        // 这里只采用实部
        }
        option1.series[0].data = pointSamples;
        //option1.series[1].data = userSamples;
        option1.series[1].data = [];
        chart1.setOption(option1);

        // 获取连续傅里叶的采样点
        let fourierSamplesNum = originSamplesNum,                  // 傅里叶展开采样点个数
            fourierStep = (max - min) / fourierSamplesNum;

        let fourierSamples = new Array(fourierSamplesNum);
        for (let i = 0; i < fourierSamples.length; i++){
            fourierSamples[i] = new Array(2);
            fourierSamples[i][0] = min + i * fourierStep;
            fourierSamples[i][1] = fexp(fourierSamples[i][0]);
        }
        option2_continuous.series.data = fourierSamples;
        chart2.setOption(option2_continuous);

        // 获取连续幅度谱的采样点
        let cftAmplituteFunc = getCftAmplitude(f, min, max, 1e4);         // 频率-幅度函数
        let cftAmplituteSamples = new Array(originSamplesNum);            // 对以上函数采样，采样点数与原函数采样点数一致
        for (let i = 0; i < cftAmplituteSamples.length; i++){
            cftAmplituteSamples[i] = new Array(2);
            cftAmplituteSamples[i][0] = min + i * fourierStep;
            cftAmplituteSamples[i][1] = cftAmplituteFunc(cftAmplituteSamples[i][0]);
        }
        option3_continuous.series.data = cftAmplituteSamples;
        chart3.setOption(option3_continuous);

        // 获取连续相位谱的采样点
        let cftPhaseFunc = getCftPhase(f, min, max, 1e4);
        let cftPhaseSamples = new Array(originSamplesNum);
        for (let i = 0; i < cftPhaseSamples.length; i++){
            cftPhaseSamples[i] = new Array(2);
            cftPhaseSamples[i][0] = min + i * fourierStep;
            cftPhaseSamples[i][1] = cftPhaseFunc(cftPhaseSamples[i][0]);
        }
        option4_continuous.series.data = cftPhaseSamples;
        chart4.setOption(option4_continuous);

    } else {                                // 当前是离散模式

        const userSamplesNum = parseInt($('#samples').val());      // 采样点数（离散）
        // 获取原函数中的离散采样点（二维向量）
        let userSamples = new Array(userSamplesNum);
        let userSamples_complex = new Array(userSamplesNum);
        let userSampleStep = (max - min) / (userSamplesNum - 1);
        for (let i = 0; i < userSamples.length - 1; i++) {
            userSamples[i] = new Array(2);
            userSamples[i][0] = min + i * userSampleStep;
            userSamples[i][1] = f(userSamples[i][0]).real;
            userSamples_complex[i] = getComplexFromArray(userSamples[i]);
        }
        userSamples[userSamplesNum - 1] = new Array(2);
        userSamples[userSamplesNum - 1][0] = max;
        userSamples[userSamplesNum - 1][1] = f(max).real;
        userSamples_complex[userSamplesNum - 1] = getComplexFromArray(userSamples[userSamplesNum - 1]);

        option1.series[1].data = userSamples;
        option1.series[0].data = [];
        chart1.setOption(option1);

        // 获取离散傅里叶的采样点
        fourierSamples = new Array(userSamplesNum);                            // 绘图采样点，[0]为横坐标，[1]为反变换后的实部
        let fourierSamples_complex = new Array(userSamplesNum);      // 采样点函数值的复数数组，用作dft的参数
        for (let i = 0; i < fourierSamples_complex.length; i++) {
            fourierSamples_complex[i] = new Complex(userSamples[i][1], 0);
        }

        let dftValue = dft(fourierSamples_complex);            // 正变换后的复数数组
        let idftValue = idft(dftValue);                                     // 反变换后的复数数组
        for (let i = 0; i  < fourierSamples.length; i++) {
            fourierSamples[i] = new Array(2);
            fourierSamples[i][0] = userSamples[i][0];
            fourierSamples[i][1] = idftValue[i].toArray()[0];
        }
        option2_discrete.series.data = fourierSamples;
        chart2.setOption(option2_discrete);

        // 获取离散幅度谱的采样点
        let freqSamples = new Array(userSamplesNum);
        for (let i = 0; i < freqSamples.length; i++) {
            freqSamples[i] = new Array(2);
            freqSamples[i][0] = i;
            freqSamples[i][1] = dftValue[i].getLength();
        }
        option3_discrete.series.data = getDftAmplitude(userSamples_complex);
        chart3.setOption(option3_discrete);

        // 获取离散相位谱的采样点
        option4_discrete.series.data = getDftPhase(userSamples_complex);
        chart4.setOption(option4_discrete);

        // 将傅里叶系数画在复平面上
        let dftValue_2D = new Array(dftValue.length);
        for (let i = 0; i < dftValue.length; i++) {
            dftValue_2D[i] = new Array(2);
            dftValue_2D[i][0] = dftValue[i].real;
            dftValue_2D[i][1] = dftValue[i].imaginary;
        }
        console.log(dftValue_2D);
        option5.series.data = dftValue_2D;
        chart5.setOption(option5);
    }
});
done.click();
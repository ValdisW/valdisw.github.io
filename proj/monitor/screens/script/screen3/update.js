var interval = 2000;
var axis_x = new Array(20);

setInterval(function () {
    var now = new Date();
    var now_minute =  now.getMinutes();
    var now_second = now.getSeconds();
    var timeStr = now_minute + ': ' + now_second;
    var axis_x = new Array(20);
    axis_x.unshift(timeStr);
    console.log(axis_x);

    /* 公共数据交换平台 */
    accessDepart_0 += 0;
    var plus1 = randomInt(300, 600);
    todayExchange_0 += plus1;
    totalExchange_0 += plus1;
    var plus2 = randomInt(50, 300);
    todayInput_0 += plus2;
    todayOutput_0 += plus1 - plus2;
    todayStay_0 += 0;

    /* 重点数据交换 */
    var plus3 = randomInt(10, 80);
    exchangeWeek1_0 += plus3;
    exchangeTotal1_0 += plus3;
    var plus4 = randomInt(10, 80);
    exchangeWeek2_0 += plus4;
    exchangeTotal2_0 += plus4;
    var plus5 = randomInt(10, 80);
    exchangeWeek3_0 += plus5;
    exchangeTotal3_0 += plus5;
    var plus6 = randomInt(10, 80);
    exchangeWeek4_0 += plus6;
    exchangeTotal4_0 += plus6;
    var plus7 = randomInt(10, 80);
    exchangeWeek5_0 += plus7;
    exchangeTotal5_0 += plus7;

    /* 区县数据上报 */
    var plus8 = randomInt(1, 3);
    areaWeek_0 += plus8;
    var plus9 = randomInt(0, 1);
    areaCut_0 += plus9;
    areaPower_0 += 0;
    areaDepart_0 += plus8 - plus9;

    /* 省厅数据上传 */
    var plus10 = randomInt(1, 3);
    provWeek_0 += plus10;
    var plus11 = randomInt(0, 1);
    provCut_0 += plus11;
    provVision_0 += 0;
    provAdmin_0 += plus10 - plus11;

    /* 全要素网格信息系统 */
    var plus12 = randomInt(120, 200);
    totalData_0 += plus12;
    var plus13 = randomInt(10, 20);
    bureau1Data_0 += randomInt(1000, 9999);
    var plus14 = randomInt(10, 20);
    bureau2Data_0 += randomInt(1000, 9999);
    var plus15 = randomInt(10, 20);
    bureau3Data_0 += randomInt(1000, 9999);
    var plus16 = randomInt(10, 20);
    bureau4Data_0 += randomInt(1000, 9999);
    var plus17 = randomInt(10, 20);
    bureau5Data_0 += randomInt(1000, 9999);
    bureau6Data_0 += plus12  - plus13 - plus14 - plus15 - plus16 - plus17;

    /*  */
    totalCollection_0 += 0;
    totalForm_0 += randomInt(0, 1);
    totalField_0 += randomInt(0, 2);

    /* 共享健康度 */
    level_0 = '优';
    resTime_0 += 0;
/*
    succRate_0 += parseFloat((Math.random() * (0.02 - (-0.02)) + (-0.02)).toFixed(2));
    errRate_0 = parseFloat((100 - succRate_0).toFixed(2));
*/

    /* 重点数据共享 */
    var plus18 = randomInt(10, 80);
    shareWeek1_0 += plus18;
    shareBureaus1_0 += 0;
    shareTotal1_0 += plus18;
    var plus19 = randomInt(10, 80);
    shareWeek2_0 += plus19;
    shareBureaus2_0 += 0;
    shareTotal2_0 += plus19;
    var plus20 = randomInt(10, 80);
    shareWeek3_0 += plus20;
    shareBureaus3_0 += 0;
    shareTotal3_0 += plus20;
    var plus21 = randomInt(10, 80);
    shareWeek4_0 +=  plus21;
    shareBureaus4_0 += 0;
    shareTotal4_0 +=  plus21;
    var plus22 = randomInt(10, 80);
    shareWeek5_0 +=  plus22;
    shareBureaus5_0 += 0;
    shareTotal5_0 +=  plus22;
    var plus23 = randomInt(10, 80);
    shareWeek6_0 +=  plus23;
    shareBureaus6_0 += 0;
    shareTotal6_0 +=  plus23;
    var plus24 = randomInt(10, 80);
    shareWeek7_0 +=  plus24;
    shareBureaus7_0 += 0;
    shareTotal7_0 +=  plus24;
    var plus25 = randomInt(10, 80);
    shareWeek8_0 +=  plus25;
    shareBureaus8_0 += 0;
    shareTotal8_0 +=  plus25;
    var plus26 = randomInt(10, 80);
    shareWeek9_0 +=  plus26;
    shareBureaus9_0 += 0;
    shareTotal9_0 +=  plus26;
    var plus27 = randomInt(10, 80);
    shareWeek10_0 +=  plus27;
    shareBureaus10_0 += 0;
    shareTotal10_0 +=  plus27;

    /* 本周市级部门交换 */
    exchangeInput1_0 += randomInt(10, 30);
    exchangeOutput1_0 += randomInt(100, 300);
    exchangeInput2_0 += randomInt(10, 30);
    exchangeOutput2_0 += randomInt(100, 300);
    exchangeInput3_0 += randomInt(10, 30);
    exchangeOutput3_0 += randomInt(100, 300);
    exchangeInput4_0 += randomInt(10, 30);
    exchangeOutput4_0 += randomInt(100, 300);
    exchangeInput5_0 += randomInt(10, 30);
    exchangeOutput5_0 += randomInt(100, 300);

    /* 电子政务配套应用系统 */
    resourceDepart_0 += randomInt(0, 1);
    resourceTotal_0 += randomInt(0, 2);
    sealDepart_0 += randomInt(0, 1);
    sealTotal_0 += randomInt(0, 2);




    /* 公共数据交换平台 */
    accessDepart.innerHTML = accessDepart_0;
    todayExchange.innerHTML = todayExchange_0;
    totalExchange.innerHTML = totalExchange_0;
    todayInput.innerHTML = todayInput_0;
    todayOutput.innerHTML = todayOutput_0;
    todayStay.innerHTML = todayStay_0;

    /* 重点数据交换 */
    exchangeWeek1.innerHTML = exchangeWeek1_0;
    exchangeTotal1.innerHTML = exchangeTotal1_0;
    exchangeWeek2.innerHTML = exchangeWeek2_0;
    exchangeTotal2.innerHTML = exchangeTotal2_0;
    exchangeWeek3.innerHTML = exchangeWeek3_0;
    exchangeTotal3.innerHTML = exchangeTotal3_0;
    exchangeWeek4.innerHTML = exchangeWeek4_0;
    exchangeTotal4.innerHTML = exchangeTotal4_0;
    exchangeWeek5.innerHTML = exchangeWeek5_0;
    exchangeTotal5.innerHTML = exchangeTotal5_0;

    /* 区县数据上报 */
    areaWeek.innerHTML = areaWeek_0;
    areaCut.innerHTML = areaCut_0;
    areaPower.innerHTML = areaPower_0;
    areaDepart.innerHTML = areaDepart_0;

    /* 省厅数据上传 */
    provWeek.innerHTML = provWeek_0;
    provCut.innerHTML = provCut_0;
    provVision.innerHTML = provVision_0;
    provAdmin.innerHTML = provAdmin_0;

    /* 全要素网格信息系统 */
    totalData.innerHTML = totalData_0;
    bureau1Data.innerHTML = bureau1Data_0;
    bureau2Data.innerHTML = bureau2Data_0;
    bureau3Data.innerHTML = bureau3Data_0;
    bureau4Data.innerHTML = bureau4Data_0;
    bureau5Data.innerHTML = bureau5Data_0;
    bureau6Data.innerHTML = bureau6Data_0;

    /*  */
    totalCollection.innerHTML = totalCollection_0;
    totalForm.innerHTML = totalForm_0;
    totalField.innerHTML = totalField_0;

    /* 共享健康度 */
    level.innerHTML = level_0;
    resTime.innerHTML = resTime_0;
    succRate.innerHTML = succRate_0;
    errRate.innerHTML = errRate_0;

    /* 重点数据共享 */
    shareWeek1.innerHTML = shareWeek1_0;
    shareBureaus1.innerHTML = shareBureaus1_0;
    shareTotal1.innerHTML = shareTotal1_0;
    shareWeek2.innerHTML = shareWeek2_0;
    shareBureaus2.innerHTML = shareBureaus2_0;
    shareTotal2.innerHTML = shareTotal2_0;
    shareWeek3.innerHTML = shareWeek3_0;
    shareBureaus3.innerHTML = shareBureaus3_0;
    shareTotal3.innerHTML = shareTotal3_0;
    shareWeek4.innerHTML = shareWeek4_0;
    shareBureaus4.innerHTML = shareBureaus4_0;
    shareTotal4.innerHTML = shareTotal4_0;
    shareWeek5.innerHTML = shareWeek5_0;
    shareBureaus5.innerHTML = shareBureaus5_0;
    shareTotal5.innerHTML = shareTotal5_0;
    shareWeek6.innerHTML = shareWeek6_0;
    shareBureaus6.innerHTML = shareBureaus6_0;
    shareTotal6.innerHTML = shareTotal6_0;
    shareWeek7.innerHTML = shareWeek7_0;
    shareBureaus7.innerHTML = shareBureaus7_0;
    shareTotal7.innerHTML = shareTotal7_0;
    shareWeek8.innerHTML = shareWeek8_0;
    shareBureaus8.innerHTML = shareBureaus8_0;
    shareTotal8.innerHTML = shareTotal8_0;
    shareWeek9.innerHTML = shareWeek9_0;
    shareBureaus9.innerHTML = shareBureaus9_0;
    shareTotal9.innerHTML = shareTotal9_0;
    shareWeek10.innerHTML = shareWeek10_0;
    shareBureaus10.innerHTML = shareBureaus10_0;
    shareTotal10.innerHTML = shareTotal10_0;

    /* 本周市级部门交换 */
    exchangeInput1.innerHTML = exchangeInput1_0;
    exchangeOutput1.innerHTML = exchangeOutput1_0;
    exchangeInput2.innerHTML = exchangeInput2_0;
    exchangeOutput2.innerHTML = exchangeOutput2_0;
    exchangeInput3.innerHTML = exchangeInput3_0;
    exchangeOutput3.innerHTML = exchangeOutput3_0;
    exchangeInput4.innerHTML = exchangeInput4_0;
    exchangeOutput4.innerHTML = exchangeOutput4_0;
    exchangeInput5.innerHTML = exchangeInput5_0;
    exchangeOutput5.innerHTML = exchangeOutput5_0;

    /* 电子政务配套应用系统 */
    resourceDepart.innerHTML = resourceDepart_0;
    resourceTotal.innerHTML = resourceTotal_0;
    sealDepart.innerHTML = sealDepart_0;
    sealTotal.innerHTML = sealTotal_0;

}, interval)

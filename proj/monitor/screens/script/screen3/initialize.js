/* 公共数据交换平台 */
var accessDepart_0 = randomInt(20, 80);
    todayExchange_0 = randomInt(1000, 9999);
    totalExchange_0 = randomInt(100000000, 999999999);
    todayInput_0 = randomInt(10000000, 30000000);
    todayOutput_0 = randomInt(40000000, 80000000);
    todayStay_0 = 0;

/* 重点数据交换 */
var exchangeWeek1_0 = randomInt(100000, 999999);
    exchangeTotal1_0 = randomInt(100000000, 999999999);
    exchangeWeek2_0 = randomInt(100000, 999999);
    exchangeTotal2_0 = randomInt(100000000, 999999999);
    exchangeWeek3_0 = randomInt(100000, 999999);
    exchangeTotal3_0 = randomInt(100000000, 999999999);
    exchangeWeek4_0 = randomInt(100000, 999999);
    exchangeTotal4_0 = randomInt(100000000, 999999999);
    exchangeWeek5_0 = randomInt(100000, 999999);
    exchangeTotal5_0 = randomInt(100000000, 999999999);

/* 区县数据上报 */
var areaWeek_0 = randomInt(10000, 50000);
    areaCut_0 = randomInt(100, 500);
    areaPower_0 = 0;
    areaDepart_0 = areaWeek_0 - areaCut_0 - areaPower_0;

/* 省厅数据上传 */
var provWeek_0 = randomInt(10000, 50000);
    provCut_0 = randomInt(100, 500);
    provVision_0 = 0;
    provAdmin_0 = provWeek_0 - provCut_0 - provVision_0;

/* 全要素网格信息系统 */
var totalData_0 = randomInt(100000, 999999);
    bureau1Data_0 = randomInt(1000, 9999);
    bureau2Data_0 = randomInt(1000, 9999);
    bureau3Data_0 = randomInt(1000, 9999);
    bureau4Data_0 = randomInt(1000, 9999);
    bureau5Data_0 = randomInt(1000, 9999);
    bureau6Data_0 = randomInt(1000, 9999);

/*  */
var totalCollection_0 = parseFloat((Math.random() * (800 - 600) + 600).toFixed(1));
    totalForm_0 = randomInt(8000, 9999);
    totalField_0 = randomInt(20000, 60000);

/* 共享健康度 */
var level_0 = '优';
    resTime_0 = parseFloat((Math.random() * (900 - 100) + 100).toFixed(1));
    succRate_0 = parseFloat((Math.random() * (99 - 95) + 95).toFixed(2));
    errRate_0 = parseFloat((100 - succRate_0).toFixed(2));

/* 重点数据共享 */
var shareWeek1_0 = randomInt(100000, 999999);
    shareBureaus1_0 = randomInt(10, 50);
    shareTotal1_0 = randomInt(100000000, 999999999);
    shareWeek2_0 = randomInt(100000, 999999);
    shareBureaus2_0 = randomInt(10, 50);
    shareTotal2_0 = randomInt(100000000, 999999999);
    shareWeek3_0 = randomInt(100000, 999999);
    shareBureaus3_0 = randomInt(10, 50);
    shareTotal3_0 = randomInt(100000000, 999999999);
    shareWeek4_0 = randomInt(100000, 999999);
    shareBureaus4_0 = randomInt(10, 50);
    shareTotal4_0 = randomInt(100000000, 999999999);
    shareWeek5_0 = randomInt(100000, 999999);
    shareBureaus5_0 = randomInt(10, 50);
    shareTotal5_0 = randomInt(100000000, 999999999);
    shareWeek6_0 = randomInt(100000, 999999);
    shareBureaus6_0 = randomInt(10, 50);
    shareTotal6_0 = randomInt(100000000, 999999999);
    shareWeek7_0 = randomInt(100000, 999999);
    shareBureaus7_0 = randomInt(10, 50);
    shareTotal7_0 = randomInt(100000000, 999999999);
    shareWeek8_0 = randomInt(100000, 999999);
    shareBureaus8_0 = randomInt(10, 50);
    shareTotal8_0 = randomInt(100000000, 999999999);
    shareWeek9_0 = randomInt(100000, 999999);
    shareBureaus9_0 = randomInt(10, 50);
    shareTotal9_0 = randomInt(100000000, 999999999);
    shareWeek10_0 = randomInt(100000, 999999);
    shareBureaus10_0 = randomInt(10, 50);
    shareTotal10_0 = randomInt(100000000, 999999999);

/* 本周市级部门交换 */
var exchangeInput1_0 = randomInt(10000, 99999);
    exchangeOutput1_0 = randomInt(1000000, 9999999);
    exchangeInput2_0 = randomInt(10000, 99999);
    exchangeOutput2_0 = randomInt(1000000, 9999999);
    exchangeInput3_0 = randomInt(10000, 99999);
    exchangeOutput3_0 = randomInt(1000000, 9999999);
    exchangeInput4_0 = randomInt(10000, 99999);
    exchangeOutput4_0 = randomInt(1000000, 9999999);
    exchangeInput5_0 = randomInt(10000, 99999);
    exchangeOutput5_0 = randomInt(1000000, 9999999);

/* 电子政务配套应用系统 */
var resourceDepart_0 = randomInt(40, 90);
    resourceTotal_0 = randomInt(500, 900);
    sealDepart_0 = randomInt(30, 80);
    sealTotal_0 = randomInt(500, 900);





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

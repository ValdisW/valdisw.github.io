// dom
var map = document.getElementById('map');
var block1 = document.getElementById('block1');
var block2 = document.getElementById('block2');
var block3 = document.getElementById('block3');
var block4 = document.getElementById('block4');
var block5 = document.getElementById('block5');
var block6 = document.getElementById('block6');
var block7 = document.getElementById('block7');
var block8 = document.getElementById('block8');

// colors
var colorList = ['rgb(145, 132, 218)', 'rgb(93, 73, 205)', 'rgb(229, 255, 255)', 'rgb(25, 33, 106)', 'rgb(1, 45, 206)', 'rgb(27, 153, 211)', 'rgb(242, 133, 190)', 'rgb(130, 17, 31)', 'rgb(34,148, 83)', 'rgb(222, 118, 34)'];
var colorList0 = ['rgba(145, 132, 218, .2)', 'rgba(93, 73, 205, .2)', 'rgba(229, 255, 255, .2)', 'rgba(25, 33, 106, .2)', 'rgba(1, 45, 206, .2)', 'rgba(27, 153, 211, .2)', 'rgba(242, 133, 190, .2)'];
var colorList1 = ['rgba(145, 132, 218, .6)', 'rgba(93, 73, 205, .6)', 'rgba(229, 255, 255, .6)', 'rgba(25, 33, 106, .6)', 'rgba(1, 45, 206, .6)', 'rgba(27, 153, 211, .6)', 'rgba(242, 133, 190, .6)'];

// date
$('#weather').html('21-30°C, 多云转晴, 北风三级');
var dayChar = ['日', '一', '二', '三', '四', '五', '六'];
var newDate = new Date(),
    year = newDate.getFullYear(),
    month = newDate.getMonth() + 1,
    date = newDate.getDate(),
    day = newDate.getDay(),
    hour = newDate.getHours(),
    minute = newDate.getMinutes(),
    second = newDate.getSeconds();
var minStr = (minute < 10)?('0' + minute):(minute);
var secStr = (second < 10)?('0' + second):(second);

// city
var wuxi = {};
wuxi.name = '无锡';
wuxi.districtNames = ['江阴市', '宜兴市', '梁溪区', '锡山区', '惠山区', '滨湖区','新吴区'];
wuxi.bureaus = ['组织部', '公安', '司法', '民政', '劳动', '人社', '工商', '教育', '城管', '信访', '团市委', '计生委', '消防', '食药监', '邮政', '交通产业集团', '民宗', '残联', '老龄委', '综治办'];
wuxi.activeBureaus = ['公安局', '民政局', '卫计委', '邮政管理局', '综治办', '城管局', '工商局', '老龄委', '人社局', '组织部'];
wuxi.districts = new Array(wuxi.districtNames.length);
wuxi.gridSum = 0;                           // 网格总数
wuxi.gridM = 0;                               // 综合网格
wuxi.gridP = 0;                                // 专属网格

wuxi.gridPeoNum = 0;                      // 网格员总数
wuxi.gridPeoNum_online = 0;         // 网格员在线数
wuxi.gridPeoNum_male = 0;           // 男性
wuxi.gridPeoNum_female = 0;        // 女性
wuxi.gridPeoNum_coll = 0;             // 大专及以下
wuxi.gridPeoNum_underg = 0;       // 本科
wuxi.gridPeoNum_postg = 0;         // 研究生
wuxi.gridPeoNum_com = 0;           // 共产党员
wuxi.gridPeoNum_demo = 0;         // 民主党派
wuxi.gridPeoNum_null = 0;             // 无党派
wuxi.gridPeoNum_undef = 0;         // 群众

wuxi.infoCollect = 0;                       // 信息采集数
wuxi.infoCollectHistory = new Array(7);     // 信息采集一周信息（不算当天）

wuxi.eventSum = 0;                      // 事件总数
wuxi.eventU = 0;                            // 已上报事件
wuxi.eventO = 0;                            // 处理中事件
wuxi.eventF = 0;                            // 已办结事件

var level = [true, false];
var category = ["类别1", "类别2", "类别3"];
var gridPeo = ["网格员1", "网格员2", "网格员3", "网格员4"];
var stats = ["情况1", "情况2", "情况3", "情况4", "情况5", "情况6"];
var levelRes = [];
var categoryRes = [];
var gridPeoRes = [];
var statsRes = [];
var timeRes = [];
for (var i = 0; i < 10; i++) {
    timeRes.push(hour + ':' + minStr + ':' + secStr);
    categoryRes.push(category[Math.round(Math.random() * (category.length - 1 - 0) + 0)]);
    gridPeoRes.push(gridPeo[Math.round(Math.random() * (gridPeo.length - 1 - 0) + 0)]);
    statsRes.push(stats[Math.round(Math.random() * (stats.length - 1 - 0) + 0)]);
    levelRes.push(level[Math.round(Math.random() * (level.length - 1 - 0) + 0)]);
}

// 初始赋值
for (var i = 0;  i < wuxi.districts.length; i++) {
    wuxi.districts[i] = {};
    wuxi.districts[i].name = wuxi.districtNames[i];
    wuxi.districts[i].gridM = Math.round(Math.random() * (1200 - 800) + 800);
    wuxi.districts[i].gridP = Math.round(Math.random() * (600 - 300) + 300);
    wuxi.districts[i].gridSum = wuxi.districts[i].gridM + wuxi.districts[i].gridP;
    wuxi.districts[i].gridPeoNum = Math.round(Math.random() * (2600 - 1500) + 1500);
    wuxi.districts[i].gridPeoNum_online = wuxi.districts[i].gridPeoNum -  Math.round(Math.random() * (500 -200) + 200);
    wuxi.districts[i].infoCollect = 0;
    wuxi.districts[i].eventU = 0;
    wuxi.districts[i].eventO = 0;
    wuxi.districts[i].eventF = 0;
    wuxi.districts[i].eventSum = 0;
}

// 网格相关
for (var i = 0; i < wuxi.districts.length; i++){
    wuxi.gridM += wuxi.districts[i].gridM;
    wuxi.gridP += wuxi.districts[i].gridP;
    wuxi.gridPeoNum += wuxi.districts[i].gridPeoNum;
    wuxi.gridPeoNum_online += wuxi.districts[i].gridPeoNum_online;
}
wuxi.gridSum = wuxi.gridM + wuxi.gridP;

wuxi.gridPeoNum_male = Math.round(randomInt(45, 55) / 100 * wuxi.gridPeoNum);
wuxi.gridPeoNum_female = wuxi.gridPeoNum - wuxi.gridPeoNum_male;
wuxi.gridPeoNum_coll = Math.round(wuxi.gridPeoNum / 3);
wuxi.gridPeoNum_underg = Math.round(wuxi.gridPeoNum / 2);
wuxi.gridPeoNum_postg = wuxi.gridPeoNum - wuxi.gridPeoNum_coll - wuxi.gridPeoNum_underg;
wuxi.gridPeoNum_com = Math.round(wuxi.gridPeoNum / 3);
wuxi.gridPeoNum_demo = Math.round(wuxi.gridPeoNum / 10);
wuxi.gridPeoNum_null = Math.round(wuxi.gridPeoNum / 15);
wuxi.gridPeoNum_undef = wuxi.gridPeoNum - wuxi.gridPeoNum_com - wuxi.gridPeoNum_demo - wuxi.gridPeoNum_null;
// 事件相关
wuxi.activeBureaus0 = new Array(wuxi.activeBureaus.length);
for (var i = 0; i < wuxi.activeBureaus0.length; i++){
    wuxi.activeBureaus0[i] = {};
    wuxi.activeBureaus0[i].name = wuxi.activeBureaus[i];
    wuxi.activeBureaus0[i].area = new Array(wuxi.districts.length);
    wuxi.activeBureaus0[i].eventU = 0;
    wuxi.activeBureaus0[i].eventO = 0;
    wuxi.activeBureaus0[i].eventF = 0;
    wuxi.activeBureaus0[i].eventSum = 0;
    wuxi.activeBureaus0[i].infoCollect = 0;
    for (var j = 0; j < wuxi.districts.length; j++){
        // 初始化每个局的每个区域的事件数据
        wuxi.activeBureaus0[i].area[j] = {};
        wuxi.activeBureaus0[i].area[j].name = wuxi.districtNames[j];
        wuxi.activeBureaus0[i].area[j].eventU = Math.round(Math.random() * (200 - 100) + 100);
        wuxi.activeBureaus0[i].area[j].eventO = Math.round(Math.random() * (200 - 100) + 100);
        wuxi.activeBureaus0[i].area[j].eventF = Math.round(Math.random() * (200 - 100) + 100);
        wuxi.activeBureaus0[i].area[j].eventSum = wuxi.activeBureaus0[i].area[j].eventU + wuxi.activeBureaus0[i].area[j].eventO + wuxi.activeBureaus0[i].area[j].eventF;
        wuxi.activeBureaus0[i].area[j].infoCollect = Math.round(Math.random() * (3600 - 1200) + 1200);
        // 每个局的事件数据更新
        wuxi.activeBureaus0[i].eventU += wuxi.activeBureaus0[i].area[j].eventU;
        wuxi.activeBureaus0[i].eventO += wuxi.activeBureaus0[i].area[j].eventO;
        wuxi.activeBureaus0[i].eventF += wuxi.activeBureaus0[i].area[j].eventF;
        wuxi.activeBureaus0[i].eventSum += wuxi.activeBureaus0[i].area[j].eventSum;
        wuxi.activeBureaus0[i].infoCollect += wuxi.activeBureaus0[i].area[j].infoCollect;
        // 每个区的事件数据更新
        wuxi.districts[j].eventU += wuxi.activeBureaus0[i].area[j].eventU;
        wuxi.districts[j].eventO += wuxi.activeBureaus0[i].area[j].eventO;
        wuxi.districts[j].eventF += wuxi.activeBureaus0[i].area[j].eventF;
        wuxi.districts[j].eventSum += wuxi.activeBureaus0[i].area[j].eventSum;
        wuxi.districts[j].infoCollect += wuxi.activeBureaus0[i].area[j].infoCollect;
        // 无锡市的事件数据更新
        wuxi.eventU += wuxi.activeBureaus0[i].area[j].eventU;
        wuxi.eventO += wuxi.activeBureaus0[i].area[j].eventO;
        wuxi.eventF += wuxi.activeBureaus0[i].area[j].eventF;
        wuxi.eventSum += wuxi.activeBureaus0[i].area[j].eventSum;
        wuxi.infoCollect += wuxi.activeBureaus0[i].area[j].infoCollect;
    }
}

// 数据更新内容
wuxi.dataUpdate = function(){
    // 事件分类
    for (var i = 0; i < wuxi.activeBureaus0.length; i++){               // 每个局
        wuxi.activeBureaus0[i].infoCollectPlus = 0;
        for (var j = 0; j < wuxi.districts.length; j++){                       // 局分管的每个区
            if (Math.round(Math.random())) {                                    // 上报事件
                wuxi.activeBureaus0[i].area[j].eventU += 1;
                wuxi.activeBureaus0[i].eventU += 1;
                wuxi.districts[j].eventU += 1;
                wuxi.eventU += 1;
                wuxi.activeBureaus0[i].area[j].eventSum += 1;
                wuxi.activeBureaus0[i].eventSum += 1;
                wuxi.districts[j].eventSum += 1;
                wuxi.eventSum += 1;
                wuxi.activeBureaus0[i].area[j].infoCollect += 1;
                wuxi.activeBureaus0[i].infoCollect += 1;
                wuxi.districts[j].infoCollect += 1;
                wuxi.infoCollect += 1;
                wuxi.activeBureaus0[i].infoCollectPlus += 1;
            }
            if (Math.round(Math.random())) {                                    // 处理事件
                wuxi.activeBureaus0[i].area[j].eventU -= 1;
                wuxi.activeBureaus0[i].eventU -= 1;
                wuxi.districts[j].eventU -= 1;
                wuxi.eventU -= 1;
                wuxi.activeBureaus0[i].area[j].eventO += 1;
                wuxi.activeBureaus0[i].eventO += 1;
                wuxi.districts[j].eventO += 1;
                wuxi.eventO += 1;
            }
            if (Math.round(Math.random())) {                                    // 处理完成
                wuxi.activeBureaus0[i].area[j].eventO -= 1;
                wuxi.activeBureaus0[i].eventO -= 1;
                wuxi.districts[j].eventO -= 1;
                wuxi.eventO -= 1;
                wuxi.activeBureaus0[i].area[j].eventF += 1;
                wuxi.activeBureaus0[i].eventF += 1;
                wuxi.districts[j].eventF += 1;
                wuxi.eventF += 1;
            }
        }
    }
    wuxi.gridPeoNum_online = 0;
    for (var i = 0; i < wuxi.districts.length; i++){
        wuxi.districts[i].gridPeoNum_online = wuxi.districts[i].gridPeoNum -  Math.round(Math.random() * (500 -200) + 200);
        wuxi.gridPeoNum_online += wuxi.districts[i].gridPeoNum_online;
    }
}

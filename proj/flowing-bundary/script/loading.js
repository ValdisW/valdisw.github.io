/**
 * 加载界面和标题界面
 */

// global variables
let load_list, loading_animation, bg_animation, title_text_animation, current_part_index;

const main_canvas = document.querySelector("#loading-bg-canvas");
main_canvas.setAttribute("width", window.innerWidth);
main_canvas.setAttribute("height", window.innerHeight);
const gl = main_canvas.getContext("webgl");

// 预加载列表
load_list = [
  "./GLSL/particles.vert",
  "./GLSL/particles.frag",
  "./video/bg.mp4",
  "./audio/bubble-click.wav",
  "./audio/bgm.mp3",
  "./image/svg/title-text.svg",
  "./image/svg/down-arrow.svg",
  "../../../images/texture/point_texture.png",
  "./fonts/方正粗黑宋简体.TTF",
  "./fonts/方正盛世楷书简体_纤.TTF",
  // "./image/head/丁铁刚.jpg",
  // "./image/head/丘远军.jpg",
  // "./image/head/乔胜.jpg",
  // "./image/head/乔锦仁.jpg",
  // "./image/head/于占海.jpg",
  // "./image/head/于忠元.jpg",
  // "./image/head/于正洲.jpg",
  // "./image/head/于洋.jpg",
  // "./image/head/付永杰.jpg",
  // "./image/head/任国信.jpg",
  // "./image/head/任荣.jpg",
  // "./image/head/位洪明.jpg",
  // "./image/head/何学明.jpg",
  // "./image/head/何建华.jpg",
  // "./image/head/何旭峰.jpg",
  // "./image/head/何明.jpg",
  // "./image/head/何玉海.jpg",
  // "./image/head/何荣广.jpg",
  // "./image/head/余振良.jpg",
  // "./image/head/余斌.jpg",
  // "./image/head/倪佩文.jpg",
  // "./image/head/冯卫东.jpg",
  // "./image/head/冯效林.jpg",
  // "./image/head/刘叙普.jpg",
  // "./image/head/刘大庆.jpg",
  // "./image/head/刘广来.jpg",
  // "./image/head/刘建山.jpg",
  // "./image/head/刘建武.jpg",
  // "./image/head/刘慧欣.jpg",
  // "./image/head/刘文雄.jpg",
  // "./image/head/刘智明.jpg",
  // "./image/head/刘杰.jpg",
  // "./image/head/刘永柏.jpg",
  // "./image/head/刘润庆.jpg",
  // "./image/head/刘男.jpg",
  // "./image/head/刘登宝.jpg",
  // "./image/head/刘稳.jpg",
  // "./image/head/刘粤龙.jpg",
  // "./image/head/刘纯烽.jpg",
  // "./image/head/刘自强.jpg",
  // "./image/head/刘贺伟.jpg",
  // "./image/head/刘越.jpg",
  // "./image/head/刘长华.jpg",
  // "./image/head/刘静宜.jpg",
  // "./image/head/包长命.jpg",
  // "./image/head/卓少丁.jpg",
  // "./image/head/单玉厚.jpg",
  // "./image/head/卢红辉.jpg",
  // "./image/head/厉恩伟.jpg",
  // "./image/head/叶秀丰.jpg",
  // "./image/head/司元羽.jpg",
  // "./image/head/司马义·依沙克.jpg",
  // "./image/head/向卫煌.jpg",
  // "./image/head/向洪学.jpg",
  // "./image/head/吕明东.jpg",
  // "./image/head/吴光现.jpg",
  // "./image/head/吴志成.jpg",
  // "./image/head/吴忠泽.jpg",
  // "./image/head/吴晋华.jpg",
  // "./image/head/吴涌.jpg",
  // "./image/head/吴立省.jpg",
  // "./image/head/周伦夏.jpg",
  // "./image/head/周友芳.jpg",
  // "./image/head/周新疆.jpg",
  // "./image/head/周明广.jpg",
  // "./image/head/周松峰.jpg",
  // "./image/head/周永军.jpg",
  // "./image/head/周荒年.jpg",
  // "./image/head/周银彬.jpg",
  // "./image/head/唐凡.jpg",
  // "./image/head/夏加.jpg",
  // "./image/head/夏思思.jpg",
  // "./image/head/姚刚林.jpg",
  // "./image/head/姚发君.jpg",
  // "./image/head/姚建华.jpg",
  // "./image/head/姚本云.jpg",
  // "./image/head/姚留记.jpg",
  // "./image/head/姜国章.jpg",
  // "./image/head/姜娜.jpg",
  // "./image/head/姜继军.jpg",
  // "./image/head/姬源.jpg",
  // "./image/head/孙士贞.jpg",
  // "./image/head/孙战贝.jpg",
  // "./image/head/孙景云.jpg",
  // "./image/head/孙术祥.jpg",
  // "./image/head/孙训祥.jpg",
  // "./image/head/孟凡涛.jpg",
  // "./image/head/孟宪升.jpg",
  // "./image/head/孟宪龙.jpg",
  // "./image/head/孟庆波.jpg",
  // "./image/head/孟钊.jpg",
  // "./image/head/宋云花.jpg",
  // "./image/head/宋井前.jpg",
  // "./image/head/宋亚洲.jpg",
  // "./image/head/宋英杰.jpg",
  // "./image/head/宋青山.jpg",
  // "./image/head/宫高明.jpg",
  // "./image/head/尹祖川.jpg",
  // "./image/head/岳金栋.jpg",
  // "./image/head/崔嵬.jpg",
  // "./image/head/崔建军.jpg",
  // "./image/head/崔志刚.jpg",
  // "./image/head/崔靖.jpg",
  // "./image/head/左汉文.jpg",
  // "./image/head/左腊珍.jpg",
  // "./image/head/巴格努尔·哈那里汗.jpg",
  // "./image/head/平措次仁.jpg",
  // "./image/head/庞承林.jpg",
  // "./image/head/廉光民.jpg",
  // "./image/head/廖庆绪.jpg",
  // "./image/head/廖梁勇.jpg",
  // "./image/head/张世林.jpg",
  // "./image/head/张军浩.jpg",
  // "./image/head/张凯.jpg",
  // "./image/head/张勇.jpg",
  // "./image/head/张小华.jpg",
  // "./image/head/张庆华.jpg",
  // "./image/head/张建华.jpg",
  // "./image/head/张建宾.jpg",
  // "./image/head/张志民.jpg",
  // "./image/head/张成银.jpg",
  // "./image/head/张承源.jpg",
  // "./image/head/张新忠.jpg",
  // "./image/head/张明.jpg",
  // "./image/head/张正光.jpg",
  // "./image/head/张泽普.jpg",
  // "./image/head/张洪江.jpg",
  // "./image/head/张珲.jpg",
  // "./image/head/张理南.jpg",
  // "./image/head/张瑞祥.jpg",
  // "./image/head/张稳利.jpg",
  // "./image/head/张绍云.jpg",
  // "./image/head/张诗铭.jpg",
  // "./image/head/张谦.jpg",
  // "./image/head/张辉.jpg",
  // "./image/head/张远富.jpg",
  // "./image/head/张静静.jpg",
  // "./image/head/彭俊卿.jpg",
  // "./image/head/彭午休.jpg",
  // "./image/head/彭银华.jpg",
  // "./image/head/徐世国.jpg",
  // "./image/head/徐小丽.jpg",
  // "./image/head/徐昊.jpg",
  // "./image/head/徐明银.jpg",
  // "./image/head/徐润平.jpg",
  // "./image/head/徐辉.jpg",
  // "./image/head/戴宏保.jpg",
  // "./image/head/戴胜伟.jpg",
  // "./image/head/敖勤礼.jpg",
  // "./image/head/施咏康.jpg",
  // "./image/head/时席席.jpg",
  // "./image/head/旺青尼玛.jpg",
  // "./image/head/曹永.jpg",
  // "./image/head/曹现臣.jpg",
  // "./image/head/曹祥木.jpg",
  // "./image/head/曹荣祥.jpg",
  // "./image/head/曾华林.jpg",
  // "./image/head/曾文聪.jpg",
  // "./image/head/曾海畴.jpg",
  // "./image/head/曾玉萍.jpg",
  // "./image/head/朱传利.jpg",
  // "./image/head/朱利君.jpg",
  // "./image/head/朱和平.jpg",
  // "./image/head/朱峥嵘.jpg",
  // "./image/head/朱建勋.jpg",
  // "./image/head/朱建波.jpg",
  // "./image/head/李东海.jpg",
  // "./image/head/李习文.jpg",
  // "./image/head/李光剑.jpg",
  // "./image/head/李光峰.jpg",
  // "./image/head/李剑.jpg",
  // "./image/head/李卫荣.jpg",
  // "./image/head/李增运.jpg",
  // "./image/head/李家举.jpg",
  // "./image/head/李建生.jpg",
  // "./image/head/李弦.jpg",
  // "./image/head/李德周.jpg",
  // "./image/head/李志刚.jpg",
  // "./image/head/李志柱.jpg",
  // "./image/head/李文亮.jpg",
  // "./image/head/李晓欢.jpg",
  // "./image/head/李景春.jpg",
  // "./image/head/李望厦.jpg",
  // "./image/head/李杭.jpg",
  // "./image/head/李正国.jpg",
  // "./image/head/李泽富.jpg",
  // "./image/head/李洪明.jpg",
  // "./image/head/李淼.jpg",
  // "./image/head/李皓.jpg",
  // "./image/head/李益仲.jpg",
  // "./image/head/李磊.jpg",
  // "./image/head/李耀军.jpg",
  // "./image/head/李耀洪.jpg",
  // "./image/head/李谦.jpg",
  // "./image/head/李跃龙.jpg",
  // "./image/head/李镔.jpg",
  // "./image/head/杜显圣.jpg",
  // "./image/head/杜红.jpg",
  // "./image/head/杨俊志.jpg",
  // "./image/head/杨双宝.jpg",
  // "./image/head/杨君.jpg",
  // "./image/head/杨增山.jpg",
  // "./image/head/杨大成.jpg",
  // "./image/head/杨志铭.jpg",
  // "./image/head/杨忠特.jpg",
  // "./image/head/杨扎巴.jpg",
  // "./image/head/杨智.jpg",
  // "./image/head/杨正亮.jpg",
  // "./image/head/杨永东.jpg",
  // "./image/head/杨波.jpg",
  // "./image/head/杨灿辉.jpg",
  // "./image/head/杨荣.jpg",
  // "./image/head/林宏亮.jpg",
  // "./image/head/林木永.jpg",
  // "./image/head/林芳雯.jpg",
  // "./image/head/林逢春.jpg",
  // "./image/head/柳帆.jpg",
  // "./image/head/桑华生.jpg",
  // "./image/head/梁守春.jpg",
  // "./image/head/梁武东.jpg",
  // "./image/head/梅仲明.jpg",
  // "./image/head/樊保生.jpg",
  // "./image/head/樊婧.jpg",
  // "./image/head/樊树锋.jpg",
  // "./image/head/武国义.jpg",
  // "./image/head/段玉华.jpg",
  // "./image/head/段青山.jpg",
  // "./image/head/毕新军.jpg",
  // "./image/head/毛勇.jpg",
  // "./image/head/毛样洪.jpg",
  // "./image/head/江学庆.jpg",
  // "./image/head/江小娟.jpg",
  // "./image/head/江锦林.jpg",
  // "./image/head/汤国平.jpg",
  // "./image/head/汪勇.jpg",
  // "./image/head/洛绒益西.jpg",
  // "./image/head/浩斯巴雅尔.jpg",
  // "./image/head/温占超.jpg",
  // "./image/head/游爱华.jpg",
  // "./image/head/滕逸鹤.jpg",
  // "./image/head/潘继明.jpg",
  // "./image/head/焦传文.jpg",
  // "./image/head/熊成伟.jpg",
  // "./image/head/熊波.jpg",
  // "./image/head/王代权.jpg",
  // "./image/head/王兵.jpg",
  // "./image/head/王国庆.jpg",
  // "./image/head/王土成.jpg",
  // "./image/head/王天龙.jpg",
  // "./image/head/王子春.jpg",
  // "./image/head/王宗权.jpg",
  // "./image/head/王尔唐.jpg",
  // "./image/head/王建良.jpg",
  // "./image/head/王德恩.jpg",
  // "./image/head/王德楠.jpg",
  // "./image/head/王志伟.jpg",
  // "./image/head/王斌.jpg",
  // "./image/head/王明涛.jpg",
  // "./image/head/王春天.jpg",
  // "./image/head/王晓东.jpg",
  // "./image/head/王永田.jpg",
  // "./image/head/王炳强.jpg",
  // "./image/head/王烁.jpg",
  // "./image/head/王爱兰.jpg",
  // "./image/head/王玉柱.jpg",
  // "./image/head/王玉璟.jpg",
  // "./image/head/王瑞峰.jpg",
  // "./image/head/王登六.jpg",
  // "./image/head/王益民.jpg",
  // "./image/head/王福鹏.jpg",
  // "./image/head/王秀君.jpg",
  // "./image/head/王红继.jpg",
  // "./image/head/王胜凯.jpg",
  // "./image/head/王芳.jpg",
  // "./image/head/王调兵.jpg",
  // "./image/head/王辉.jpg",
  // "./image/head/田计强.jpg",
  // "./image/head/白力珠.jpg",
  // "./image/head/白小宏.jpg",
  // "./image/head/白心灵.jpg",
  // "./image/head/白胡亲.jpg",
  // "./image/head/秦红.jpg",
  // "./image/head/程建阳.jpg",
  // "./image/head/穆春华.jpg",
  // "./image/head/章良志.jpg",
  // "./image/head/童明昌.jpg",
  // "./image/head/罗付光.jpg",
  // "./image/head/罗启培.jpg",
  // "./image/head/罗定保.jpg",
  // "./image/head/罗布.jpg",
  // "./image/head/罗忠.jpg",
  // "./image/head/罗桂梅.jpg",
  // "./image/head/罗超.jpg",
  // "./image/head/罗轩.jpg",
  // "./image/head/肖俊.jpg",
  // "./image/head/胡凯立.jpg",
  // "./image/head/胡锋.jpg",
  // "./image/head/艾冬.jpg",
  // "./image/head/艾根立.jpg",
  // "./image/head/苏莱曼·巴马丁.jpg",
  // "./image/head/荣志珏.jpg",
  // "./image/head/莫合买提·艾坦木.jpg",
  // "./image/head/董天.jpg",
  // "./image/head/董李会.jpg",
  // "./image/head/董锐.jpg",
  // "./image/head/蒋碧伟.jpg",
  // "./image/head/蒋金波.jpg",
  // "./image/head/蔡绪强.jpg",
  // "./image/head/薛云.jpg",
  // "./image/head/薛国杰.jpg",
  // "./image/head/袁兆红.jpg",
  // "./image/head/袁剑雄.jpg",
  // "./image/head/袁国平.jpg",
  // "./image/head/袁洋洋.jpg",
  // "./image/head/裴小平.jpg",
  // "./image/head/覃军.jpg",
  // "./image/head/覃方.jpg",
  // "./image/head/覃碧.jpg",
  // "./image/head/覃自力.jpg",
  // "./image/head/许德甫.jpg",
  // "./image/head/许鹏.jpg",
  // "./image/head/谢帅业.jpg",
  // "./image/head/谢建华.jpg",
  // "./image/head/谢诗桥.jpg",
  // "./image/head/谭斌.jpg",
  // "./image/head/谭裕均.jpg",
  // "./image/head/谷林.jpg",
  // "./image/head/贺兵.jpg",
  // "./image/head/贾庆臣.jpg",
  // "./image/head/贾立军.jpg",
  // "./image/head/贾良飞.jpg",
  // "./image/head/赖小东.jpg",
  // "./image/head/赵举祥.jpg",
  // "./image/head/赵家才.jpg",
  // "./image/head/赵富恒.jpg",
  // "./image/head/赵建忠.jpg",
  // "./image/head/赵楠.jpg",
  // "./image/head/邢孔文.jpg",
  // "./image/head/邱飚.jpg",
  // "./image/head/邵维明.jpg",
  // "./image/head/郑世茂.jpg",
  // "./image/head/郑凯.jpg",
  // "./image/head/郑勇.jpg",
  // "./image/head/郑少华.jpg",
  // "./image/head/郝修臣.jpg",
  // "./image/head/郭冬生.jpg",
  // "./image/head/金华为.jpg",
  // "./image/head/金虎.jpg",
  // "./image/head/钟世华.jpg",
  // "./image/head/钟永忠.jpg",
  // "./image/head/钟进杏.jpg",
  // "./image/head/阿扎.jpg",
  // "./image/head/阿真能周.jpg",
  // "./image/head/陈健.jpg",
  // "./image/head/陈力群.jpg",
  // "./image/head/陈卫明.jpg",
  // "./image/head/陈国平.jpg",
  // "./image/head/陈在华.jpg",
  // "./image/head/陈建国.jpg",
  // "./image/head/陈文爵.jpg",
  // "./image/head/陈桂真.jpg",
  // "./image/head/陈桂荣.jpg",
  // "./image/head/陈永亮.jpg",
  // "./image/head/陈爱华.jpg",
  // "./image/head/陈申.jpg",
  // "./image/head/陈祥田.jpg",
  // "./image/head/陈继国.jpg",
  // "./image/head/陈荣侯.jpg",
  // "./image/head/陈见海.jpg",
  // "./image/head/陈锐筠.jpg",
  // "./image/head/陶飞.jpg",
  // "./image/head/雍瑞华.jpg",
  // "./image/head/雷木成.jpg",
  // "./image/head/霍文明.jpg",
  // "./image/head/韦忠宝.jpg",
  // "./image/head/韦炜.jpg",
  // "./image/head/韦长春.jpg",
  // "./image/head/韩钦.jpg",
  // "./image/head/顾尚义.jpg",
  // "./image/head/饶云星.jpg",
  // "./image/head/马俊新.jpg",
  // "./image/head/马承武.jpg",
  // "./image/head/马永.jpg",
  // "./image/head/高义泉.jpg",
  // "./image/head/高微军.jpg",
  // "./image/head/高文君.jpg",
  // "./image/head/魏安君.jpg",
  // "./image/head/魏悦粧.jpg",
  // "./image/head/魏晓辉.jpg",
  // "./image/head/魏沙沙.jpg",
  // "./image/head/鲁力.jpg",
  // "./image/head/黄伟楚.jpg",
  // "./image/head/黄和艳.jpg",
  // "./image/head/黄小周.jpg",
  // "./image/head/黄康忠.jpg",
  // "./image/head/黄文军.jpg",
  // "./image/head/黄智佳.jpg",
  // "./image/head/黄汉明.jpg",
  // "./image/head/黄清坤.jpg",
  // "./image/head/黄玉怀.jpg",
  // "./image/head/黄金生.jpg",
  // "./image/head/龙灿德.jpg",
  // "./image/head/龚喊伦.jpg",
];

// 加载背景
function setupLoadingBg() {
  let f = Promise.all([fetch("./GLSL/loading.vert").then((d) => d.text()), fetch("./GLSL/loading.frag").then((d) => d.text())]);
  f.then((d) => {
    const vertex_shader_source = d[0];
    const fragment_shader_source = d[1];

    let vertexShader = _compileShader(vertex_shader_source, gl.VERTEX_SHADER),
      fragmentShader = _compileShader(fragment_shader_source, gl.FRAGMENT_SHADER);

    let shaderProgram = _linkShaders(vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    // 获取变量位置
    let a_position = gl.getAttribLocation(shaderProgram, "a_position"),
      u_time = gl.getUniformLocation(shaderProgram, "u_time"),
      u_resolution = gl.getUniformLocation(shaderProgram, "u_resolution");

    // 设置变量值
    gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);

    // 设置缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    function setRect(x, y, w, h) {
      let x1 = x,
        y1 = y,
        x2 = x + w,
        y2 = y + h;
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x2, y2, x1, y1, x1, y2, x2, y2]), gl.STATIC_DRAW);
    }
    setRect(-1, -1, 2, 2);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // 设置顶点着色器
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    let timer = 0;
    function animate() {
      loading_animation = requestAnimationFrame(animate);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u_time, (timer += 0.017));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    animate();
  });
}

// 绘制圆角矩形
function _drawRoundedRect(ctx, x, y, width, height, r, fill, stroke) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r);
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
  ctx.arcTo(x, y + height, x, y + height - r, r);
  ctx.arcTo(x, y, x + r, y, r);
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();

  ctx.restore();
}

// 根据加载内容更新进度条
function _load(ctx) {
  let loading_percent = 0;
  let loading_sum = load_list.length,
    loaded_sum = 0;
  for (let p of load_list) {
    fetch(p).then((r) => {
      loaded_sum++;
      loading_percent = (loaded_sum / loading_sum) * 100;

      // 全部加载完成，自动进入标题界面
      if (loaded_sum == loading_sum) {
        setTimeout(() => {
          cancelAnimationFrame(loading_animation);
          $("#loading").fadeOut(0);
          startBGCanvas();
          current_pos = 1;
        }, 500);
      }

      ctx.clearRect(0, 0, 10000, 10000);
      _drawRoundedRect(ctx, window.innerWidth / 3, window.innerHeight / 2, window.innerWidth / 3, 8, 4, false, true);
      _drawRoundedRect(ctx, window.innerWidth / 3, window.innerHeight / 2, ((window.innerWidth / 3) * loading_percent) / 100, 8, 4, true, true);
      ctx.fillText(loading_percent.toFixed(0) + "%", (window.innerWidth / 3) * 2 + 20, window.innerHeight / 2 + 6);
    });
  }
}

// 进度条
function setupLoadingBar() {
  let loading_block = document.querySelector("#loading-control");
  let ctx = loading_block.getContext("2d");

  loading_block.setAttribute("width", window.innerWidth);
  loading_block.setAttribute("height", window.innerHeight);
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.font = "18px bold 黑体";
  ctx.textBaseline = "middle";
  _drawRoundedRect(ctx, window.innerWidth / 3, window.innerHeight / 2, window.innerWidth / 3, 8, 4, false, true);
  ctx.fillText("0%", (window.innerWidth / 3) * 2 + 20, window.innerHeight / 2 + 6);
  _load(ctx);
}

// 视频背景
function startBGCanvas() {
  let canvas_bg = document.querySelector("#canvas-bg"),
    ctx_bg = canvas_bg.getContext("2d");
  canvas_bg.setAttribute("width", window.innerWidth);
  canvas_bg.setAttribute("height", window.innerHeight);
  let video = document.querySelector("#title > video");

  document.querySelector("#title").addEventListener("wheel", function (e) {
    video.playbackRate += e.deltaY > 0 ? 0.2 : -0.2;
  });

  let offsetY = 0;
  (function animateBGCanvas() {
    bg_animation = requestAnimationFrame(animateBGCanvas);

    ctx_bg.drawImage(video, 0, offsetY, 1920, (window.innerWidth / 1920) * 1080 - offsetY, 0, 0, window.innerWidth, window.innerHeight - offsetY);
    ctx_bg.drawImage(video, 0, 0, 1920, offsetY, 0, (window.innerWidth / 1920) * 1080 - offsetY, window.innerWidth, offsetY);
    offsetY = (offsetY + 12) % 1080;
    let img_data = ctx_bg.getImageData(0, 0, window.innerWidth, window.innerHeight),
      img_data_length = img_data.data.length / 4;
    for (var i = 0; i < img_data_length; i++) {
      img_data.data[i * 4] *= 0.9;
      img_data.data[i * 4 + 1] *= 0.9;
      img_data.data[i * 4 + 2] *= 0.9;
    }
    ctx_bg.putImageData(img_data, 0, 0);
  })();
}

// 主函数
function titleStartup() {
  // 加载界面
  setupLoadingBg();
  setupLoadingBar();

  // 声音控制
  $("#audio-control").click(function () {
    if (bgm.paused) bgm.play();
    else bgm.pause();
  });

  // 侧边栏
  $("#info").click(function () {
    $(this).toggleClass("info-to-close");
    if ($(this).hasClass("info-to-close")) TweenMax.to($("#info-panel")[0], 0.5, { transform: "translateX(0)" });
    else TweenMax.to($("#info-panel")[0], 0.5, { transform: "translateX(-101%)" });
  });

  // 标题文本特效
  (function drawTitleText() {
    let img = new Image(),
      img_data,
      img_data_copy,
      img_data_len,
      ctx,
      canvas;
    img.src = "./image/svg/title-text.svg";
    img.onload = function () {
      canvas = document.querySelector("#title-canvas");
      ctx = canvas.getContext("2d");
      canvas.width = img.width * 3 + 40;
      canvas.height = img.height * 3;
      ctx.drawImage(img, 20, 0, img.width * 3, img.height * 3);
      img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      img_data_copy = ctx.getImageData(0, 0, canvas.width, canvas.height);
      img_data_len = img_data.data.length / 4;
      animate();
    };

    let timer = 0;
    function animate() {
      title_text_animation = requestAnimationFrame(animate);
      for (let h = 0; h < canvas.height; h++) {
        for (let i = canvas.width * h; i < canvas.width * (h + 1); i++) {
          let offset = Math.floor(Math.sin((h + timer) * 0.05) * Math.cos((h + timer) * 0.05) * 10);

          if (i + offset < canvas.width * h || i + offset >= canvas.width * (h + 1)) {
            img_data.data[i * 4 + 3] = 0;
          } else {
            img_data.data[i * 4] = img_data_copy.data[(i + offset) * 4];
            img_data.data[i * 4 + 1] = img_data_copy.data[(i + offset) * 4 + 1];
            img_data.data[i * 4 + 2] = img_data_copy.data[(i + offset) * 4 + 2];
            img_data.data[i * 4 + 3] = img_data_copy.data[(i + offset) * 4 + 3];
          }
        }
      }
      for (let h = 0; h < canvas.height; h += 10) {
        if (Math.random() > 0.98) {
          for (let i = canvas.width * h; i < canvas.width * (h + 15); i++) {
            img_data.data[i * 4] = img_data_copy.data[(i + 3) * 4];
            img_data.data[i * 4 + 1] = img_data_copy.data[(i + 3) * 4 + 1];
            img_data.data[i * 4 + 2] = img_data_copy.data[(i + 3) * 4 + 2];
            img_data.data[i * 4 + 3] = img_data_copy.data[(i + 3) * 4 + 3];
          }
        }
      }
      ctx.putImageData(img_data, 0, 0);
      timer++;
    }
  })();
}
titleStartup();

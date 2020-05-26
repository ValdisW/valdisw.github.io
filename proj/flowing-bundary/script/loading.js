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
  "./audio/气泡点击.wav",
  "./audio/bgm.mp3",
  "./image/svg/title-text.svg",
  "./image/svg/down-arrow.svg",
  "../../../images/texture/point_texture.png",
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

      // 全部加载完成，自动进入title界面
      if (loaded_sum == loading_sum) {
        setTimeout(() => {
          cancelAnimationFrame(loading_animation);
          $("#loading").fadeOut(0);
          startBGCanvas();
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

  let offsetY = 0;
  (function animateBGCanvas() {
    bg_animation = requestAnimationFrame(animateBGCanvas);

    ctx_bg.drawImage(video, 0, offsetY, window.innerWidth, window.innerHeight - offsetY, 0, 0, window.innerWidth, window.innerHeight - offsetY);
    ctx_bg.drawImage(video, 0, 0, window.innerWidth, offsetY, 0, window.innerHeight - offsetY, window.innerWidth, offsetY);
    offsetY = (offsetY + 12) % window.innerHeight;
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

  // 上一页
  // prev_button.click(function () {
  //   bgs.play();
  //   $("#title").fadeIn(1000);
  //   $("#cases").fadeOut(1000);
  //   TweenMax.to($("#prev-button")[0], 0.5, { opacity: 0 });
  //   TweenMax.to($("#next-button")[0], 0.5, { left: "50%", top: "83%", width: "50px", height: "50px" });
  // });

  // 下一页
  next_button.click(function () {
    bgs.play();
    cancelAnimationFrame(bg_animation);
    cancelAnimationFrame(title_text_animation);
    $("#title").fadeOut(1000);
    $("#cases").fadeIn(1000);
    casesStartup();
    // TweenMax.to($(this)[0], 0.5, { left: "95%", top: "50%", width: "35px", height: "35px" });
    // TweenMax.to($("#prev-button")[0], 0.5, { opacity: 1 });
    $(this).fadeOut(300);
  });

  // 侧边栏
  $("#info").click(function () {
    $(this).toggleClass("info-to-close");
    if ($(this).hasClass("info-to-close")) TweenMax.to($("#info-panel")[0], 0.5, { transform: "translateX(0)" });
    else TweenMax.to($("#info-panel")[0], 0.5, { transform: "translateX(-100%)" });
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

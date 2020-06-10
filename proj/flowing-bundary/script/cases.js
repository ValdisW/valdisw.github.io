let cases_animator;

function playBubble(audio_ctx) {
  let oscillator = audio_ctx.createOscillator();
  let gainNode = audio_ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audio_ctx.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = 126.0;

  // 先把当前音量设为0
  gainNode.gain.setValueAtTime(0, audio_ctx.currentTime);
  // 0.01秒时间内音量从刚刚的0变成1，线性变化
  gainNode.gain.linearRampToValueAtTime(10, audio_ctx.currentTime + 0.01);
  // 声音走起
  oscillator.start(audio_ctx.currentTime);
  // 1秒时间内音量从刚刚的1变成0.001，指数变化
  gainNode.gain.exponentialRampToValueAtTime(0.001, audio_ctx.currentTime + 1);
  // 1秒后停止声音
  oscillator.stop(audio_ctx.currentTime + 1);
}

function casesDestroy() {
  console.log(cases_animator);
  cancelAnimationFrame(cases_animator);
  $("#cases").fadeOut(1000);
}

function casesStartup() {
  let cases_data,
    xAxis,
    yAxis,
    zAxis,
    controls,
    timer,
    canvas,
    tween,
    pos,
    current_case,
    current_case_tween,
    scene,
    camera,
    renderer,
    composer,
    points_num,
    particles,
    mouseX,
    mouseY,
    windowHalfX,
    windowHalfY,
    audio_ctx;
  let points_geometry, position_buffer_attr, position2_buffer_attr;
  let arr1, arr2;
  xAxis = new THREE.Vector3(1, 0, 0);
  yAxis = new THREE.Vector3(0, 1, 0);
  zAxis = new THREE.Vector3(0, 0, 1);
  $("#cases").fadeIn(1000);
  audio_ctx = new AudioContext();

  // 时间轴
  (function initTimeline() {
    cases_data = {};
    fetch("./data/national_case_history.json")
      .then((res) => res.json())
      .then((data) => {
        // 确诊数字过渡
        current_case = { val: 0 };
        current_case_tween = new TWEEN.Tween(current_case)
          .easing(TWEEN.Easing.Quadratic.Out)
          .delay(0)
          .onUpdate(function () {
            d3.select("#cases>.num-label>p:nth-of-type(2)").text(parseInt(current_case.val));
          });

        let timeline_label = d3.select("#timeline-label");
        let cases_sum = 0;
        for (let d of data) {
          cases_sum += d.case;
          if (d.case != 0) {
            let case_arr = new Float32Array(d.case);
            cases_data[d.time] = case_arr;
          }
        }

        let margin_top = 0.14 * window.innerHeight,
          margin_bottom = 0.06 * window.innerHeight,
          margin_left = 0,
          spacing = (window.innerHeight - margin_top - margin_bottom) / data.length,
          selection_width = 100;
        d3.select("#cases-timeline")
          .selectAll("div")
          .data(data)
          .enter()
          .append("div")
          .classed("hover-detector", true)
          .style("position", "absolute")
          .style("left", margin_left + "px")
          .style("width", selection_width + "px")
          .style("height", spacing + "px")
          .style("transition", "0.2s")
          .style("top", (d, i) => i * spacing + margin_top + "px");

        d3.selectAll("div.hover-detector")
          .on("mouseenter", (d, i, s) => {
            // playBubble(audio_ctx);
            // bgs.src = "./audio/气泡点击.wav";
            // bgs.play();
            for (let j = 0; j < i; j++) d3.select(s[j]).style("transform", "translateY(-25px)");
            for (let j = i + 1; j < s.length; j++) d3.select(s[j]).style("transform", "translateY(25px)");
            d3.select(s[i]).select("div").style("background", "#fffc");
            d3.select(s[i])
              .style("height", spacing + 50 + "px")
              .style("transform", "translateY(-25px)");
            timeline_label.style("display", "block").style("left", d3.select(s[i]).style("left")).style("top", d3.select(s[i]).style("top"));
            d3.select("#timeline-label-date").text(`${d.time}`);
            d3.select("#timeline-label-cases").text(`${d.case} 例`);
          })
          .on("mouseleave", (d, i, s) => {
            for (let j = 0; j < i; j++) d3.select(s[j]).style("transform", "none");
            for (let j = i + 1; j < s.length; j++) d3.select(s[j]).style("transform", "none");
            d3.select(s[i]).select("div").style("background", "#FFF3");
            d3.select(s[i])
              .style("height", spacing + "px")
              .style("transform", "translateY(0)");
            timeline_label.style("display", "none");
          })
          .on("click", (d, i) => {
            // 粒子变化
            if (pos.val == 1) {
              position2_buffer_attr.set(getVirusScene(arr1, arr2, d.total_case));
              points_geometry.setAttribute("position2", position2_buffer_attr);
              particles.geometry.attributes.position2.needsUpdate = true;
              tween.start();
            } else if (pos.val == 0) {
              position_buffer_attr.set(getVirusScene(arr1, arr2, d.total_case));
              points_geometry.setAttribute("position", position_buffer_attr);
              particles.geometry.attributes.position.needsUpdate = true;
              tweenBack.start();
            }

            // 右下角数字变化
            current_case_tween.to({ val: d.total_case }, 800);
            current_case_tween.start();
          })
          .append("div")
          .style("background-color", "#FFF3")
          .style("transform", "translateY(-50%)")
          .style("border-radius", "50%")
          .style("margin", "0 auto")
          .style("position", "relative")
          .style("top", "50%")
          // .style("cursor", "pointer")
          .style("width", (d) => Math.sqrt(d.case / Math.PI) + "px")
          .style("height", (d) => Math.sqrt(d.case / Math.PI) + "px");
      });
  })();

  function virusSurface(z, phi) {
    let rxy = Math.sqrt(100 * 100 - z * z),
      x = rxy * Math.cos(phi),
      y = rxy * Math.sin(phi);
    let dv = new THREE.Vector3(x, y, z).normalize();
    let alpha = dv.angleTo(xAxis),
      beta = dv.angleTo(yAxis),
      gamma = dv.angleTo(zAxis);
    dv.multiplyScalar(7 * Math.pow(Math.cos(alpha * 5), 10));
    dv.multiplyScalar(7 * Math.pow(Math.cos(beta * 5), 10));
    dv.multiplyScalar(7 * Math.pow(Math.cos(gamma * 5), 10));

    return new THREE.Vector3(x + dv.x, y + dv.y, z + dv.z);
  }

  function generateStaticVirus(num, a_num) {
    let out_num = Math.floor(a_num * 0.4),
      sphere_num = a_num - out_num;
    let pos_arr = new Float32Array(num * 3);
    let scales = new Float32Array(num);

    // 触角
    for (let i = 0; i < out_num; ) {
      let z = 200 * Math.random() - 100,
        phi = Math.random() * Math.PI * 2;

      let v = virusSurface(z, phi);
      if (v.length() > 101) {
        pos_arr[i * 3] = v.x;
        pos_arr[i * 3 + 1] = v.y;
        pos_arr[i * 3 + 2] = v.z;
        i++;
      }
    }

    // 本体
    for (let i = 0; i < a_num; i++) {
      let z = 200 * Math.random() - 100,
        phi = Math.random() * Math.PI * 2;

      let v = virusSurface(z, phi);
      pos_arr[i * 3] = v.x;
      pos_arr[i * 3 + 1] = v.y;
      pos_arr[i * 3 + 2] = v.z;
    }

    // 游离
    for (let i = a_num; i < num; i++) {
      pos_arr[i * 3] = Math.random() * 4000 - 2000;
      pos_arr[i * 3 + 1] = Math.random() * 4000 - 2000;
      pos_arr[i * 3 + 2] = Math.random() * 4000 - 2000;
    }

    return pos_arr;
  }

  function getVirusScene(arr_d, arr_f, d_num) {
    console.log(d_num);
    let r = new Float32Array(arr_d.length);
    for (let i = 0; i < d_num * 3; i++) r[i] = arr_f[i];
    for (let i = d_num * 3; i < arr_d.length; i++) r[i] = arr_d[i];
    return r;
  }

  // 初始化三维场景
  (function casesInit() {
    let f = Promise.all([fetch("./GLSL/particles.vert").then((d) => d.text()), fetch("./GLSL/particles.frag").then((d) => d.text())]);
    f.then((d) => {
      timer = 0;
      canvas = document.querySelector("#cases-canvas");
      canvas.setAttribute("width", window.innerWidth);
      canvas.setAttribute("height", window.innerHeight);

      camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera.position.set(0, 0, 600);

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas });
      renderer.setPixelRatio(window.devicePixelRatio);

      points_num = 83332;
      // let positions = new Float32Array(points_num * 3);

      // 几何
      let particles_status = [];
      arr1 = generateStaticVirus(points_num, 0); // 规则态
      arr2 = generateStaticVirus(points_num, points_num); // 游离态

      let sizes = new Float32Array(points_num);
      for (let i = 0; i < points_num; i++) sizes[i] = 30;

      points_geometry = new THREE.BufferGeometry();

      position_buffer_attr = new THREE.BufferAttribute(arr1, 3);
      position2_buffer_attr = new THREE.BufferAttribute(arr2, 3);
      points_geometry.setAttribute("position", position_buffer_attr);
      points_geometry.setAttribute("position2", position2_buffer_attr);

      points_geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      // 材质
      let point_material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          texture: { value: new THREE.TextureLoader().load("http://game.gtimg.cn/images/tgideas/2017/three/shader/dot.png") },
          val: { value: 1.0 },
        },
        vertexShader: d[0],
        fragmentShader: d[1],
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });

      particles = new THREE.Points(points_geometry, point_material);
      scene.add(particles);

      pos = { val: 1 };
      tween = new TWEEN.Tween(pos).to({ val: 0 }, 3000).easing(TWEEN.Easing.Quadratic.Out).delay(0).onUpdate(callback);
      tweenBack = new TWEEN.Tween(pos).to({ val: 1 }, 2000).easing(TWEEN.Easing.Quadratic.Out).delay(0).onUpdate(callback);

      function callback() {
        particles.material.uniforms.val.value = this.val;
        console.log(pos);
      }

      $("#cases")[0].onmousemove = function () {
        let width_2 = window.innerWidth / 2,
          height_2 = window.innerHeight / 2;
        let mouseX = (event.clientX - width_2) / 100;
        let mouseY = (event.clientY - height_2) / 100;

        camera.position.x = 600 * Math.sin(mouseX / 30);
        camera.position.y = 600 * Math.sin(mouseY / 10);
        camera.position.z = 600 * Math.cos(Math.sqrt(mouseX * mouseX + mouseY * mouseY) / 30);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      };

      document.addEventListener("mousemove", function (e) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      });

      window.addEventListener("resize", function (e) {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
      });

      casesAnimate();
    });
  })();

  // 三维场景动画
  function casesAnimate() {
    cases_animator = requestAnimationFrame(casesAnimate);
    TWEEN.update();
    let positions = particles.geometry.attributes.position.array;
    // let scales = particles.geometry.attributes.scale.array;

    //
    for (let i = 0; i < points_num; i++) {
      // let z = 200 * Math.random() - 100,
      //   rxy = Math.sqrt(100 * 100 - z * z),
      //   phi = Math.random() * Math.PI * 2,
      //   x = rxy * Math.cos(phi),
      //   y = rxy * Math.sin(phi);

      // 位置矢量
      let dv = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]).normalize();
      let alpha = dv.angleTo(xAxis),
        beta = dv.angleTo(yAxis),
        gamma = dv.angleTo(zAxis);

      positions[i * 3] += (dv.x * Math.cos(timer / 15 + i)) / 5;
      positions[i * 3 + 1] += (dv.y * Math.cos(timer / 15 + i)) / 5;
      positions[i * 3 + 2] += (dv.z * Math.cos(timer / 15 + i)) / 5;

      // scales[i] += 1;
    }

    // let cam_position = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    // cam_position.applyMatrix4();
    // console.log(cam_position);
    // cam_position.applyAxisAngle(xAxis, mouseY / 150);
    // camera.position.y = cam_position.y;

    particles.geometry.attributes.position.needsUpdate = true;
    // particles.geometry.attributes.scale.needsUpdate = true;

    // composer.render();
    renderer.render(scene, camera);
    timer += 1;
  }
}

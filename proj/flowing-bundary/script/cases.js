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
    active_points,
    particles,
    mouseX,
    mouseY,
    windowHalfX,
    windowHalfY;
  xAxis = new THREE.Vector3(1, 0, 0);
  yAxis = new THREE.Vector3(0, 1, 0);
  zAxis = new THREE.Vector3(0, 0, 1);

  // 上一页
  prev_button.click(function () {
    bgs.play();
    $("#title").fadeIn(1000);
    $("#cases").fadeOut(1000);
    TweenMax.to($("#prev-button")[0], 0.5, { opacity: 0 });
    TweenMax.to($("#next-button")[0], 0.5, { left: "50%", top: "83%", width: "50px", height: "50px" });
  });

  // 下一页
  next_button.click(function () {
    bgs.play();
    $("#cases").fadeOut(1000);
    $("#sos").fadeIn(1000);
    TweenMax.to($(this)[0], 0.5, { left: "95%", top: "50%", width: "35px", height: "35px" });
    TweenMax.to($("#prev-button")[0], 0.5, { opacity: 1 });
  });

  // 时间轴
  (function initTimeline() {
    cases_data = {};
    fetch("./data/national_case_history.json")
      .then((res) => res.json())
      .then((data) => {
        // 确诊数字过渡
        current_case = { val: 83332 };
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

        let margin_top = 20,
          margin_left = 120,
          spacing = (window.innerHeight - margin_top * 2) / data.length,
          selection_width = 100;
        d3.select("#cases-timeline")
          .selectAll("div")
          .data(data)
          .enter()
          .append("div")
          .classed("hover-detector", true)
          .style("position", "absolute")
          .style("left", "30px")
          .style("width", selection_width + "px")
          .style("height", spacing + "px")
          .style("transition", "0.2s")
          .style("top", (d, i) => i * spacing + margin_top + "px");

        d3.selectAll("div.hover-detector")
          .on("mouseenter", (d, i, s) => {
            // bgs.src = "./audio/气泡点击.wav";
            // bgs.play();
            for (let j = 0; j < i; j++) d3.select(s[j]).style("transform", "translateY(-25px)");
            for (let j = i + 1; j < s.length; j++) d3.select(s[j]).style("transform", "translateY(25px)");
            d3.select(s[i]).select("div").style("background", "#fffc");
            d3.select(s[i])
              .style("height", spacing + 50 + "px")
              .style("transform", "translateY(-25px)");
            timeline_label.style("display", "block").style("left", d3.select(s[i]).style("left")).style("top", d3.select(s[i]).style("top")).text(`${d.time} ${d.case}例`);
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
            let sum = 0;
            for (let j = 0; j <= i; j++) sum += data[j].case;
            // $("#cases>.num-label>p:nth-of-type(2)").text(sum);
            current_case_tween.to({ val: sum }, 800);
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
    // for (let i = 0; i < out_num; ) {
    //   let z = 200 * Math.random() - 100,
    //     phi = Math.random() * Math.PI * 2;

    //   let v = virusSurface(z, phi);
    //   if (v.length() > 101) {
    //     pos_arr[i * 3] = v.x;
    //     pos_arr[i * 3 + 1] = v.y;
    //     pos_arr[i * 3 + 2] = v.z;
    //     i++;
    //   }
    // }

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
      active_points = 40000;
      // let positions = new Float32Array(points_num * 3);

      // 几何
      let arr1 = generateStaticVirus(points_num, points_num); // 规则态
      let arr2 = generateStaticVirus(points_num, 0); // 游离态

      let sizes = new Float32Array(points_num);
      for (let i = 0; i < points_num; i++) sizes[i] = 30;

      let points_geometry = new THREE.BufferGeometry();
      points_geometry.setAttribute("position", new THREE.BufferAttribute(arr1, 3));
      points_geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      points_geometry.setAttribute("position2", new THREE.BufferAttribute(arr2, 3));

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
      pos = { val: 1 };
      tween = new TWEEN.Tween(pos).to({ val: 0 }, 3000).easing(TWEEN.Easing.Quadratic.Out).delay(1200).onUpdate(callback);
      tweenBack = new TWEEN.Tween(pos).to({ val: 1 }, 2000).easing(TWEEN.Easing.Quadratic.Out).delay(1200).onUpdate(callback);
      tween.chain(tweenBack);
      tweenBack.chain(tween);
      tween.start();

      function callback() {
        particles.material.uniforms.val.value = this.val;
      }

      scene.add(particles);

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
    requestAnimationFrame(casesAnimate);
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

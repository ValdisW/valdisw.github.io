let rain_animator;

function rainDestroy() {
  cancelAnimationFrame(rain_animator);
  $("#rain").fadeOut(1000);
}

function rainStartup() {
  let rain_canvas;
  let scene, camera, renderer, label_renderer, light;
  let drops, group;
  let frame;
  let cylinder_geometry, ring_geometry;
  let timestamp_min, timestamp_max;
  let projection;
  let raycaster, mousePos, selectedObject, insertion;
  let label_div, label;
  let mouse_is_down;
  let theta;
  let water, moon;
  $("#rain").fadeIn(1000);

  class Drop {
    constructor(config) {
      this.data = null;
      this.status = "form";
      this.mesh = null;
      this.height = 100;
      this.coor = [];
      this.delay = Math.random() * 400;
      this.helper = null;
      this.canDrop = false;

      this.age = config.age;
      this.gender = config.gender;
    }

    play() {
      if (this.status == "form") {
        this.mesh.position.set(this.coor[0], this.coor[1], this.coor[2]);
        this.mesh.scale.x = 0;
        this.mesh.scale.y = 0;
        this.mesh.scale.z = 0;
        this.mesh.material.opacity = 1;
        this.status = "grow";
        return;
      }
      if (this.status == "grow") {
        this.mesh.scale.x += 0.01;
        this.mesh.scale.y += 0.01;
        this.mesh.scale.z += 0.01;
        if (this.mesh.scale.x >= 1) this.status = "fall";
        return;
      }
      if (this.status == "fall") {
        if (this.gender == "女") this.mesh.material.color = { r: 1, g: 0.976, b: 0.702 };
        // this.mesh.position.x += 0.5 * Math.sin((frame + this.delay) / 20);
        // this.mesh.position.z += 0.5 * Math.sin((frame + this.delay) / 20);
        // this.mesh.position.z += Math.random()*2-1;
        this.mesh.geometry = cylinder_geometry;
        this.mesh.scale.set(1, this.age / 30, 1);
        this.mesh.rotation.x = 0;
        this.mesh.position.y -= 1;
        if (this.mesh.position.y <= 0) this.status = "rip";
        return;
      }
      if (this.status == "rip") {
        this.mesh.material.color = { r: 1, g: 1, b: 1 };
        this.mesh.geometry = ring_geometry;
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.scale.x += 0.1;
        this.mesh.scale.y += 0.1;
        this.mesh.scale.z += 0.1;
        this.mesh.material.opacity -= 0.01;

        if (this.mesh.material.opacity <= 0) this.status = "wait";
      }
    }
  }

  function mouseDown() {
    // event.preventDefault();
    // mouse_is_down = true;
  }

  function mouseUp() {
    // event.preventDefault();
    // mouse_is_down = false;
  }

  function mouseMove(e) {
    // event.preventDefault();
    // mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // raycaster.setFromCamera(mousePos, camera);
    // intersection = raycaster.intersectObject(group, true);
    // if (selectedObject) selectedObject = null;
    // if (intersection.length > 0) {
    //   let res = intersection.filter(function (res) {
    //     return res && res.object;
    //   })[0];
    //   if (res && res.object) {
    //     selectedObject = res.object;
    //     let p = selectedObject.parent.position;
    //     label.position.x = p.x + 25;
    //     label.position.z = p.z;
    //     label_div.style.opacity = 0.9;
    //     // document.body.style.cursor = "pointer";
    //     label_div.textContent = selectedObject.parent.class.data["省份"];
    //   }
    // } else {
    //   label_div.style.opacity = 0;
    //   document.body.style.cursor = "default";
    // }
    // if (mouse_is_down) camera.rotationSpeed += -e.movementX / 10000;
  }

  function init(data) {
    theta = 0;

    timestamp_min = data[0]["时间戳"];
    timestamp_max = data[data.length - 1]["时间戳"];
    frame = 0;
    rain_canvas = document.querySelector("#rain-canvas");
    // rain_canvas.setAttribute("width", window.innerWidth);
    // rain_canvas.setAttribute("height", window.innerHeight);

    document.body.addEventListener("mousedown", mouseDown);
    document.body.addEventListener("mouseup", mouseUp);
    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("contextmenu", function () {
      event.preventDefault();
    });
    document.body.addEventListener("wheel", function (e) {
      // let d = e.deltaY > 0 ? 1 : -1;
      // camera.speed += d * 0.5;
    });

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 20000);
    camera.height = 55;
    camera.distance = 300;
    camera.speed = 0;
    camera.rotationSpeed = 0;
    camera.position.set(0, camera.height, camera.distance);
    camera.direction = new THREE.Vector3(0, camera.height, 0).add(new THREE.Vector3().copy(camera.position).multiplyScalar(-1)).normalize();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: rain_canvas });
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // cylinder_geometry = new THREE.CylinderGeometry(0.03, 0.03, 4.5);
    cylinder_geometry = new THREE.ConeBufferGeometry(0.3, 4.5, 32);
    ring_geometry = new THREE.RingBufferGeometry(0.8, 0.801, 32);

    let fake_helper_geometry = new THREE.CircleBufferGeometry(0.8, 32);
    let fake_helper_material = new THREE.MeshBasicMaterial({ color: "#FFF", transparent: true, opacity: 0 });

    projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

    drops = [];
    group = new THREE.Group();
    for (let i in data) {
      let drop = new Drop({ age: parseInt(data[i]["年龄"]) || 35, gender: data[i]["性别"] });
      drop.data = data[i];
      let rain_material = new THREE.MeshBasicMaterial({ wireframe: true, color: "#FFF", transparent: true, opacity: 0, side: THREE.DoubleSide });
      drop.mesh = new THREE.Mesh(ring_geometry, rain_material);
      drop.mesh.class = drop;
      drop.mesh.add(new THREE.Mesh(fake_helper_geometry, fake_helper_material)); // 用于raycaster

      let coor = projection(data[i]["地理坐标"]);
      let coor_scale = 2.5;
      drop.coor = [coor[0] * coor_scale, 100, coor[1] * coor_scale];

      drop.mesh.position.set(coor[0], 100, coor[1]);
      drop.mesh.rotation.x = -Math.PI / 2;

      drops.push(drop);
      group.add(drop.mesh);
    }
    scene.add(group);

    raycaster = new THREE.Raycaster();
    mousePos = new THREE.Vector2();

    label_div = document.createElement("div");
    label_div.className = "label";
    // label_div.style.backgroundColor = "#CA2846";
    // label_div.style.borderRadius = "2px";
    // label_div.style.width = "100px";
    // label_div.style.height = "30px";
    label_div.style.fontSize = "12px";
    label_div.style.color = "#FFF";
    label_div.style.textAlign = "center";
    label_div.style.lineHeight = label_div.style.height;
    label_div.style.opacity = 0;
    label_div.textContent = "test";

    label = new THREE.CSS2DObject(label_div);
    scene.add(label);

    label_renderer = new THREE.CSS2DRenderer();
    label_renderer.setSize(window.innerWidth, window.innerHeight);
    label_renderer.domElement.style.position = "absolute";
    label_renderer.domElement.style.zIndex = 1;
    label_renderer.domElement.style.top = 0;
    // document.body.appendChild(label_renderer.domElement);

    // ============ water effect ==============
    light = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(light);

    // Water
    var waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000);

    water = new THREE.Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load("./image/waternormals.jpg", function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: light.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x000000,
      distortionScale: 3.7,
    });
    water.material.uniforms.size.value = 0.1;
    console.log(water.material.uniforms.size);

    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Skybox
    var sky = new THREE.Sky();

    var uniforms = sky.material.uniforms;

    uniforms["turbidity"].value = 10;
    uniforms["rayleigh"].value = 2;
    uniforms["luminance"].value = 1;
    uniforms["mieCoefficient"].value = 0.005;
    uniforms["mieDirectionalG"].value = 0.8;

    var parameters = {
      distance: 400,
      inclination: 0.49,
      azimuth: 0.205,
    };

    var cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
    var cubeCamera = new THREE.CubeCamera(0.1, 1, cubeRenderTarget);

    scene.background = cubeRenderTarget;

    function updateSun() {
      var theta = Math.PI * (parameters.inclination - 0.5);
      var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

      light.position.x = parameters.distance * Math.cos(phi);
      light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
      light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

      sky.material.uniforms["sunPosition"].value = light.position.copy(light.position);
      water.material.uniforms["sunDirection"].value.copy(light.position).normalize();

      cubeCamera.update(renderer, sky);
    }

    updateSun();

    let geometry = new THREE.IcosahedronBufferGeometry(40, 5);
    let count = geometry.attributes.position.count;

    let colors = [];
    let color = new THREE.Color();

    for (let i = 0; i < count; i += 3) {
      color.setHex(Math.random() * 0xffffff);

      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    moon = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "#fff" }));
    moon.position.set(0, 90, -1000);
    scene.add(moon);

    // 加载二级界面
    rainSubScene();

    // 呼出二级界面
    rain_canvas.onmousewheel = function () {
      showRainSubScene();
    };
  }

  function animate(data) {
    rain_animator = requestAnimationFrame(animate);

    for (let d of drops) if (frame > (d.data["时间戳"] - timestamp_min) / 3e6) d.play();

    // 相机前后运动
    camera.position.add(new THREE.Vector3().copy(camera.direction).multiplyScalar(-camera.speed));
    let friction = 0.05;
    if (camera.speed > 0) camera.speed -= friction;
    if (camera.speed < 0) camera.speed += friction;
    if (Math.abs(camera.speed) <= friction) camera.speed = 0;
    camera.distance = camera.position.distanceTo(new THREE.Vector3(0, 55, 0));

    // 相机旋转
    let friction_rotate = 0.003;
    if (camera.rotationSpeed > 0) camera.rotationSpeed -= friction_rotate;
    if (camera.rotationSpeed < 0) camera.rotationSpeed += friction_rotate;
    if (Math.abs(camera.rotationSpeed) <= friction_rotate) camera.rotationSpeed = 0;

    theta += camera.rotationSpeed;
    camera.position.x = camera.distance * Math.sin(theta);
    camera.position.z = camera.distance * Math.cos(theta);
    camera.lookAt(new THREE.Vector3(0, camera.height, 0));
    camera.direction = new THREE.Vector3(0, camera.height, 0).add(new THREE.Vector3().copy(camera.position).multiplyScalar(-1)).normalize();

    var time = performance.now() * 0.001;
    water.material.uniforms["time"].value += 1.0 / 60.0;

    renderer.render(scene, camera);
    label_renderer.render(scene, camera);
    frame++;
  }

  function startup() {
    fetch("./data/sacrifice_total.json")
      .then((res) => res.json())
      .then((data) => {
        init(data);
        animate(data);
      });
  }

  startup();
}

function showRainSubScene() {
  hideGlobalUI();
  $("#rain-subscene").fadeIn(800);
}

function rainSubScene() {
  $("#rain-back-button").click(function () {
    showGlobalUI();
    $("#rain-subscene").fadeOut(800);
  });

  const rain_selector_line = d3.select("#rain-selector-line");
  const rain_selector_head = d3.select("#rain-selector-head");
  const rain_selector_name = d3.select("#rain-selector-name");
  const rain_selector_time_label = d3.select("#rain-selector-time-label");
  const sacrifice_value_gender = $("#sacrifice-value-gender");
  const sacrifice_value_age = $("#sacrifice-value-age");
  const sacrifice_value_occupation = $("#sacrifice-value-occupation");
  const sacrifice_value_location = $("#sacrifice-value-location");
  const sacrifice_value_cause = $("#sacrifice-value-cause");
  const sacrifice_value_time = $("#sacrifice-value-time");

  fetch("./data/sacrifice_total.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let gender_color_map = {
        男: "#aaa",
        女: "#FFF5BB",
      };
      // 按时间分类
      let data_cbt = [];
      for (let d of data) {
        if (!d["时间戳"]) d["时间戳"] = 123;

        if (!data_cbt.find((e) => e.time == d["时间戳"])) {
          data_cbt.push({
            time: d["时间戳"],
            data: [d],
          });
        } else {
          data_cbt[data_cbt.length - 1].data.push(d);
        }
      }
      data_cbt.sort((a, b) => a.time - b.time);

      let data_cooked = [];
      for (let e of data_cbt) {
        for (let i in e.data) e.data[i].rank = i;
        data_cooked = data_cooked.concat(e.data);
      }

      let ss = data[0]["时间戳"],
        ss_end = data[data.length - 1]["时间戳"];
      let rain_container = d3
        .select("#rain-container")
        .style("width", window.innerWidth + "px")
        .style("height", window.innerHeight + "px");
      let ch = 0;
      rain_container
        .selectAll("div")
        .data(data_cooked)
        .enter()
        .append("div")
        .attr("inner-color", (e) => gender_color_map[e["性别"]])
        .classed("drop", true)
        .style("width", "10px")
        .style("height", (d) => parseInt(d["年龄"]) * 0.5 + "px")
        .style("position", "absolute")
        .style("left", (d) => dataMap(d["时间戳"], ss, ss_end, 100, window.innerWidth - 100) + "px")
        .style("top", (d, i, e) => {
          let top = window.innerHeight / 2;
          if (d.rank % 2 == 1) for (let j = 1; j <= d.rank; j += 2) top += parseInt(data_cooked[i - j]["年龄"]) * 0.7;
          else for (let j = 0; j < d.rank - 1; j += 2) top -= parseInt(data_cooked[i - j]["年龄"]) * 0.7;
          return top + "px";
        })
        .on("click", function (e, i, a) {
          d3.selectAll(".drop-top").style("border-bottom-color", (e, i, a) => a[i].parentNode.getAttribute("inner-color"));
          d3.selectAll(".drop-bottom").style("background-color", (e, i, a) => a[i].parentNode.getAttribute("inner-color"));
          d3.select(this).select(".drop-top").style("border-bottom-color", "#fff");
          d3.select(this).select(".drop-bottom").style("background-color", "#fff");
          rain_selector_line.style("left", parseInt(d3.select(this).style("left")) + 3.5 + "px");
          rain_selector_head
            .style("left", parseInt(d3.select(this).style("left")) - 26 + "px")
            .style("top", parseInt(d3.select(this).style("top")) - 80 + "px")
            .style("background-image", `url(./image/head/${e["姓名"]}.jpg)`);
          rain_selector_name
            .text(e["姓名"])
            .style("left", parseInt(d3.select(this).style("left")) + 3.5 + "px")
            .style("top", parseInt(d3.select(this).style("top")) - 15 + "px");
          rain_selector_time_label.text(e["时间"]).style("left", parseInt(d3.select(this).style("left")) + 3.5 + "px");
          sacrifice_value_gender.fadeOut(300);
          sacrifice_value_age.fadeOut(300);
          sacrifice_value_occupation.fadeOut(300);
          sacrifice_value_location.fadeOut(300);
          sacrifice_value_cause.fadeOut(300);
          sacrifice_value_time.fadeOut(300);

          setTimeout(() => {
            sacrifice_value_gender.text(e["性别"]);
            sacrifice_value_age.text(e["年龄"]);
            sacrifice_value_occupation.text(e["职业"]);
            sacrifice_value_location.text(e["所在地"]);
            sacrifice_value_cause.text(e["殉职原因"]);
            sacrifice_value_time.text(e["时间"]);

            sacrifice_value_gender.fadeIn(300);
            sacrifice_value_age.fadeIn(300);
            sacrifice_value_occupation.fadeIn(300);
            sacrifice_value_location.fadeIn(300);
            sacrifice_value_cause.fadeIn(300);
            sacrifice_value_time.fadeIn(300);
          }, 300);
        });

      rain_container
        .selectAll(".drop")
        .append("div")
        .classed("drop-top", true)
        .style("height", 0)
        .style("width", 0)
        .style("border-top", "0px")
        .style("border-bottom", (d, i, e) => {
          return d3.select(e[i].parentNode).style("height");
        })
        .style("border-left", "3px")
        .style("border-right", "3px")
        .style("border-style", "solid")
        .style("border-top-color", "transparent")
        .style("border-bottom-color", (e, i, a) => a[i].parentNode.getAttribute("inner-color"))
        .style("border-left-color", "transparent")
        .style("border-right-color", "transparent");

      rain_container
        .selectAll(".drop")
        .append("div")
        .classed("drop-bottom", true)
        .style("height", "6px")
        .style("width", "6px")
        .style("background-color", (e, i, a) => a[i].parentNode.getAttribute("inner-color"))
        .style("border-radius", "50%")
        .style("margin-top", "-3px");
    });
}

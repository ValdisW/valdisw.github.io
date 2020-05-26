let rain_animator;

function rainDestroy() {
  cancelAnimationFrame(rain_animator);
  $("#rain").fadeOut(1000);
}

function rainStartup() {
  let main_canvas;
  let scene, camera, renderer, label_renderer;
  let drops, group;
  let frame;
  let cylinder_geometry, ring_geometry;
  let timestamp_min, timestamp_max;
  let projection;
  let raycaster, mousePos, selectedObject, insertion;
  let label_div, label;
  let mouse_is_down;
  let theta;
  $("#rain").fadeIn(1000);

  class Drop {
    constructor() {
      this.data = null;
      this.status = "form";
      this.mesh = null;
      this.height = 100;
      this.coor = [];
      this.delay = Math.random() * 400;
      this.helper = null;
      this.canDrop = false;
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
        // this.mesh.position.x += 0.5 * Math.sin((frame + this.delay) / 20);
        // this.mesh.position.z += 0.5 * Math.sin((frame + this.delay) / 20);
        // this.mesh.position.z += Math.random()*2-1;
        this.mesh.geometry = cylinder_geometry;
        this.mesh.rotation.x = 0;
        this.mesh.position.y -= 1;
        if (this.mesh.position.y <= 0) this.status = "rip";
        return;
      }
      if (this.status == "rip") {
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
    event.preventDefault();
    mouse_is_down = true;
  }
  function mouseUp() {
    event.preventDefault();
    mouse_is_down = false;
  }

  function mouseMove(e) {
    event.preventDefault();
    mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mousePos, camera);
    intersection = raycaster.intersectObject(group, true);

    if (selectedObject) selectedObject = null;
    if (intersection.length > 0) {
      let res = intersection.filter(function (res) {
        return res && res.object;
      })[0];

      if (res && res.object) {
        selectedObject = res.object;
        let p = selectedObject.parent.position;
        label.position.x = p.x + 25;
        label.position.z = p.z;
        label_div.style.opacity = 0.9;
        // document.body.style.cursor = "pointer";
        label_div.textContent = selectedObject.parent.class.data["省份"];
      }
    } else {
      label_div.style.opacity = 0;
      document.body.style.cursor = "default";
    }

    if (mouse_is_down) camera.rotationSpeed += -e.movementX / 10000;
  }

  function init(data) {
    console.log(data);
    theta = 0;

    timestamp_min = data[0]["时间戳"];
    timestamp_max = data[data.length - 1]["时间戳"];
    frame = 0;
    main_canvas = document.querySelector("#rain-canvas");
    main_canvas.setAttribute("width", window.innerWidth);
    main_canvas.setAttribute("height", window.innerHeight);

    document.body.addEventListener("mousedown", mouseDown);
    document.body.addEventListener("mouseup", mouseUp);
    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("contextmenu", function () {
      event.preventDefault();
    });
    document.body.addEventListener("wheel", function (e) {
      let d = e.deltaY > 0 ? 1 : -1;
      camera.speed += d * 0.5;
    });

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#322c37");
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.height = 55;
    camera.distance = 250;
    camera.speed = 0;
    camera.rotationSpeed = 0;
    camera.position.set(0, camera.height, camera.distance);
    camera.direction = new THREE.Vector3(0, camera.height, 0).add(new THREE.Vector3().copy(camera.position).multiplyScalar(-1)).normalize();
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: main_canvas });

    // cylinder_geometry = new THREE.CylinderGeometry(0.03, 0.03, 4.5);
    cylinder_geometry = new THREE.ConeGeometry(0.3, 4.5, 32);
    ring_geometry = new THREE.RingGeometry(0.8, 0.801, 32);

    let fake_helper_geometry = new THREE.CircleGeometry(0.8, 32);
    let fake_helper_material = new THREE.MeshBasicMaterial({ color: "#FFF", transparent: true, opacity: 0 });

    projection = d3.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);

    drops = [];
    group = new THREE.Group();
    for (let i in data) {
      let drop = new Drop();
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

    // scene.add(new THREE.AxesHelper(10, 10, 10));
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

    renderer.render(scene, camera);
    label_renderer.render(scene, camera);
    frame++;
  }

  function startup() {
    fetch("../../../../data/sacrifice_total.json")
      .then((res) => res.json())
      .then((data) => {
        init(data);
        animate(data);
      });
  }

  startup();
}

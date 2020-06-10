let help_animator;

function helpDestroy() {
  $("#sos").fadeOut(1000);
  cancelAnimationFrame(help_animator);
}

function helpStartup() {
  $("#sos").fadeIn(1000);

  Promise.all([
    fetch("./GLSL/bird_velocity.frag").then((d) => d.text()),
    fetch("./GLSL/bird_position.frag").then((d) => d.text()),
    fetch("./GLSL/bird.vert").then((d) => d.text()),
    fetch("./GLSL/bird.frag").then((d) => d.text()),
  ]).then((d) => {
    /* TEXTURE WIDTH FOR SIMULATION */
    const WIDTH = 32;

    const BIRDS = WIDTH * WIDTH;

    // Custom Geometry - using 3 triangles each. No UVs, no normals currently.
    function BirdGeometry() {
      let triangles = BIRDS * 3; // 每只鸟由三个三角形面片组成
      let points = triangles * 3;

      THREE.BufferGeometry.call(this);

      let vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
      let birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
      let references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
      let birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);

      this.setAttribute("position", vertices);
      this.setAttribute("birdColor", birdColors);
      this.setAttribute("reference", references);
      this.setAttribute("birdVertex", birdVertex);

      // this.setAttribute( 'normal', new Float32Array( points * 3 ), 3 );

      var v = 0;

      function verts_push() {
        for (var i = 0; i < arguments.length; i++) {
          vertices.array[v++] = arguments[i];
        }
      }

      let wingsSpan = 20;

      for (var f = 0; f < BIRDS; f++) {
        verts_push(0, -0, -20, 0, 4, -20, 0, 0, 30); // Body
        verts_push(0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15); // Left Wing
        verts_push(0, 0, 15, wingsSpan, 0, 0, 0, 0, -15); // Right Wing
      }

      for (var v = 0; v < triangles * 3; v++) {
        var i = ~~(v / 3);
        var x = (i % WIDTH) / WIDTH;
        var y = ~~(i / WIDTH) / WIDTH;

        var c = new THREE.Color(0x444444 + (~~(v / 9) / BIRDS) * 0xffffff);
        // var c = new THREE.Color("#fff");

        birdColors.array[v * 3 + 0] = c.r;
        birdColors.array[v * 3 + 1] = c.g;
        birdColors.array[v * 3 + 2] = c.b;

        references.array[v * 2] = x;
        references.array[v * 2 + 1] = y;

        birdVertex.array[v] = v % 9;
      }

      this.scale(0.2, 0.2, 0.2);
    }

    BirdGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);

    var stats;
    var camera, scene, renderer;
    var mouseX = 0,
      mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var BOUNDS = 800,
      BOUNDS_HALF = BOUNDS / 2;

    var last = performance.now();

    var gpuCompute;
    var velocityVariable;
    var positionVariable;
    var positionUniforms;
    var velocityUniforms;
    var birdUniforms;
    let bigwindow;

    init();
    animate();

    function init() {
      help_canvas = document.querySelector("#help-canvas");
      help_canvas.setAttribute("width", window.innerWidth);
      help_canvas.setAttribute("height", window.innerHeight);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.z = 350;

      scene = new THREE.Scene();
      scene.background = new THREE.Color("#000");
      // scene.fog = new THREE.Fog(0xffffff, 100, 1000);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: help_canvas });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      initComputeRenderer();

      // stats = new Stats();
      // container.appendChild(stats.dom);

      let fakewindow_texture = new THREE.TextureLoader().load("./image/temp-window.png");
      let window_geometry = new THREE.PlaneBufferGeometry(905, 1061);
      bigwindow = new THREE.Mesh(window_geometry, new THREE.MeshBasicMaterial({ color: "#0000", map: fakewindow_texture }));
      bigwindow.scale.x = 0.2;
      bigwindow.scale.y = 0.2;
      bigwindow.position.z = -300;
      scene.add(bigwindow);

      let raycaster = new THREE.Raycaster();

      document.addEventListener("mousemove", onDocumentMouseMove, false);
      document.addEventListener("touchstart", onDocumentTouchStart, false);
      document.addEventListener("touchmove", onDocumentTouchMove, false);
      document.addEventListener("click", function (e) {
        event.preventDefault();
        let mousePos = {};
        mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mousePos, camera);
        intersection = raycaster.intersectObject(bigwindow, true);

        if (intersection.length) {
          // cancelAnimationFrame(help_animator);
          showWindows();
        }
      });

      window.addEventListener("resize", onWindowResize, false);

      // let gui = new dat.GUI();

      let effectController = {
        separation: 20.0,
        alignment: 20.0,
        cohesion: 20.0,
        freedom: 0.75,
      };

      var valuesChanger = function () {
        velocityUniforms["separationDistance"].value = effectController.separation;
        velocityUniforms["alignmentDistance"].value = effectController.alignment;
        velocityUniforms["cohesionDistance"].value = effectController.cohesion;
        velocityUniforms["freedomFactor"].value = effectController.freedom;
      };

      valuesChanger();

      // gui.add(effectController, "separation", 0.0, 100.0, 1.0).onChange(valuesChanger);
      // gui.add(effectController, "alignment", 0.0, 100, 0.001).onChange(valuesChanger);
      // gui.add(effectController, "cohesion", 0.0, 100, 0.025).onChange(valuesChanger);
      // gui.close();

      initBirds();

      // 先加载好二级界面
      windowsSetup();
    }

    function initComputeRenderer() {
      gpuCompute = new THREE.GPUComputationRenderer(WIDTH, WIDTH, renderer);

      let dtPosition = gpuCompute.createTexture();
      let dtVelocity = gpuCompute.createTexture();
      fillPositionTexture(dtPosition);
      fillVelocityTexture(dtVelocity);

      velocityVariable = gpuCompute.addVariable("textureVelocity", d[0], dtVelocity);
      positionVariable = gpuCompute.addVariable("texturePosition", d[1], dtPosition);

      gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
      gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

      positionUniforms = positionVariable.material.uniforms;
      velocityUniforms = velocityVariable.material.uniforms;

      positionUniforms["time"] = { value: 0.0 };
      positionUniforms["delta"] = { value: 0.0 };
      velocityUniforms["time"] = { value: 1.0 };
      velocityUniforms["delta"] = { value: 0.0 };
      velocityUniforms["testing"] = { value: 1.0 };
      velocityUniforms["separationDistance"] = { value: 1.0 };
      velocityUniforms["alignmentDistance"] = { value: 1.0 };
      velocityUniforms["cohesionDistance"] = { value: 1.0 };
      velocityUniforms["freedomFactor"] = { value: 1.0 };
      velocityUniforms["predator"] = { value: new THREE.Vector3() };
      velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2);

      velocityVariable.wrapS = THREE.RepeatWrapping;
      velocityVariable.wrapT = THREE.RepeatWrapping;
      positionVariable.wrapS = THREE.RepeatWrapping;
      positionVariable.wrapT = THREE.RepeatWrapping;

      let error = gpuCompute.init();
      if (error !== null) {
        console.error(error);
      }
    }

    function initBirds() {
      var geometry = new BirdGeometry();

      // For Vertex and Fragment
      birdUniforms = {
        color: { value: new THREE.Color(0xff2200) },
        texturePosition: { value: null },
        textureVelocity: { value: null },
        time: { value: 1.0 },
        delta: { value: 0.0 },
      };

      // THREE.ShaderMaterial
      let material = new THREE.ShaderMaterial({
        uniforms: birdUniforms,
        vertexShader: d[2],
        fragmentShader: d[3],
        side: THREE.DoubleSide,
      });

      let birdMesh = new THREE.Mesh(geometry, material);
      birdMesh.rotation.y = Math.PI / 2;
      birdMesh.matrixAutoUpdate = false;
      birdMesh.updateMatrix();

      scene.add(birdMesh);
    }

    function fillPositionTexture(texture) {
      var theArray = texture.image.data;

      for (var k = 0, kl = theArray.length; k < kl; k += 4) {
        var x = Math.random() * BOUNDS - BOUNDS_HALF;
        var y = Math.random() * BOUNDS - BOUNDS_HALF;
        var z = Math.random() * BOUNDS - BOUNDS_HALF;

        theArray[k + 0] = x;
        theArray[k + 1] = y;
        theArray[k + 2] = z;
        theArray[k + 3] = 1;
      }
    }

    function fillVelocityTexture(texture) {
      var theArray = texture.image.data;

      for (var k = 0, kl = theArray.length; k < kl; k += 4) {
        var x = Math.random() - 0.5;
        var y = Math.random() - 0.5;
        var z = Math.random() - 0.5;

        theArray[k + 0] = x * 10;
        theArray[k + 1] = y * 10;
        theArray[k + 2] = z * 10;
        theArray[k + 3] = 1;
      }
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    }

    function onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    }

    function animate() {
      help_animator = requestAnimationFrame(animate);
      render();
    }

    function render() {
      var now = performance.now();
      var delta = (now - last) / 1000;

      if (delta > 1) delta = 1; // safety cap on large deltas
      last = now;

      positionUniforms["time"].value = now;
      positionUniforms["delta"].value = delta;
      velocityUniforms["time"].value = now;
      velocityUniforms["delta"].value = delta;
      birdUniforms["time"].value = now;
      birdUniforms["delta"].value = delta;

      velocityUniforms["predator"].value.set((0.5 * mouseX) / windowHalfX, (-0.5 * mouseY) / windowHalfY, 0);

      mouseX = 10000;
      mouseY = 10000;

      gpuCompute.compute();

      birdUniforms["texturePosition"].value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
      birdUniforms["textureVelocity"].value = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

      renderer.render(scene, camera);
    }
  });
}

function showWindows() {
  hideGlobalUI();
  $("#windows").fadeIn(800);
  $(".num-label").animate({ bottom: "-20vmin" }, 500);
}

function windowsSetup() {
  $("#help-back-button").click(function () {
    showGlobalUI();
    $("#windows").fadeOut(800);
    $(".num-label").animate({ bottom: "6vmin" }, 500);
  });
  const prop_color_map = ["#FFF9B3", "#FFF", "#A4F4FF"];
  Date.prototype.toString = function () {
    let M = this.getMonth() < 10 ? "0" + this.getMonth() : this.getMonth();
    let D = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    let h = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    let m = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    let s = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();

    return `${this.getFullYear()}-${M}-${D} ${h}:${m}:${s}`;
  };

  Promise.all([fetch("./data/kwds.json").then((res) => res.json()), fetch("./data/help.json").then((res) => res.json())]).then((d) => {
    // draw windows
    let window_height = (window.innerHeight * 0.7) / 17;
    let window_width = (window.innerWidth * 0.8) / 30;
    help_container = d3
      .select("#help-container")
      .style("position", "absolute")
      .style("top", "50%")
      .style("right", "8%")
      .style("transform", "translateY(-50%)")
      .style("width", window.innerWidth * 0.8 + "px")
      .style("height", window.innerHeight * 0.7 + "px");
    help_container
      .selectAll("div")
      .data(d[1])
      .enter()
      .append("div")
      .attr("id", (d) => d.mid)
      .attr("prop", (d) => d.prop)
      .classed("wb-window", true)
      .style("width", "1.5vmax")
      .style("height", "1.5vmax")
      .style("background", "transparent")
      .style("border", "0.2px solid #e5e4d050")
      .style("position", "absolute")
      .style("top", (d, i) => ~~(i / 30) * window_height + "px")
      .style("left", (d, i) => (i % 30) * window_width + "px")
      .on("click", (a) => {
        let date = new Date(a.date);
        $("#help-back-button").fadeOut(0);
        d3.select("#help-detail-info").style("display", "block");
        d3.select("#help-detail").style("display", "block").select("#help-detail-text").html(a.content);
        d3.select("#help-detail-info").html(
          `${date.toString()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@${a.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style="height:1vmax" src="./image/svg/icon-forward.svg"/>&nbsp;${
            a.forward
          }&nbsp;&nbsp;<img style="height:1vmax" src="./image/svg/icon-comment.svg"/>&nbsp;${a.comment}&nbsp;&nbsp;<img style="height:1vmax" src="./image/svg/icon-like.svg"/>&nbsp;${a.like}`
        );
      });
    d3.select("#help-detail-back-button").on("click", () => {
      $("#help-back-button").fadeIn(0);
      d3.select("#help-detail").style("display", "none");
      d3.select("#help-detail-info").style("display", "none");
    });

    // add keywords
    let spacing = (window.innerHeight * 0.7 - 26) / (d[0].length + 1);
    const kwds = d3
      .select("#kwds")
      .style("position", "absolute")
      .style("top", "50%")
      .style("transform", "translateY(-50%)")
      .style("height", window.innerHeight * 0.7 + "px")
      .style("width", window.innerWidth * 0.12 + "px");
    kwds
      .selectAll("div")
      .data(d[0])
      .enter()
      .append("div")
      .classed("kwd", true)
      .style("line-height", "26px")
      .style("height", "26px")
      .style("width", "100px")
      .style("position", "absolute")
      .style("text-align", "center")
      .style("color", "#FFF")
      .style("font-size", 26 + "px")
      .style("top", (d, i) => i * spacing + "px")
      .style("left", 20 + "px")
      .style("opacity", 0.2)
      .style("transition", "0.2s")
      .style("user-select", "none")
      .text((d) => d.keyword)
      .style("font-family", "方正粗黑宋简体")
      .style("font-weight", "lighter")
      .on("mouseenter", (d, i, s) => {
        for (let j = 0; j < i; j++) d3.select(s[j]).style("transform", "translateY(-25px)");
        for (let j = i + 1; j < s.length; j++) d3.select(s[j]).style("transform", "translateY(25px)");
        d3.select(s[i]).style("opacity", 1);
      })
      .on("mouseleave", (d, i, s) => {
        for (let j = 0; j < i; j++) d3.select(s[j]).style("transform", "none");
        for (let j = i + 1; j < s.length; j++) d3.select(s[j]).style("transform", "none");
        d3.select(s[i]).style("opacity", 0.2);
      })
      .on("click", (d, i, s) => {
        d3.select("#help-detail").style("display", "none");
        d3.select("#help-detail-info").style("display", "none");
        d3.selectAll(".wb-window").style("background-color", "transparent");
        for (let mid of d.mids) {
          document.getElementById(mid).style.background = prop_color_map[document.getElementById(mid).getAttribute("prop")];
        }
      });
  });
}

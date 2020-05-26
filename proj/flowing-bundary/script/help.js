let help_animator;

function helpDestroy() {
  $("#sos").fadeOut(1000);
  cancelAnimationFrame(help_animator);
}

function helpStartup() {
  $("#sos").fadeIn(1000);

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
      var triangles = BIRDS * 3; // 每只鸟由三个三角形面片组成
      var points = triangles * 3;

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

      var wingsSpan = 20;

      for (var f = 0; f < BIRDS; f++) {
        // Body
        verts_push(0, -0, -20, 0, 4, -20, 0, 0, 30);

        // Left Wing
        verts_push(0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15);

        // Right Wing
        verts_push(0, 0, 15, wingsSpan, 0, 0, 0, 0, -15);
      }

      for (var v = 0; v < triangles * 3; v++) {
        var i = ~~(v / 3);
        var x = (i % WIDTH) / WIDTH;
        var y = ~~(i / WIDTH) / WIDTH;

        var c = new THREE.Color(0x444444 + (~~(v / 9) / BIRDS) * 0x666666);
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
      scene.fog = new THREE.Fog(0xffffff, 100, 1000);

      renderer = new THREE.WebGLRenderer({ canvas: help_canvas });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      // container.appendChild(renderer.domElement);

      initComputeRenderer();

      // stats = new Stats();
      // container.appendChild(stats.dom);

      document.addEventListener("mousemove", onDocumentMouseMove, false);
      document.addEventListener("touchstart", onDocumentTouchStart, false);
      document.addEventListener("touchmove", onDocumentTouchMove, false);

      window.addEventListener("resize", onWindowResize, false);

      // var gui = new dat.GUI();

      var effectController = {
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
    }

    function initComputeRenderer() {
      gpuCompute = new THREE.GPUComputationRenderer(WIDTH, WIDTH, renderer);

      var dtPosition = gpuCompute.createTexture();
      var dtVelocity = gpuCompute.createTexture();
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

      var error = gpuCompute.init();
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
      var material = new THREE.ShaderMaterial({
        uniforms: birdUniforms,
        vertexShader: d[2],
        fragmentShader: d[3],
        side: THREE.DoubleSide,
      });

      var birdMesh = new THREE.Mesh(geometry, material);
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
      // stats.update();
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

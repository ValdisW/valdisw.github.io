// 随机整数
function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

// 编译
function _compileShader(srcCode, type) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, srcCode);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

// 链接编译好的着色器
function _linkShaders(vShader, fShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

// 3×3矩阵
const mat3 = {
  translate: (tx, ty) => [1, 0, 0, 0, 1, 0, tx, ty, 0],
  rotate: angle => {
    let c = Math.cos(angle),
      s = Math.sin(angle);
    return [c, -s, 0, s, c, 0, 0, 0, 1];
  },
  scale: (sx, sy) => [sx, 0, 0, 0, sy, 0, 0, 0, 1],
  multiply: (m1, m2) => [
    m1[0] * m2[0] + m1[1] * m2[3] + m1[2] * m2[6],
    m1[0] * m2[1] + m1[1] * m2[4] + m1[2] * m2[7],
    m1[0] * m2[2] + m1[1] * m2[5] + m1[2] * m2[8],
    m1[3] * m2[0] + m1[4] * m2[3] + m1[5] * m2[6],
    m1[3] * m2[1] + m1[4] * m2[4] + m1[5] * m2[7],
    m1[3] * m2[2] + m1[4] * m2[5] + m1[5] * m2[8],
    m1[6] * m2[0] + m1[7] * m2[3] + m1[8] * m2[6],
    m1[6] * m2[1] + m1[7] * m2[4] + m1[8] * m2[7],
    m1[6] * m2[2] + m1[7] * m2[5] + m1[8] * m2[8]
  ]
};

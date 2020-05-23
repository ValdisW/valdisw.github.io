#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 color;
uniform sampler2D texture;
// varying vec3 vColor;
varying vec3 vPos;

void main(){
  vec3 vColor=vec3(1.,0.,0.);
  vColor.r=vPos.z/50.;
  vColor.g=vPos.y/50.;
  vColor.b=vPos.x/50.;
  //gl_FragColor = vec4( color * vColor, 1.0 );
  gl_FragColor=vec4(1.);
  gl_FragColor=gl_FragColor*texture2D(texture,gl_PointCoord);
}
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 st){
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  float time=ceil(u_time*20.);
  float rnd_r=random(st+sin(time));
  float rnd_g=random(st+cos(time));
  float rnd_b=random(st+sin(time));
  gl_FragColor=vec4(vec3(rnd_r,rnd_g,rnd_b)-.7,1.);
}

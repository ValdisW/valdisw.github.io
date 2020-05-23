attribute float size;
attribute vec3 position2;
// attribute vec3 color;
uniform float val;
// varying vec3 vColor;
varying vec3 vPos;

void main(){
  // vColor = color;
  vPos.x=position.x*val+position2.x*(1.-val);
  vPos.y=position.y*val+position2.y*(1.-val);
  vPos.z=position.z*val+position2.z*(1.-val);
  vec4 mvPosition=modelViewMatrix*vec4(vPos,1.);
  //gl_PointSize = size * ( 300.0 / -mvPosition.z );
  gl_PointSize=10.*(300./-mvPosition.z);
  gl_Position=projectionMatrix*mvPosition;
}
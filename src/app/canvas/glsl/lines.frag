uniform float opacity;

in vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, opacity);

}

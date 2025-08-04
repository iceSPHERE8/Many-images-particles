uniform float uTime;
uniform sampler2D uVideoTexture; 

varying vec2 vUv;

void main() {
    // vec2 newPointUv = vec2(gl_PointCoord.x, gl_PointCoord.y);
    vec3 color = texture2D(uVideoTexture, vUv).rgb;
    // gl_FragColor = vec4(color, 1.0);
    gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
}
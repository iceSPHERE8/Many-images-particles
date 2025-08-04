uniform sampler2D uVideoTexture; 

varying vec2 vUv;

void main() {
    vec3 videoTexture = texture2D(uVideoTexture, uv).rgb;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    gl_PointSize = 50.0 * smoothstep(0.0, 1.0, videoTexture.r);

    // Varyings
    vUv = uv;
}
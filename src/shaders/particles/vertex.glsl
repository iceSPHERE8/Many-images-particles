uniform sampler2D uVideoTexture; 
uniform float uMinSize;
uniform float uMaxSize;

varying vec2 vUv;

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (value - inMin) / (inMax - inMin) * (outMax - outMin);
}

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    /**
     * Remap the Minimal&Maximal Size
     */
    vec3 videoTexture = texture2D(uVideoTexture, uv).rgb;
    float tempFac = smoothstep(0.0, 1.0, videoTexture.r);
    float pointSizeFac = remap(tempFac, 0.0, 1.0, uMinSize, uMaxSize);
    
    gl_PointSize = 15.0 * pointSizeFac;
    // gl_PointSize = 15.0 * uMinSize;

    // Varyings
    vUv = uv;
}
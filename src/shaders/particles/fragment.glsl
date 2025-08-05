uniform float uTime;
uniform sampler2D uVideoTexture;
uniform sampler2D uElementTexture[8];

uniform float uInMin;
uniform float uInMax;
uniform float uOutMin;
uniform float uOutMax;

varying vec2 vUv;

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (value - inMin) / (inMax - inMin) * (outMax - outMin);
}

void main() {
    /**
     * Get Video Pixels Brightness
     */
    float brightness = texture2D(uVideoTexture, vUv).r * 0.2126 +
        texture2D(uVideoTexture, vUv).g * 0.7152 +
        texture2D(uVideoTexture, vUv).b * 0.0722;

    // brightness = normalize(brightness);
    brightness = remap(brightness, uInMin, uInMax, uOutMin, uOutMax);

    vec2 pointUv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);

    vec4 color_1 = texture2D(uElementTexture[0], pointUv).rgba;
    vec4 color_2 = texture2D(uElementTexture[1], pointUv).rgba;
    vec4 color_3 = texture2D(uElementTexture[2], pointUv).rgba;
    vec4 color_4 = texture2D(uElementTexture[3], pointUv).rgba;
    vec4 color_5 = texture2D(uElementTexture[4], pointUv).rgba;
    vec4 color_6 = texture2D(uElementTexture[5], pointUv).rgba;
    vec4 color_7 = texture2D(uElementTexture[6], pointUv).rgba;
    vec4 color_8 = texture2D(uElementTexture[7], pointUv).rgba;

    vec4 finalColor;

    if(brightness < 0.125) {
        finalColor = color_1;
    } else if(brightness < 0.25) {
        finalColor = color_2;
    } else if(brightness < 0.375) {
        finalColor = color_3;
    } else if(brightness < 0.5) {
        finalColor = color_4;
    } else if(brightness < 0.625) {
        finalColor = color_5;
    } else if(brightness < 0.75) {
        finalColor = color_6;
    } else if(brightness < 0.875) {
        finalColor = color_7;
    } else {
        finalColor = color_8;
    }

    // if(finalColor.r < 0.2) {
    //     discard;
    // }

    // finalColor *= texture2D(uVideoTexture, vUv).rgba;

    gl_FragColor = finalColor;
}
uniform float uTime;
uniform sampler2D uVideoTexture;
uniform sampler2D uElementTexture[14];

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
    brightness = smoothstep(0.0, 1.0, brightness);

    vec2 pointUv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);

    vec4 color_1 = texture2D(uElementTexture[0], pointUv).rgba;
    vec4 color_2 = texture2D(uElementTexture[1], pointUv).rgba;
    vec4 color_3 = texture2D(uElementTexture[2], pointUv).rgba;
    vec4 color_4 = texture2D(uElementTexture[3], pointUv).rgba;
    vec4 color_5 = texture2D(uElementTexture[4], pointUv).rgba;
    vec4 color_6 = texture2D(uElementTexture[5], pointUv).rgba;
    vec4 color_7 = texture2D(uElementTexture[6], pointUv).rgba;
    vec4 color_8 = texture2D(uElementTexture[7], pointUv).rgba;
    vec4 color_9 = texture2D(uElementTexture[8], pointUv).rgba;
    vec4 color_10 = texture2D(uElementTexture[9], pointUv).rgba;
    vec4 color_11 = texture2D(uElementTexture[10], pointUv).rgba;
    vec4 color_12 = texture2D(uElementTexture[11], pointUv).rgba;
    vec4 color_13 = texture2D(uElementTexture[12], pointUv).rgba;
    vec4 color_14 = texture2D(uElementTexture[13], pointUv).rgba;

    vec4 finalColor;

    if(brightness < 0.0714) {
        finalColor = color_1;
    } else if(brightness < 0.1428) { // 0.0714 * 2
        finalColor = color_2;
    } else if(brightness < 0.2142) { // 0.0714 * 3
        finalColor = color_3;
    } else if(brightness < 0.2856) { // 0.0714 * 4
        finalColor = color_4;
    } else if(brightness < 0.3570) { // 0.0714 * 5
        finalColor = color_5;
    } else if(brightness < 0.4284) { // 0.0714 * 6
        finalColor = color_6;
    } else if(brightness < 0.4998) { // 0.0714 * 7
        finalColor = color_7;
    } else if(brightness < 0.5712) { // 0.0714 * 8
        finalColor = color_8;
    } else if(brightness < 0.6426) { // 0.0714 * 9
        finalColor = color_9;
    } else if(brightness < 0.7140) { // 0.0714 * 10
        finalColor = color_10;
    } else if(brightness < 0.7854) { // 0.0714 * 11
        finalColor = color_11;
    } else if(brightness < 0.8568) { // 0.0714 * 12
        finalColor = color_12;
    } else if(brightness < 0.9282) { // 0.0714 * 13
        finalColor = color_13;
    } else {
        finalColor = color_14; // Brightness from 0.9282 to 1.0
    }

    // if(finalColor.r < 0.2) {
    //     discard;
    // }

    // finalColor *= texture2D(uVideoTexture, vUv).rgba;

    gl_FragColor = finalColor;
}
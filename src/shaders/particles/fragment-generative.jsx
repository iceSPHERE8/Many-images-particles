function generateFragmentShader(textureCount) {
  return `
    uniform float uTime;
    uniform sampler2D uVideoTexture;
    uniform sampler2D uElementTexture[${textureCount}];
    uniform float uInMin;
    uniform float uInMax;
    uniform float uOutMin;
    uniform float uOutMax;
    varying vec2 vUv;

    float remap(float value, float inMin, float inMax, float outMin, float outMax) {
      return outMin + (value - inMin) / (inMax - inMin) * (outMax - outMin);
    }

    void main() {
      // 计算视频像素亮度
      float brightness = texture2D(uVideoTexture, vUv).r * 0.2126 +
                         texture2D(uVideoTexture, vUv).g * 0.7152 +
                         texture2D(uVideoTexture, vUv).b * 0.0722;

      brightness = remap(brightness, uInMin, uInMax, uOutMin, uOutMax);
      brightness = smoothstep(0.0, 1.0, brightness);

      vec2 pointUv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
      vec4 finalColor;

      // 动态亮度分段
      ${generateBrightnessConditions(textureCount)}

      gl_FragColor = finalColor;
    }
  `;
}

function generateBrightnessConditions(textureCount) {
  if (textureCount === 0) {
    return 'finalColor = vec4(0.0, 0.0, 0.0, 1.0);'; // 默认颜色
  }
  const step = 1.0 / textureCount;
  let conditions = '';
  for (let i = 0; i < textureCount; i++) {
    const threshold = (i * step).toFixed(4);
    const textureIndex = i;
    if (i === 0) {
      conditions += `if (brightness < ${step.toFixed(4)}) {
        finalColor = texture2D(uElementTexture[${textureIndex}], pointUv).rgba;
      }`;
    } else if (i === textureCount - 1) {
      conditions += ` else {
        finalColor = texture2D(uElementTexture[${textureIndex}], pointUv).rgba;
      }`;
    } else {
      conditions += ` else if (brightness < ${(i + 1) * step.toFixed(4)}) {
        finalColor = texture2D(uElementTexture[${textureIndex}], pointUv).rgba;
      }`;
    }
  }
  return conditions;
}

export default generateFragmentShader;
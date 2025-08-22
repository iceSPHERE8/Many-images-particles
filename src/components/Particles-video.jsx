import { useRef, useEffect, useState, useMemo } from "react";
import { shaderMaterial, useVideoTexture, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import vertexShader from "../shaders/particles/vertex.glsl";
import generateFragmentShader from "../shaders/particles/fragment-generative";

// =*=*=*=*=*=*=*=*=*=*=*=* 着色器材质定义 =*=*=*=*=*=*=*=*=*=*=*=*

/**
 * Create Shader Material
 * 定义粒子着色器材质，包含 uniforms、顶点着色器和初始片段着色器
 */
const ParticlesShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMinSize: 0,
    uMaxSize: 0,
    uInMin: 0,
    uInMax: 0,
    uOutMin: 0,
    uOutMax: 0,
    uBaseSize: 1,
    uVideoTexture: null,
    uElementTexture: [],
  },
  vertexShader,
  generateFragmentShader(0) // 初始为空纹理，避免硬编码 14
);

extend({ ParticlesShaderMaterial });

// =*=*=*=*=*=*=*=*=*=*=*=* 粒子组件 =*=*=*=*=*=*=*=*=*=*=*=*

function ParticlesVideo({ params, textureFile, elementsTexUrls }) {
  // ------------------- 状态与引用 -------------------
  const [textureSize, setTextureSize] = useState({ width: 4.5, height: 6 });

  const materialRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  // ------------------- 纹理加载 -------------------
  /**
   * 检查 textureFile 是否为视频（支持 Blob URL、Data URL 和文件扩展名）
   */

  /**
   * 加载主纹理（视频或图片）
   */
  const mainTexture = useVideoTexture(
    textureFile || "images/6753383-uhd_4096_2160_25fps.mp4"
  );

  /**
   * 默认像素纹理（当 elementsTexUrls 为空时使用）
   */
  const pixelsUrls = useMemo(
    () => [
      "/images/pixels/pix-01-80.jpg",
      "/images/pixels/pix-02-80.jpg",
      "/images/pixels/pix-03-80.jpg",
      "/images/pixels/pix-04-80.jpg",
      "/images/pixels/emoji-01-80.png",
      "/images/pixels/emoji-02-80.png",
      "/images/pixels/emoji-03-80.png",
      "/images/pixels/emoji-04-80.png",
      "/images/pixels/emoji-05-80.png",
      "/images/pixels/emoji-06-80.png",
      "/images/pixels/emoji-07-80.png",
      "/images/pixels/emoji-08-80.png",
      "/images/pixels/emoji-09-80.png",
      "/images/pixels/emoji-10-80.png",
    ],
    []
  );

  /**
   * 加载像素纹理，选择用户上传的 elementsTexUrls 或默认 pixelsUrls
   */
  const pixelsArray = useTexture(elementsTexUrls || pixelsUrls);

  // ------------------- 动态着色器生成 -------------------
  /**
   * 动态生成片段着色器，根据纹理数量调整 uElementTexture 和亮度分段
   */
  const fragmentShader = useMemo(() => {
    return generateFragmentShader(pixelsArray.length);
  }, [pixelsArray]);

  // ------------------- 获取纹理尺寸 -------------------
  /**
   * 当 mainTexture 加载完成后，获取其尺寸并更新 textureSize
   */
  useEffect(() => {
    // console.log(typeof(textureFile))
    if (mainTexture?.image) {
      const { width, height } = {
        width: mainTexture.image.videoWidth,
        height: mainTexture.image.videoHeight,
      };

      if (width && height) {
        // 保持宽高比，基于参考高度调整尺寸
        const aspectRatio = width / height;
        const referenceHeight = 6; // 可调整的参考高度
        const calculatedHeight = referenceHeight;
        const calculatedWidth = referenceHeight * aspectRatio;

        setTextureSize({
          width: calculatedWidth,
          height: calculatedHeight,
        });
      }
    }
  }, [mainTexture]);

  // ------------------- 材质更新 -------------------
  /**
   * 更新材质的 uniforms 和着色器
   */
  useEffect(() => {
    if (
      materialRef.current &&
      mainTexture &&
      pixelsArray.every((tex) => tex?.isTexture)
    ) {
      materialRef.current.uniforms.uVideoTexture.value = mainTexture;
      materialRef.current.uniforms.uElementTexture.value = Array.isArray(
        pixelsArray
      )
        ? pixelsArray
        : [pixelsArray]; // 确保是数组
      materialRef.current.fragmentShader = fragmentShader;
      materialRef.current.needsUpdate = true;
      setIsInitialized(true);
    }
    // console.log(mainTexture);
  }, [mainTexture, pixelsArray, fragmentShader]);

  /**
   * 每帧更新 uniforms（如时间和参数）
   */
  useFrame(({ clock }) => {
    if (materialRef.current && isInitialized) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMinSize.value = params.particleMinSize;
      materialRef.current.uniforms.uMaxSize.value = params.particleMaxSize;
      materialRef.current.uniforms.uInMin.value = params.iMinBrightness;
      materialRef.current.uniforms.uInMax.value = params.iMaxBrightness;
      materialRef.current.uniforms.uOutMin.value = params.oMinBrightness;
      materialRef.current.uniforms.uOutMax.value = params.oMaxBrightness;
      materialRef.current.uniforms.uBaseSize.value = params.particleBaseSize;
    }
  });

  // ------------------- 渲染粒子 -------------------
  return (
    <points>
      <planeGeometry
        args={[
          textureSize.width,
          textureSize.height,
          Math.floor(textureSize.width * 10) * params.particleDensity,
          Math.floor(textureSize.height * 10) * params.particleDensity,
        ]}
      />
      <particlesShaderMaterial ref={materialRef} transparent={true} />
    </points>
  );
}

export default ParticlesVideo;

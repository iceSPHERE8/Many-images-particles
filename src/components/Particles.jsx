import { useRef, useEffect } from "react";

import { shaderMaterial, useVideoTexture, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import vertextShader from "../shaders/particles/vertex.glsl";
import fragmentShader from "../shaders/particles/fragment.glsl";

import { useControls, folder } from "leva";

/**
 * Create Shader Material
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
    uVideoTexture: null,
    uElementTexture: [],
  },
  vertextShader,
  fragmentShader
);

extend({ ParticlesShaderMaterial });

function Particles() {
  /**
   * Options GUI
   */
  const { minSize, maxSize, inMin, inMax, outMin, outMax } = useControls("Particle Params", {
    minSize: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Minimal Particle Size",
    },
    maxSize: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Maximal Particle Size",
    },
    "Brightness Mapping": folder({
      inMin: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Input Minimal Brightness",
    },
    inMax: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Input Maximal Brightness",
    },
    outMin: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Output Minimal Brightness",
    },
    outMax: {
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Output Maximal Brightness",
    },
    })
  });

  /**
   * Set Image&Video Assets
   */
  const videoTexture = useVideoTexture(
    "/images/6753383-uhd_4096_2160_25fps.mp4"
  );

  const pixelsUrls = [
    "/images/pixels/pix-01-80.jpg",
    "/images/pixels/pix-02-80.jpg",
    "/images/pixels/pix-03-80.jpg",
    "/images/pixels/pix-04-80.jpg",
  ];
  const pixelsVideoUrls = [
    "/images/pixels/pixel_emoji_1.webm",
    "/images/pixels/pixel_emoji_2.webm",
    "/images/pixels/pixel_emoji_3.webm",
    "/images/pixels/pixel_emoji_4.webm",
  ]
  const pixelsVideoArray = [];

  for(const url of pixelsVideoUrls) {
    pixelsVideoArray.push(useVideoTexture(url));
  }

  const pixelsImageArray = useTexture(pixelsUrls);
  const pixelsArray = pixelsImageArray.concat(pixelsVideoArray);

  const materialRef = useRef();

  useEffect(() => {
    // setting the shader uniforms
    if (materialRef.current && videoTexture) {
      materialRef.current.uniforms.uVideoTexture.value = videoTexture;
      materialRef.current.uniforms.uElementTexture.value = pixelsArray;
    }

    console.log(pixelsArray)
  }, [videoTexture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

      materialRef.current.uniforms.uMinSize.value = minSize;
      materialRef.current.uniforms.uMaxSize.value = maxSize;

      materialRef.current.uniforms.uInMin.value = inMin;
      materialRef.current.uniforms.uInMax.value = inMax;
      materialRef.current.uniforms.uOutMin.value = outMin;
      materialRef.current.uniforms.uOutMax.value = outMax;
    }
  });

  return (
    <>
      <points>
        <planeGeometry args={[1.78 * 5, 5, 192 * 0.25, 108 * 0.25]} />
        <particlesShaderMaterial ref={materialRef} transparent={true} />
      </points>
    </>
  );
}

export default Particles;

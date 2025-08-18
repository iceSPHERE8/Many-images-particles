import { useRef, useEffect, useState, useMemo } from "react";

import { shaderMaterial, useVideoTexture, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import vertextShader from "../shaders/particles/vertex.glsl";
import fragmentShader from "../shaders/particles/fragment.glsl";

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

function Particles({params, textureFile}) {
  /**
   * Set Image&Video Assets
   */
  const texture = useTexture(textureFile || "/images/7b727be9721f701010bd91872706e81a.jpg");

  const pixelsUrls = [
    "/images/pixels/pix-01-80.jpg",
    "/images/pixels/pix-02-80.jpg",
    "/images/pixels/pix-03-80.jpg",
    "/images/pixels/pix-04-80.jpg",
  ];
  const pixelsVideoUrls = [
    // "/images/pixels/pixel_emoji_1.webm",
    // "/images/pixels/pixel_emoji_2.webm",
    // "/images/pixels/pixel_emoji_3.webm",
    // "/images/pixels/pixel_emoji_4.webm",
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
  ]
  const pixelsVideoArray = [];

  for(const url of pixelsVideoUrls) {
    pixelsVideoArray.push(useTexture(url));
  }

  const pixelsImageArray = useTexture(pixelsUrls);
  const pixelsArray = pixelsImageArray.concat(pixelsVideoArray);

  const materialRef = useRef();

  useEffect(() => {
    // setting the shader uniforms
    if (materialRef.current && texture) {
      materialRef.current.uniforms.uVideoTexture.value = texture;
      materialRef.current.uniforms.uElementTexture.value = pixelsArray;
    }

    console.log(pixelsArray)
  }, [texture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

      materialRef.current.uniforms.uMinSize.value = params.particleMinSize;
      materialRef.current.uniforms.uMaxSize.value = params.particleMaxSize;

      materialRef.current.uniforms.uInMin.value = params.iMinBrightness;
      materialRef.current.uniforms.uInMax.value = params.iMaxBrightness;
      materialRef.current.uniforms.uOutMin.value = params.oMinBrightness;
      materialRef.current.uniforms.uOutMax.value = params.oMaxBrightness;
    }

    
  });

  return (
    <>
      <points>
        {/* <planeGeometry args={[1.78 * 5, 5, 192 * .5, 108 * .5]} /> */}
        <planeGeometry args={[4.5, 6, 90*0.5, 120*0.5]} />
        <particlesShaderMaterial ref={materialRef} transparent={true} />
      </points>
    </>
  );
}

export default Particles;

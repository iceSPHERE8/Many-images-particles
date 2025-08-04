import { useRef, useEffect } from "react";

import { shaderMaterial, useVideoTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import vertextShader from "../shaders/particles/vertex.glsl";
import fragmentShader from "../shaders/particles/fragment.glsl";

import { useControls } from "leva";

const ParticlesShaderMaterial = shaderMaterial(
  { uTime: 0, uVideoTexture: null },
  vertextShader,
  fragmentShader
);

extend({ ParticlesShaderMaterial });

function Particles() {
  /**
   * Options GUI
   */
  const { elementTexture } = useControls("Test", {
    elementTexture: {
      image: true,
      label: "Upload Image"
    },
  })

  const materialRef = useRef();

  const videoTexture = useVideoTexture(
    "/images/6753383-uhd_4096_2160_25fps.mp4",
    {
      unsuspend: "canplaythrough",
      loop: true,
      muted: true,
      start: true,
      crossOrigin: "anonymous",
      autoplay: true,
    }
  );

  useEffect(() => {
    if (materialRef.current && videoTexture) {
      materialRef.current.uniforms.uVideoTexture.value = videoTexture;
    }
  }, [videoTexture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <points>
        <planeGeometry args={ [1.78 * 5, 5, 192 , 108] } />
        <particlesShaderMaterial ref={materialRef} />
      </points>
    </>
  );
}

export default Particles;

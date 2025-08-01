import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

import vertextShader from "../shaders/particles/vertex.glsl";
import fragmentShader from "../shaders/particles/fragment.glsl";

const ParticlesShaderMaterial = shaderMaterial(
  { uTime: 0 },
  vertextShader,
  fragmentShader
);

extend({ ParticlesShaderMaterial });

function Particles() {
  return (
    <>
      <mesh>
        <planeGeometry />
        <particlesShaderMaterial />
      </mesh>
    </>
  );
}

export default Particles;

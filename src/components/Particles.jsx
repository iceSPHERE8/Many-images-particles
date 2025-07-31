import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const ParticlesShaderMaterial = shaderMaterial(
    { uTime: 0 },
    
)

function Particles() {
  return (
    <>
      <mesh>
        <planeGeometry />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}

export default Particles;

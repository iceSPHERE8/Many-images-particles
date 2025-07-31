import { Canvas } from "@react-three/fiber";

import Particles from "./components/Particles";

import "./App.css";

function App() {
  return (
    <>
      <Canvas>
        <Particles />
      </Canvas>
    </>
  );
}

export default App;

import { Canvas } from "@react-three/fiber";

import Particles from "./components/Particles";
import ParameterUI from "./components/ParameterUI";

import "./App.css";

function App() {
  return (
    <>
      <div className="w-full h-full flex">
        <ParameterUI />
        <Canvas>
          <Particles />
        </Canvas>
      </div>
    </>
  );
}

export default App;

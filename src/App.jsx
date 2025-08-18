import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";

import Particles from "./components/Particles";
import ParameterUI from "./components/ParameterUI";

import "./App.css";

function App() {
  const [sliderValues, setSliderValues] = useState({
    particleMinSize: 1,
    particleMaxSize: 1,
    iMinBrightness: 0,
    iMaxBrightness: 0.2,
    oMinBrightness: 0,
    oMaxBrightness: 1,
  });

  const [imageUrls, setImageUrls] = useState(null);

  const handleFileAccepted = useCallback((files) => {
    setImageUrls(files[0]);
  },[])

  const onSliderChange = (name, newValue) => {
    setSliderValues((prevValues) => {
        // console.log("1")
      return {
        ...prevValues,
        [name]: newValue,
      };
    });
  };

  return (
    <>
      <div className="w-full h-full flex">
        <ParameterUI
          sliderValues={sliderValues}
          onSliderChange={onSliderChange}
          onFileAccepted={handleFileAccepted}
        />
        <Canvas>
          <Particles params={sliderValues} textureFile={imageUrls} />
        </Canvas>
      </div>
    </>
  );
}

export default App;

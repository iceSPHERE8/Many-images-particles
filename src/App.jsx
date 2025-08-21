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
    particleBaseSize: 1,
    particleDensity: 1,
  });

  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [elementsUrl, setElementsUrl] = useState(null);

  const handleMainFileAccepted = useCallback((files) => {
    setMainImageUrl(files[0]);
  }, []);

  const handleElementsFileAccepted = useCallback((files) => {
    setElementsUrl(files);
  }, []);

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
        <div className="w-4/12">
        <ParameterUI
          sliderValues={sliderValues}
          onSliderChange={onSliderChange}
          onFileAccepted={handleMainFileAccepted}
          onElementsAccepted={handleElementsFileAccepted}
        />
        </div>
        <div className="w-8/12">
          <Canvas>
            <Particles
              params={sliderValues}
              textureFile={mainImageUrl}
              elementsTexUrls={elementsUrl}
            />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;

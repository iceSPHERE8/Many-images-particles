import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";

import Particles from "./components/Particles";
import ParticlesVideo from "./components/Particles-video";
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
  const [imageMode, setImageMode] = useState(true);

  const handleMainFileAccepted = useCallback((files) => {
    // console.log(files)
    setMainImageUrl(files[0]);
  }, []);

  const handleElementsFileAccepted = useCallback((files) => {
    setElementsUrl(files);
  }, []);

  const handleChangeMode = () => {
    setImageMode((prev) => !prev);
    // console.log("click")
  }

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
        <div className="w-3/12">
          <ParameterUI
            mainTitle={imageMode ? "-Particles Image Mode-" : "-Particles Video Mode-"}
            sliderValues={sliderValues}
            onSliderChange={onSliderChange}
            onFileAccepted={handleMainFileAccepted}
            onElementsAccepted={handleElementsFileAccepted}
            onChangeMode={handleChangeMode}
            currentMode={imageMode}
          />
        </div>
        <div className="w-9/12">
          <Canvas> {/* 使用 key 强制重新挂载 */}
            {imageMode ? (
              <Particles
                params={sliderValues}
                textureFile={mainImageUrl}
                elementsTexUrls={elementsUrl}
              />
            ) : (
              <ParticlesVideo
                params={sliderValues}
                textureFile={mainImageUrl}
                elementsTexUrls={elementsUrl}
              />
            )}
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;

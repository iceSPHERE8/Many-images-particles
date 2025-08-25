import { useEffect, useState, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

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

  const bgColor = useRef();
  const animationFrameRef = useRef();

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
  };

  const onSliderChange = (name, newValue) => {
    setSliderValues((prevValues) => {
      // console.log("1")
      return {
        ...prevValues,
        [name]: newValue,
      };
    });
  };

  // /**
  //  * useEffect：控制动画的启动和停止
  //  */
  // useEffect(() => {
  //   /**
  //    * @param {number} time - requestAnimationFrame 提供的时间戳（毫秒）
  //    */
  //   const animate = (time) => {
  //     const hue = (time % 2500) / 2500;
  //     const color = new THREE.Color().setHSL(hue, 1.0, 0.5);

  //     if (bgColor.current) {
  //       bgColor.current.style.backgroundColor = color.getStyle();
  //     }
  //     // 继续下一帧动画
  //     animationFrameRef.current = requestAnimationFrame(animate);
  //   };

  //   // 启动动画
  //   animationFrameRef.current = requestAnimationFrame(animate);

  //   // 清理函数
  //   return () => {
  //     if (animationFrameRef.current) {
  //       cancelAnimationFrame(animationFrameRef.current);
  //     }
  //   };
  // }, []);

  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-3/12">
          <ParameterUI
            mainTitle={
              imageMode ? "-Particles Image Mode-" : "-Particles Video Mode-"
            }
            sliderValues={sliderValues}
            onSliderChange={onSliderChange}
            onFileAccepted={handleMainFileAccepted}
            onElementsAccepted={handleElementsFileAccepted}
            onChangeMode={handleChangeMode}
            currentMode={imageMode}
          />
        </div>
        <div className="w-9/12 bg-black">
          <Canvas>
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

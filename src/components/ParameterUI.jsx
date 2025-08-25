import SliderUI from "./ui-kit/Slider-UI";

import MyDropzone from "./DropZone";

function ParameterUI({
  sliderValues,
  onSliderChange,
  onFileAccepted,
  onElementsAccepted,
  mainTitle,
  onChangeMode,
  currentMode
}) {
  return (
    <>
      <div
        className="p-2 relative border-r-2 w-full border-[#e5e5e5] bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(255,255,255,0.1)_5px,rgba(244,244,244,0.2)_5px,rgba(255,255,255,0.2)_10px)]"
      >
        <section className="bg-[linear-gradient(135deg,#D7D7D740_0%,#EFEEEE40_50%,#D7D7D740_100%)] p-2 rounded-sm shadow-[inset_0_-1px_2px_rgba(255,255,255,0.8),inset_0_2px_2px_rgba(255,255,255,0.7)]">
          <button 
            className="bg-[#041312] w-full flex justify-center rounded-md border-2 border-[#cacaca] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_2px_1px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(255,255,255,0.5),inset_0_-2px_1px_rgba(255,255,255,0.7),inset_0_6px_1px_rgba(255,255,255,0.5),inset_0_12px_2px_rgba(255,255,255,0.1)] relative overflow-hidden led-dot-matrix"
            onClick={onChangeMode}
          >
            <div className="font-handjet font-bold text-[#d0e7ff] drop-shadow-[0_0_4px_rgba(158,219,202,0.4)] hover:drop-shadow-[0_0_4px_rgba(158,219,202,1)] transition-all duration-300">
              {mainTitle}
            </div>
          </button>

          <div className="bg-[#dedede] mt-1 p-2 rounded-md border-2 border-[#e0e0e050] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_4px_rgba(255,255,255,0.5)]">
            <SliderUI
              label={"Particle Base Size"}
              onChange={onSliderChange}
              name={"particleBaseSize"}
              d_value={sliderValues.particleBaseSize}
              vmax={1.5}
            />
            <SliderUI
              label={"Particle Density"}
              onChange={onSliderChange}
              name={"particleDensity"}
              d_value={sliderValues.particleDensity}
              vmax={2}
            />
          </div>

          <div className="bg-[#dedede] mt-1 p-2 rounded-md border-2 border-[#e0e0e050] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_4px_rgba(255,255,255,0.5)]">
            <div className="bg-[#dddddd] mt-1 p-2 rounded-md border-2 border-[#e0e0e050] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_4px_rgba(255,255,255,0.5)]">
              <SliderUI
                label={"Particle Min Size"}
                onChange={onSliderChange}
                name={"particleMinSize"}
                d_value={sliderValues.particleMinSize}
                // phaseOffset={0}
              />
              <SliderUI
                label={"Particle Max Size"}
                onChange={onSliderChange}
                name={"particleMaxSize"}
                d_value={sliderValues.particleMaxSize}
                // phaseOffset={Math.PI*4}
              />
            </div>
            <div className="bg-[#dddddd] mt-1 p-2 rounded-md border-2 border-[#e0e0e050] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_4px_rgba(255,255,255,0.5)]">
              <SliderUI
                label={"I-Minimal Brightness"}
                onChange={onSliderChange}
                name={"iMinBrightness"}
                d_value={sliderValues.iMinBrightness}
                // phaseOffset={Math.PI}
              />
              <SliderUI
                label={"I-Maximal Brightness"}
                onChange={onSliderChange}
                name={"iMaxBrightness"}
                d_value={sliderValues.iMaxBrightness}
              />
              <SliderUI
                label={"O-Maximal Brightness"}
                onChange={onSliderChange}
                name={"oMinBrightness"}
                d_value={sliderValues.oMinBrightness}
              />
              <SliderUI
                label={"O-Maximal Brightness"}
                onChange={onSliderChange}
                name={"oMaxBrightness"}
                d_value={sliderValues.oMaxBrightness}
              />
            </div>
          </div>

          <div className="mt-2 gap-1">
            <MyDropzone labelText={"MAIN-TEXTURE"} onFileAccepted={onFileAccepted} display imageMode={currentMode}  />
            <MyDropzone labelText={"ELEMENTS"} onFileAccepted={onElementsAccepted} />
          </div>
        </section>
      </div>
    </>
  );
}

export default ParameterUI;

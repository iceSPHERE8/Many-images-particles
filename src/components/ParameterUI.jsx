import SliderUI from "./ui-kit/Slider-UI";

function ParameterUI({ sliderValues, onSliderChange }) {
  return (
    <>
      <div className="p-2 border-r-2 border-[#e5e5e5] w-4/12 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(255,255,255,0.1)_5px,rgba(244,244,244,0.2)_5px,rgba(255,255,255,0.2)_10px)]">
        <section className="bg-[linear-gradient(135deg,#D7D7D740_0%,#EFEEEE40_50%,#D7D7D740_100%)] p-2 rounded-sm shadow-[inset_0_-1px_2px_rgba(255,255,255,0.8),inset_0_2px_2px_rgba(255,255,255,0.7)]">
          <div className="font-handjet font-bold border-b-2 mb-2 border-[#aaaaaa]">
            -Particles Parameters-
          </div>
          <div className="bg-[#dedede] mt-4 p-2 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_4px_rgba(255,255,255,0.5)]">
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
          <div className="bg-[#dedede] mt-2 p-2 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_4px_rgba(255,255,255,0.5)]">
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
        </section>
      </div>
    </>
  );
}

export default ParameterUI;

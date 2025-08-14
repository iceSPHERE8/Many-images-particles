import SliderUI from "./ui-kit/Slider-UI";

function ParameterUI({ sliderValues, onSliderChange }) {

  return (
    <>
      <div className="p-2 border-r-2 border-[#e5e5e5] w-4/12 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(255,255,255,0.1)_5px,rgba(244,244,244,0.2)_5px,rgba(255,255,255,0.2)_10px)]">
        <section className="bg-[linear-gradient(135deg,#D7D7D740_0%,#EFEEEE40_50%,#D7D7D740_100%)] p-2 rounded-sm shadow-[inset_0_-1px_2px_rgba(255,255,255,0.8),inset_0_2px_2px_rgba(255,255,255,0.7)]">
          <div className="font-handjet font-bold border-b-2 mb-2 border-[#aaaaaa]">-Particles Parameters-</div>
            <SliderUI label={"Base Size"} onChange={onSliderChange} name={"particleMinSize"} d_value={sliderValues.particleMinSize}/>
            {/* <SliderUI label={"Base Size"} onChange={handleSliderChange} /> */}
        </section>
      </div>
    </>
  );
}

export default ParameterUI;

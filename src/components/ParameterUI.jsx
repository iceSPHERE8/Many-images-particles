import { Slider } from "radix-ui";

function ParameterUI() {
  return (
    <>
      <div className="p-2 border-r-2 border-[#e5e5e5] w-4/12 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(255,255,255,0.1)_5px,rgba(244,244,244,0.2)_5px,rgba(255,255,255,0.2)_10px)]">
        <section className="bg-[linear-gradient(135deg,#D7D7D740_0%,#EFEEEE40_50%,#D7D7D740_100%)] p-2 rounded-sm shadow-[inset_0_-1px_2px_rgba(255,255,255,0.8),inset_0_2px_2px_rgba(255,255,255,0.7)]">
          <div className="font-handjet font-bold border-b-2 mb-2 border-[#aaaaaa]">-Particles Parameters-</div>
          <div className="">
            <div className="font-handjet text-sm mb-[-6px]">Base Size</div>
            <div className="">
              <Slider.Root
                className="relative flex h-5 w-full touch-none select-none items-center"
                defaultValue={[0.5]}
                max={1}
                step={0.001}
              >
                <Slider.Track className="relative h-[6px] grow rounded-full bg-[#c4c4c4] shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),0_1px_2px_rgba(255,255,255,0.5),0_-1px_4px_rgba(255,255,255,0.2)]">
                  <Slider.Range className="absolute h-full rounded-full bg-[#ffffff] shadow-[inset_0_-2px_2px_rgba(97,134,193,0.7),inset_0_-4px_2px_rgba(97,134,193,0.5),inset_0_1px_2px_rgba(97,134,193,0.7)]" />
                </Slider.Track>
                <Slider.Thumb
                  className="block h-[12px] size-5 rounded-full bg-[#eaeaea] shadow-[0px_1px_2px_rgba(0,0,0,0.2),inset_0_-1px_1px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] focus:outline-none"
                  aria-label="Volume"
                />
              </Slider.Root>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ParameterUI;

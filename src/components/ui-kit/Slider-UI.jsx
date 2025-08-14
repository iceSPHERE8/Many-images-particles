import { Slider } from "radix-ui";

function SliderUI(props) {
  const { label, onChange, name, d_value } = props;

  const handleRadixChange = (values) => {
    onChange(name, values[0]);
  }

  return (
    <>
      <div className="font-handjet text-sm mb-[-6px]">{label}</div>
      <div className="">
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          defaultValue={[d_value]}
          max={1}
          step={0.001}
          onValueChange={handleRadixChange}
        >
          <Slider.Track className="relative h-[6px] grow rounded-full bg-[#c4c4c4] shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),0_1px_2px_rgba(255,255,255,0.5),0_-1px_4px_rgba(255,255,255,0.2)]">
            <Slider.Range className="absolute h-full rounded-full bg-[#ffffff] shadow-[inset_0_-2px_2px_rgba(97,134,193,0.7),inset_0_-4px_2px_rgba(97,134,193,0.5),inset_0_1px_2px_rgba(97,134,193,0.7)]" />
          </Slider.Track>
          <Slider.Thumb
            // style={{ transform: `translateX(${-55}px)` }}
            className="block h-[12px] size-5 rounded-full bg-[#eaeaea] shadow-[0px_1px_2px_rgba(0,0,0,0.2),inset_0_-1px_1px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] focus:outline-none"
            aria-label="Volume"
          />
        </Slider.Root>
      </div>
    </>
  );
}

export default SliderUI;

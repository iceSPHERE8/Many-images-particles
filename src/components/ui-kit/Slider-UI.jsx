import { useState, useEffect, useRef, useMemo } from "react";
import { Slider } from "radix-ui";

/**
 * SliderUI 组件：一个基于 Radix UI 的滑块组件，支持受控值和正弦动画。
 * @param {Object} props - 组件属性
 * @param {string} props.label - 滑块的标签文本
 * @param {function} props.onChange - 滑块值变化时的回调函数，格式为 (name, value) => void
 * @param {string} props.name - 滑块的标识名称，传递给 onChange
 * @param {number} props.d_value - 滑块的当前值（受控），范围 [0, 1]
 * @param {boolean} props.autoAnimate - 是否启用正弦动画（true 启用，false 禁用）
 */
function SliderUI(props) {
  const { label, onChange, name, d_value, phaseOffset } = props;

  let offset = useMemo(() => Math.random() * 4 * Math.PI, []);;

  if(phaseOffset){
    offset = phaseOffset;
    console.log(offset)
  }
  // 生成随机相位偏移（0 到 2π），使用 useMemo 确保只在组件初始化时生成一次
  // const phaseOffset = useMemo(() => Math.random() * 2 * Math.PI, []);

  // 内部状态：控制正弦动画的开关，初始为 true（启用动画）
  const [autoAnimate, setAutoAnimate] = useState(false);

  // 用于存储 requestAnimationFrame 的 ID，以便清理动画
  const animationFrameRef = useRef(null);

  /**
   * useEffect：控制正弦动画的启动和停止
   * - 当 autoAnimate 为 true 时，启动动画，滑块值按正弦波变化
   * - 当 autoAnimate 为 false 或组件卸载时，停止动画
   * - 依赖 autoAnimate、name 和 onChange，确保相关 prop 变化时重新运行
   */
  useEffect(() => {
    // 如果 autoAnimate 为 false，停止动画并清理
    if (!autoAnimate) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    /**
     * 动画函数：基于时间生成正弦波值并更新滑块
     * @param {number} time - requestAnimationFrame 提供的时间戳（毫秒）
     */
    const animate = (time) => {
      // 计算正弦值并映射到 [0, 1]，周期为 2 秒
      const newValue = (Math.sin((time / 1500) * Math.PI + offset) + 1) / 2;
      onChange(name, newValue); // 通知父组件更新 d_value
      // 继续下一帧动画
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 启动动画
    animationFrameRef.current = requestAnimationFrame(animate);

    // 清理函数：在组件卸载或 autoAnimate 变化时取消动画
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoAnimate, name, onChange]);

  /**
   * 处理用户拖动滑块时的值变化
   * @param {number[]} values - Radix UI Slider 提供的当前值数组
   */
  const handleRadixChange = (values) => {
    onChange(name, values[0]);
  };

  /**
   * 处理复选框状态变化
   * @param {Object} event - 复选框变化事件
   */
  const handleCheckboxChange = (event) => {
    setAutoAnimate(event.target.checked); // 更新内部 autoAnimate 状态
  };

  return (
    <>
      {/* 显示滑块标签 */}
      <div className="flex items-center justify-between mb-[-6px]">
        <div className="font-handjet text-sm">{label}</div>
        <div className="relative">
          <input
            type="checkbox"
            checked={autoAnimate}
            onChange={handleCheckboxChange}
            className="h-3 w-3 appearance-none rounded-full bg-[#b6b6b6] backdrop-blur-md border border-gray-300/50 shadow-[inset_0_1px_4px_rgba(255,255,255,0.5)] checked:bg-green-500/50 checked:shadow-[inset_0_1px_4px_rgba(255,255,255,0.5)] checked:border-green-400/50 transition-all duration-200 hover:cursor-pointer peer"
            aria-label="Toggle animation"
          />
          <span className="absolute hidden peer-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 peer-hover:opacity-100 transition-opacity duration-200">
            Toggle animation on/off
          </span>
        </div>
      </div>
      <div className="">
        {/* Radix UI 滑块组件 */}
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          value={[d_value]} // 绑定父组件提供的受控值
          max={1} // 最大值
          step={0.001} // 步进值
          onValueChange={handleRadixChange} // 用户交互时的回调
        >
          {/* 滑块轨道 */}
          <Slider.Track className="relative h-[6px] grow rounded-full bg-[#c4c4c4] shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),0_1px_2px_rgba(255,255,255,0.5),0_-1px_4px_rgba(255,255,255,0.2)]">
            {/* 已填充范围 */}
            <Slider.Range className="absolute h-full rounded-full bg-[#ffffff] shadow-[inset_0_-2px_2px_rgba(97,134,193,0.7),inset_0_-4px_2px_rgba(97,134,193,0.5),inset_0_1px_2px_rgba(97,134,193,0.7)]" />
          </Slider.Track>
          {/* 滑块拇指 */}
          <Slider.Thumb
            className="block h-[12px] size-5 rounded-full bg-[#eaeaea] shadow-[0px_1px_2px_rgba(0,0,0,0.2),inset_0_-1px_1px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] focus:outline-none"
            aria-label="Volume"
          />
        </Slider.Root>
      </div>
    </>
  );
}

export default SliderUI;

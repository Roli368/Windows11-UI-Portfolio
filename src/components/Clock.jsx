/*import useClock from "../hooks/useClock";

export default function Clock() {
  const time = useClock();
  return <span className="text-xs">{time}</span>;
}*/

import useClock from "../hooks/useClock";

export default function Clock() {
  const time = useClock();

  return (
    <div className="flex flex-col items-end justify-center select-none leading-none">
     
      <span className="text-[11px] sm:text-xs font-semibold text-slate-200 tracking-tight">
        {time}
      </span>
    </div>
  );
}

import { useState} from "react";

export default function Weather() {
  const [weather, setWeather] = useState({ temp: "24°C", condition: "Cloudy" });

  // Optional: Add real API fetching logic here later
  return (
    <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded-md transition-all cursor-default group">
      {/* Weather Icon (Cloudy) */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-indigo-400">
          <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.4-4.3-4.5-1.5-3.3-4.7-5-8.2-4.1-3 0.8-5.3 3.3-5.5 6.4C2.1 12.7 1 14.2 1 16.2c0 2.1 1.7 3.8 3.8 3.8z" />
        </svg>
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
          <span className="text-[7px] text-white font-bold">6</span>
        </div>
      </div>
      
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] text-white font-medium">{weather.temp}</span>
        <span className="text-[8px] text-slate-400 capitalize">{weather.condition}</span>
      </div>
    </div>
  );
}
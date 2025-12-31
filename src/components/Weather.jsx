/*import { useState} from "react";

export default function Weather() {
  const [weather] = useState({ temp: "24°C", condition: "Cloudy" });

  // Optional: Add real API fetching logic here later
  return (
    <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded-md transition-all cursor-default group">
      
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-indigo-400">
          <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.4-4.3-4.5-1.5-3.3-4.7-5-8.2-4.1-3 0.8-5.3 3.3-5.5 6.4C2.1 12.7 1 14.2 1 16.2c0 2.1 1.7 3.8 3.8 3.8z" />
        </svg>
     
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

*/


import { useState, useEffect } from "react";

export default function Weather() {
  const [weather, setWeather] = useState({ temp: "--", condition: "Loading..." });

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        // Replace with your actual API key from .env
        const API_KEY = import.meta.env?.VITE_WEATHER_API_KEY || process.env.REACT_APP_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        
        setWeather({
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].description
        });
      } catch (err) {
        setWeather({ temp: "!!", condition: "Error" });
      }
    };

    // Geolocation API for all devices
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
        () => setWeather({ temp: "??", condition: "No Location" }),
        { timeout: 10000 }
      );
    }
  }, []);

  return (
    <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-1 hover:bg-white/10 rounded-md transition-all cursor-default group">
      
      <div className="relative flex items-center justify-center">
        {/* Responsive Icon: Smaller on mobile, standard on desktop */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-indigo-400 sm:w-5 sm:h-5">
          <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.4-4.3-4.5-1.5-3.3-4.7-5-8.2-4.1-3 0.8-5.3 3.3-5.5 6.4C2.1 12.7 1 14.2 1 16.2c0 2.1 1.7 3.8 3.8 3.8z" />
        </svg>
     
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center sm:w-3 sm:h-3">
          <span className="text-[6px] text-white font-bold sm:text-[7px]">6</span>
        </div>
      </div>
      
      {/* Labels: Hidden on very small screens, shown on tablets/laptops */}
      <div className="hidden xs:flex flex-col items-start leading-none">
        <span className="text-[10px] text-white font-medium">{weather.temp}</span>
        <span className="text-[8px] text-slate-400 capitalize truncate max-w-[50px] sm:max-w-none">
          {weather.condition}
        </span>
      </div>
    </div>
  );
}
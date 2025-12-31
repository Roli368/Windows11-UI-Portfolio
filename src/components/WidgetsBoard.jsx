import { useState, useEffect } from "react";
import { motion} from "framer-motion";

// The 'export default' is crucial to fix the Taskbar.jsx error
export default function WidgetsBoard({ closeBoard }) {
  const [weather, setWeather] = useState({ temp: "--", desc: "Loading...", icon: "☁️", city: "Detecting..." });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      setLoading(true);
      try {
        // Use Vite or React App environment variables
        const API_KEY = import.meta.env?.VITE_WEATHER_API_KEY || process.env.REACT_APP_WEATHER_API_KEY;
        if (!API_KEY) throw new Error("API Key missing");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error("Weather service unavailable");

        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          desc: data.weather[0].description,
          city: data.name,
          icon: data.weather[0].main.includes("Rain") ? "🌧️" : data.weather[0].main.includes("Clear") ? "☀️" : "☁️"
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("Location access denied.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -500, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-2 left-2 h-[calc(100vh-64px)] w-[92vw] sm:w-[520px] bg-[#0f172a]/75 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-[10000] overflow-y-auto no-scrollbar p-6 select-none"
    >
     
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">R</div>
          <span className="text-sm font-bold text-white tracking-tight">Widgets Board</span>
        </div>
        <button onClick={closeBoard} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/60">✕</button>
      </div>

   
      {error ? (
        <div className="p-8 text-center text-red-400 bg-red-400/10 rounded-2xl border border-red-400/20 font-medium mb-6">
          ⚠️ {error}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-indigo-500/30 to-blue-600/30 border border-white/10 p-6 rounded-2xl mb-6 shadow-inner relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-5xl font-bold text-white drop-shadow-md">{weather.temp}°C</p>
              <p className="text-xs text-slate-200 font-medium capitalize mt-1">
                {weather.desc} • {weather.city}
              </p>
            </div>
            <span className="text-6xl drop-shadow-2xl">{weather.icon}</span>
          </div>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
     
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GitHub Activity</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="flex items-end gap-1 h-12 mb-3">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500/20 rounded-t-sm group-hover:bg-indigo-500/40 transition-all duration-500"></div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">
            <span className="text-white font-bold">12 commits</span> this week
          </p>
        </div>

      
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Tech Headlines</span>
          <div className="space-y-3">
            <div className="border-l-2 border-indigo-500 pl-3">
              <p className="text-[11px] text-white font-medium line-clamp-1">AI Agents redefine SaaS workflows</p>
              <p className="text-[9px] text-slate-500 mt-0.5">24m ago • TechCrunch</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-3">
              <p className="text-[11px] text-white font-medium line-clamp-1">React 19 stable release features</p>
              <p className="text-[9px] text-slate-500 mt-0.5">2h ago • Dev.to</p>
            </div>
          </div>
        </div>

      
        <div className="sm:col-span-2 bg-[#1e293b]/30 p-4 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Uptime</p>
              <p className="text-xs text-indigo-400 font-mono">99.9%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Status</p>
              <p className="text-xs text-green-400 font-mono">Ready</p>
            </div>
          </div>
          <button className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-white transition-all">
            System Logs
          </button>
        </div>
      </div>
    </motion.div>
  );
}










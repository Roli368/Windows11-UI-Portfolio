/*import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function QuickSettings({ closePanel }) {
  const [settings, setSettings] = useState([
    { id: 'wifi', label: 'Wi-Fi', icon: '📶', active: true },
    { id: 'bt', label: 'Bluetooth', icon: '🔹', active: true },
    { id: 'airplane', label: 'Airplane', icon: '✈️', active: false },
    { id: 'battery', label: 'Battery Saver', icon: '🔋', active: false },
    { id: 'night', label: 'Night light', icon: '🌙', active: false },
    { id: 'hotspot', label: 'Hotspot', icon: '📡', active: false },
  ]);

  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);

  // Apply Global Filters (Brightness & Night Light)
  useEffect(() => {
    const desktop = document.getElementById("desktop-container");
    if (desktop) {
      const isNightLight = settings.find(s => s.id === 'night')?.active;
      desktop.style.filter = `brightness(${brightness}%)`;
      desktop.style.backgroundColor = isNightLight ? "rgba(255, 150, 0, 0.1)" : "transparent";
      desktop.style.transition = "filter 0.2s ease, background-color 0.5s ease";
    }
  }, [brightness, settings]);

  const toggleSetting = (id) => {
    setSettings(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.95 }}
      className="fixed bottom-14 right-2 w-[320px] bg-[#0f172a]/90 backdrop-blur-3xl border border-white/10 rounded-xl shadow-2xl p-4 z-[10000] select-none"
    >
      <div className="grid grid-cols-3 gap-2 mb-6">
        {settings.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-1">
            <button 
              onClick={() => toggleSetting(item.id)}
              className={`w-full aspect-square rounded-lg flex items-center justify-center text-lg transition-all duration-200 
                ${item.active 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'}`}
            >
              {item.icon}
            </button>
            <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 px-1 mb-4">
        <div className="flex items-center gap-3 group">
          <span className="text-xs group-hover:scale-110 transition-transform">☀️</span>
          <input 
            type="range" min="30" max="100" value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
        <div className="flex items-center gap-3 group">
          <span className="text-xs group-hover:scale-110 transition-transform">{volume === "0" ? '🔇' : '🔊'}</span>
          <input 
            type="range" min="0" max="100" value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
        <div className="flex items-center gap-2 font-medium">
          <span>🔋 85%</span>
          <span>10h remaining</span>
        </div>
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-300">⚙️</button>
      </div>
    </motion.div>
  );
}

*/
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function QuickSettings({ closePanel }) {
  const [settings, setSettings] = useState([
    { id: 'wifi', label: 'Wi-Fi', icon: '📶', active: true },
    { id: 'bt', label: 'Bluetooth', icon: '🔹', active: true },
    { id: 'airplane', label: 'Airplane', icon: '✈️', active: false },
    { id: 'battery', label: 'Battery Saver', icon: '🔋', active: false },
    { id: 'night', label: 'Night light', icon: '🌙', active: false },
    { id: 'hotspot', label: 'Hotspot', icon: '📡', active: false },
  ]);

  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const desktop = document.getElementById("desktop-container");
    if (desktop) {
      const isNightLight = settings.find(s => s.id === 'night')?.active;
      desktop.style.filter = `brightness(${brightness}%)`;
      // Smooth color temperature shift for night light
      desktop.style.backgroundColor = isNightLight ? "rgba(255, 150, 0, 0.15)" : "transparent";
      desktop.style.transition = "filter 0.2s ease, background-color 0.5s ease";
    }
  }, [brightness, settings]);

  const toggleSetting = (id) => {
    setSettings(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.95 }}
      // Responsive alignment: Center on mobile, right-pinned on desktop
      className="fixed bottom-14 left-1/2 -translate-x-1/2 sm:left-auto sm:right-2 sm:translate-x-0 w-[92vw] sm:w-[320px] bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-4 z-[10000] select-none"
    >
      {/* Settings Grid: Fingers need larger gaps on mobile */}
      <div className="grid grid-cols-3 gap-3 sm:gap-2 mb-6">
        {settings.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-1.5 sm:gap-1">
            <motion.button 
              whileTap={{ scale: 0.92 }} // Tactile feedback for touch
              onClick={() => toggleSetting(item.id)}
              className={`w-full aspect-square rounded-xl flex items-center justify-center text-lg transition-all duration-200 
                ${item.active 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'}`}
            >
              {item.icon}
            </motion.button>
            <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Sliders: Larger vertical margins for easier thumb control */}
      <div className="space-y-6 sm:space-y-4 px-1 mb-6 sm:mb-4">
        <div className="flex items-center gap-4 group">
          <span className="text-sm sm:text-xs">☀️</span>
          <input 
            type="range" min="30" max="100" value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="flex-1 h-1.5 sm:h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
        <div className="flex items-center gap-4 group">
          <span className="text-sm sm:text-xs">{volume === "0" ? '🔇' : '🔊'}</span>
          <input 
            type="range" min="0" max="100" value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="flex-1 h-1.5 sm:h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
      </div>

      {/* Footer: Battery and System settings */}
      <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[11px] sm:text-[10px] text-slate-500">
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1">🔋 85%</span>
          <span className="hidden xs:inline text-slate-600">|</span>
          <span>10h remaining</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.85 }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 border border-transparent active:border-white/10"
        >
          ⚙️
        </motion.button>
      </div>
    </motion.div>
  );
}
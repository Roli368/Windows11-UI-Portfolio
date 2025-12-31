
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
      initial={{ y: 20, opacity: 0, scale: 0.95, x: "-50%" }}
      animate={{ y: 0, opacity: 1, scale: 1, x: "-50%" }}
      exit={{ y: 20, opacity: 0, scale: 0.95, x: "-50%" }}
      // Responsive alignment: Mathematically centered on mobile, right-aligned on desktop
      // Uses max-h-[90dvh] to prevent overflow on small phones
      className="fixed bottom-14 left-1/2 sm:left-auto sm:right-2 sm:translate-x-0 w-[94vw] sm:w-[320px] max-h-[90dvh] bg-[#0f172a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-4 z-[10000] select-none flex flex-col overflow-y-auto no-scrollbar"
    >
      {/* Grid: Larger tap targets for mobile fingers */}
      <div className="grid grid-cols-3 gap-3 sm:gap-2 mb-8 sm:mb-6">
        {settings.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-2 sm:gap-1">
            <motion.button 
              whileTap={{ scale: 0.9 }} // Tactile feedback
              onClick={() => toggleSetting(item.id)}
              className={`w-full aspect-square rounded-2xl sm:rounded-xl flex items-center justify-center text-xl sm:text-lg transition-all 
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

      {/* Sliders: Increased height for easier thumb dragging */}
      <div className="space-y-8 sm:space-y-4 px-1 mb-8 sm:mb-4">
        <div className="flex items-center gap-4 group">
          <span className="text-base sm:text-xs">☀️</span>
          <input 
            type="range" min="30" max="100" value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="flex-1 h-2 sm:h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
        <div className="flex items-center gap-4 group">
          <span className="text-base sm:text-xs">{volume === "0" ? '🔇' : '🔊'}</span>
          <input 
            type="range" min="0" max="100" value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="flex-1 h-2 sm:h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
      </div>

      {/* Footer: Dynamic battery visibility */}
      <div className="pt-4 mt-auto border-t border-white/5 flex justify-between items-center text-[11px] sm:text-[10px] text-slate-500">
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1">🔋 85%</span>
          <span className="hidden xs:inline text-slate-700">|</span>
          <span className="truncate">10h remaining</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          className="p-2.5 sm:p-2 hover:bg-white/10 rounded-full text-slate-300 transition-colors"
        >
          ⚙️
        </motion.button>
      </div>
    </motion.div>
  );
}
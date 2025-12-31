import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Clock from "./Clock";
import StartMenu from "./StartMenu";
import Weather from "./Weather";
import QuickSettings from "./QuickSettings"; 
import NotificationCenter from "./NotificationCenter";
import WidgetsBoard from "./WidgetsBoard"; // Ensure this component is created

const getIcon = (id) => {
  const icons = {
    about: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    projects: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    skills: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    achievements: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>,
    resume: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    contact: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 .81.7A2 2 0 0 1 22 16.92z"/></svg>,
  };
  return icons[id] || icons.about;
};

export default function Taskbar({ windows, activeWindow, openApp, toggleMinimize, minimized, allApps }) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
  const [isNotifCenterOpen, setIsNotifCenterOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false); // Widget Board State
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allApps.filter(app => 
      app.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allApps]);

  // Utility to close all panels before opening a new one
  const closeAllPanels = () => {
    setIsStartMenuOpen(false);
    setIsSettingsOpen(false);
    setIsNotifCenterOpen(false);
    setIsWidgetsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isStartMenuOpen && (
          <StartMenu openApp={openApp} closeMenu={() => setIsStartMenuOpen(false)} />
        )}
        {isSettingsOpen && (
          <QuickSettings closePanel={() => setIsSettingsOpen(false)} />
        )}
        {isNotifCenterOpen && (
          <NotificationCenter closeCenter={() => setIsNotifCenterOpen(false)} />
        )}
        {/* Widgets Board slide-in from left */}
        {isWidgetsOpen && (
          <WidgetsBoard closeBoard={() => setIsWidgetsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Responsive Search Popup */}
      {searchTerm && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 md:left-1/4 md:translate-x-0 w-[90vw] md:w-80 bg-[#0f172a]/90 backdrop-blur-3xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[10000]">
          <div className="p-2 border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500 px-4">Best Match</div>
          <div className="max-h-60 overflow-y-auto">
            {filteredResults.length > 0 ? (
              filteredResults.map(app => (
                <button
                  key={app.id}
                  onClick={() => { openApp(app.id); setSearchTerm(""); }}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-colors text-left group"
                >
                  <div className="text-indigo-400 group-hover:scale-110 transition-transform">{getIcon(app.id)}</div>
                  <span className="text-xs text-slate-200">{app.label}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-xs text-slate-500 italic text-center">No apps found</div>
            )}
          </div>
        </div>
      )}

      {/* Taskbar Container */}
      <div className="absolute bottom-0 w-full h-12 bg-[#0a0a0a]/60 backdrop-blur-[20px] border-t border-white/10 shadow-[0_-2px_10px_rgba(0,0,0,0.3)] flex justify-between items-center px-2 md:px-3 z-[9999]">
        
        {/* Left Section: Weather triggers Widgets */}
        <div className="flex items-center gap-1 md:gap-3 flex-1 h-full">
          <div 
            onClick={() => {
              const targetState = !isWidgetsOpen;
              closeAllPanels();
              setIsWidgetsOpen(targetState);
            }}
            className={`cursor-pointer h-full px-2 flex items-center transition-all rounded-md 
              ${isWidgetsOpen ? 'bg-white/15 border border-white/10' : 'hover:bg-white/5'}`}
          >
            <Weather />
          </div>
          
          <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />

          <button 
            onClick={() => {
              const targetState = !isStartMenuOpen;
              closeAllPanels();
              setIsStartMenuOpen(targetState);
            }}
            className={`w-10 h-10 rounded flex items-center justify-center transition-all shrink-0
              ${isStartMenuOpen ? 'bg-white/10 shadow-lg' : 'hover:bg-white/10'}`}
          >
            <svg viewBox="0 0 88 88" className="w-5 h-5 fill-[#00a4ef]">
               <path d="M0 0h42v42H0zM46 0h42v42H46zM0 46h42v42H0zM46 46h42v42H46z" />
            </svg>
          </button>

          <div className="relative group hidden md:flex items-center">
            <div className="absolute left-3 text-slate-400 group-focus-within:text-indigo-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="h-8 w-40 lg:w-64 pl-9 pr-12 bg-white/10 border border-white/5 rounded-full text-xs text-white focus:bg-white/15 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Center: App Icons */}
        <div className="flex items-center gap-1 justify-center flex-1 h-full overflow-x-auto no-scrollbar px-2">
          {windows.map((w) => {
            const isActive = activeWindow === w;
           
            return (
              <motion.button 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                key={w} 
                onClick={() => toggleMinimize(w)}
                className={`group relative h-10 px-2.5 rounded transition-all flex items-center justify-center shrink-0
                  ${isActive ? "bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" : "hover:bg-white/5"}`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-400"} group-hover:text-white transition-all`}>
                  {getIcon(w)}
                </span>
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all
                  ${isActive ? "w-4 h-[3px] bg-indigo-500" : "w-1 h-1 bg-slate-500"}`} 
                />
              </motion.button>
            );
          })}
        </div>

        {/* Right Section: System Tray & Clock */}
        <div className="flex items-center gap-1 flex-1 justify-end h-full">
          <div 
            onClick={() => {
              const targetState = !isSettingsOpen;
              closeAllPanels();
              setIsSettingsOpen(targetState);
            }}
            className={`flex items-center gap-2 md:gap-3 px-2 py-1 rounded transition-all cursor-pointer h-[80%] border border-transparent 
              ${isSettingsOpen ? 'bg-white/15 border-white/10' : 'hover:bg-white/5'} text-slate-400`}
          >
            <div className="block md:hidden">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>
            </div>
            <div className="hidden md:flex items-center gap-3">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13a10 10 0 0 1 14 0"/><circle cx="12" cy="20" r="1"/></svg>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5h10M11 9h10M11 13h10M11 17h10"/><rect x="3" y="5" width="4" height="4"/><rect x="3" y="13" width="4" height="4"/></svg>
            </div>
          </div>

          <div 
            onClick={() => {
              const targetState = !isNotifCenterOpen;
              closeAllPanels();
              setIsNotifCenterOpen(targetState);
            }}
            className={`h-full flex flex-col justify-center px-2 rounded transition-all cursor-pointer text-right leading-none border-l border-white/5 ml-1
              ${isNotifCenterOpen ? 'bg-white/15 border-white/10' : 'hover:bg-white/10'}`}
          >
            <Clock />
            <span className="hidden sm:block text-[9px] text-slate-500 mt-0.5 tracking-tighter uppercase font-medium">30 Dec 2025</span>
          </div>

          <div className="w-[3px] h-full ml-1 hover:bg-white/20 border-l border-white/10 cursor-pointer hidden sm:block" />
        </div>
      </div>
    </>
  );
}
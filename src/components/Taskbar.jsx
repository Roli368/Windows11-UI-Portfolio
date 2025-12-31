import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Clock from "./Clock";
import StartMenu from "./StartMenu";
import Weather from "./Weather";
import QuickSettings from "./QuickSettings"; 
import NotificationCenter from "./NotificationCenter";
import WidgetsBoard from "./WidgetsBoard";

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
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allApps.filter(app => 
      app.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allApps]);

  const closeAllPanels = () => {
    setIsStartMenuOpen(false);
    setIsSettingsOpen(false);
    setIsNotifCenterOpen(false);
    setIsWidgetsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isStartMenuOpen && <StartMenu openApp={openApp} closeMenu={() => setIsStartMenuOpen(false)} />}
        {isSettingsOpen && <QuickSettings closePanel={() => setIsSettingsOpen(false)} />}
        {isNotifCenterOpen && <NotificationCenter closeCenter={() => setIsNotifCenterOpen(false)} />}
        {isWidgetsOpen && <WidgetsBoard closeBoard={() => setIsWidgetsOpen(false)} />}
      </AnimatePresence>

    
      {searchTerm && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[92vw] sm:w-80 bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 rounded-xl shadow-2xl z-[10000]">
          <div className="p-2 border-b border-white/5 text-[9px] uppercase tracking-widest text-slate-500 px-4">Search Results</div>
          <div className="max-h-60 overflow-y-auto no-scrollbar">
            {filteredResults.map(app => (
              <button
                key={app.id}
                onClick={() => { openApp(app.id); setSearchTerm(""); }}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-colors text-left"
              >
                <div className="text-indigo-400">{getIcon(app.id)}</div>
                <span className="text-xs text-slate-200">{app.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

     
      <div className="fixed bottom-0 w-full h-12 bg-[#0a0a0a]/75 backdrop-blur-2xl border-t border-white/10 flex justify-between items-center px-1 sm:px-3 z-[9999] select-none">
        
      
        <div className="flex items-center gap-0.5 sm:gap-2 flex-1 h-full min-w-0">
          <motion.div 
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const target = !isWidgetsOpen;
              closeAllPanels();
              setIsWidgetsOpen(target);
            }}
            className={`cursor-pointer h-full px-1 sm:px-2 flex items-center rounded-md transition-all 
              ${isWidgetsOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <Weather />
          </motion.div>
          
          <div className="h-6 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />

          <motion.button 
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              const target = !isStartMenuOpen;
              closeAllPanels();
              setIsStartMenuOpen(target);
            }}
            className={`w-10 h-10 rounded flex items-center justify-center transition-all shrink-0
              ${isStartMenuOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <svg viewBox="0 0 88 88" className="w-5 h-5 fill-[#00a4ef]">
               <path d="M0 0h42v42H0zM46 0h42v42H46zM0 46h42v42H0zM46 46h42v42H46z" />
            </svg>
          </motion.button>

         
          <div className="relative hidden md:flex items-center">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="h-8 w-40 lg:w-64 pl-4 pr-4 bg-white/10 border border-white/5 rounded-full text-xs text-white focus:outline-none"
            />
          </div>
        </div>

      
        <div className="flex items-center gap-0.5 sm:gap-1 justify-center flex-1 h-full overflow-hidden">
          {windows.map((w) => {
            const isActive = activeWindow === w;
            return (
              <motion.button 
                key={w}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleMinimize(w)}
                className={`relative h-10 px-1 sm:px-2.5 rounded transition-all flex items-center justify-center shrink-0
                  ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-400"}`}>
                  {getIcon(w)}
                </span>
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all
                  ${isActive ? "w-4 h-[3px] bg-indigo-500" : "w-1 h-1 bg-slate-500"}`} 
                />
              </motion.button>
            );
          })}
        </div>

       
        <div className="flex items-center gap-0.5 sm:gap-1 flex-1 justify-end h-full">
          <motion.div 
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const target = !isSettingsOpen;
              closeAllPanels();
              setIsSettingsOpen(target);
            }}
            className={`flex items-center gap-2 px-1 sm:px-2 rounded transition-all cursor-pointer h-[80%] 
              ${isSettingsOpen ? 'bg-white/10' : 'hover:bg-white/5'} text-slate-400`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13a10 10 0 0 1 14 0"/><circle cx="12" cy="20" r="1"/></svg>
            <svg className="hidden sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5h10M11 9h10M11 13h10M11 17h10"/></svg>
          </motion.div>

          <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const target = !isNotifCenterOpen;
              closeAllPanels();
              setIsNotifCenterOpen(target);
            }}
            className={`h-full flex flex-col justify-center px-1 sm:px-2 rounded transition-all cursor-pointer text-right leading-none border-l border-white/5
              ${isNotifCenterOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <Clock />
            <span className="hidden lg:block text-[9px] text-slate-500 mt-0.5 uppercase font-medium">31 Dec 2025</span>
          </motion.div>

          <div className="w-1 h-full ml-0.5 hover:bg-white/10 cursor-pointer hidden sm:block" />
        </div>
      </div>
    </>
  );
}





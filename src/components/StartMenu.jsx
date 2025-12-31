/*import  { useState, useMemo } from 'react';

export default function StartMenu({ openApp, closeMenu }) {
  const [searchQuery, setSearchQuery] = useState("");

  const pinnedApps = useMemo(() => [
    { id: 'about', name: 'Profile', ext: '.exe', color: 'text-blue-400' },
    { id: 'projects', name: 'Models', ext: '.py', color: 'text-indigo-400' },
    { id: 'skills', name: 'Stack', ext: '.sh', color: 'text-emerald-400' },
    { id: 'achievements', name: 'Awards', ext: '.log', color: 'text-rose-400' },
    { id: 'resume', name: 'Resume', ext: '.pdf', color: 'text-red-500' },
    { id: 'contact', name: 'Contact', ext: '.api', color: 'text-amber-400' },
  ], []);

  const filteredApps = pinnedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (id) => {
    openApp(id);
    closeMenu();
  };

  return (
    
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[92vw] sm:w-[540px] bg-[#0f172a]/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden z-[10000] animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      
      <div className="p-5 sm:p-8 pb-4">
        
      
        <div className="relative mb-6 sm:mb-8 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps or documents" 
            className="w-full bg-black/30 border border-white/5 px-12 py-3 rounded-full text-xs text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-indigo-500/50 focus:outline-none transition-all"
          />
        </div>

    
        <section className="mb-8 sm:mb-10 min-h-[160px]">
          <div className="flex justify-between items-center px-2 mb-4 sm:mb-6">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-80">Pinned</h3>
            <button className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1 rounded-md text-slate-300 transition-colors border border-white/5">All apps {'>'}</button>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-y-6">
            {filteredApps.length > 0 ? filteredApps.map(app => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="flex flex-col items-center gap-2 group transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${app.color} group-hover:bg-white/10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 shadow-lg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <span className="text-[10px] text-slate-300 font-medium group-hover:text-white transition-colors text-center truncate w-full px-1">{app.name}</span>
              </button>
            )) : (
              <div className="col-span-4 sm:col-span-6 py-10 text-center text-xs text-slate-500 italic">No matches found</div>
            )}
          </div>
        </section>

       
        <section className="px-2">
          <h3 className="text-[11px] font-bold text-white uppercase tracking-widest mb-4 sm:mb-6 opacity-80">Recommended</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4">
            <RecentFile icon="PDF" name="Resume_FullStack.pdf" time="2h ago" color="text-red-500" bg="bg-red-500/10" />
            <RecentFile icon="PY" name="Neural_Net.py" time="Yesterday" color="text-indigo-400" bg="bg-indigo-400/10" />
          </div>
        </section>
      </div>

   
      <div className="mt-6 sm:mt-8 p-4 bg-black/40 border-t border-white/5 flex justify-between items-center px-6 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-3 hover:bg-white/5 p-1 pr-4 rounded-full transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="text-[11px] font-semibold text-slate-200">Roli Rathour</span>
        </div>
        <button 
          onClick={closeMenu}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
          title="Shut Down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
        </button>
      </div>
    </div>
  );
}

function RecentFile({ icon, name, time, color, bg }) {
  return (
    <div className="flex items-center gap-4 p-2.5 hover:bg-white/10 rounded-xl cursor-pointer transition-all group border border-transparent hover:border-white/5 shadow-sm">
      <div className={`w-10 h-10 rounded-lg shrink-0 ${bg} border border-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <span className="text-[10px] font-bold tracking-tighter">{icon}</span>
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-xs text-slate-200 font-medium truncate">{name}</span>
        <span className="text-[9px] text-slate-500">{time}</span>
      </div>
    </div>
  );
}
  */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function StartMenu({ openApp, closeMenu }) {
  const [searchQuery, setSearchQuery] = useState("");

  const pinnedApps = useMemo(() => [
    { id: 'about', name: 'Profile', ext: '.exe', color: 'text-blue-400' },
    { id: 'projects', name: 'Models', ext: '.py', color: 'text-indigo-400' },
    { id: 'skills', name: 'Stack', ext: '.sh', color: 'text-emerald-400' },
    { id: 'achievements', name: 'Awards', ext: '.log', color: 'text-rose-400' },
    { id: 'resume', name: 'Resume', ext: '.pdf', color: 'text-red-500' },
    { id: 'contact', name: 'Contact', ext: '.api', color: 'text-amber-400' },
  ], []);

  const filteredApps = pinnedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (id) => {
    openApp(id);
    closeMenu();
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      // Responsive Width: 95vw on mobile, 540px on desktop
      // Dynamic max-height prevents overflow on small mobile screens
      className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[540px] max-h-[85dvh] bg-[#0f172a]/85 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[10000] flex flex-col"
    >
      
      {/* Main Content Area - Scrollable on small screens */}
      <div className="p-5 sm:p-8 pb-4 overflow-y-auto no-scrollbar flex-1">
        
        {/* Search Bar: Mobile-friendly with clear button support */}
        <div className="relative mb-6 sm:mb-8 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="search" // Optimized for mobile keyboards
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps or documents" 
            className="w-full bg-black/40 border border-white/5 px-12 py-3 rounded-full text-xs text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-indigo-500/50 focus:outline-none transition-all"
          />
        </div>

        {/* Pinned Section: Responsive grid scaling */}
        <section className="mb-8 min-h-[140px]">
          <div className="flex justify-between items-center px-2 mb-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pinned</h3>
            <button className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1 rounded-md text-slate-300 border border-white/5">All apps</button>
          </div>
          
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-y-6">
            {filteredApps.length > 0 ? filteredApps.map(app => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.95 }} // Critical tactile feedback for mobile
                onClick={() => handleAppClick(app.id)}
                className="flex flex-col items-center gap-2 group transition-all"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${app.color} group-hover:bg-white/10 shadow-lg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <span className="text-[10px] text-slate-300 font-medium truncate w-full px-1 text-center">{app.name}</span>
              </motion.button>
            )) : (
              <div className="col-span-full py-10 text-center text-xs text-slate-500 italic">No matches found</div>
            )}
          </div>
        </section>

        {/* Recommended Section: Stacked on mobile, 2 columns on tablet+ */}
        <section className="px-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <RecentFile icon="PDF" name="Resume_2025.pdf" time="2h ago" color="text-red-500" bg="bg-red-500/10" />
            <RecentFile icon="PY" name="Weather_API.py" time="Yesterday" color="text-indigo-400" bg="bg-indigo-400/10" />
          </div>
        </section>
      </div>

      {/* Static Footer: Always pinned to bottom of menu */}
      <div className="p-4 bg-black/40 border-t border-white/5 flex justify-between items-center px-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-[10px]">
            R
          </div>
          <span className="text-xs font-semibold text-slate-200">Roli Rathour</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={closeMenu}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

function RecentFile({ icon, name, time, color, bg }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/5"
    >
      <div className={`w-9 h-9 rounded-lg shrink-0 ${bg} flex items-center justify-center ${color}`}>
        <span className="text-[9px] font-bold">{icon}</span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-slate-200 font-medium truncate">{name}</span>
        <span className="text-[9px] text-slate-500">{time}</span>
      </div>
    </motion.div>
  );
}
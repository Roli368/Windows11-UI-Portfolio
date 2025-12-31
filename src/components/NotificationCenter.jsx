import { useState, } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationCenter({ closeCenter }) {
  // 1. Functional Notification State
  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Update", body: "Your portfolio is now v2.0.5 stable.", time: "Just now" },
    { id: 2, title: "GitHub", body: "New star on your ML Repository!", time: "2h ago" },
    { id: 3, title: "Achievement", body: "HackVision NSUT certificate added.", time: "5h ago" },
  ]);

  // 2. Dynamic Calendar Logic
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date()); // Allows for month switching

  const currentMonthName = viewDate.toLocaleString('default', { month: 'long' });
  const currentYear = viewDate.getFullYear();
  
  // Logic for grid alignment
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();

  const clearAll = () => setNotifications([]);
  const removeNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-[calc(100vh-48px)] w-full sm:w-[360px] bg-[#0f172a]/80 backdrop-blur-3xl border-l border-white/10 shadow-2xl z-[10000] p-6 flex flex-col gap-6 select-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-white tracking-tight">Notification Center</h3>
          <p className="text-[10px] text-slate-500 font-mono">v2.0.5.build_stable</p>
        </div>
        {notifications.length > 0 && (
          <button 
            onClick={clearAll}
            className="text-[10px] px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-slate-400 hover:text-white transition-all"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1">
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <motion.div 
                layout
                key={n.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-default"
              >
                <button 
                  onClick={() => removeNotif(n.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-slate-500 hover:text-red-400 transition-all"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <div className="flex justify-between items-center mb-1 pr-4">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{n.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{n.body}</p>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="h-full flex flex-col items-center justify-center text-slate-500 text-xs gap-2"
            >
              <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center opacity-40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <span className="italic">All caught up!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Calendar Section */}
      <div className="border-t border-white/10 pt-6">
        <div className="flex justify-between items-center mb-5 px-1">
          <span className="text-xs font-bold text-white tracking-wide">{currentMonthName} {currentYear}</span>
          <div className="flex gap-2 text-slate-400">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1 hover:bg-white/10 rounded-md hover:text-white transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1 hover:bg-white/10 rounded-md hover:text-white transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 text-center gap-y-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
            <span key={d} className="text-[9px] font-black text-slate-600 uppercase h-8 flex items-center justify-center">{d}</span>
          ))}
          
          {/* Calendar Grid Generation */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = 
              dayNum === today.getDate() && 
              viewDate.getMonth() === today.getMonth() && 
              viewDate.getFullYear() === today.getFullYear();

            return (
              <div key={dayNum} className="flex items-center justify-center h-8">
                <span className={`text-[11px] w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-default
                  ${isToday 
                    ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/40 scale-110' 
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}>
                  {dayNum}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
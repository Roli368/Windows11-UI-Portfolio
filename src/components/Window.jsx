
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

export default function Window({ 
  title, 
  onClose, 
  onMinimize, 
  onFocus, 
  isActive, 
  style, 
  children 
}) {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // Prevents the window from being dragged while maximized
  const handleToggleMaximize = (e) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      bounds="parent"
      disabled={isMaximized} // Windows can't be dragged when maximized
      onStart={onFocus}
    >
      <motion.div
        ref={nodeRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
          width: isMaximized ? "100vw" : "750px",
          height: isMaximized ? "calc(100vh - 48px)" : "auto", // Account for Taskbar
          top: isMaximized ? 0 : "auto",
          left: isMaximized ? 0 : "auto",
        }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={onFocus}
        style={{ ...style, position: isMaximized ? "fixed" : "absolute" }}
        className={`flex flex-col bg-[#0f172a]/90 backdrop-blur-2xl border 
                   overflow-hidden transition-all duration-500 ease-out
                   ${isMaximized ? "rounded-none z-[60]" : "rounded-lg shadow-2xl"}
                   ${isActive 
                     ? "border-white/20 ring-1 ring-white/10 shadow-indigo-500/10" 
                     : "border-white/5 opacity-90 shadow-none"}`}
      >
        {/* Windows 11 Title Bar */}
        <div 
          onDoubleClick={handleToggleMaximize}
          className={`window-header flex justify-between items-center h-9
                        border-b transition-colors select-none
                        ${isActive ? "bg-white/10 border-white/10" : "bg-transparent border-transparent"}`}
        >
          {/* Left Side: Title */}
          <div className="flex items-center gap-3 px-3 pointer-events-none">
            <span className={`text-[11px] font-medium tracking-tight
                            ${isActive ? "text-slate-200" : "text-slate-500"}`}>
              {title}
            </span>
          </div>

          {/* Right Side: Windows Control Buttons */}
          <div className="flex items-center h-full">
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="white" /></svg>
            </button>

            <button 
              onClick={handleToggleMaximize}
              className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="0.5" y="0.5" width="9" height="9" stroke="white" strokeWidth="1" />
              </svg>
            </button>

            {/* Close Button - Turns Red on Hover */}
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-12 h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white transition-colors group"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover:text-white">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area with dynamic height */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar bg-black/10 
                        ${isMaximized ? "p-6" : "p-0"}`}>
          {children}
        </div>
      </motion.div>
    </Draggable>
  );
}
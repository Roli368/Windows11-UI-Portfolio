

import { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsMaximized(true); // Force full-screen on phones
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMaximize = (e) => {
    if (isMobile) return; // Prevent resizing on mobile
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      bounds="parent"
      // Disable dragging on mobile or when maximized
      disabled={isMaximized || isMobile} 
      onStart={onFocus}
    >
      <motion.div
        ref={nodeRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
          // Use dynamic viewport units for mobile stability
          width: isMaximized ? "100vw" : isMobile ? "95vw" : "750px",
          height: isMaximized ? "calc(100dvh - 48px)" : "auto", 
          maxHeight: isMaximized ? "100dvh" : "80dvh",
          top: isMaximized ? 0 : "auto",
          left: isMaximized ? 0 : "auto",
        }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={onFocus}
        style={{ 
          ...style, 
          position: isMaximized ? "fixed" : "absolute",
          touchAction: "none" // Prevents browser scrolling while dragging on touch
        }}
        className={`flex flex-col bg-[#0f172a]/95 backdrop-blur-2xl border 
                   overflow-hidden transition-all duration-300 ease-out
                   ${isMaximized ? "rounded-none z-[60]" : "rounded-xl shadow-2xl"}
                   ${isActive 
                     ? "border-white/20 ring-1 ring-white/10 shadow-indigo-500/10" 
                     : "border-white/5 opacity-90"}`}
      >
        
        {/* Header - Taller on mobile for easier tapping */}
        <div 
          onDoubleClick={handleToggleMaximize}
          className={`window-header flex justify-between items-center h-10 sm:h-9
                        border-b transition-colors select-none
                        ${isActive ? "bg-white/10 border-white/10" : "bg-transparent border-transparent"}`}
        >
          
          <div className="flex items-center gap-3 px-3 pointer-events-none">
            <span className={`text-[11px] font-medium tracking-tight
                            ${isActive ? "text-slate-200" : "text-slate-500"}`}>
              {title}
            </span>
          </div>

          <div className="flex items-center h-full">
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-10 sm:w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="white" /></svg>
            </button>

            {/* Hide Maximize button on mobile */}
            {!isMobile && (
              <button 
                onClick={handleToggleMaximize}
                className="w-12 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <rect x="0.5" y="0.5" width="9" height="9" stroke="white" strokeWidth="1" />
                </svg>
              </button>
            )}

            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-10 sm:w-12 h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white transition-colors group"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={`flex-1 overflow-y-auto custom-scrollbar bg-black/10 
                        ${isMaximized ? "p-4 sm:p-6" : "p-0"}`}>
          {children}
        </div>
      </motion.div>
    </Draggable>
  );
}


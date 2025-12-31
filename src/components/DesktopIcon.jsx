

import { motion } from "framer-motion";

export default function DesktopIcon({ label, onDoubleClick }) {
  // Logic to determine icon style based on file extension
  const getFileStyle = (fileName) => {
    if (fileName.endsWith(".py")) return { color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/30", isShortcut: false };
    if (fileName.endsWith(".pdf")) return { color: "text-red-500", bg: "bg-red-500/15", border: "border-red-500/30", isShortcut: false };
    if (fileName.endsWith(".exe") || fileName.endsWith(".sh")) return { color: "text-indigo-400", bg: "bg-indigo-500/15", border: "border-indigo-500/30", isShortcut: true };
    // Default Folder style
    return { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", isShortcut: false };
  };

  const renderIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    
    if (ext === 'py') {
      return (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M12.12 1.5c-2.48 0-2.33 2.15-2.33 2.15l.01 2.22h4.74V7.2H9.8c-2.46 0-4.8 1.4-4.8 3.82v2.79c0 2.41 1.63 3.65 4.1 3.65h1.4v-1.9c0-2.12 1.73-3.66 3.85-3.66h4.7c2.11 0 3.81-1.74 3.81-3.85V5.33c0-2.11-1.63-3.83-3.75-3.83h-7zm-1.87 1.45a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46zM11.88 22.5c2.48 0 2.33-2.15 2.33-2.15l-.01-2.22H9.46v-1.33h4.74c2.46 0 4.8-1.4 4.8-3.82v-2.79c0-2.41-1.63-3.65-4.1-3.65h-1.4v1.9c0 2.12-1.73 3.66-3.85 3.66H5.02c-2.11 0-3.81 1.74-3.81 3.85v2.72c0 2.11 1.63 3.83 3.75 3.83h6.92zm1.87-1.45a.73.73 0 1 1 0-1.46.73.73 0 0 1 0 1.46z"/>
        </svg>
      );
    }
    if (ext === 'pdf') {
      return (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM11 11h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      </svg>
    );
  };

  const style = getFileStyle(label);

  const handleTouchOpen = () => {
    // Detect if the device is a touch device
    if (window.innerWidth <= 1024) {
      onDoubleClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }} // Visual feedback for mobile taps
      onDoubleClick={onDoubleClick}
      onClick={handleTouchOpen} // Single tap open for mobile
      className="group flex flex-col items-center gap-2 cursor-pointer select-none w-20 sm:w-24 py-2"
    >
      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl 
                      ${style.bg} ${style.border} border backdrop-blur-md
                      shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300`}>
        
        <div className={`${style.color} drop-shadow-md`}>
          {renderIcon(label)}
        </div>

        {style.isShortcut && (
          <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white/90 rounded-sm flex items-center justify-center shadow-sm border border-black/10">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="black">
              <path d="M21 7l-4.5 4.5 1.5 1.5H12v-6l1.5 1.5L18 3l3 4zM5 21h14v-8H5v8z" />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      </div>

      <span className="text-[10px] sm:text-[11px] font-medium text-slate-200 text-center px-2 py-0.5 
                       rounded leading-tight group-hover:bg-indigo-600/80 group-hover:text-white 
                       transition-all duration-200 shadow-sm drop-shadow-lg max-w-full truncate">
        {label}
      </span>
    </motion.div>
  );
}
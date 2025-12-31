

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ContextMenu({ x, y, close }) {
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: y, left: x });

  useEffect(() => {
    // Edge detection logic to keep menu on screen
    if (menuRef.current) {
      const menuWidth = menuRef.current.offsetWidth;
      const menuHeight = menuRef.current.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let newLeft = x;
      let newTop = y;

      // If menu goes off right edge, shift it left
      if (x + menuWidth > screenWidth) {
        newLeft = x - menuWidth;
      }

      // If menu goes off bottom edge, shift it up
      if (y + menuHeight > screenHeight) {
        newTop = y - menuHeight;
      }

      setCoords({ top: newTop, left: newLeft });
    }
  }, [x, y]);

  return (
    <motion.div 
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-[10002] w-48 bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 text-white select-none"
      style={{ top: coords.top, left: coords.left }}
      onClick={close}
    >
      <ContextMenuItem label="Refresh Desktop" icon="🔄" />
      <div className="my-1 border-t border-white/5" />
      <ContextMenuItem label="Personalize" icon="🎨" />
      <ContextMenuItem label="Display Settings" icon="🖥️" />
      <div className="my-1 border-t border-white/5" />
      <ContextMenuItem label="Open in Terminal" icon="💻" />
    </motion.div>
  );
}

function ContextMenuItem({ label, icon, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full px-4 py-2 text-left text-[11px] font-medium flex items-center gap-3 hover:bg-indigo-600/80 transition-all group"
    >
      <span className="text-sm opacity-80 group-hover:opacity-100">{icon}</span>
      <span className="text-slate-200 group-hover:text-white">{label}</span>
    </button>
  );
}
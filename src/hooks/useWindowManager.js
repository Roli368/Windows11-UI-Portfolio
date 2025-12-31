

import { useState, useCallback } from "react";

export default function useWindowManager() {
  const [windows, setWindows] = useState([]); 
  const [minimized, setMinimized] = useState([]); 
  const [activeWindow, setActiveWindow] = useState(null);

  // Improved Focus Logic: Updates state and moves ID to front of stack
  const focusWindow = useCallback((id) => {
    if (!id) return; //
    setActiveWindow(id);
    setWindows((prev) => {
      if (prev[prev.length - 1] === id) return prev; // Already on top
      const filtered = prev.filter((w) => w !== id);
      return [...filtered, id];
    });
  }, []);

  const open = useCallback((id) => {
    if (!windows.includes(id)) {
      setWindows((prev) => [...prev, id]);
    }
    
    if (minimized.includes(id)) {
      setMinimized((prev) => prev.filter((w) => w !== id));
    }

    focusWindow(id);
  }, [windows, minimized, focusWindow]);

  const close = useCallback((id) => {
    setWindows((prev) => {
      const newWindows = prev.filter((w) => w !== id);
      // Hand over focus to the next window in the stack if the active one is closed
      if (activeWindow === id) {
        setActiveWindow(newWindows.length > 0 ? newWindows[newWindows.length - 1] : null);
      }
      return newWindows;
    });
    setMinimized((prev) => prev.filter((w) => w !== id));
  }, [activeWindow]);

  const toggleMinimize = useCallback((id) => {
    const isMinimized = minimized.includes(id);
    
    if (isMinimized) {
      setMinimized((prev) => prev.filter((w) => w !== id));
      focusWindow(id);
    } else if (activeWindow === id) {
      setMinimized((prev) => [...prev, id]);
      // When minimizing, focus the next available non-minimized window
      setWindows((prev) => {
        const remaining = prev.filter(w => w !== id && !minimized.includes(w));
        setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
        return prev;
      });
    } else {
      focusWindow(id);
    }
  }, [minimized, activeWindow, focusWindow]);

  return { 
    windows, activeWindow, minimized, open,  close,  toggleMinimize,  focusWindow, setActiveWindow // FIX: Added this to resolve the 'not a function' error
  };
}


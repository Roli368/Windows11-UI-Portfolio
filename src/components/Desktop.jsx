
/*
   import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowManager from "../hooks/useWindowManager";

// Components
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import ContextMenu from "./ContextMenu";

// App Imports
import AboutApp from "../apps/AboutApp";
import ProjectsApp from "../apps/ProjectsApp";
import SkillsApp from "../apps/SkillsApp";
import AchievementsApp from "../apps/AchievementsApp";
import ContactApp from "../apps/ContactApp";
import ResumeApp from "../apps/ResumeApp";

export default function Desktop() {
  const { 
    windows, 
    activeWindow, 
    minimized, 
    open, 
    close, 
    toggleMinimize, 
    setActiveWindow 
  } = useWindowManager();
  
  const [selectRect, setSelectRect] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [snappedWindows, setSnappedWindows] = useState({});

  // 1. Ensure all 6 apps are registered and sorted
  const apps = useMemo(() => [
    { id: "about", label: "About.exe", component: <AboutApp /> },
    { id: "projects", label: "Projects.py", component: <ProjectsApp /> },
    { id: "skills", label: "Skills.sh", component: <SkillsApp /> },
    { id: "achievements", label: "Awards.log", component: <AchievementsApp /> },
    { id: "resume", label: "Resume.pdf", component: <ResumeApp /> }, 
    { id: "contact", label: "Contact.api", component: <ContactApp /> },
  ].sort((a, b) => a.label.localeCompare(b.label)), []);

  const handleSnap = (id, layout) => {
    setSnappedWindows(prev => ({ ...prev, [id]: layout }));
    setActiveWindow(id);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeWindow) close(activeWindow);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWindow, close]);

  const startSelection = useCallback((e) => {
    if (e.target.id === "desktop-container" && window.innerWidth > 768) {
      setContextMenu(null);
      setSelectRect({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
    }
  }, []);

  const updateSelection = useCallback((e) => {
    if (selectRect) {
      setSelectRect(prev => ({ 
        ...prev, 
        w: e.clientX - prev.x, 
        h: e.clientY - prev.y 
      }));
    }
  }, [selectRect]);

  return (
    <div
      id="desktop-container"
      onMouseDown={startSelection}
      onMouseMove={updateSelection}
      onMouseUp={() => setSelectRect(null)}
      onContextMenu={(e) => { 
        if (window.innerWidth > 768) {
          e.preventDefault(); 
          setContextMenu({ x: e.clientX, y: e.clientY }); 
        }
      }}
      className="w-screen h-screen relative overflow-hidden font-sans select-none bg-[#020617]"
    >
     
      <motion.div 
        initial={{ scale: 1.05, filter: "blur(10px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/assets/wallpaper.jpg')" }}
      />
      
      {selectRect && (
        <div 
          className="absolute border border-indigo-400/50 bg-indigo-500/10 z-[10002] pointer-events-none"
          style={{
            left: selectRect.w > 0 ? selectRect.x : selectRect.x + selectRect.w,
            top: selectRect.h > 0 ? selectRect.y : selectRect.y + selectRect.h,
            width: Math.abs(selectRect.w),
            height: Math.abs(selectRect.h),
          }}
        />
      )}

      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          close={() => setContextMenu(null)} 
        />
      )}

      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 grid grid-cols-4 sm:grid-cols-1 md:grid-flow-col md:grid-rows-[repeat(auto-fill,110px)] gap-y-4 gap-x-2 sm:gap-y-6 sm:gap-x-4 w-fit h-[calc(100vh-100px)] z-10">
        {apps.map((app) => (
          <DesktopIcon 
            key={app.id}
            label={app.label} 
            iconId={app.id} 
            onDoubleClick={() => open(app.id)} 
            onClick={() => { if(window.innerWidth < 768) open(app.id) }} 
          />
        ))}
      </div>

      <AnimatePresence>
        {apps.map((app) => {
          const isVisible = windows.includes(app.id) && !minimized.includes(app.id);
          const isActive = activeWindow === app.id;
          const snapLayout = snappedWindows[app.id];

          return isVisible && (
            <Window 
              key={app.id} 
              id={app.id}
              title={app.label} 
              onClose={() => {
                close(app.id);
                setSnappedWindows(prev => { const n = {...prev}; delete n[app.id]; return n; });
              }}
              onMinimize={() => toggleMinimize(app.id)}
              onFocus={() => setActiveWindow(app.id)}
              onSnap={handleSnap}
              snapLayout={snapLayout}
              isActive={isActive}
              style={{ zIndex: isActive ? 50 : 40 }}
            >
              {app.component}
            </Window>
          );
        })}
      </AnimatePresence>

      <div className="absolute bottom-0 w-full z-[10001]">
        <Taskbar 
          windows={windows} 
          minimized={minimized}
          activeWindow={activeWindow} 
          openApp={open}
          toggleMinimize={toggleMinimize}
          allApps={apps} 
        />
      </div>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_250px_rgba(0,0,0,0.5)] bg-black/5" />
    </div>
  );
}

*/
import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowManager from "../hooks/useWindowManager";

// Components
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import ContextMenu from "./ContextMenu";

// App Imports
import AboutApp from "../apps/AboutApp";
import ProjectsApp from "../apps/ProjectsApp";
import SkillsApp from "../apps/SkillsApp";
import AchievementsApp from "../apps/AchievementsApp";
import ContactApp from "../apps/ContactApp";
import ResumeApp from "../apps/ResumeApp";

export default function Desktop() {
  const { 
    windows, 
    activeWindow, 
    minimized, 
    open, 
    close, 
    toggleMinimize, 
    setActiveWindow 
  } = useWindowManager();
  
  const [selectRect, setSelectRect] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [snappedWindows, setSnappedWindows] = useState({});

  const apps = useMemo(() => [
    { id: "about", label: "About.exe", component: <AboutApp /> },
    { id: "projects", label: "Projects.py", component: <ProjectsApp /> },
    { id: "skills", label: "Skills.sh", component: <SkillsApp /> },
    { id: "achievements", label: "Awards.log", component: <AchievementsApp /> },
    { id: "resume", label: "Resume.pdf", component: <ResumeApp /> }, 
    { id: "contact", label: "Contact.api", component: <ContactApp /> },
  ].sort((a, b) => a.label.localeCompare(b.label)), []);

  const handleSnap = (id, layout) => {
    setSnappedWindows(prev => ({ ...prev, [id]: layout }));
    setActiveWindow(id);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeWindow) close(activeWindow);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWindow, close]);

  const startSelection = useCallback((e) => {
    // Disable selection rectangle on mobile/tablets
    if (e.target.id === "desktop-container" && window.innerWidth > 1024) {
      setContextMenu(null);
      setSelectRect({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
    }
  }, []);

  const updateSelection = useCallback((e) => {
    if (selectRect) {
      setSelectRect(prev => ({ 
        ...prev, 
        w: e.clientX - prev.x, 
        h: e.clientY - prev.y 
      }));
    }
  }, [selectRect]);

  return (
    <div
      id="desktop-container"
      onMouseDown={startSelection}
      onMouseMove={updateSelection}
      onMouseUp={() => setSelectRect(null)}
      onContextMenu={(e) => { 
        // Only allow context menu on larger screens
        if (window.innerWidth > 1024) {
          e.preventDefault(); 
          setContextMenu({ x: e.clientX, y: e.clientY }); 
        }
      }}
      // Use dvh for mobile browser stability
      className="w-full h-[100dvh] relative overflow-hidden font-sans select-none bg-[#020617]"
    >
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05, filter: "blur(10px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/assets/wallpaper.jpg')" }}
      />
      
      {selectRect && (
        <div 
          className="absolute border border-indigo-400/50 bg-indigo-500/10 z-[10002] pointer-events-none"
          style={{
            left: selectRect.w > 0 ? selectRect.x : selectRect.x + selectRect.w,
            top: selectRect.h > 0 ? selectRect.y : selectRect.y + selectRect.h,
            width: Math.abs(selectRect.w),
            height: Math.abs(selectRect.h),
          }}
        />
      )}

      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          close={() => setContextMenu(null)} 
        />
      )}

      {/* Responsive Grid: 
          - Grid-cols-4 on tiny screens, Single column on desktop 
          - Safe area padding for notched phones
      */}
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 md:grid-flow-col md:grid-rows-[repeat(auto-fill,100px)] gap-y-6 gap-x-4 w-fit h-[calc(100dvh-120px)] z-10 p-[env(safe-area-inset-top)_env(safe-area-inset-left)]">
        {apps.map((app) => (
          <DesktopIcon 
            key={app.id}
            label={app.label} 
            iconId={app.id} 
            // Standard desktop behavior
            onDoubleClick={() => open(app.id)} 
            // Immediate open for touch devices
            onClick={() => { if(window.innerWidth <= 1024) open(app.id) }} 
          />
        ))}
      </div>

      <AnimatePresence>
        {apps.map((app) => {
          const isVisible = windows.includes(app.id) && !minimized.includes(app.id);
          const isActive = activeWindow === app.id;
          const snapLayout = snappedWindows[app.id];

          return isVisible && (
            <Window 
              key={app.id} 
              id={app.id}
              title={app.label} 
              onClose={() => {
                close(app.id);
                setSnappedWindows(prev => { const n = {...prev}; delete n[app.id]; return n; });
              }}
              onMinimize={() => toggleMinimize(app.id)}
              onFocus={() => setActiveWindow(app.id)}
              onSnap={handleSnap}
              snapLayout={snapLayout}
              isActive={isActive}
              style={{ zIndex: isActive ? 50 : 40 }}
            >
              {app.component}
            </Window>
          );
        })}
      </AnimatePresence>

      <div className="absolute bottom-0 w-full z-[10001]">
        <Taskbar 
          windows={windows} 
          minimized={minimized}
          activeWindow={activeWindow} 
          openApp={open}
          toggleMinimize={toggleMinimize}
          allApps={apps} 
        />
      </div>

      {/* Overlay Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.4)] bg-black/5" />
    </div>
  );
}
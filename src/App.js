

import Desktop from "./components/Desktop";

export default function App() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 antialiased selection:bg-indigo-500/30">
      {/* The Desktop component handles the wallpaper, icon grid, 
        and the window management logic.
      */}
      <Desktop />

      {/* Global Styles for custom scrollbars and animations 
        (Can also be moved to index.css)
      */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </main>
  );
}



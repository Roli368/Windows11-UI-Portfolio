export default function ContextMenu({ x, y, close }) {
  return (
    <div 
      className="fixed z-[10002] w-44 bg-slate-900/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl py-1 text-white"
      style={{ top: y, left: x }}
      onClick={close}
    >
      <button className="w-full px-3 py-1.5 text-left text-xs hover:bg-indigo-600 transition-colors">Refresh Desktop</button>
      <button className="w-full px-3 py-1.5 text-left text-xs hover:bg-indigo-600 transition-colors">Personalize</button>
    </div>
  );
}
import { projects } from "../data/projects";
import { ExternalLink, Github, Trophy, Code2, PlayCircle } from 'lucide-react';

export default function ProjectsApp() {
  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar pb-24 scroll-smooth">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
        {projects.map((p) => (
          <div 
            key={p.title} 
            className="group flex flex-col bg-[#0f172a]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-500 shadow-2xl h-fit"
          >
            {/* Media Section: Image Base with Video Hover Overlay */}
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden border-b border-white/5">
              
              {/* 1. Static Image (Base Layer) */}
              {p.image ? (
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-10" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : null}

              {/* 2. Video Overlay (Triggered on group-hover) */}
              {p.video ? (
                <video 
                  src={p.video} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-20 
                    ${p.image ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : !p.image && (
                /* 3. Placeholder if media is missing */
                <div className="flex flex-col items-center gap-4 opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110">
                  <PlayCircle size={48} className="text-indigo-400" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white text-center px-4">
                    Media Preview Pending
                  </span>
                </div>
              )}

              {/* Achievement Badge */}
              {p.achievement && (
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 text-[10px] font-bold rounded-full flex items-center gap-2 shadow-lg">
                  <Trophy size={12} className="animate-bounce" />
                  {p.achievement}
                </div>
              )}

              {/* Tech Tags */}
              <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-1.5 max-w-[90%]">
                {p.tech.split(',').slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[9px] bg-black/60 backdrop-blur-md text-indigo-300 rounded-md border border-white/5 font-mono uppercase">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col flex-grow relative z-20">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-bold text-xl group-hover:text-indigo-400 transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                    {p.category || 'Development'}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-400/80 font-bold uppercase tracking-[0.15em]">
                  {p.subtitle || 'Technical Project'}
                </p>
              </div>
              
              <p className="text-[13px] text-slate-400 leading-relaxed mb-8 line-clamp-3">
                {p.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-4">
                  <a 
                    href={p.github || "https://github.com/Roli368"} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  {p.liveDemo && (
                    <a 
                      href={p.liveDemo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                
                <button className="p-2 rounded-full bg-white/5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-500 hover:text-white translate-x-4 group-hover:translate-x-0 shadow-lg">
                  <Code2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
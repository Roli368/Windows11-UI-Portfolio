import { achievements } from "../data/achievements";
import { Award, CheckCircle, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function AchievementsApp() {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto h-full overflow-y-auto no-scrollbar pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Award size={22} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-white font-bold tracking-tight text-lg">Milestones & Certifications</h2>
            <p className="text-[10px] text-slate-500 font-mono">Verified_Achievements.log</p>
          </div>
        </div>
      </div>

      {/* Achievement List */}
      <div className="grid gap-4">
        {achievements.map((a, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start justify-between gap-6 p-5 bg-[#0f172a]/40 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-white/5 transition-all group relative overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex items-start gap-5 text-left relative z-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                <CheckCircle size={20} className="text-indigo-400 group-hover:text-indigo-300" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-white text-[15px] font-bold leading-tight tracking-tight">
                    {a.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-bold uppercase tracking-tighter">
                    {a.category}
                  </span>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                  {a.description}
                </p>
                
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest bg-slate-900/50 px-2 py-1 rounded">
                    Verified {a.date}
                  </span>
                  
                  {/* FUNCTIONAL LINK: Opens the certificate in a new tab */}
                  <a 
                    href={a.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400/70 hover:text-indigo-400 text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    <ExternalLink size={12} /> View Details
                  </a>
                </div>
              </div>
            </div>

            {/* CLICKABLE PREVIEW: Users can also click the image to view full-screen */}
            <a 
              href={a.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="shrink-0 w-full sm:w-32 aspect-video border border-dashed border-slate-700 rounded-xl bg-slate-800/20 flex items-center justify-center group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all relative z-10 overflow-hidden cursor-zoom-in"
            >
                {a.image ? (
                  <img 
                    src={a.image} 
                    alt="Certificate" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-all">
                    <ImageIcon size={16} className="text-slate-500" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Preview</span>
                  </div>
                )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
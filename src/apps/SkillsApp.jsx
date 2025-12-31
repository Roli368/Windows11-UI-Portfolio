import { skillCategories } from "../data/skills";
import { Code2, BrainCircuit, Globe, ShieldCheck } from 'lucide-react';

const icons = [ <Code2 size={16}/>, <BrainCircuit size={16}/>, <Globe size={16}/>, <ShieldCheck size={16}/> ];

export default function SkillsApp() {
  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-5xl mx-auto custom-scrollbar overflow-y-auto h-full select-none text-slate-300">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="w-1.5 h-7 bg-indigo-500 rounded-full"></span>
          Technical Expertise
        </h2>
        <p className="text-[10px] text-slate-500 font-mono italic">system.capabilities_array()</p>
      </div>

      {/* Grid of Categorized Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillCategories.map((cat, idx) => (
          <div 
            key={idx} 
            className="p-6 bg-[#0f172a]/30 backdrop-blur-md border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  {icons[idx]}
                </div>
                <h3 className="text-white font-bold text-sm tracking-wide">{cat.title}</h3>
              </div>
              <span className="text-[9px] font-black uppercase text-indigo-500/60 bg-indigo-500/5 px-2 py-1 rounded border border-indigo-500/10">
                {cat.level}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[11px] text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Style Note */}
      <div className="p-4 bg-black/20 rounded-2xl border border-white/5 font-mono text-[10px] text-slate-500">
        <span className="text-indigo-400 mr-2">➜</span> 
        Note: Skills are evidenced by live projects in the <span className="text-white underline underline-offset-4 decoration-indigo-500/50">Projects</span> directory.
      </div>
    </div>
  );
}
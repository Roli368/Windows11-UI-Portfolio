
import { Download, MapPin, Briefcase, GraduationCap, Github, Linkedin, Mail } from 'lucide-react';

export default function ResumeApp() {
  const skills = [
    'Python', 'C++', 'JavaScript', 'Machine Learning', 'Deep Learning', 
    'React.js', 'Next.js', 'Flask', 'SQL', 'MongoDB', 'Docker'
  ];

  return (
    <div className="flex h-full bg-slate-950 text-slate-300 font-sans overflow-hidden">
      {/* Sidebar: Profile & Skills [cite: 1, 6] */}
      <div className="w-1/3 bg-slate-900/50 border-r border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-white tracking-tight">Roli Rathour</h2>
          <p className="text-xs text-indigo-400 font-mono mt-1 italic">Materials Engineering Student</p>
        </div>

        <div className="space-y-6">
          {/* Education [cite: 4, 5] */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Education</h4>
            <div className="space-y-4 border-l-2 border-indigo-500/30 pl-3">
              <div>
                <p className="text-[11px] text-slate-200 font-bold">MNNIT Allahabad</p>
                <p className="text-[10px] opacity-70">B.Tech Materials Engineering</p>
                <p className="text-[9px] text-indigo-400">2024 — 2028 | GPA: 8.35</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-200 font-bold">JNV Lakhimpur-Kheri</p>
                <p className="text-[10px] opacity-70">Class XII: 90.4% (2023)</p>
                <p className="text-[10px] opacity-70">Class X: 94.6% (2021)</p>
              </div>
            </div>
          </div>

          {/* Technical Stack [cite: 6, 7, 11] */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Technical Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-slate-800 text-[9px] rounded border border-slate-700 text-slate-300 uppercase tracking-tighter">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links [cite: 2, 3] */}
          <div className="pt-2 space-y-2 border-t border-slate-800/50">
            <a href="mailto:rolirathour368@gmail.com" className="flex items-center gap-2 text-[10px] hover:text-white transition-colors">
              <Mail size={12} className="text-indigo-500" /> rolirathour368@gmail.com
            </a>
            <a href="https://linkedin.com/in/roli-rathour-43a711218" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] hover:text-white transition-colors">
              <Linkedin size={12} className="text-indigo-500" /> LinkedIn Profile
            </a>
            <a href="https://github.com/Roli368" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] hover:text-white transition-colors">
              <Github size={12} className="text-indigo-500" /> GitHub: Roli368
            </a>
          </div>
        </div>
      </div>

      {/* Main Content: Experience & Projects [cite: 16, 35] */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#0d1117] no-scrollbar">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-tighter">RoliRathour_Resume.pdf</span>
            <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-500/20">
              <Download size={12} strokeWidth={3} /> Download PDF
            </button>
          </div>

          <section className="space-y-10">
            {/* Experience / POR [cite: 35, 36, 37] */}
            <div>
              <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                Positions of Responsibility
              </h3>
              <div className="space-y-6">
                <PORItem 
                  role="Campus Ambassador" 
                  org="GirlScript Summer of Code 2025" 
                  date="Jun 2025 — Aug 2025" 
                  active 
                />
                <PORItem 
                  role="Media Team Member" 
                  org="Robotics Club, MNNIT" 
                  date="Feb 2025 — Dec 2025" 
                />
                <PORItem 
                  role="Content Team Member" 
                  org="E-Cell, MNNIT" 
                  date="Feb 2025 — Present" 
                />
              </div>
            </div>

            {/* Key Projects [cite: 16, 17, 24, 30] */}
            <div>
              <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-6">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                Technical Projects
              </h3>
              <div className="space-y-8">
                <ProjectItem 
                  name="Sanjeevani" 
                  sub="Disaster Management Platform" 
                  date="Sep-Dec 2025"
                  desc="IoT-based early warning system for water quality and disease risk prediction. Built ML models for hotspot prediction and automated alert mechanisms."
                  tech="Flask, Scikit-learn, MongoDB, Express.js"
                />
                <ProjectItem 
                  name="Anant Yatra" 
                  sub="Car Booking Web Application" 
                  date="Dec-Jan 2025"
                  desc="Developed a real-time car booking platform with OSRM integration for fare estimation and interactive UI components."
                  tech="React.js, Tailwind CSS, OpenStreetMap, Vercel"
                />
              </div>
            </div>

            {/* Achievements [cite: 38, 39, 44] */}
            <section className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
              <h3 className="text-indigo-300 text-[10px] font-bold mb-3 uppercase tracking-widest">Achievements</h3>
              <ul className="text-xs space-y-2 text-slate-400 list-disc list-inside marker:text-indigo-500">
                <li>Secured 3rd Position in Internal SIH 2025 [cite: 39]</li>
                <li>3rd Position in Viral Vision event at MNNIT Allahabad [cite: 44]</li>
              </ul>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

function PORItem({ role, org, date, active }) {
  return (
    <div className="relative pl-6 border-l border-slate-800 space-y-1">
      <div className={`absolute -left-1.5 top-0.5 w-3 h-3 bg-slate-900 border ${active ? 'border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]' : 'border-slate-700'} rounded-full`}></div>
      <div className="flex justify-between items-start">
        <h4 className="text-slate-100 font-bold text-xs">{role}</h4>
        <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-mono tracking-tighter uppercase">{date}</span>
      </div>
      <p className="text-[11px] text-indigo-400 font-medium">{org}</p>
    </div>
  );
}

function ProjectItem({ name, sub, date, desc, tech }) {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-baseline">
        <h4 className="text-slate-100 font-bold text-sm tracking-tight group-hover:text-indigo-400 transition-colors">
          {name} <span className="text-[10px] font-normal text-slate-500 ml-2 italic">/ {sub}</span>
        </h4>
        <span className="text-[9px] text-slate-500 font-mono">{date}</span>
      </div>
      <p className="text-[11px] leading-relaxed text-slate-400">{desc}</p>
      <div className="flex flex-wrap gap-1.5 pt-1 opacity-60">
        {tech.split(', ').map(t => (
          <span key={t} className="text-[9px] text-indigo-300 font-mono">#{t}</span>
        ))}
      </div>
    </div>
  );
}
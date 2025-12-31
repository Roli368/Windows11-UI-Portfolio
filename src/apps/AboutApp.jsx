import { BrainCircuit, Sparkles, GraduationCap, Github, Linkedin, Mail, ShieldCheck, User } from 'lucide-react';

export default function AboutApp() {
  return (
    <div className="w-full h-full p-6 sm:p-10 space-y-10 max-w-6xl mx-auto overflow-y-auto no-scrollbar select-none text-slate-300">
      
      {/* Header Section with Profile Photo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div className="flex items-center gap-6 text-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-24 h-24 rounded-full border-2 border-white/10 overflow-hidden bg-slate-800 flex items-center justify-center">
              <img 
                src="/assets/Profile.jpg" 
                alt="Roli Rathour" 
                className="w-full h-full object-cover z-10"
                onError={(e) => { e.target.style.display = 'none'; }}
              /> 
              <User size={40} className="text-slate-500 absolute" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Roli Rathour</h1>
            <p className="text-indigo-400 font-medium flex flex-wrap items-center gap-2">
              <BrainCircuit size={16} /> Materials Engineering | Data Scientist | Web Developer
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-1">system.status(online)</p>
          </div>
        </div>
        
        {/* Social Quick-Links Section */}
        <div className="flex gap-3">
          <SocialLink href="https://github.com/Roli368" icon={<Github size={18} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/roli-rathour" icon={<Linkedin size={18} />} label="LinkedIn" />
          <SocialLink href="mailto:rolirathour368@gmail.com" icon={<Mail size={18} />} label="Email" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Profile & Skills */}
        <div className="space-y-6">
          <div className="space-y-4 text-left">
            <h3 className="text-white font-bold text-lg border-l-4 border-indigo-500 pl-3">Profile</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              I am a <span className="text-white font-medium">Data Scientist</span> and <span className="text-white font-medium">Full-Stack Web Developer</span> passionate about building intelligent, scalable systems and data-driven user interfaces. I specialize in leveraging advanced <span className="text-white font-medium">AI/ML</span> techniques and modern web frameworks to transform complex datasets into high-impact digital solutions.
            </p>
          </div>
          
          <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-start gap-3 text-left">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs leading-normal italic text-slate-400">
              Passionate about transforming data into digital intelligence through clean, scalable code.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {["AI/ML", "Web Dev", "Data Science", "Python", "React", "SQL"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-[10px] font-bold bg-slate-800/50 text-slate-400 rounded-lg border border-slate-700 uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2: Academic Journey */}
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">
            <GraduationCap size={16} />
            <span>Academic Journey</span>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-3 pl-6 space-y-8">
            <TimelineItem 
              title="B.Tech Materials Engineering"
              org="MNNIT Allahabad"
              date="2024 — 2028"
              desc="Current GPA: 8.35 / 10.0"
              active
            />
            <TimelineItem 
              title="Class XII (Intermediate)"
              org="JNV Lakhimpur-Kheri"
              date="2023"
              desc="Result: 90.4%"
            />
            <TimelineItem 
              title="Class X (High School)"
              org="JNV Lakhimpur-Kheri"
              date="2021"
              desc="Result: 94.6%"
            />
          </div>
        </div>

        {/* Column 3: Responsibility */}
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">
            <ShieldCheck size={16} />
            <span>Responsibility</span>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-3 pl-6 space-y-8">
            <TimelineItem 
              title="Campus Ambassador"
              org="GSSoC 2025"
              date="Jun - Aug 2025"
              desc="Leadership & Community Outreach"
              active
            />
            <TimelineItem 
              title="Media Team Member"
              org="Robotics Club, MNNIT"
              date="Feb - Dec 2025"
            />
            <TimelineItem 
              title="Content Team Member"
              org="E-Cell, MNNIT"
              date="Feb 2025 - Present"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ title, org, date, desc, active }) {
  return (
    <div className="relative group">
      <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#0f172a] transition-transform group-hover:scale-125
        ${active ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-700'}`} />
      <div className="flex flex-col gap-0.5 text-left">
        <h4 className="text-[13px] font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">{title}</h4>
        <p className="text-[11px] text-slate-400 font-medium leading-tight">{org}</p>
        <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-tight">{date}</span>
        {desc && <p className="text-[10px] text-indigo-400/80 mt-2 bg-indigo-500/5 w-fit px-2 py-0.5 rounded border border-indigo-500/10 font-medium">{desc}</p>}
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }) {
  // Enhanced Logic for mailto links
  const isEmail = href.startsWith('mailto:');

  return (
    <a 
      href={href} 
      target={isEmail ? "_self" : "_blank"} 
      rel={isEmail ? "" : "noreferrer"} 
      className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all cursor-pointer"
    >
      {icon}
      <span className="hidden xl:block text-xs font-medium">{label}</span>
    </a>
  );
}
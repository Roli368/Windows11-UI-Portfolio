import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, ExternalLink, Copy, Check } from 'lucide-react';

export default function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      label: "Email",
      value: "rolirathour368@gmail.com",
      href: "mailto:rolirathour368@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      isCopyable: true
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/roli-rathour",
      href: "https://linkedin.com/in/roli-rathour-43a711218",
      icon: <Linkedin className="w-5 h-5" />,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      label: "GitHub",
      value: "github.com/Roli368",
      href: "https://github.com/Roli368",
      icon: <Github className="w-5 h-5" />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10"
    }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6 sm:p-10 select-none">
      <div className="max-w-md w-full p-8 bg-[#0f172a]/40 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        
        {/* Animated Accent Glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

        <div className="relative z-10">
          {/* Header with Status Indicator */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                <MessageSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl tracking-tight">Get in Touch</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">Status: Online</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {contactLinks.map((link, idx) => (
              <div key={idx} className="relative group/item">
                <a 
                  href={link.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${link.bg} ${link.color} shadow-sm transition-transform group-hover/item:scale-110`}>
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black mb-0.5">{link.label}</p>
                      <p className="text-sm text-slate-200 font-medium group-hover/item:text-white transition-colors">{link.value}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover/item:text-indigo-400 transition-colors" />
                </a>

                {/* Email Copy Shortcut */}
                {link.isCopyable && (
                  <button 
                    onClick={(e) => { e.preventDefault(); copyToClipboard(link.value); }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 hover:bg-white/10 opacity-0 group-hover/item:opacity-100 transition-all text-slate-400 hover:text-white"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-white/5">
            <div className="bg-indigo-500/5 rounded-2xl p-4 border border-indigo-500/10">
               <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Currently building intelligent systems and full-stack solutions at <span className="text-indigo-400 font-bold">MNNIT Allahabad</span>. Let's connect!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
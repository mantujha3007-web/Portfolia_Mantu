"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const GithubIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer() {
  const FadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.21, 1.02, 0.73, 0.98] as [number, number, number, number] }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 relative z-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Row 1: Name + Tagline */}
        <motion.div
          initial={FadeInUp.initial}
          whileInView={FadeInUp.whileInView}
          transition={{ ...FadeInUp.transition, delay: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-space font-bold text-2xl text-white tracking-tight">MANTU JHA</h2>
          <p className="font-mono text-text-muted text-sm mt-2">AI & Machine Learning Engineer</p>
        </motion.div>

        {/* Row 2: Links */}
        <motion.div
          initial={FadeInUp.initial}
          whileInView={FadeInUp.whileInView}
          transition={{ ...FadeInUp.transition, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex gap-6 justify-center mt-6"
        >
          <a
            href="https://github.com/mantujha3007-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-cyan transition-colors duration-300 font-mono text-sm group"
          >
            <GithubIcon size={16} className="group-hover:scale-110 transition-transform" />
            <span>GitHub</span>
          </a>
          <a
            href="mailto:contact@example.com"
            className="flex items-center gap-2 text-white/50 hover:text-cyan transition-colors duration-300 font-mono text-sm group"
          >
            <Mail size={16} className="group-hover:scale-110 transition-transform" />
            <span>Contact</span>
          </a>
          <a
            href="https://linkedin.com/in/mantujha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-cyan transition-colors duration-300 font-mono text-sm group"
          >
            <LinkedinIcon size={16} className="group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
          </a>
        </motion.div>

        {/* Row 3: Copyright */}
        <motion.div
          initial={FadeInUp.initial}
          whileInView={FadeInUp.whileInView}
          transition={{ ...FadeInUp.transition, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-white/5 w-full max-w-md flex justify-center"
        >
          <p className="font-mono text-xs text-white/30 text-center">
            // © 2026 Mantu Jha · Built with Next.js & Three.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

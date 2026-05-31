"use client";

import { motion } from "framer-motion";
import TypewriterLines from "./TypewriterLines";
import { useState, useEffect } from "react";

export default function TerminalWindow() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 1.02, 0.73, 0.98] }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-[860px] mx-auto glass-panel overflow-hidden transition-all duration-500 hover:glow-cyan border border-white/10 hover:border-cyan/50"
    >
      {/* Terminal Header */}
      <div className="bg-black/60 flex items-center justify-between px-4 py-3 border-b border-white/10 relative">
        <div className="flex items-center gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-mono text-white/40 text-xs">mantu@portfolio:~$ ai --boot</span>
        </div>
        <div className="font-mono text-white/20 text-xs z-10">bash</div>
      </div>

      {/* Terminal Body */}
      <div className="bg-black/40 p-6 min-h-[420px] overflow-hidden">
        {showLoading ? (
          <div className="font-mono text-sm text-cyan flex flex-col items-start gap-2">
            <span>LOADING_AGENT...</span>
            <div className="w-full max-w-md h-2 bg-white/10 rounded overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="h-full bg-cyan shadow-[0_0_10px_#00ffff]"
              />
            </div>
          </div>
        ) : (
          <TypewriterLines />
        )}
      </div>
    </motion.div>
  );
}

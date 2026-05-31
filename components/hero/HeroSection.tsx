"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GlowButton from "../ui/GlowButton";
import GridBackground from "../ui/GridBackground";

// Avoid hydration issues with Three.js
const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />
});

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <GridBackground />
      <NeuralCanvas />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center mt-20 md:mt-0">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-mono text-cyan text-sm mb-6 px-4 py-1.5 rounded-full glass-panel glow-cyan border border-cyan/20"
        >
          // SYSTEM ONLINE — v2.0.26
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.21, 1.02, 0.73, 0.98] }}
          className="font-space font-extrabold text-white tracking-tight mb-2"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          MANTU JHA
        </motion.h1>

        {/* Gradient Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.21, 1.02, 0.73, 0.98] }}
          className="font-space font-extrabold tracking-tight"
          style={{ 
            fontSize: "clamp(2rem, 5vw, 4rem)",
            background: "linear-gradient(135deg, #00ffff, #bf00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          AI & ML Engineer
        </motion.h2>

        {/* Typewriter Subheading (simulated with Framer Motion typing effect or simple fade in + cursor) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.21, 1.02, 0.73, 0.98] }}
          className="font-mono text-text-muted mt-6 text-sm md:text-base flex items-center"
        >
          <span>{"> Specializing in Deep Learning · Computer Vision · Full-Stack AI"}</span>
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-2 h-4 bg-cyan ml-1"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.21, 1.02, 0.73, 0.98] }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <GlowButton variant="primary" onClick={() => scrollTo("projects")}>
            Initialize Sequence →
          </GlowButton>
          <GlowButton variant="secondary" onClick={() => scrollTo("terminal")}>
            View Terminal
          </GlowButton>
        </motion.div>

      </div>

      {/* Floating Status Badges */}
      <div className="absolute bottom-12 left-4 md:left-8 flex flex-col gap-3 z-10 hidden md:flex">
        {[
          { label: "PYTHON", color: "bg-[#22c55e]" },
          { label: "PYTORCH", color: "bg-[#f97316]" },
          { label: "REACT", color: "bg-[#3b82f6]" }
        ].map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.2, duration: 0.5 }}
            className="glass-panel px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-white/80 w-max"
          >
            <div className={`w-2 h-2 rounded-full ${badge.color} shadow-[0_0_8px_${badge.color}]`} />
            {badge.label}
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

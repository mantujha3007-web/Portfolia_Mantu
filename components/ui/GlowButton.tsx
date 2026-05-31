"use client";

import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function GlowButton({ children, onClick, className = "", variant = "primary" }: GlowButtonProps) {
  const baseStyles = "px-6 py-3 rounded-md font-mono text-sm transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-transparent border border-cyan text-cyan hover:bg-cyan-dim hover:glow-cyan",
    secondary: "bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-white/40"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-cyan-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
}

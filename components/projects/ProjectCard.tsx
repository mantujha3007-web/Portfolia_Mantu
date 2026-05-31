"use client";

import { motion } from "framer-motion";
import { Database, Bot, Eye, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "DEPLOYED" | "ACTIVE" | "TRAINING";
  statusColor: "green" | "cyan" | "yellow";
  metrics: Record<string, string>;
  accentColor: string;
  icon: "database" | "bot" | "eye";
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const iconMap = {
  database: Database,
  bot: Bot,
  eye: Eye,
};

const statusColors = {
  green: "bg-[#22c55e] text-[#22c55e]",
  cyan: "bg-[#00ffff] text-[#00ffff]",
  yellow: "bg-[#eab308] text-[#eab308]",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = iconMap[project.icon];
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.21, 1.02, 0.73, 0.98] }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-full relative glass-panel p-6 flex flex-col transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        style={{
          borderColor: isHovered ? project.accentColor : "rgba(255,255,255,0.1)",
          boxShadow: isHovered ? `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${project.accentColor}40` : "",
        }}
      >
        {/* Radial Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${project.accentColor}15, transparent 40%)`,
          }}
        />

        {/* Header Row */}
        <div className="flex justify-between items-start mb-4 z-10">
          <div className="flex items-center gap-3">
            <Icon size={20} color={project.accentColor} />
            <span className="font-mono text-xs text-text-muted">{project.id}</span>
          </div>
          <div className="flex items-center gap-2 glass-panel px-2 py-1 !rounded-full">
            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${statusColors[project.statusColor]}`} />
            <span className={`font-mono text-[10px] tracking-wider ${statusColors[project.statusColor].split(" ")[1]}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-space font-semibold text-xl text-white mt-2 z-10">{project.title}</h3>
        <p className="text-sm text-white/60 mt-2 leading-relaxed flex-grow z-10">{project.description}</p>

        {/* Metrics Row */}
        <div className="flex flex-wrap gap-2 mt-4 z-10">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="glass-panel px-2 py-1 flex items-center gap-1">
              <span className="font-mono text-[10px] text-text-muted uppercase">{key}</span>
              <span className="font-mono text-[10px]" style={{ color: project.accentColor }}>· {value}</span>
            </div>
          ))}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 mt-4 z-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: `${project.accentColor}1A`, // 10% opacity
                color: project.accentColor,
                border: `1px solid ${project.accentColor}4D`, // 30% opacity
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Row */}
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center z-10">
          <a
            href="#"
            className="text-sm text-cyan hover:underline transition-all font-medium flex items-center gap-1 group"
          >
            View Source 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <ExternalLink size={14} className="text-text-muted" />
        </div>
      </div>
    </motion.div>
  );
}

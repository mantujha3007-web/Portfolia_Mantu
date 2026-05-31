"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle: string;
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  const FadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.21, 1.02, 0.73, 0.98] as [number, number, number, number] }
  };

  return (
    <motion.div
      initial={FadeInUp.initial}
      whileInView={FadeInUp.whileInView}
      transition={FadeInUp.transition}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center text-center mb-16"
    >
      <div className="font-mono text-cyan text-sm mb-4">
        // {label}
      </div>
      <h2 className="font-space text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      <p className="text-text-muted text-lg max-w-2xl">
        {subtitle}
      </p>
    </motion.div>
  );
}

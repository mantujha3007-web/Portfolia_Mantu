"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

interface LineData {
  type: "PROMPT" | "OUTPUT" | "BLANK";
  text: string;
}

const LINES: LineData[] = [
  { type: "PROMPT", text: "mantu@portfolio:~$ ./initialize_agent.sh" },
  { type: "OUTPUT", text: "> Booting AI kernel... [████████████] 100%" },
  { type: "BLANK", text: "" },
  { type: "PROMPT", text: "mantu@portfolio:~$ cat profile.json" },
  { type: "OUTPUT", text: "{" },
  { type: "OUTPUT", text: '  "name": "Mantu Jha",' },
  { type: "OUTPUT", text: '  "role": "AI & Machine Learning Engineer",' },
  { type: "OUTPUT", text: '  "location": "India 🇮🇳",' },
  { type: "OUTPUT", text: '  "focus": ["Deep Learning", "Computer Vision", "LLMs"]' },
  { type: "OUTPUT", text: "}" },
  { type: "BLANK", text: "" },
  { type: "PROMPT", text: "mantu@portfolio:~$ pip list --key-skills" },
  { type: "OUTPUT", text: "✓ Python          [EXPERT]" },
  { type: "OUTPUT", text: "✓ PyTorch         [ADVANCED]" },
  { type: "OUTPUT", text: "✓ Machine Learning [ADVANCED]" },
  { type: "OUTPUT", text: "✓ Computer Vision  [ADVANCED]" },
  { type: "OUTPUT", text: "✓ React / Next.js  [PROFICIENT]" },
  { type: "OUTPUT", text: "✓ Flask / FastAPI  [PROFICIENT]" },
  { type: "BLANK", text: "" },
  { type: "PROMPT", text: "mantu@portfolio:~$ _" }
];

const TypewriterLines = memo(() => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= LINES.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = LINES[currentLineIndex];

    if (currentLine.type === "BLANK") {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    }

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, currentLine.type === "PROMPT" ? 30 : 10); // Type output faster
      
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300); // Delay between lines
      
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  const renderLineText = (line: LineData, isCurrent: boolean, typedLength: number) => {
    const textToShow = isCurrent ? line.text.substring(0, typedLength) : line.text;

    if (line.type === "PROMPT") {
      if (textToShow.startsWith("mantu@portfolio:~$")) {
        const parts = textToShow.split("mantu@portfolio:~$");
        return (
          <>
            <span className="text-cyan">mantu@portfolio:~$</span>
            <span className="text-white">{parts[1]}</span>
          </>
        );
      }
      return <span className="text-cyan">{textToShow}</span>;
    }

    if (line.type === "OUTPUT") {
      // Basic syntax highlighting
      let highlighted = textToShow;
      
      // JSON Highlighting
      if (textToShow.includes('"')) {
        const parts = textToShow.split(/(".*?")/g);
        return (
          <>
            {parts.map((part, i) => {
              if (part.startsWith('"') && part.endsWith('"')) {
                // Key or Value
                const isKey = textToShow.indexOf(part) < textToShow.indexOf(":");
                return <span key={i} className={isKey ? "text-cyan" : "text-[#22c55e]"}>{part}</span>;
              }
              return <span key={i} className="text-white">{part}</span>;
            })}
          </>
        );
      }
      
      // Checkmarks and brackets
      if (textToShow.startsWith("✓")) {
        const parts = textToShow.split(/(\[.*?\])/g);
        return (
          <>
            <span className="text-[#22c55e]">✓ </span>
            <span className="text-white">{parts[0].replace("✓ ", "")}</span>
            {parts[1] && <span className="text-purple">{parts[1]}</span>}
          </>
        );
      }
      
      if (textToShow.startsWith(">")) {
        return <span className="text-purple/80">{textToShow}</span>;
      }

      return <span className="text-white">{textToShow}</span>;
    }

    return null;
  };

  return (
    <div className="font-mono text-sm leading-relaxed">
      {LINES.map((line, index) => {
        if (index > currentLineIndex) return null;
        
        const isCurrentLine = index === currentLineIndex;
        
        return (
          <div key={index} className="min-h-[1.5rem]">
            {renderLineText(line, isCurrentLine, currentCharIndex)}
            {isCurrentLine && isTyping && line.type !== "BLANK" && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-2 h-4 bg-cyan align-middle ml-1"
              />
            )}
            {index === LINES.length - 1 && !isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-2 h-4 bg-cyan align-middle ml-1"
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

TypewriterLines.displayName = "TypewriterLines";

export default TypewriterLines;

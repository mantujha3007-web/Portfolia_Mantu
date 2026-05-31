Build a complete, production-ready Next.js 14 (App Router, TypeScript) developer portfolio 
website for "Mantu Jha" — an AI & Machine Learning Engineer. The site must feel like an 
immersive cyberpunk OS terminal / high-tech laboratory, NOT a standard webpage.

════════════════════════════════════════
TECH STACK (use exactly these)
════════════════════════════════════════
- Framework: Next.js 14, App Router, TypeScript
- Styling: Tailwind CSS v3
- 3D: @react-three/fiber, @react-three/drei, three.js
- Animation: framer-motion
- Icons: lucide-react
- Fonts (via next/font or Google Fonts):
    Headings → "Space Grotesk"
    Body → "Inter"
    Code/Terminal/Tags → "JetBrains Mono" (monospace)

════════════════════════════════════════
GLOBAL DESIGN SYSTEM
════════════════════════════════════════
Force dark mode globally. Never use light backgrounds.

CSS custom properties to define in globals.css:
  --bg-primary: #050505        (near-black base)
  --bg-secondary: #0a0a0f      (slightly lighter panels)
  --cyan: #00ffff              (primary neon accent)
  --purple: #bf00ff            (secondary neon accent)
  --cyan-dim: rgba(0,255,255,0.15)
  --purple-dim: rgba(191,0,255,0.15)
  --glass-bg: rgba(255,255,255,0.04)
  --glass-border: rgba(255,255,255,0.10)
  --text-primary: #e2e8f0
  --text-muted: #64748b

Glassmorphism utility class (apply to all cards/panels):
  bg-white/[0.04] backdrop-blur-xl border border-white/10 
  rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]

Glow utilities:
  Cyan glow shadow: shadow-[0_0_20px_rgba(0,255,255,0.4)]
  Purple glow shadow: shadow-[0_0_20px_rgba(191,0,255,0.4)]

Scrollbar: Custom dark scrollbar matching the theme (thin, cyan thumb).
Selection color: cyan bg with black text.

════════════════════════════════════════
FILE STRUCTURE
════════════════════════════════════════
app/
  layout.tsx          ← Root layout, fonts, metadata, global styles
  page.tsx            ← Assembles all sections in order
  globals.css         ← Base styles, custom properties, scrollbar
components/
  hero/
    HeroSection.tsx   ← Full section wrapper
    NeuralCanvas.tsx  ← React Three Fiber canvas
    NeuralNetwork.tsx ← The 3D Points-based neural net mesh
  terminal/
    TerminalSection.tsx
    TerminalWindow.tsx
    TypewriterLines.tsx
  projects/
    ProjectsSection.tsx
    ProjectCard.tsx
  footer/
    Footer.tsx
  ui/
    GlowButton.tsx
    SectionHeading.tsx
    GridBackground.tsx

════════════════════════════════════════
SECTION 1 — HERO (Full viewport, 3D Canvas)
════════════════════════════════════════
Layout:
- Full viewport height (min-h-screen). Position relative.
- GridBackground component renders a faint dot-grid or line-grid 
  SVG/CSS pattern across the full background.
- NeuralCanvas fills the ENTIRE section (absolute inset-0, z-index 0).
- Overlay content sits above canvas (z-index 10, centered).

NeuralCanvas (components/hero/NeuralCanvas.tsx):
- Use React Three Fiber <Canvas> with:
    camera={{ position: [0, 0, 5], fov: 75 }}
    gl={{ antialias: true, alpha: true }}
    dpr={[1, 2]}
- Background: transparent (let page bg show through).
- Add <ambientLight intensity={0.2} /> and 
  <pointLight position={[10,10,10]} color="#00ffff" intensity={1} />.
- Render the NeuralNetwork component.
- Add <OrbitControls enableZoom={false} enablePan={false} 
  autoRotate autoRotateSpeed={0.4} /> from @react-three/drei.
- Track mouse position using a useRef + window mousemove listener. 
  Pass mouse coords as props to NeuralNetwork so the mesh tilts 
  subtly toward cursor (max ±0.3 radians). Use useFrame to lerp 
  the rotation smoothly (lerp factor 0.05).

NeuralNetwork (components/hero/NeuralNetwork.tsx):
- Create two layers of geometry:
  LAYER 1 — Node Points:
    Generate ~120 random points in a sphere of radius 2.5 using 
    THREE.BufferGeometry. Store as Float32Array of xyz positions.
    Render as <points>. Use <pointsMaterial size={0.04} 
    color="#00ffff" transparent opacity={0.8} sizeAttenuation />.
  
  LAYER 2 — Connection Lines:
    For each point, find 2–3 nearest neighbors (precompute on mount).
    Create a THREE.BufferGeometry with LineSegments connecting them.
    Render as <lineSegments>. Use <lineBasicMaterial color="#bf00ff" 
    transparent opacity={0.25} />.
  
  LAYER 3 — Central Icosahedron:
    <mesh rotation={useFrame animated}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#00ffff" wireframe 
       emissive="#00ffff" emissiveIntensity={0.3} transparent 
       opacity={0.6} />
    </mesh>
  
  Animate: In useFrame, slowly rotate all three layers at different 
  speeds. The icosahedron rotates fastest (0.003 rad/frame on Y, 
  0.001 on X). Points cloud rotates slowest (0.0005 rad/frame).

Hero Overlay Content (inside HeroSection.tsx, above canvas):
- Glassmorphic pill badge at top:
    text: "// SYSTEM ONLINE — v2.0.26"
    style: monospace font, cyan text, glass bg, small rounded-full 
           pill, subtle cyan border glow.
- Main heading (two lines):
    Line 1: "MANTU JHA" — Space Grotesk, font-size clamp(3rem,8vw,7rem), 
             font-weight 800, color white, letter-spacing -0.02em.
    Line 2: "AI & ML Engineer" — same font but gradient text:
             background: linear-gradient(135deg, #00ffff, #bf00ff)
             -webkit-background-clip: text; -webkit-text-fill-color: transparent
- Subheading (monospace, muted):
    "> Specializing in Deep Learning · Computer Vision · Full-Stack AI"
    Animate: typewriter reveal using framer-motion staggered letters 
             or just a blinking cursor after.
- Two CTA buttons side by side (mt-8 gap-4 flex):
    Button 1 — GlowButton "Initialize Sequence →":
      bg: transparent, border: 1px solid #00ffff, text: #00ffff
      hover: bg fills to cyan-dim, box-shadow cyan glow (0 0 30px).
      On click: smooth scroll to #projects section.
    Button 2 — "View Terminal" (secondary):
      bg: transparent, border: 1px solid rgba(255,255,255,0.2), 
      text: white/60. On click: smooth scroll to #terminal.
- Floating status badges (bottom-left, absolute positioned):
    Three small glassmorphic pills arranged vertically:
    "● PYTHON" (green dot), "● PYTORCH" (orange dot), "● REACT" (blue dot)
    Each pill: glass bg, monospace text, tiny, animated entrance with 
    staggered framer-motion fade-in (delay 1s, 1.2s, 1.4s).
- Scroll indicator bottom-center: animated bouncing chevron-down icon 
  (lucide-react), muted color, absolute bottom-8.

════════════════════════════════════════
SECTION 2 — AI TERMINAL (About Me)
════════════════════════════════════════
Section id="terminal". 
Full width, min-h-screen, centered content, py-32.

SectionHeading component (reusable):
  Props: label (string), title (string), subtitle (string)
  Layout: 
    - Small monospace badge above: "// {label}" in cyan
    - H2 heading in Space Grotesk, large, white
    - Subtitle in muted gray
  Animate: framer-motion whileInView fade-up, once:true

Above the terminal window, render SectionHeading with:
  label="PROCESS_002"
  title="System Diagnostics"  
  subtitle="Running identity verification protocol..."

TerminalWindow (components/terminal/TerminalWindow.tsx):
- Max-width: 860px, centered with mx-auto.
- Outer wrapper: glassmorphism class + cyan border glow on hover.
- Terminal header bar (like macOS):
    - Left side: Three circles (divs, w-3 h-3 rounded-full):
        #ff5f56 (red), #ffbd2e (yellow), #27c93f (green).
        Each has a subtle glow matching its color.
    - Center: monospace text "mantu@portfolio:~$ ai --boot" in 
      white/40, text-xs.
    - Right side: text "bash" in white/20, monospace, text-xs.
    - Separator: 1px border-b border-white/10 below the header.
- Terminal body: bg-black/40, p-6, font: JetBrains Mono, text-sm, 
  min-h-[420px], overflow-hidden.

TypewriterLines (components/terminal/TypewriterLines.tsx):
Render the following lines SEQUENTIALLY with realistic typewriter 
animation. Each line appears after the previous finishes + 300ms delay.
Use a custom hook useTypewriter or framer-motion variants.
Show a blinking cursor (│ or █) that moves to the current typing position.

Lines to type (in order):
  [PROMPT]  "mantu@portfolio:~$ ./initialize_agent.sh"
  [OUTPUT]  "> Booting AI kernel... [████████████] 100%"
  [BLANK]   ""
  [PROMPT]  "mantu@portfolio:~$ cat profile.json"
  [OUTPUT]  "{"
  [OUTPUT]  '  "name": "Mantu Jha",'
  [OUTPUT]  '  "role": "AI & Machine Learning Engineer",'
  [OUTPUT]  '  "location": "India 🇮🇳",'
  [OUTPUT]  '  "focus": ["Deep Learning", "Computer Vision", "LLMs"]'
  [OUTPUT]  "}"
  [BLANK]   ""
  [PROMPT]  "mantu@portfolio:~$ pip list --key-skills"
  [OUTPUT]  "✓ Python          [EXPERT]"
  [OUTPUT]  "✓ PyTorch         [ADVANCED]"
  [OUTPUT]  "✓ Machine Learning [ADVANCED]"
  [OUTPUT]  "✓ Computer Vision  [ADVANCED]"
  [OUTPUT]  "✓ React / Next.js  [PROFICIENT]"
  [OUTPUT]  "✓ Flask / FastAPI  [PROFICIENT]"
  [BLANK]   ""
  [PROMPT]  "mantu@portfolio:~$ _"  ← blinking cursor stays here

Color coding:
  PROMPT lines: cyan (#00ffff) for the "mantu@portfolio:~$" part, 
                white for the command part.
  OUTPUT lines starting with ">": purple/muted.
  JSON key strings: cyan. JSON value strings: green (#22c55e).
  "✓" checkmarks: green. Skill names: white. Brackets: purple.
  BLANK lines: empty.

════════════════════════════════════════
SECTION 3 — PROJECTS (System Modules)
════════════════════════════════════════
Section id="projects".
py-32, full width.

SectionHeading:
  label="SYSTEM_MODULES"
  title="Active Simulations"
  subtitle="Deployed intelligence systems & engineering projects"

Project data array (define in a const or separate data file):

const projects = [
  {
    id: "SYS-001",
    title: "Hospital Management System",
    description: "Full-stack hospital management platform handling 
                  patient records, appointments, billing, and staff 
                  coordination with real-time dashboard analytics.",
    tags: ["React", "JavaServer Pages", "MySQL", "Java", "REST API"],
    status: "DEPLOYED",
    statusColor: "green",
    metrics: { uptime: "99.9%", users: "500+", version: "v3.2.1" },
    accentColor: "#00ffff",
    icon: "database"  ← use lucide-react Database icon
  },
  {
    id: "SYS-002",
    title: "AI Chatbot Integration",
    description: "Local LLM-powered intelligent chatbot using Ollama 
                  with Llama3. Features context-aware conversations, 
                  streaming responses, and a Flask API backend.",
    tags: ["Ollama", "Llama3", "Flask", "Python", "LangChain"],
    status: "ACTIVE",
    statusColor: "cyan",
    metrics: { model: "Llama3", latency: "<200ms", version: "v1.5.0" },
    accentColor: "#bf00ff",
    icon: "bot"  ← use lucide-react Bot icon
  },
  {
    id: "SYS-003",
    title: "Computer Vision Tracking",
    description: "Real-time object detection and motion tracking system 
                  using deep neural networks. Processes live video streams 
                  with PyTorch-based custom model inference pipeline.",
    tags: ["PyTorch", "OpenCV", "Deep Learning", "Python", "CUDA"],
    status: "TRAINING",
    statusColor: "yellow",
    metrics: { accuracy: "94.7%", fps: "30+", version: "v2.0.0" },
    accentColor: "#00ffff",
    icon: "eye"  ← use lucide-react Eye icon
  }
]

ProjectCard (components/projects/ProjectCard.tsx):
- Full glassmorphism styling.
- On hover: 
    - Border color transitions to accentColor with glow.
    - Card lifts slightly (translateY -4px).
    - A faint radial gradient "spotlight" appears at the mouse position 
      inside the card (track mouse with onMouseMove).
    Use CSS transition for border, framer-motion for lift.
- Card layout (top to bottom):
  HEADER ROW:
    - Left: Icon component (lucide-react, 20px, accentColor).
    - Left: Project ID in monospace, muted, text-xs ("SYS-001").
    - Right: Status badge — small pill with colored dot + status text.
      Colors: green=active/deployed, cyan=processing, yellow=training.
  TITLE: 
    - H3, Space Grotesk, font-semibold, text-white, mt-3.
  DESCRIPTION:
    - Paragraph, text-sm, text-white/60, mt-2, leading-relaxed.
  METRICS ROW (mt-4):
    - 3 small metric pills in a flex-wrap row.
    - Each pill: glass bg, monospace text-xs, key: muted, value: accent.
    Example: "UPTIME · 99.9%"
  TAGS (mt-4):
    - Flex-wrap row of tag chips.
    - Each chip: monospace text-xs, px-2 py-1, rounded, 
      bg: accentColor at 10% opacity, text: accentColor, 
      border: accentColor at 30% opacity.
  FOOTER ROW (mt-4, border-t border-white/5, pt-4):
    - Left: "View Source →" link (text-sm, cyan, hover underline).
    - Right: ExternalLink icon (lucide-react, 14px, muted).

Grid: CSS grid, grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, gap-6.

════════════════════════════════════════
SECTION 4 — FOOTER
════════════════════════════════════════
Dark footer (bg-black or #050505), border-t border-white/5, py-12.

Layout: two rows, centered.
  ROW 1 — Name + tagline:
    "MANTU JHA" — Space Grotesk, font-bold, text-white.
    "AI & Machine Learning Engineer" — monospace, muted, text-sm.
  
  ROW 2 — Links row (flex, gap-6, justify-center, mt-6):
    - GitHub link: href="https://github.com/mantujha3007-web"
      icon: lucide-react Github (16px) + text "GitHub"
      style: text-white/50, hover:text-cyan transition.
    - Email link (placeholder): "Contact" with Mail icon.
    - LinkedIn link (placeholder): "LinkedIn" with Linkedin icon.
  
  ROW 3 — Copyright (mt-8, border-t border-white/5, pt-6):
    "// © 2026 Mantu Jha · Built with Next.js & Three.js"
    monospace, text-xs, text-white/30, text-center.

════════════════════════════════════════
ANIMATIONS & INTERACTIONS (Framer Motion)
════════════════════════════════════════
Create a reusable FadeInUp motion variant:
  initial: { opacity: 0, y: 40 }
  animate/whileInView: { opacity: 1, y: 0 }
  transition: { duration: 0.6, ease: [0.21, 1.02, 0.73, 0.98] }
  viewport: { once: true, margin: "-100px" }

Apply to: SectionHeading, ProjectCards (staggered, delay i*0.1), 
          TerminalWindow, Footer links.

Hero entrance animations (on page load, not scroll):
  - Badge: fade in, delay 0.2s
  - H1 line 1: fade up, delay 0.4s  
  - H1 line 2: fade up, delay 0.6s
  - Subheading: fade up, delay 0.8s
  - Buttons: fade up, delay 1.0s
  - Status badges: stagger from delay 1.2s

Canvas: No framer-motion on the canvas itself. Let Three.js handle it.

Smooth scroll: Add scroll-behavior: smooth to html element in globals.css.

════════════════════════════════════════
PERFORMANCE & RESPONSIVE
════════════════════════════════════════
- Wrap NeuralCanvas in dynamic import with ssr:false to avoid 
  hydration issues with Three.js:
    const NeuralCanvas = dynamic(
      () => import('@/components/hero/NeuralCanvas'), 
      { ssr: false, loading: () => <div className="absolute inset-0 bg-[#050505]" /> }
    )

- On mobile (< 768px): Reduce neural network points from 120 to 60.
  Detect with a useIsMobile hook checking window.innerWidth.

- Canvas: style={{ width: '100%', height: '100%' }} inside 
  a div with position:absolute inset-0.

- Use React.memo on ProjectCard and TypewriterLines to 
  prevent unnecessary re-renders.

- Add "use client" directive to any component using hooks, 
  browser APIs, framer-motion, or Three.js.

- All sections use max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
  for content width capping.

════════════════════════════════════════
PACKAGE.JSON DEPENDENCIES TO INSTALL
════════════════════════════════════════
{
  "dependencies": {
    "next": "14.2.x",
    "react": "18.x",
    "react-dom": "18.x",
    "typescript": "5.x",
    "@react-three/fiber": "^8.16.x",
    "@react-three/drei": "^9.105.x",
    "three": "^0.165.x",
    "@types/three": "^0.165.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.390.x",
    "tailwindcss": "^3.4.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}

════════════════════════════════════════
ADDITIONAL MICRO-DETAILS
════════════════════════════════════════
1. Add a subtle scanline overlay div (position:fixed, pointer-events:none, 
   z-index:9999) using a CSS repeating-linear-gradient of 
   transparent/rgba(0,0,0,0.03) stripes to simulate a CRT/monitor effect.

2. GridBackground component: render a CSS grid pattern using 
   background-image with linear-gradient lines, very subtle 
   (rgba(255,255,255,0.03)), behind the hero and projects sections.

3. In the terminal, show a "LOADING_AGENT" progress bar animation 
   before the typewriter starts (a simple div that grows from 0% to 100% 
   width over 1.5 seconds, then disappears, THEN typing begins).

4. Project cards: on initial viewport entry, animate with a stagger: 
   card 1 enters at 0ms, card 2 at 150ms, card 3 at 300ms.

5. The "Initialize Sequence" button should have a subtle pulsing glow 
   animation (CSS keyframes: box-shadow pulses between 
   0 0 10px cyan and 0 0 30px cyan, 2s infinite).

6. Add metadata in layout.tsx:
   title: "Mantu Jha | AI & ML Engineer"
   description: "Portfolio of Mantu Jha — AI, Machine Learning, 
                 Computer Vision & Full-Stack Engineer."
   themeColor: "#050505"

Generate ALL files completely. Do not use placeholder comments 
like "// add logic here". Every function must be fully implemented.
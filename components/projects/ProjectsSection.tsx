import SectionHeading from "../ui/SectionHeading";
import ProjectCard, { ProjectData } from "./ProjectCard";

const projects: ProjectData[] = [
  {
    id: "SYS-001",
    title: "Hospital Management System",
    description: "Full-stack hospital management platform handling patient records, appointments, billing, and staff coordination with real-time dashboard analytics.",
    tags: ["React", "JavaServer Pages", "MySQL", "Java", "REST API"],
    status: "DEPLOYED",
    statusColor: "green",
    metrics: { uptime: "99.9%", users: "500+", version: "v3.2.1" },
    accentColor: "#00ffff",
    icon: "database"
  },
  {
    id: "SYS-002",
    title: "AI Chatbot Integration",
    description: "Local LLM-powered intelligent chatbot using Ollama with Llama3. Features context-aware conversations, streaming responses, and a Flask API backend.",
    tags: ["Ollama", "Llama3", "Flask", "Python", "LangChain"],
    status: "ACTIVE",
    statusColor: "cyan",
    metrics: { model: "Llama3", latency: "<200ms", version: "v1.5.0" },
    accentColor: "#bf00ff",
    icon: "bot"
  },
  {
    id: "SYS-003",
    title: "Computer Vision Tracking",
    description: "Real-time object detection and motion tracking system using deep neural networks. Processes live video streams with PyTorch-based custom model inference pipeline.",
    tags: ["PyTorch", "OpenCV", "Deep Learning", "Python", "CUDA"],
    status: "TRAINING",
    statusColor: "yellow",
    metrics: { accuracy: "94.7%", fps: "30+", version: "v2.0.0" },
    accentColor: "#00ffff",
    icon: "eye"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        label="SYSTEM_MODULES"
        title="Active Simulations"
        subtitle="Deployed intelligence systems & engineering projects"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

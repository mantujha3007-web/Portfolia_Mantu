import HeroSection from "@/components/hero/HeroSection";
import TerminalSection from "@/components/terminal/TerminalSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505] text-white">
      <HeroSection />
      <TerminalSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}

import SectionHeading from "../ui/SectionHeading";
import TerminalWindow from "./TerminalWindow";

export default function TerminalSection() {
  return (
    <section id="terminal" className="w-full min-h-screen py-32 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        label="PROCESS_002"
        title="System Diagnostics"
        subtitle="Running identity verification protocol..."
      />
      <TerminalWindow />
    </section>
  );
}

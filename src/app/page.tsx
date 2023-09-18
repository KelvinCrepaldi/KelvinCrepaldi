import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import AboutSection from "@/components/sections/About/AboutSection";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <main className=" mx-auto">
      <Hero />
      <div className="relative z-10 overflow-x-clip">
        <Projects />
        <AboutSection />
        <Contact />
      </div>
    </main>
  );
}

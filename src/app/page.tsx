import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" mx-auto">
      <Hero />
      <div className="relative z-10 overflow-x-clip">
        <Projects />
      </div>
    </main>
  );
}

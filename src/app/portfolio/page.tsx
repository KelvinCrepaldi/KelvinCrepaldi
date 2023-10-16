import Project from "@/components/Project";
import Title from "@/components/Title";
import { projects } from "@/data/projects";
import { IProject } from "@/interfaces/project.interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio - Kelvin Crepaldi",
  description: "Página de portfólio de Kelvin Crepaldi",
};

export default function Portfolio() {
  return (
    <main className="flex flex-col  items-center  max-w-[1300px] m-auto  font-jetbrains text-gray-400 overflow-x-clip md:px-10 px-5">
      <div className=" max-w-[1300px] m-auto w-full ">
        <Title title="Projetos"></Title>
        <p className="w-full mb-10">Navegue pelos resultados do meu trabalho</p>
      </div>
      <div className="flex flex-wrap justify-center ">
        {projects.map((project: IProject, index) => (
          <Project project={project} key={index} delay={index} />
        ))}
      </div>
    </main>
  );
}

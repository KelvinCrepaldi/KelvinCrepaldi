import Project from "@/components/Project";
import Title from "@/components/Title";
import { projects } from "@/data/projects";
import { IProject } from "@/interfaces/project.interface";

export default function Portfolio() {
  return (
    <main className="flex flex-col  items-center  max-w-[1300px] m-auto  font-jetbrains text-gray-400 overflow-x-clip">
      <div className=" max-w-[1100px] m-auto w-full p-10">
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

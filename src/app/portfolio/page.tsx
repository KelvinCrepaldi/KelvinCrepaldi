import Project from "@/components/Project";
import { projects } from "@/data/projects";
import { IProject } from "@/interfaces/project.interface";

export default function Portfolio() {
  return (
    <main className="flex flex-wrap justify-center mx-auto max-w-[1200px] ">
      {projects.map((project: IProject, index) => (
        <Project project={project} key={index} delay={index} />
      ))}
    </main>
  );
}

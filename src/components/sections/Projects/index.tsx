"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { IProject } from "@/interfaces/project.interface";
import Title from "../../Title";
import Project from "../../Project";
import CustomLink from "@/components/CustomLink";

const Projects = (): JSX.Element => {
  const sliceProject = projects.slice(0, 2);

  return (
    <motion.section className="max-w-[1300px] m-auto relative md:px-10 px-5">
      <div>
        <div>
          <Title title="Projetos" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 3 }}
          className="flex flex-wrap justify-center"
        >
          {sliceProject.map((project: IProject, index) => (
            <Project project={project} key={index} delay={index} />
          ))}
        </motion.div>
        <div className="w-full flex justify-center">
          <CustomLink href={"/portfolio"}>
            Veja mais dos meus projetos!
          </CustomLink>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;

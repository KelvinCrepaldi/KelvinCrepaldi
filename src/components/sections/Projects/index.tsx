"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { projects } from "@/data/projects";
import { IProject } from "@/interfaces/project.interface";
import Title from "../../Title";
import Project from "../../Project";
import CustomLink from "@/components/CustomLink";

const Projects = () => {
  const sliceProject = projects.slice(0, 4);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["center center", "end center"],
  });

  return (
    <motion.section
      ref={targetRef}
      className="max-w-[1300px] m-auto relative p-5"
    >
      <div>
        <div>
          <Title title="Projetos" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 3 }}
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

import CustomLink from "@/components/CustomLink";
import Title from "@/components/Title";
import { MotionDiv, MotionP } from "@/components/animations/MotionDiv";
import { skills } from "@/data/skills";
import { ISkillsType } from "@/interfaces/skill.interface";
import Image from "next/image";

import { DiScrum } from "react-icons/di";
import { FaUsers } from "react-icons/fa";
import { AiFillLayout } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";

const AboutSection = (): JSX.Element => {
  return (
    <section className="max-w-[1300px] m-auto mt-20 p-5 md:px-10 px-5">
      <Title title="Sobre"></Title>

      <div className="flex flex-col lg:flex-row lg:items-start">
        <MotionDiv
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className=" lg:w-1/2 p-5 text-lg lg:text-xl text-teal-200"
        >
          <p className=" mt-3 text-lg text-teal-100 font-bold">
            Formado pela Kenzie Academy como Full Stack, aprendi principais
            tecnologias de Front End e Back End.
          </p>
          <p className=" mt-3 text-lg text-teal-300 font-bold">
            Entre as linguagens e tecnologias aprendidas, estão HTML5, CSS3,
            JavaScript (ES6 +), React, Redux, Python (Django e Flask),Node.js,
            Express, e SQL.
          </p>
          <p className=" mt-3 text-lg text-teal-500 font-bold">
            Além de soft skills disponíveis para o mercado de trabalho, Scrum,
            Kanban.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-5 space-y-4"
        >
          <p className="flex items-center">
            <span className="text-2xl text-green-300 p-1">
              <DiScrum />
            </span>
            Habilidades em Scrum e Kanban para gerenciamento de projetos.
          </p>
          <p className="flex items-center">
            <span className="text-2xl text-green-300 p-1">
              <FaUsers />
            </span>
            Experiência em trabalho em equipe e colaboração com colegas de
            diferentes backgrounds.
          </p>
          <p className="flex items-center">
            <span className="text-2xl text-green-300 p-1">
              <AiFillLayout />
            </span>
            Competência em design de interface, com foco em UI, UX e abordagem
            Mobile-First.
          </p>
          <p className="flex items-center">
            <span className="text-2xl text-green-300 p-1">
              <MdMenuBook />
            </span>
            Compromisso contínuo de aprendizado, explorando novas tecnologias.
          </p>
        </MotionDiv>
      </div>

      <div className="flex flex-wrap space-x-3 justify-center">
        {skills.map((skill: ISkillsType, index: number) => (
          <MotionDiv
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            key={index}
            className="w-[50px] aspect-square m-2"
          >
            <Image alt={`${skill.name} logo svg`} src={skill.image} />
          </MotionDiv>
        ))}
      </div>
      <MotionDiv
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="flex justify-center mt-10"
      >
        <CustomLink href={"/about"}>Veja mais sobre quem eu sou!</CustomLink>
      </MotionDiv>
    </section>
  );
};

export default AboutSection;

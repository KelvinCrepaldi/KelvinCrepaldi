import CustomLink from "@/components/CustomLink";
import Title from "@/components/Title";
import { MotionDiv, MotionP } from "@/components/animations/MotionDiv";
import { skills } from "@/data/skills";
import { ISkillsType } from "@/interfaces/skill.interface";
import Image from "next/image";

const AboutSection = (): JSX.Element => {
  return (
    <section className="max-w-[1300px] m-auto mt-20 p-5 md:px-10 px-5">
      <Title title="Sobre"></Title>

      <MotionP
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-gray-300 text-center"
      >
        Formado pela Kenzie Academy como Full Stack, aprendi algumas das
        principais tecnologias de Front End e Back End. A partir disso estou
        buscando aprender novas tecnologias que se destacam no mercado, como
        Next.js, Tailwinds, Framer-motion e focado em criar projetos pessoais
        fullstack com Next.js e express.js/typeORM + postgreSQL.
      </MotionP>

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
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="flex justify-center mt-10"
      >
        <CustomLink href={"/about"}>Veja mais sobre quem eu sou!</CustomLink>
      </MotionDiv>
    </section>
  );
};

export default AboutSection;

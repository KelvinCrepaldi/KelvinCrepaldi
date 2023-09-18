import CustomLink from "@/components/CustomLink";
import Title from "@/components/Title";
import AnimateDiv from "@/components/animations/AnimateDiv";
import { skills } from "@/data/skills";
import { ISkillsType } from "@/interfaces/skill.interface";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="max-w-[1250px] m-auto mt-20">
      <Title title="Sobre"></Title>
      <AnimateDiv
        initial={{ opacity: 0, y: 200 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-300 text-center">
          Formado pela Kenzie Academy como Full Stack, aprendi algumas das
          principais tecnologias de Front End e Back End. A partir disso estou
          buscando aprender novas tecnologias que se destacam no mercado, como
          Next.js, Tailwinds, Framer-motion e focado em criar projetos pessoais
          fullstack com Next.js e express.js/typeORM + postgreSQL.
        </p>
      </AnimateDiv>

      <AnimateDiv
        initial={{ opacity: 0, y: 200 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-wrap space-x-3 justify-center">
          {skills.map((skill: ISkillsType, index: number) => (
            <div key={index} className="w-[50px] aspect-square m-2">
              <Image alt={`${skill.name} logo svg`} src={skill.image} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <CustomLink href={"/about"}>Veja mais sobre quem eu sou!</CustomLink>
        </div>
      </AnimateDiv>
    </section>
  );
};

export default AboutSection;

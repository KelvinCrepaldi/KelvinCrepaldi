import Title from "@/components/Title";
import { MotionP } from "@/components/animations/MotionDiv";
import Skill from "@/components/skill";
import { skills } from "@/data/skills";
import { ISkillsType } from "@/interfaces/skill.interface";

const SkillsList = () => {
  return (
    <section className="my-20">
      <Title title="Competencias" />

      <MotionP
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "tween" }}
        className="mb-10"
      >
        Estas tecnologias são parte integrante do meu conjunto de habilidades e
        foram essenciais para o sucesso de projetos diversos em meu portfólio.
        Elas contribuem para criar soluções modernas, eficientes e de alta
        qualidade.
      </MotionP>

      <ul className="flex flex-wrap justify-start">
        {skills.map((skill: ISkillsType, index: number) => (
          <Skill key={index} skill={skill} />
        ))}
      </ul>
    </section>
  );
};

export default SkillsList;

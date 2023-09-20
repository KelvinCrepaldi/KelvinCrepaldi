import Image from "next/image";
import kenzie from "/public/kenzie.jpg";
import Title from "@/components/Title";
import { skills } from "@/data/skills";
import { ISkillsType } from "@/interfaces/skill.interface";
import Skill from "@/components/skill";
import { MotionDiv, MotionP } from "@/components/animations/MotionDiv";
import { delay } from "framer-motion";

export default function About() {
  return (
    <section className=" max-w-[1100px] m-auto p-10 font-jetbrains text-gray-400">
      <div className="">
        <Title title="Sobre mim..." />

        <MotionP
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween" }}
          className="mb-5"
        >
          Formado pela Kenzie Academy como Full Stack, aprendi principais
          tecnologias de Front End e Back End. Entre as linguagens e tecnologias
          aprendidas, estão HTML5, CSS3, JavaScript (ES6 +), React, Redux,
          Python (Django e Flask),Node.js, Express, e SQL. Além de soft skills
          disponíveis para o mercado de trabalho, Scrum, Kanban.
        </MotionP>

        <MotionP
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween" }}
          className="mb-5"
        >
          Durante o meu curso, tive a oportunidade de trabalhar com a
          metodologia Scrum e o Trello. Em nossa equipe, adotamos a prática de
          reuniões diárias matinais para garantir a transparência e alinhamento
          das atividades. Quando necessário, realizávamos reuniões adicionais à
          tarde para resolver questões emergentes. Essa abordagem ágil e as
          ferramentas usadas foram essenciais para o sucesso dos projetos em que
          participei.
        </MotionP>

        <MotionP
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween" }}
          className="mb-5"
        >
          Além disso, como entusiasta da programação, tenho o hábito de explorar
          documentações detalhadas e artigos especializados. A busca constante
          por novos conhecimentos e aprofundamento nas nuances da programação
          fazem parte do meu cotidiano. Através desse compromisso, mantenho-me
          atualizado com as últimas tendências, frameworks e melhores práticas
          da indústria, garantindo que minhas habilidades estejam sempre em
          evolução.
        </MotionP>
      </div>

      <MotionP
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "tween" }}
      >
        A partir disso estou buscando aprender novas tecnologias que se destacam
        no mercado, como Next.js, Tailwinds, Framer-motion e focado em criar
        projetos pessoais fullstack com Next.js e express.js/typeORM +
        postgreSQL.
      </MotionP>

      <MotionP
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "tween" }}
        className=" font-bold text-center mt-10"
      >
        E a minha jornada continua . . .
      </MotionP>

      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6, type: "tween" }}
      >
        <Image
          src={kenzie}
          alt="certificado de conclusão de curso kenzie"
          width={400}
          height={300}
          className="m-auto my-10 border-4 border-gray-900 rounded"
        ></Image>
      </MotionDiv>

      <section>
        <Title title="Competencias" />

        <MotionP
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "tween" }}
        >
          Estas tecnologias são parte integrante do meu conjunto de habilidades
          e foram essenciais para o sucesso de projetos diversos em meu
          portfólio. Elas contribuem para criar soluções modernas, eficientes e
          de alta qualidade.
        </MotionP>

        <ul className="flex flex-col justify-start flex-wrap">
          {skills.map((skill: ISkillsType, index: number) => (
            <Skill key={index} skill={skill} />
          ))}
        </ul>
      </section>
    </section>
  );
}

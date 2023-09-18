import Image from "next/image";
import kenzie from "/public/kenzie.jpg";
import Title from "@/components/Title";
import { skills } from "@/data/skills";
import { ISkillsType } from "@/interfaces/skill.interface";
import Skill from "@/components/skill";
import AnimateDiv from "@/components/animations/AnimateDiv";
import { delay } from "framer-motion";

export default function About() {
  return (
    <section className=" max-w-[1100px] m-auto p-10 font-jetbrains text-gray-400">
      <div className="">
        <Title title="Sobre mim..." />
        <AnimateDiv
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween" }}
        >
          <p className="mb-5">
            Formado pela Kenzie Academy como Full Stack, aprendi principais
            tecnologias de Front End e Back End. Entre as linguagens e
            tecnologias aprendidas, estão HTML5, CSS3, JavaScript (ES6 +),
            React, Redux, Python (Django e Flask),Node.js, Express, e SQL. Além
            de soft skills disponíveis para o mercado de trabalho, Scrum,
            Kanban.
          </p>
        </AnimateDiv>
      </div>
      <AnimateDiv
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "tween" }}
      >
        <p>
          A partir disso estou buscando aprender novas tecnologias que se
          destacam no mercado, como Next.js, Tailwinds, Framer-motion e focado
          em criar projetos pessoais fullstack com Next.js e express.js/typeORM
          + postgreSQL.
        </p>
      </AnimateDiv>
      <AnimateDiv
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "tween" }}
      >
        <p className=" font-bold text-center mt-10">
          E a minha jornada continua . . .
        </p>
      </AnimateDiv>
      <AnimateDiv
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
      </AnimateDiv>

      <section>
        <Title title="Competencias" />
        <AnimateDiv
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "tween" }}
        >
          <p>
            Estas tecnologias são parte integrante do meu conjunto de
            habilidades e foram essenciais para o sucesso de projetos diversos
            em meu portfólio. Elas contribuem para criar soluções modernas,
            eficientes e de alta qualidade.
          </p>
        </AnimateDiv>

        <ul className="flex flex-col justify-start flex-wrap">
          {skills.map((skill: ISkillsType, index: number) => (
            <Skill key={index} skill={skill} />
          ))}
        </ul>
      </section>
    </section>
  );
}

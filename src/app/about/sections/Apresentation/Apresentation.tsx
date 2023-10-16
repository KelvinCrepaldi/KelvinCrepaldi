import { MotionP, MotionUl, MotionLi } from "@/components/animations/MotionDiv";
import Image from "next/image";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiFillLayout } from "react-icons/ai";

const Apresentation = () => {
  return (
    <section className="grid lg:grid-cols-2 mb-20 mt-10">
      <MotionP
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "tween" }}
      >
        <Image
          src={"/kenzieIcon.png"}
          width={150}
          height={150}
          alt="Scrum Icon"
          className="rounded shadow"
        ></Image>
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
      </MotionP>

      <MotionUl className="flex flex-col justify-between lg:ml-5 space-y-5 lg:space-y-0 my-10 lg:my-0">
        <MotionLi
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, type: "tween" }}
        >
          <div className="flex items-center ">
            <span className="m-1 p-1 ml-0 pl-0 text-teal-100">
              <FaUsers />
            </span>

            <h2>Trabalhos em Equipe</h2>
          </div>

          <p>
            Durante meu tempo na Kenzie, participei ativamente de projetos em
            equipe, onde aprendi a colaborar eficazmente com colegas de
            diferentes origens e experiências.
          </p>
        </MotionLi>

        <MotionLi
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, type: "tween" }}
        >
          <div className="flex items-center ">
            <span className="m-1 p-1 ml-0 pl-0 text-teal-100">
              <AiFillLayout />
            </span>

            <h2>Design Interface</h2>
          </div>

          <p>
            Na Kenzie, adquiri habilidades em UI, UX e a abordagem Mobile-First,
            essenciais para criar interfaces centradas no usuário e otimizadas
            para dispositivos móveis.
          </p>
        </MotionLi>

        <MotionLi
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, type: "tween" }}
        >
          <div className="flex items-center ">
            <span className="m-1 p-1 ml-0 pl-0 text-teal-100">
              <BsFillCalendarDateFill />
            </span>

            <h2>Duração do curso</h2>
          </div>

          <p>
            12 meses, sendo metade do curso voltado para formação Front End e
            metade para formação Back End.
          </p>
        </MotionLi>
      </MotionUl>
    </section>
  );
};

export default Apresentation;

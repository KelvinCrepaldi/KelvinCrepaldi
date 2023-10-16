import Image from "next/image";
import { MotionDiv } from "@/components/animations/MotionDiv";

const CurrentActivities = () => {
  return (
    <div className="grid lg:grid-cols-3 my-20">
      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center justify-around px-5 mb-10 lg:mb-0"
      >
        <Image
          src={"/documents.svg"}
          alt="documents illustration"
          width={150}
          height={150}
          className="my-2"
        ></Image>

        <p className="text-center">
          Como entusiasta da programação, tenho o hábito de{" "}
          <strong className="font-bold text-teal-500 whitespace-nowrap">
            explorar documentações
          </strong>{" "}
          detalhadas e artigos especializados.
        </p>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex flex-col lg:flex-col-reverse items-center justify-around px-5 mb-10 lg:mb-0"
      >
        <Image
          src={"/tech.svg"}
          alt="documents illustration"
          width={190}
          height={190}
          className="my-2"
        ></Image>

        <p className="text-center">
          A partir disso estou buscando{" "}
          <strong className="font-bold text-teal-500 whitespace-nowrap">
            aprender novas tecnologias
          </strong>{" "}
          que se destacam no mercado, como Next.js, Tailwinds, Framer-motion e
          focado em criar projetos pessoais fullstack com Next.js e
          express.js/typeORM + postgreSQL.
        </p>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col items-center justify-around px-5 mb-10 lg:mb-0"
      >
        <Image
          src={"/computerEvo.svg"}
          alt="computer illustration"
          width={230}
          height={230}
          className="my-2"
        ></Image>

        <p className="text-center">
          Através desse compromisso,{" "}
          <strong className="font-bold text-teal-500 whitespace-nowrap">
            mantenho-me atualizado
          </strong>{" "}
          com as últimas tendências, frameworks e melhores práticas da
          indústria, garantindo que minhas habilidades estejam{" "}
          <strong className="font-bold text-teal-500 whitespace-nowrap">
            sempre em evolução
          </strong>
          .
        </p>
      </MotionDiv>
    </div>
  );
};

export default CurrentActivities;

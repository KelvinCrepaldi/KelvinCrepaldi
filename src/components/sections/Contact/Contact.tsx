import Title from "@/components/Title";

import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import {
  MotionDiv,
  MotionH2,
  MotionP,
} from "@/components/animations/MotionDiv";

const Contact = (): JSX.Element => {
  return (
    <div className="max-w-[1300px] m-auto mt-20 font-jetbrains md:px-10 px-5 text-center ">
      <Title title="Contato"></Title>
      <div className="flex flex-col md:items-center">
        <MotionH2
          initial={{ opacity: 0, x: 200 }}
          transition={{ delay: 0.1, duration: 0.1 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="m-4 text-2xl  border-gray-900 text-teal-500 "
        >
          Entre em contato comigo!
        </MotionH2>
        <MotionP
          initial={{ opacity: 0, x: 200 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          kelvin.crepaldi@hotmail.com
        </MotionP>
        <MotionP
          initial={{ opacity: 0, x: 200 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          (41) 9 9674-8781
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, x: 200 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex text-5xl m-1 space-x-2 justify-center"
        >
          <Link
            className="hover:text-"
            href={"https://www.linkedin.com/in/kelvincrepaldi/"}
          >
            <FaLinkedin />
          </Link>
          <Link href={"https://github.com/KelvinCrepaldi?tab=repositories"}>
            <AiFillGithub />
          </Link>
        </MotionDiv>
      </div>

      <div className="flex flex-col items-center text-center max-w-[700px] mx-auto my-10 text-gray-400">
        <MotionP
          initial={{ opacity: 0, x: 200 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          Se você gostaria de discutir um projeto, fazer uma pergunta ou
          simplesmente dizer {'"'}oi{'"'}, estou sempre aberto para uma
          conversa. Você pode me contatar através dos meios de contato listados.
        </MotionP>
        <MotionP
          initial={{ opacity: 0, x: 200 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          Estou disponível para trabalhos remotos. Para projetos presenciais em
          Curitiba ou em outras cidades, podemos discutir como isso pode ser
          viável e as opções de colaboração.
        </MotionP>
      </div>
    </div>
  );
};

export default Contact;

import Title from "@/components/Title";

import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="max-w-[1250px] m-auto mt-20 font-jetbrains">
      <Title title="Contato"></Title>
      <div className="flex flex-col md:items-center">
        <h2 className="m-4 text-2xl  border-gray-900 text-teal-500">
          Entre em contato comigo!
        </h2>
        <p>kelvin.crepaldi@hotmail.com</p>
        <div className="flex text-5xl m-1 space-x-2">
          <Link href={"https://www.linkedin.com/in/kelvincrepaldi/"}>
            <FaLinkedin />
          </Link>
          <Link href={"https://github.com/KelvinCrepaldi?tab=repositories"}>
            <AiFillGithub />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center text-center max-w-[700px] mx-auto my-10 text-gray-400">
        <p>
          Se você gostaria de discutir um projeto, fazer uma pergunta ou
          simplesmente dizer {'"'}oi{'"'}, estou sempre aberto para uma
          conversa. Você pode me contatar através dos meios de contato listados.
        </p>
        <p>
          Estou disponível para trabalhos remotos. Para projetos presenciais em
          Curitiba ou em outras cidades, podemos discutir como isso pode ser
          viável e as opções de colaboração.
        </p>
      </div>
    </div>
  );
};

export default Contact;

import { MotionP, MotionDiv } from "@/components/animations/MotionDiv";
import Image from "next/image";
import { BsCheck } from "react-icons/bs";

const SoftSkills = () => {
  return (
    <section>
      <MotionDiv
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "tween" }}
        className="flex flex-col lg:flex-row bg-slate-900 rounded-xl p-5 my-20"
      >
        <Image
          src={"/scrumIcon.png"}
          width={250}
          height={250}
          alt="Scrum Icon"
          style={{ objectFit: "contain" }}
        ></Image>
        <div className="space-y-5 lg:ml-10">
          <h2 className="mb-10">
            Durante o meu curso, tive a oportunidade de trabalhar com a
            metodologia Scrum e Kanbam.
          </h2>
          <MotionP
            className="flex"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "tween" }}
          >
            <span className="text-2xl text-green-400">
              <BsCheck />
            </span>
            Em nossa equipe, adotamos a prática de reuniões diárias matinais
            para garantir a transparência e alinhamento das atividades.
          </MotionP>
          <MotionP
            className="flex"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "tween" }}
          >
            <span className="text-2xl text-green-400">
              <BsCheck />
            </span>
            Quando necessário, realizávamos reuniões adicionais à tarde para
            resolver questões emergentes.
          </MotionP>
          <MotionP
            className="flex"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "tween" }}
          >
            <span className="text-2xl text-green-400">
              <BsCheck />
            </span>
            Essa abordagem ágil e as ferramentas usadas foram essenciais para o
            sucesso dos projetos em que participei.
          </MotionP>
        </div>
      </MotionDiv>
    </section>
  );
};

export default SoftSkills;

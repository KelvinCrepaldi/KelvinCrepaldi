import Image from "next/image";
import Title from "@/components/Title";

import { MotionDiv } from "@/components/animations/MotionDiv";
import { Metadata } from "next";
import {
  Apresentation,
  CurrentActivities,
  SkillsList,
  SoftSkills,
} from "./sections";

export const metadata: Metadata = {
  title: "Sobre - Kelvin Crepaldi",
  description: "Página sobre Kelvin Crepaldi",
};

export default function About() {
  return (
    <section className=" max-w-[1300px] m-auto p-5 md:px-10 font-jetbrains text-gray-400">
      <div className="">
        <Title title="Sobre mim..." />

        <Apresentation />
        <SoftSkills />
        <CurrentActivities />
      </div>

      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, type: "tween" }}
      >
        <Image
          src={"/kenzie.jpg"}
          alt="certificado de conclusão de curso kenzie"
          width={800}
          height={700}
          className="m-auto my-10 border-4 border-gray-900 rounded"
        ></Image>
      </MotionDiv>

      <SkillsList />
    </section>
  );
}

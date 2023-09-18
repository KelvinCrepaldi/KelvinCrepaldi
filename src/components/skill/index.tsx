import { ISkillsType } from "@/interfaces/skill.interface";
import Image from "next/image";
import AnimateDiv from "../animations/AnimateDiv";

const Skill = ({ skill }: { skill: ISkillsType }): JSX.Element => {
  return (
    <div className="flex p-3 my-4 hover:bg-gray-900 rounded-lg">
      <AnimateDiv
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "tween" }}
        className="relative aspect-square w-[70px] h-[70px] md:w-[100px] md:h-[100px] mr-2"
      >
        <Image
          alt={`${skill.name} svg logo`}
          src={skill.image}
          className=""
          fill
          sizes="(max-width: 768px) 100vw"
        ></Image>
      </AnimateDiv>

      <div className="ml-2">
        <AnimateDiv
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "tween" }}
        >
          <h2 className="border-b border-gray-700 text-teal-500">
            {skill.name}
          </h2>
        </AnimateDiv>
        <AnimateDiv
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "tween" }}
        >
          <p>{skill.description}</p>
        </AnimateDiv>
      </div>
    </div>
  );
};

export default Skill;

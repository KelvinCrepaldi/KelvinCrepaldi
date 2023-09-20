"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { IProject } from "@/interfaces/project.interface";
import { IoMdOpen } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { MotionDiv } from "../animations/MotionDiv";

const Project = ({ project, delay }: { project: IProject; delay: number }) => {
  const [desktopImage, setDesktopImage] = useState<string | undefined>(
    project.images[0].desktopImage
  );
  const [mobileImage, setMobileImage] = useState<string | undefined>(
    project.images[0].mobileImage
  );
  const [imageNumber, setImageNumber] = useState(0);

  const handleImage = async (index: number) => {
    setDesktopImage(project.images[index].desktopImage);
    setMobileImage(project.images[index].mobileImage);
    setImageNumber(index);
  };

  /* const handleImage = async (index: number) => {
    setDesktopImage(undefined);

    setInterval(() => {
      setDesktopImage(project.images[index].desktopImage);
      setMobileImage(project.images[index].mobileImage);
      setImageNumber(index);
    }, 2000);
  }; */

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 200 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="max-w-[600px] w-full relative flex flex-col m-1 rounded mb-10 font-roboto-mono overflow-hidden"
    >
      <AnimatePresence>
        {desktopImage && (
          <motion.div
            layout
            key={imageNumber}
            initial={{ opacity: 0, position: "absolute", x: 100 }}
            animate={{ opacity: 1, position: "relative", x: 0 }}
            exit={{ opacity: 0, position: "absolute" }}
            transition={{ delay: 0.3, type: "tween" }}
            className="aspect-desktop w-full h-auto shadow-2xl rounded "
          >
            <Image
              className="rounded"
              src={desktopImage}
              alt="Desktop print of project"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              placeholder="blur"
              blurDataURL={desktopImage}
            ></Image>

            {mobileImage && (
              <div className="absolute aspect-mobile w-[25%] h-auto right-2 -bottom-4 rounded shadow-2xl">
                <Image
                  className="rounded"
                  src={mobileImage}
                  alt="Mobile print of project"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  placeholder="blur"
                  blurDataURL={mobileImage}
                ></Image>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex mt-1 px-4">
        {project.images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleImage(index)}
            className={`w-8 h-8 rounded-full bg-slate-600 m-1 text-sm text-gray-800 hover:text-emerald-600 ${
              index === imageNumber &&
              "border border-emerald-600 text-emerald-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex flex-col w-[80%] px-4 mt-2">
        <h1 className="text-green-500 text-xl font-bold">{project.title}</h1>
        <p className="pb-1 text-sm text-gray-500">
          {project.type} - {project.skills.map((skill) => "|" + skill)}
        </p>
        <p className="text-base">{project.description}</p>
        <div className="mt-1 flex">
          {project.demoUrl && (
            <Link
              className=" p-1 text-emerald-500 hover:text-emerald-400 flex items-center text-base"
              href={project.demoUrl}
              target="_blank"
            >
              <span className="mr-1">Demonstração</span> <IoMdOpen />
            </Link>
          )}
          <Link
            className="p-1 text-emerald-500 hover:text-emerald-400 flex items-center text-base"
            href={project.repoUrl}
            target="_blank"
          >
            <span className="mr-1">Repositório</span> <FaGithub />
          </Link>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Project;

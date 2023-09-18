"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { IProject } from "@/interfaces/project.interface";

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
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-[600px] relative flex flex-col m-1 rounded mb-10 ">
        <AnimatePresence>
          {desktopImage && (
            <motion.div
              layout
              key={imageNumber}
              initial={{ opacity: 0, position: "absolute", x: 100 }}
              animate={{ opacity: 1, position: "relative", x: 0 }}
              exit={{ opacity: 0, position: "absolute" }}
              transition={{ delay: 0.3, type: "tween" }}
              className="relative aspect-desktop w-full shadow-2xl border border-black rounded"
            >
              <Image
                className="rounded"
                src={desktopImage}
                alt="Desktop print of project"
                fill
                sizes="(max-width: 600px) 100vw"
              ></Image>

              {mobileImage && (
                <div className="absolute aspect-mobile w-[25%] right-2 -bottom-4 rounded shadow-2xl border border-black ">
                  <Image
                    className="rounded"
                    src={mobileImage}
                    alt="Mobile print of project"
                    fill
                  ></Image>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex mt-2 px-4">
          {project.images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImage(index)}
              className={`w-7 h-7 rounded-full bg-slate-600 m-1 ${
                index === imageNumber && "border"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex flex-col w-[80%] p-4">
          <h1 className="text-green-500 text-xl font-bold ">{project.title}</h1>
          <p className="text-base">{project.description}</p>
          <div>
            {project.demoUrl && (
              <Link href={project.demoUrl}>Demonstração</Link>
            )}
            <Link href={project.repoUrl}>Repositório</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;

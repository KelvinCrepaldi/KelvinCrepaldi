"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = (): JSX.Element => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["300px center", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const position = useTransform(scrollYProgress, (val) => {
    return val === 1 ? "relative" : "fixed";
  });

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="relative min-h-[60vh] lg:items-center lg:text-center"
    >
      <motion.div
        style={{ scale, position }}
        className="flex flex-col lg:items-center w-full justify-between  p-5 md:p-10 left-0 min-h-[60vh]"
      >
        <div className="flex flex-col lg:items-center">
          <motion.h1
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-oxygen text-xl md:text-2xl lg:text-5xl "
          >
            Olá, eu sou <span className="font-bold">Kelvin Crepaldi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="pb-3 font-oxygen mb-10 text-lg md:text-xl lg:text-4xl text-teal-500"
          >
            Desenvolvedor Full-stack
          </motion.p>
        </div>

        <div className="flex flex-col lg:items-center">
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className=" text-gray-400 w-1/2 lg:w-full mb-2 font-jetbrains lg:text-center max-w-2xl"
          >
            Esse website é meu espaço, criado para guardar algumas coisas que
            aprendi e criei durante meu tempo como programador
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className=" text-gray-300 font-jetbrains"
          >
            Seja bem vindo...
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;

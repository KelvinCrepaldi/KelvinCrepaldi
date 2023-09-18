"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const Title = ({ title }: { title: string }) => {
  return (
    <motion.h1
      className="font-jetbrains text-teal-400 my-3 flex items-center  font-bold sm:sticky top-[30px] w-full text-lg md:text-xl lg:text-2xl"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, type: "tween" }}
    >
      {title}
      <div className="border-b border-white grow m-3 opacity-10" />
    </motion.h1>
  );
};

export default Title;

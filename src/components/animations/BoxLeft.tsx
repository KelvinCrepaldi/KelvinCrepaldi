"use client";
import { motion } from "framer-motion";

const BoxLeft = () => {
  return (
    <div className="w-[200px] h-[150px] absolute left-0 flex ">
      <motion.div
        className="w-[60%] bg-[#313131] h-full"
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      ></motion.div>
      <motion.div
        className="w-[15px] bg-[#313131] h-full ml-[7px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      ></motion.div>
      <motion.div
        className="w-[15px] bg-[#313131] h-full ml-[7px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      ></motion.div>
    </div>
  );
};

export default BoxLeft;

"use client";
import { motion } from "framer-motion";

const BoxRight = () => {
  return (
    <div className="w-[20px] h-full absolute flex flex-col bottom-0 right-10">
      <motion.div
        className="w-full bg-[#313131] h-[20px] mr-[7px] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.div>
      <motion.div
        className="w-full bg-[#313131] h-[20px] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      ></motion.div>

      <motion.div
        className="w-full bg-[#313131] h-[20px] mr-[7px] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.div>
      <motion.div
        className="w-full bg-[#313131] h-[20px] mr-[7px] mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.div>
    </div>
  );
};

export default BoxRight;

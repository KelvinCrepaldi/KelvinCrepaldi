"use client";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type TextToLeftProps = {
  children: ReactNode;
} & HTMLMotionProps<"div">;

const AnimateDiv = ({ children, ...rest }: TextToLeftProps): JSX.Element => {
  return <motion.div {...rest}>{children}</motion.div>;
};

export default AnimateDiv;

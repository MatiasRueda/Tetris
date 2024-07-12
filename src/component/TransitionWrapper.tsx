import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function TransitionWrapper(props: { children: ReactNode }) {
  const transitionVariants = {
    initial: { opacity: 0, x: "-100vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100vw" },
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 50,
  };

  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={transitionVariants}
      transition={transitionSettings}
    >
      {props.children}
    </motion.main>
  );
}

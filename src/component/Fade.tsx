import "../assets/style/fade.css";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useScreenContext } from "../context/ScreenContext";

export default function Fade(props: { children: ReactNode }) {
  const screen = useScreenContext();

  return (
    <motion.div
      className="fade"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          delay: 0,
          duration: screen.current === screen.screens.Home ? 0 : 0.5,
        },
      }}
      transition={{ duration: 0.5, delay: 0.75 }}
    >
      {props.children}
    </motion.div>
  );
}

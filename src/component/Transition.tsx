import { motion } from "framer-motion";
import "../assets/style/transition.css";

const squares = Array.from({ length: 100 }, (_, i) => i);
export default function Transition(props: { exit: boolean; show: boolean }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.01,
        staggerChildren: 0.01,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 3000,
        staggerChildren: 0.01,
        staggerDirection: -1,
      },
    },
  };

  const squareVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    exit: { scale: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="transition-wrapper"
      variants={variants}
      initial="hidden"
      animate={props.exit ? "visible" : "exit"}
      style={{ zIndex: props.show ? 2 : 0 }}
    >
      {squares.map((square) => (
        <motion.div key={square} className="square" variants={squareVariants} />
      ))}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import "../assets/style/transition.css"; // Asegúrate de crear un archivo CSS para los estilos

const squares = Array.from({ length: 100 }, (_, i) => i);
export default function TransitionWrapper(props: { show: boolean }) {
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
        delay: 0.01,
        staggerChildren: 0.01,
      },
    },
  };

  const squareVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    exit: { scale: 0 },
  };

  return (
    <motion.div
      className="transition-wrapper"
      variants={variants}
      initial="hidden"
      style={{ zIndex: props.show ? 2 : 0 }}
      animate={props.show ? "visible" : "exit"}
    >
      {squares.map((square) => (
        <motion.div key={square} className="square" variants={squareVariants} />
      ))}
    </motion.div>
  );
}

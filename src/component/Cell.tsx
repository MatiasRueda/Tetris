import { motion } from "framer-motion";

export default function Cell(props: { color?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        props.color
          ? { scale: 1, opacity: 1, backgroundColor: props.color }
          : { scale: 0, opacity: 0 }
      }
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="cont-cell"
    />
  );
}

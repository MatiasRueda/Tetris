import { motion } from "framer-motion";

export default function HomeButton(props: {
  click: () => void;
  class: string;
  value: string;
}) {
  return (
    <motion.button
      className={props.class}
      onClick={props.click}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      {props.value}
    </motion.button>
  );
}

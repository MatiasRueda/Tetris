import { motion } from "framer-motion";

export default function Button(props: {
  click: () => void;
  class: string;
  disabled?: boolean;
  value: string;
}) {
  return (
    <motion.button
      className={props.class}
      onClick={props.click}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: props.disabled ? 1 : 0.9 }}
      whileHover={{ scale: props.disabled ? 1 : 1.1 }}
      disabled={props.disabled}
      style={{
        cursor: props.disabled ? "default" : "pointer",
        backgroundColor: props.disabled ? "grey" : "#ffcc00",
      }}
    >
      {props.value}
    </motion.button>
  );
}

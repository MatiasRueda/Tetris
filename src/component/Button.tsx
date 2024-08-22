import { motion } from "framer-motion";

export default function Button(props: {
  click?: () => void;
  class: string;
  color?: string;
  disabled?: boolean;
  value: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <motion.button
      className={props.class}
      onClick={props.click}
      type={props.type ? props.type : "button"}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: props.disabled ? 1 : 0.9 }}
      whileHover={{ scale: props.disabled ? 1 : 1.1 }}
      disabled={props.disabled}
      style={{
        cursor: props.disabled ? "default" : "pointer",
        backgroundColor: props.disabled
          ? "grey"
          : props.color
          ? props.color
          : "#ffcc00",
      }}
    >
      {props.value}
    </motion.button>
  );
}

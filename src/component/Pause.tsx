import Button from "./Button";
import "../assets/style/pause.css";
import { motion, Variants } from "framer-motion";

export default function Pause(props: { resume: () => void }) {
  const variants: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -100,
    },
  };
  return (
    <section className="pause">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="cont-pause"
      >
        <h1>Pause</h1>
        <Button click={props.resume} class={"resume-btn"} value={"Resume"} />
      </motion.div>
    </section>
  );
}

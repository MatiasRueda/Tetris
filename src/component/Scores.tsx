import { motion } from "framer-motion";
import NumberAnimation from "./NumberAnimation";

export default function Scores(props: { scores: [string, number][] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };

  const scoresVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const orderNumber = ([title, score]: [string, number], index: number) => {
    return index === props.scores.length - 1 ? (
      <NumberAnimation duration={5} finalNumber={score} />
    ) : (
      <motion.p key={index} variants={scoresVariants}>
        {title}: &nbsp;{score}
      </motion.p>
    );
  };

  return (
    <motion.div
      className="cont-lose-score"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {props.scores.map((score, index) => orderNumber(score, index))}
    </motion.div>
  );
}

//<NumberAnimation duration={5} finalNumber={10000} />;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NumberAnimation(props: {
  finalNumber: number;
  duration: number;
}) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setDisplayNumber(Math.floor(Math.random() * props.finalNumber));
      }, 10);
    } else {
      setDisplayNumber(props.finalNumber);
    }

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, props.duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAnimating, props.finalNumber, props.duration]);

  return (
    <motion.p
      className="cont-lose-total"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      Total: &nbsp;{displayNumber}
    </motion.p>
  );
}

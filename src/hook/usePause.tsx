import { useState, useEffect } from "react";

export default function usePause(start: boolean) {
  const [value, setValue] = useState(document.hidden);

  const showPause = () => {
    if (document.hidden) setValue(true);
  };

  const resume = () => {
    setValue(false);
  };

  useEffect(() => {
    if (!start) return;
    document.addEventListener("visibilitychange", showPause);
    return () => {
      document.removeEventListener("visibilitychange", showPause);
    };
  }, [start]);

  return { value, resume };
}

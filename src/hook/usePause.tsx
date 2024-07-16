import { useState, useEffect } from "react";

export default function usePause() {
  const [value, setValue] = useState(document.hidden);

  const showPause = () => {
    if (document.hidden) setValue(true);
  };

  const resume = () => {
    setValue(false);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", showPause);
    return () => {
      document.removeEventListener("visibilitychange", showPause);
    };
  }, []);

  return { value, resume };
}

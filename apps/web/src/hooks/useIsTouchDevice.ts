import { useEffect, useState } from "react";

function getInitialTouchState(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(getInitialTouchState);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsTouch(event.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return isTouch;
}

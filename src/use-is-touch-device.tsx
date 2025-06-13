import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };

    checkTouch(); // run on mount

    window.addEventListener("resize", checkTouch); // optional: update on resize
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return isTouchDevice;
}

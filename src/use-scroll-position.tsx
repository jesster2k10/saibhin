import { useEffect, useState, useRef } from "react";

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (requestRef.current === null) {
        requestRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          requestRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize on mount
    setScrollY(window.scrollY);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return scrollY;
}

import { useEffect, useState, useRef } from "react";

export function useScrollDirection({ threshold = 10, idleDelay = 300 } = {}) {
  const [direction, setDirection] = useState<"up" | "down" | "idle">("idle");

  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const lastDirection = useRef<"up" | "down" | "idle">("idle");
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateDirection = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      let newDirection: typeof direction = lastDirection.current;

      if (Math.abs(diff) > threshold) {
        newDirection = diff > 0 ? "down" : "up";
      }

      if (newDirection !== lastDirection.current) {
        lastDirection.current = newDirection;
        setDirection(newDirection);
      }

      lastScrollY.current = currentY;
      ticking = false;

      // reset to idle after delay
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        if (lastDirection.current !== "idle") {
          lastDirection.current = "idle";
          setDirection("idle");
        }
      }, idleDelay);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, [threshold, idleDelay]);

  return direction;
}

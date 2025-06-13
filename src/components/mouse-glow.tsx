"use client";

import { MouseState, useMouse } from "@/use-mouse";
import { motion } from "motion/react";

interface MouseGlowProps {
  size?: number;
}

const MouseGlow: React.FC<MouseGlowProps> = ({ size = 300 }) => {
  const {
    position: [mouseX, mouseY],
    state: mouseState,
  } = useMouse();

  return (
    <motion.div
      style={{
        position: "fixed",
        zIndex: -50,
        background: "radial-gradient(#fb923c, transparent)",
        filter: "blur(32px)",
        pointerEvents: "none",
        width: size,
        height: size,
        translateX: mouseX - size / 2,
        translateY: mouseY - size / 2,
      }}
      animate={{
        opacity:
          mouseState === MouseState.INACTIVE
            ? 0
            : mouseState === MouseState.IDLE
              ? 0.7
              : 1,
      }}
      initial={{
        opacity: 0,
      }}
      whileTap={{
        scale: 1.5,
      }}
    />
  );
};

export { MouseGlow };

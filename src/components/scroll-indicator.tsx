"use client";

import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineSwipeDown,
} from "react-icons/md";
import { useIsTouchDevice } from "@/use-is-touch-device";
import { useScrollDirection } from "@/use-scroll-direction";

export function ScrollIndicator() {
  const isTouchDevice = useIsTouchDevice();
  const scrollDirection = useScrollDirection();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: scrollDirection === "down" ? 0 : 1,
      transition: { duration: 0.4, ease: "easeOut" },
    });
  }, [scrollDirection, controls]);

  return (
    <motion.div animate={controls}>
      <motion.div
        animate={{ y: [0, 12, 0, 12, 0] }}
        transition={{
          duration: 3,
          times: [0, 0.1, 0.2, 0.3, 0.4],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.5,
        }}
      >
        <Box fontSize="xs" display="flex" alignItems="center">
          {isTouchDevice ? (
            <MdOutlineSwipeDown display="inline-block" />
          ) : (
            <MdOutlineKeyboardDoubleArrowDown display="inline-block" />
          )}
          <Text pl={1}>{isTouchDevice ? "Swipe Down" : "Scroll Down"}</Text>
        </Box>
      </motion.div>
    </motion.div>
  );
}

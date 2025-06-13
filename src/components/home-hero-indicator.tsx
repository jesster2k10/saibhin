"use client";

import { Box } from "@chakra-ui/react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { useViewportSize } from "@/use-viewport-size";

export function HomeHeroIndicator() {
  const { height: viewportHeight } = useViewportSize();
  const scrollToMainContent = () => {
    window.scrollTo({ top: viewportHeight, behavior: "smooth" });
  };

  return (
    <Box
      as="button"
      onClick={scrollToMainContent}
      pb={4}
      color="white"
      position="absolute"
      bottom={0}
      cursor="pointer"
      _hover={{ opacity: 0.7 }}
      transition="all ease-in-out"
      transitionDuration="550ms"
    >
      <ScrollIndicator />
    </Box>
  );
}

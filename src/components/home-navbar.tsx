"use client";

import { Flex } from "@chakra-ui/react";
import { Navbar } from "@/components/navbar";
import { useScrollPosition } from "@/use-scroll-position";
import { useViewportSize } from "@/use-viewport-size";

export function HomeNavbar() {
  const scrollY = useScrollPosition();
  const { height: viewportHeight } = useViewportSize();
  const isPastHeader = scrollY >= viewportHeight;

  return (
    <Flex
      zIndex={30}
      top={0}
      left={0}
      justifyContent="space-around"
      alignItems="center"
      sm={{ justifyContent: "space-between" }}
      right={0}
      p={4}
      position="fixed"
      color={isPastHeader ? "inhert" : "white"}
      background={isPastHeader ? "warmCream.500" : "inherit"}
    >
      <Navbar
        sm={{ display: "block" }}
        display="none"
        links={[{ href: "#bio", text: "spotify" }]}
      />
      <Navbar
        links={[
          { href: "#bio", text: "bio" },
          { href: "#music", text: "music" },
          { href: "#shows", text: "shows" },
          { href: "#press", text: "press" },
        ]}
      />
    </Flex>
  );
}

import { BackgroundVideo } from "@/components/background-video";
import { Flex, Heading, VStack, Text } from "@chakra-ui/react";
import { HomeHeroIndicator } from "./home-hero-indicator";

export function HomeHero() {
  return (
    <Flex
      justifyContent="center"
      alignItems="start"
      pt={14}
      sm={{ pt: 0, alignItems: "center" }}
      height={["100svh", "100vh"]}
      width="100%"
      position="relative"
    >
      <BackgroundVideo
        sources={[
          {
            type: "mp4",
            src: "/bg_video/w720.mp4",
            breakpoint: "(max-width: 720px)",
          },
          {
            type: "webm",
            src: "/bg_video/w720.webm",
            breakpoint: "(max-width: 720px)",
          },
          {
            type: "mp4",
            src: "/bg_video/w1280.mp4",
            breakpoint: "(min-width: 720px)",
          },
          {
            type: "webm",
            src: "/bg_video/w1280.webm",
            breakpoint: "(min-width: 720px)",
          },
        ]}
        placeholderSrc="/bg_video/placeholder.jpg"
      />
      <VStack spaceY={0} sm={{ spaceY: 2 }} color="white">
        <Heading color="white" sm={{ fontSize: "5xl" }} fontSize="3xl">
          Saibhin
        </Heading>
        <Text fontFamily="heading" fontWeight="light" fontSize="sm">
          Ethereal. Magical. Intimate
        </Text>
      </VStack>

      <HomeHeroIndicator />
    </Flex>
  );
}

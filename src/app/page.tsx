import Albums from "@/components/albums";
import { HomeHero } from "@/components/home-hero";
import { HomeNavbar } from "@/components/home-navbar";
import {
  Box,
  Card,
  Container,
  Flex,
  Image as ChakraImage,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Viewport } from "next";
import Image from "next/image";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "black",
};

export default function Home() {
  return (
    <Box
      minH="100vh"
      pt="env(safe-area-inset-top)"
      pb="env(safe-area-inset-bottom)"
      pl="env(safe-area-inset-left)"
      pr="env(safe-area-inset-right)"
    >
      <HomeHero />
      <HomeNavbar />
      <VStack minH="vh" align="start" px={2} py={14}>
        <Container maxW="960px">
          <Box mb={8}>
            <Heading sm={{ display: "none" }} size="5xl">
              Saibhinn
            </Heading>
            <Text
              lineHeight="tall"
              fontSize="lg"
              sm={{ fontSize: "xl" }}
              pt={2}
            >
              Mexican-Irish artist building a cult following in Dublin, known
              for goosebump-inducing vocals, raw storytelling, and electric live
              shows.
            </Text>
          </Box>
          <Albums />
        </Container>

        <Box sm={{ display: "none" }} mt={10} width="100%">
          <Image alt="Saibh" width={500} height={500} src="/saibh_green.jpg" />
        </Box>
      </VStack>
    </Box>
  );
}

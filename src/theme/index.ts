import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";
import { pallete } from "./colors";
import { buttonRecipe } from "./buttons";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: pallete,
      fonts: {
        heading: {
          value: "'garamond-atf-text', 'Apple Garamound', Garamound, serif",
        },
        body: {
          value:
            "'neue-haas-grotesk-text', Helvetica Neue, Arial, Inter, sans-serif",
        },
      },
      sizes: {
        container: {
          sm: { value: "640px" },
        },
      },
    },
    recipes: {
      // button: buttonRecipe,
    },
  },
  globalCss: {
    html: {
      background: "warmCream.500",
      margin: 0,
      padding: 0,
    },
    body: {
      color: "deepRustRed.500",
      fontFamily: "body",
      margin: 0,
      padding: 0,
    },
    "h1,h2,h3,h4,h5,h6": {
      fontFamily: "heading",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

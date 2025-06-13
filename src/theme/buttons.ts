import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: 'bold',
    borderRadius: 'md',
  },
  variants: {
    solid: {
      bg: 'burntGold.500',
      color: 'white',
      _hover: {
        bg: 'burntGold.600',
      },
    },
    outline: {
      borderColor: 'burntGold.500',
      color: 'burntGold.500',
      _hover: {
        bg: 'burntGold.500',
        color: 'white',
      },
    },
  },
});

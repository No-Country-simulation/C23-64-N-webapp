import { defineStyleConfig } from "@chakra-ui/react";

export const ButtonConfig = defineStyleConfig({
  // Estilos base que se aplican a todos los botones
  baseStyle: {},
  // Variantes predefinidas
  variants: {
    outline: {
      textAlign: "center",
      fontFamily: "Source Sans Pro",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 900,
      lineHeight: "24px" /* 120% */,
      textTransform: "uppercase",
      color: "white",

      _hover: {
        borderBottom: "4px solid  #2271D1",
        background: " #262626",
        boxShadow: "0px 5px 29px 0px rgba(34, 113, 209, 0.70)",
        bg: "black",
        border: "2px solid blue",
        color: " #2271D1",
      },
    },
    personal: {
      color: "white.300",
      bg: "black.600",
      borderColor: "black.300",
      border: "1px solid",
    },
    custom: {
      textTransform: "uppercase",
      border: "1px solid brown.600",
      borderRadius: "15px",
      color: "white",
      letterSpacing: "0.3em",
      background: "brown.600",
      _hover: {
        backgroundColor: "tostado",
        color: "black",
      },
      _active: {
        bg: "green.700",
      },
    },
  },
  // Tamaños predefinidos
  sizes: {
    xl: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },
  // Configuración por defecto
  defaultProps: {
    size: "md",
    variant: "custom",
  },
});

import { defineStyleConfig } from "@chakra-ui/react";

export const InputConfig = defineStyleConfig({
  baseStyle: {
    field: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "white.600",
      fontSize: "14px",
      padding: "10px 16px",
      borderRadius: "5px ",
      _placeholder: {
        color: "white.700",
        fontStyle: "italic",
      },
      _focus: {
         outline: '3px solid green',
          outlineOffset: '1px'

      },
    },
  },
  variants: {
    base: {},
    nuevo: {
      field: {
        fontSize: "1em",
        color: "purple",
        border: "1px solid black",
        borderRadius: "15px",
        fontWeight: 900,
        _placeholder: {
          color: "blue.300",
          fontStyle: "italic",
        },
      },
    },
  },
  defaultProps: {
    variant: "base",
  },
});

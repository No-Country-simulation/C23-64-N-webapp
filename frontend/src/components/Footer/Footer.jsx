import { Box, Flex, Text } from "@chakra-ui/react";


export const Footer = () => {
  return (
    <Box>
      
      <Flex
      
        as="footer"
        minH={"50px"}
        direction={"column"}
        w={"100%"}
        align="center"
        justify={"center"}
        bg={"gray.800"}
        boxSizing={"border-box"}
        color={"white"}
      >
        <Text>© 2025 - Todos los derechos reservados</Text>
      </Flex>
    </Box>
  );
};

import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  VStack,
  Avatar,
  Heading,
} from "@chakra-ui/react";

const AdminLogin = () => {
  const handleLogin = () => {
    // Aca iria la lógica para manejar el inicio de sesión
    console.log("Iniciar sesión");
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        maxW="400px"
        w="100%"
      >
        <VStack spacing={4} align="stretch">
          <Flex justify="center">
            <Avatar size="xl" />
          </Flex>
          <Heading textAlign="center" size="lg" mb={4}>
            Admin Login
          </Heading>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Ingrese su email"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleLogin}
            w="100%"
            mt={4}
          >
            Ingresar
          </Button>
          <Flex justify="space-between" mt={2}>
            <Link color="teal.500" fontSize="sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default AdminLogin;

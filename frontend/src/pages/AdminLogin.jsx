import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Estado para email, contraseña, errores y recuperación
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Credenciales hardcodeadas
  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      navigate("/admin-panel"); // Redirige al panel de administración
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleForgotPassword = () => {
    if (resetEmail) {
      // Simulamos un envío de correo con una contraseña temporal
      setSuccessMessage(`Se ha enviado una contraseña temporal a ${resetEmail}`);
      setResetEmail(""); // Limpia el input después de enviar el "correo"
    } else {
      setError("Ingrese un correo válido");
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} rounded="lg" shadow="lg" maxW="400px" w="100%">
        <VStack spacing={4} align="stretch">
          <Flex justify="center">
            <Avatar size="xl" />
          </Flex>
          <Heading textAlign="center" size="lg" mb={4}>
            {isForgotPassword ? "Recuperar contraseña" : "Admin Login"}
          </Heading>

          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          {successMessage && (
            <Text color="green.500" textAlign="center">
              {successMessage}
            </Text>
          )}

          {!isForgotPassword ? (
            <>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Ingrese su email"
                  focusBorderColor="teal.400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  focusBorderColor="teal.400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Button colorScheme="teal" onClick={handleLogin} w="100%" mt={4}>
                Ingresar
              </Button>

              <Flex justify="center" mt={2}>
                <Link
                  color="teal.500"
                  fontSize="sm"
                  onClick={() => setIsForgotPassword(true)}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Flex>
            </>
          ) : (
            /* Formulario de recuperación de contraseña */
            <>
              <FormControl isRequired>
                <FormLabel>Ingrese su correo</FormLabel>
                <Input
                  type="email"
                  placeholder="Ingrese su email"
                  focusBorderColor="teal.400"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </FormControl>

              <Button colorScheme="teal" onClick={handleForgotPassword} w="100%" mt={4}>
                Recuperar contraseña
              </Button>

              <Flex justify="center" mt={2}>
                <Link
                  color="teal.500"
                  fontSize="sm"
                  onClick={() => setIsForgotPassword(false)}
                >
                  Volver al login
                </Link>
              </Flex>
            </>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default AdminLogin;

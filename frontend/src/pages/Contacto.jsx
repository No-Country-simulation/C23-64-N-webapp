
import { useState } from 'react';
import { 
  Box, Heading, Grid, GridItem, Text, Flex, Link, List, ListItem, 
  Input, Textarea, Button, useToast, Alert, AlertIcon 
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaClock } from "react-icons/fa";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulación de envío exitoso
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos en breve.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading as="h1" size="xl" mb={10} textAlign="center" color="#7F5539">
        ¿Necesitas ayuda? Contáctanos
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} mb={20}>
        {/* Columna Izquierda - Información */}
        <GridItem>
          <Box bg="#F7F3E9" p={8} borderRadius="lg">
            <Heading as="h2" size="lg" mb={6} color="gray.700">
              Información de contacto
            </Heading>

            <Flex direction="column" gap={6}>
              <Flex align="start" gap={4}>
                <Box pt={1}>
                  <FaMapMarkerAlt size={20} color="#7F5539" />
                </Box>
                <Box>
                  <Text fontWeight="600" mb={1}>Oficina Central</Text>
                  <Text>Av. Corrientes 123</Text>
                  <Text>Buenos Aires, Argentina</Text>
                </Box>
              </Flex>

              <Flex align="center" gap={4}>
                <FaPhone size={20} color="#7F5539" />
                <Text>+54 11 1234-5678</Text>
              </Flex>

              <Flex align="center" gap={4}>
                <FaEnvelope size={20} color="#7F5539" />
                <Text>contacto@rentafacil.com</Text>
              </Flex>

              <Flex align="start" gap={4}>
                <Box pt={1}>
                  <FaClock size={20} color="#7F5539" />
                </Box>
                <Box>
                  <Text fontWeight="600">Horario de atención:</Text>
                  <Text>Lun-Vie: 9:00 AM - 7:00 PM</Text>
                  <Text>Sábados: 10:00 AM - 2:00 PM</Text>
                </Box>
              </Flex>
            </Flex>
          </Box>

          <Box mt={8}>
            <Heading as="h3" size="md" mb={4} color="gray.700">
              Síguenos en redes
            </Heading>
            <Flex gap={4}>
              <Link href="#" _hover={{ opacity: 0.7 }}>
                <FaFacebook size={28} color="#7F5539" />
              </Link>
              <Link href="#" _hover={{ opacity: 0.7 }}>
                <FaInstagram size={28} color="#7F5539" />
              </Link>
            </Flex>
          </Box>
        </GridItem>

        {/* Columna Derecha - Formulario Simulado */}
        <GridItem>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" height="100%">
            <Heading as="h2" size="lg" mb={6} color="gray.700">
              Envíanos un mensaje
            </Heading>
            
            {isSubmitted && (
              <Alert status="success" mb={6} borderRadius="md">
                <AlertIcon />
                ¡Mensaje recibido! Nos pondremos en contacto contigo pronto.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap={4}>
                <Input
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  size="lg"
                  focusBorderColor="blue.500"
                  isRequired
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  size="lg"
                  focusBorderColor="blue.500"
                  isRequired
                />

                <Textarea
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={handleChange}
                  size="lg"
                  rows={6}
                  focusBorderColor="blue.500"
                  isRequired
                />

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mt={4}
                >
                  Enviar Mensaje
                </Button>
              </Flex>
            </form>
          </Box>
        </GridItem>
      </Grid>

      {/* Sección Mapa */}
      <Box mb={20}>
        <Heading as="h2" size="lg" mb={6} color="gray.700">
          Nuestra ubicación
        </Heading>
        <Box
          as="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.373713996425!2d-58.38378568477086!3d-34.60373844346371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf425b481d%3A0x9ec9faf81b0cf294!2sObelisco!5e0!3m2!1ses-419!2sar!4v1659036741416!5m2!1ses-419!2sar"
          width="100%"
          height="400"
          borderRadius="lg"
          border="none"
          loading="lazy"
        />
      </Box>

      {/* Preguntas Frecuentes */}
      <Box bg="#F7F3E9" p={8} borderRadius="lg">
        <Heading as="h2" size="lg" mb={6} color="gray.700">
          Preguntas frecuentes
        </Heading>
        <List spacing={4}>
          <ListItem>
            <Text fontWeight="600">¿Cómo reservo mobiliario?</Text>
            <Text color="gray.600">Selecciona los items, fechas y completa el formulario de contacto.</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="600">¿Qué métodos de pago aceptan?</Text>
            <Text color="gray.600">Tarjetas de crédito/débito y transferencias bancarias.</Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Contacto;

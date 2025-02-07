import { Box, Heading, Text, Grid, GridItem, Flex, List, ListItem, Button, Link } from "@chakra-ui/react";
import { FaRocket, FaHistory, FaUsers, FaHandshake, FaAward, FaRegSmile } from "react-icons/fa";

const AboutPage = () => {
  return (
    <Box maxW="1200px" mx="auto" p={8}>
      {/* Hero Section */}
      <Flex direction="column" align="center" textAlign="center" mb={20}>
        <Heading as="h1" size="2xl" mb={6} color="#7F5539">
          Transformando el alquiler de mobiliario
        </Heading>
        <Text fontSize="xl" maxW="800px" color="gray.600">
          En RentaFacil conectamos necesidades con soluciones. Simplificamos el proceso de alquiler para que puedas enfocarte en lo que realmente importa.
        </Text>
      </Flex>

      {/* Misión y Visión */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} mb={20}>
        <GridItem>
          <Box bg="#F7F3E9" p={8} borderRadius="lg">
            <FaRocket size={40} color="#7F5539" />
            <Heading as="h2" size="lg" my={4} color="gray.700">
              Nuestra Misión
            </Heading>
            <Text color="gray.600">
              Democratizar el acceso a mobiliario de calidad mediante un servicio ágil, transparente y accesisble para todos.
            </Text>
          </Box>
        </GridItem>
        
        <GridItem>
          <Box bg="#F7F3E9" p={8} borderRadius="lg">
            <FaHistory size={40} color="#7F5539" />
            <Heading as="h2" size="lg" my={4} color="gray.700">
              Nuestra Historia
            </Heading>
            <Text color="gray.600">
              Fundada en 2023 por un equipo de emprendedores argentinos, buscamos revolucionar el mercado de alquileres con tecnología y servicio personalizado.
            </Text>
          </Box>
        </GridItem>
      </Grid>

      {/* Timeline de Evolución */}
      <Box mb={20}>
        <Heading as="h2" size="xl" textAlign="center" mb={10} color="#7F5539">
          Nuestra Evolución
        </Heading>
        <Flex direction="column" position="relative">
          {/* Línea de tiempo */}
          <Box 
            position="absolute" 
            left="50%" 
            top="0" 
            bottom="0" 
            width="2px" 
            bg="#EDE0D4" 
            transform="translateX(-50%)"
            display={{ base: "none", md: "block" }}
          />
          
          {[
            { year: "2023", title: "Fundación", text: "Nace RentaFacil en Buenos Aires" },
            { year: "2024", title: "Expansión", text: "Llegamos a 5 provincias argentinas" },
            { year: "2025", title: "Innovación", text: "Lanzamiento de nuestra plataforma web" },
          ].map((item, index) => (
            <Flex
              key={item.year}
              direction={{ base: "column", md: "row" }}
              align="center"
              mb={10}
              position="relative"
              _last={{ mb: 0 }}
            >
              <Box 
                flexShrink={0}
                width={{ base: "80px", md: "120px" }}
                textAlign="center"
                mb={{ base: 4, md: 0 }}
              >
                <Box
                  bg="#7F5539"
                  color="white"
                  p={3}
                  borderRadius="full"
                  display="inline-block"
                >
                  <Text fontWeight="bold">{item.year}</Text>
                </Box>
              </Box>
              
              <Box 
                flex={1} 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                boxShadow="lg"
                ml={{ md: index % 2 === 0 ? 8 : 0 }}
                mr={{ md: index % 2 !== 0 ? 8 : 0 }}
              >
                <Heading as="h3" size="md" mb={2} color="gray.700">
                  {item.title}
                </Heading>
                <Text color="gray.600">{item.text}</Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>

      {/* Valores Corporativos */}
      <Box mb={20}>
        <Heading as="h2" size="xl" textAlign="center" mb={10} color="#7F5539">
          Nuestros Valores
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          {[
            { icon: FaHandshake, title: "Transparencia", text: "Precios claros sin cargos ocultos" },
            { icon: FaUsers, title: "Enfoque humano", text: "Atención personalizada 24/7" },
            { icon: FaAward, title: "Calidad", text: "Mobiliario certificado y garantizado" },
          ].map((item, index) => (
            <GridItem key={index}>
              <Box bg="#F7F3E9" p={8} borderRadius="lg" height="100%">
                <item.icon size={32} color="#7F5539" />
                <Heading as="h3" size="lg" my={4} color="gray.700">
                  {item.title}
                </Heading>
                <Text color="gray.600">{item.text}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Equipo */}
      <Box mb={20}>
        <Heading as="h2" size="xl" textAlign="center" mb={10} color="#7F5539">
          Nuestro Equipo
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          {[
            { name: "Alan", role: "Dev", bio: "" },
            { name: "Omar ", role: "Dev", bio: "" },
            { name: "Fran", role: "Dev", bio: "" },
          ].map((member, index) => (
            <GridItem key={index}>
              <Box 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                boxShadow="md"
                textAlign="center"
                _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
                transition="all 0.3s ease"
              >
                <Box
                  bg="#EDE0D4"
                  width="120px"
                  height="120px"
                  borderRadius="full"
                  mx="auto"
                  mb={4}
                />
                <Heading as="h3" size="md" color="gray.700">
                  {member.name}
                </Heading>
                <Text color="#7F5539" mb={2}>{member.role}</Text>
                <Text color="gray.600" fontSize="sm">{member.bio}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* CTA Final */}
      <Box bg="#EDE0D4" color="gray.700" p={12} borderRadius="lg" textAlign="center">
        <FaRegSmile size={48} color="gray.600" style={{ margin: "0 auto 20px" }} />
        <Heading as="h2" size="xl" mb={6}>
          ¿Listo para simplificar tus alquileres?
        </Heading>
        <Text fontSize="xl" mb={8}>
          Únete a miles de clientes satisfechos que ya confían en nosotros
        </Text>
        <Button 
          as={Link}
          href="/contacto"
          colorScheme="whiteAlpha" 
          size="lg"
          _hover={{ textDecoration: "none", bg: "#E6CCB2", color: "#7F5539" }}
        >
          Comenzar ahora
        </Button>
      </Box>
    </Box>
  );
};

export default AboutPage;

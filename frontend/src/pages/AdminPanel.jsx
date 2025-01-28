import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { MuebleContext } from "../Context/MuebleContext";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("productos");
  const { furniture } = useContext(MuebleContext); 

  // Simulación de reservas (hasta que se conecte el backend)
  const reservas = [
    { id: 1, cliente: "Juan Pérez", fecha: "2025-01-20", total: "$150.00" },
    { id: 2, cliente: "Ana Gómez", fecha: "2025-01-22", total: "$200.00" },
  ];

  return (
    <Flex>
      <Box w="250px" p={5} bg={useColorModeValue("gray.800", "gray.700")} color="white">
        <Heading size="md" mb={5}>Panel de Administración</Heading>
        <VStack align="start" spacing={4}>
          <Button variant="link" colorScheme="teal" onClick={() => setActiveSection("productos")}>
            Productos
          </Button>
          <Button variant="link" colorScheme="teal" onClick={() => setActiveSection("reservas")}>
            Reservas
          </Button>
        </VStack>
      </Box>

      <Box flex="1" h="100vh" p={6}>
        <Heading size="lg" mb={4}>
          {activeSection === "productos" ? "Lista de Productos" : "Reservas"}
        </Heading>

        {activeSection === "productos" ? (
          // Tabla de Productos
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Stock</Th>
                <Th>Precio Unitario</Th>
                <Th>Descripción</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {furniture.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.stock}</Td>
                  <Td>${item.unitPrice}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <Button colorScheme="blue" size="sm">
                      Modificar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          // Tabla de Reservas
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Cliente</Th>
                <Th>Fecha</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservas.map((reserva) => (
                <Tr key={reserva.id}>
                  <Td>{reserva.id}</Td>
                  <Td>{reserva.cliente}</Td>
                  <Td>{reserva.fecha}</Td>
                  <Td>{reserva.total}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Flex>
  );
};

export default AdminPanel;

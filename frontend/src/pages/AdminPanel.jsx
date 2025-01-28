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
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { MuebleContext } from "../Context/MuebleContext";
import ModalProducts from "../components/Modal/ModalProducts";
import ModalReservations from "../components/Modal/ModalReservations"; // Importamos el modal de reservas

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("productos");
  const { furniture } = useContext(MuebleContext);

  // Control de los modales
  const { isOpen: isProductOpen, onOpen: onProductOpen, onClose: onProductClose } = useDisclosure();
  const { isOpen: isReservationOpen, onOpen: onReservationOpen, onClose: onReservationClose } = useDisclosure();

  // Simulación de agregar producto (luego se conectará al backend)
  const addProduct = (product) => {
    console.log("Producto agregado:", product);
  };

  // Simulación de agregar reserva (luego se conectará al backend)
  const addReservation = (reservation) => {
    console.log("Reserva agregada:", reservation);
  };

  return (
    <Flex>
      {/* MENÚ LATERAL */}
      <Box w="250px" p={5} bg="gray.800" color="white">
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

      {/* CONTENIDO PRINCIPAL */}
      <Box flex="1" h="100vh" p={6}>
        <Heading size="lg" mb={4} display="flex" justifyContent="space-between" alignItems="center">
          {activeSection === "productos" ? "Lista de Productos" : "Reservas"}

          {activeSection === "productos" ? (
            <Button colorScheme="teal" size="sm" onClick={onProductOpen}>
              Agregar Producto
            </Button>
          ) : (
            <Button colorScheme="teal" size="sm" onClick={onReservationOpen}>
              Agregar Reserva
            </Button>
          )}
        </Heading>

        {activeSection === "productos" ? (
          // TABLA DE PRODUCTOS
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
                      <SettingsIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          // TABLA DE RESERVAS
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
              {[
                { id: 1, cliente: "Juan Pérez", fecha: "2025-01-20", total: "$150.00" },
                { id: 2, cliente: "Ana Gómez", fecha: "2025-01-22", total: "$200.00" }
              ].map((reserva) => (
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

      {/* MODAL PARA AGREGAR PRODUCTO */}
      <ModalProducts isOpen={isProductOpen} onClose={onProductClose} addProduct={addProduct} />

      {/* MODAL PARA AGREGAR RESERVA */}
      <ModalReservations isOpen={isReservationOpen} onClose={onReservationClose} addReservation={addReservation} products={furniture} />
    </Flex>
  );
};

export default AdminPanel;

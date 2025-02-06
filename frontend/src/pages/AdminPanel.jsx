import React, { useState, useContext, useEffect } from "react";
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
  useSafeLayoutEffect,
  Text,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { MuebleContext } from "../Context/MuebleContext";
import ModalProducts from "../components/Modal/ModalProducts";
import ModalReservations from "../components/Modal/ModalReservations";
import ModalEditProduct from "../components/Modal/ModalEditProduct"; // Nuevo modal para editar productos
import { Navigate, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("productos");
  const { furniture, logout,updateFurniture,postFurniture,setAuth, auth, rentals,getRental } = useContext(MuebleContext);
  
  // Estados para modales
  const { isOpen: isProductOpen, onOpen: onProductOpen, onClose: onProductClose } = useDisclosure();
  const { isOpen: isReservationOpen, onOpen: onReservationOpen, onClose: onReservationClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const navigate = useNavigate();
  
  // Estado para almacenar el producto a editar
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Simulación de agregar producto (luego se conectará al backend)
  const addProduct = (product) => {
         postFurniture(product)
      };

  // Simulación de agregar reserva (luego se conectará al backend)
  const addReservation = (reservation) => {
    console.log("Reserva agregada:", reservation);
  };

  // Función para editar un producto
  const handleEditClick = (product) => {
    console.log(product)
    setSelectedProduct(product);
    onEditOpen();
  };

  // Función para actualizar un producto en la lista
  const updateProduct = (updatedProduct) => {
    updateFurniture(updatedProduct)
    // setFurniture(furniture.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)));
  };
  //Funcion para listar todas las reservas
  const listReservations = () => {
    getRental();
    console.log(rentals)

  }
  const setLogout=()=>{
    logout();
    navigate('/')
  }
useEffect(()=>{
  getRental()
  if(localStorage.getItem('token')){
    console.log("entra")
      setAuth({...auth, isAuthenticated: true})
}
},[])
  return (
      <VStack h={"100vh"} justifyContent={"center"} mb={5}>
    <Flex w='100%'>
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
          <Button variant="link" colorScheme="red" onClick={() => setLogout()}>
            Logout
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
                <Th>Categoria</Th>
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
                  <Td>{item.category}</Td>
                  <Td>{item.stock}</Td>
                  <Td>${item.unitPrice}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <Button colorScheme="blue" size="sm" onClick={() => handleEditClick(item)}>
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
              {rentals.map((reserva) => (
                <Tr key={reserva.id}>
                  <Td>{reserva.id}</Td>
                  <Td>{`${reserva.clientInfo.firstName} ${reserva.clientInfo.lastName}` }</Td>
                  <Td>{reserva.rentalDate}</Td>
                  <Td textAlign={'right'} ><Text as='span' mx='2px'>$</Text>{new Intl.NumberFormat('es-AR', {minimumFractionDigits: 2}).format(reserva.total)}</Td>
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

      {/* MODAL PARA EDITAR PRODUCTO */}
      <ModalEditProduct isOpen={isEditOpen} onClose={onEditClose} product={selectedProduct} updateProduct={updateProduct} />
    </Flex>
    </VStack>
  );
};

export default AdminPanel;

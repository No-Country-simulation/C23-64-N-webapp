import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Select,
} from "@chakra-ui/react";

const ModalReservations = ({ isOpen, onClose, addReservation, products }) => {
  const [newReservation, setNewReservation] = useState({
    date: "",
    productId: "",
    quantity: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setNewReservation({
      ...newReservation,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos y cerrar modal
  const handleSubmit = () => {
    addReservation(newReservation);
    setNewReservation({ date: "", productId: "", quantity: "" }); // Resetear campos
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Nueva Reserva</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Fecha</FormLabel>
            <Input type="date" name="date" value={newReservation.date} onChange={handleChange} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Producto</FormLabel>
            <Select name="productId" value={newReservation.productId} onChange={handleChange}>
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Cantidad</FormLabel>
            <Input type="number" name="quantity" value={newReservation.quantity} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button ml={3} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalReservations;

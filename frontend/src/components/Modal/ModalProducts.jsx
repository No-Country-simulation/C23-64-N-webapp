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
} from "@chakra-ui/react";

const ModalProducts = ({ isOpen, onClose, addProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    unitPrice: "",
    description: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos y cerrar modal
  const handleSubmit = () => {
    addProduct(newProduct);
    setNewProduct({ name: "", stock: "", unitPrice: "", description: "" }); // Resetear campos
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Nuevo Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Nombre</FormLabel>
            <Input name="name" value={newProduct.name} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Stock</FormLabel>
            <Input type="number" name="stock" value={newProduct.stock} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Precio Unitario</FormLabel>
            <Input type="number" name="unitPrice" value={newProduct.unitPrice} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Imagen</FormLabel>
            <Input name="imagen" value={newProduct.img} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Descripción</FormLabel>
            <Input name="description" value={newProduct.description} onChange={handleChange} />
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

export default ModalProducts;

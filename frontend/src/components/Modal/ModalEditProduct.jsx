import { useState, useEffect } from "react";
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

const ModalEditProduct = ({ isOpen, onClose, product, updateProduct }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product); // Actualizar el estado cuando el producto cambie
  }, [product]);

  const handleChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const nuevosDatos = {
      ...editedProduct,
      categoryName: editedProduct.category
    };
    delete nuevosDatos.category;
   
    // console.log("Nuevos datos para mandar",nuevosDatos)
    setEditedProduct(nuevosDatos)
    updateProduct(nuevosDatos);
    onClose();
  };

  if (!editedProduct) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Nombre</FormLabel>
            <Input name="name" value={editedProduct.name} onChange={handleChange} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Stock</FormLabel>
            <Input type="number" name="stock" value={editedProduct.stock} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Categoria</FormLabel>
            <Input type="text" name="categoryName" value={editedProduct.category} onChange={handleChange} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Precio Unitario</FormLabel>
            <Input type="number" name="unitPrice" value={editedProduct.unitPrice} onChange={handleChange} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Descripción</FormLabel>
            <Input name="description" value={editedProduct.description} onChange={handleChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
          <Button ml={3} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditProduct;

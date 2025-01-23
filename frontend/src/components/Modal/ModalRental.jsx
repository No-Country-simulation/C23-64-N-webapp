import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useModal } from "../../Context/ModalContext";
import { useState } from "react";

const ModalRental = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, modalContent, closeModal, onConfirm } = useModal();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [input, setInput] = useState({});

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      
      const data = { ...modalContent, ...input };
      console.log("DAtos agregados", data);
      onConfirm(modalContent); // Solo ejecuta si es una función
    }
    closeModal(); // Cierra el modal
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal}>
      {overlay}
      <ModalContent>
        <ModalHeader>Modal Title </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalContent && ( 
            <Box>
              <Text><strong>Producto:</strong> {modalContent.name}</Text>
              <Text><strong>Descripción:</strong> {modalContent.description}</Text>
              <Text><strong>Precio:</strong> ${modalContent.unitPrice}</Text>
            </Box>)}
          <Text>Ingrese la cantidad</Text>
          <Input
            type="number"
            value={input.cantidad}
            onChange={(e) => setInput({ ...input, cantidad: e.target.value })}
          />
        </ModalBody>
        <ModalFooter>
        <Button onClick={() => handleConfirm()}>Confirm</Button>
          <Button onClick={() => closeModal()}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalRental;

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
import { SimpleDatePicker } from "simple-chakra-ui-datepicker";

const ModalRental = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
//PARA EL CALENDARIO
// const [selectedDate, setSelectedDate] = useState(null);

const handleDateChange = (date) => {
  setSelectedDate(date);
};
//
  const { isOpen, modalContent, closeModal, onConfirm,
    selectedDate,setSelectedDate,getDayFree,reserveOk
   } = useModal();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [input, setInput] = useState("");

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      const data = { ...modalContent, ...input ,selectedDate};
      getDayFree(data)
      onConfirm(data); // Solo ejecuta si es una función
    }
    closeModal(); // Cierra el modal
  };

  const handleVerificar = () => {
    if (typeof onConfirm === "function") {
      const data = { ...modalContent, ...input ,selectedDate};
      getDayFree(data)
      onConfirm(data); // Solo ejecuta si es una función
    }
    
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
            <Box mt={4}>
            <SimpleDatePicker  
            value={selectedDate}
          
          onChange={handleDateChange}

          />
      </Box>
          <Text>Ingrese la cantidad</Text>
          <Input
            type="number"
            value={input.cantidad}
            onChange={(e) => setInput({ ...input, cantidad: e.target.value })}
          />
          {reserveOk && <Text>Cantidad disponible</Text>}
        </ModalBody>
        <ModalFooter >
        <Button onClick={() => handleVerificar()} 
        mx={'1'} 
        fontSize={'sm'}
        bgColor={'cyan.400'}
        >Verificar</Button>
        {reserveOk&& <Button onClick={() => handleConfirm()} 
        mx={'1'}
        fontSize={'sm'}
        bgColor={'green.400'}
        >Confirmar</Button>}
          <Button onClick={() => closeModal()}mx={'1'}fontSize={'sm'} bgColor={'red.400'}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalRental;

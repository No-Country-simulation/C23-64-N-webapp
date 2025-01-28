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
import { useContext, useState } from "react";
import { SimpleDatePicker } from "simple-chakra-ui-datepicker";


const ModalRental = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [input, setInput] = useState("");
  const [cantidad, setCantidad] = useState(0);
  

  //PARA EL CALENDARIO
  // const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dato = {
      id: modalContent.id,
      fecha: selectedDate,
      dato: modalContent,
    };
    setCantidad(getDayFree(dato));
  };
  //
  const {
    isOpen,
    modalContent,
    closeModal,
    onConfirm,
    selectedDate,
    setSelectedDate,
    getDayFree,
    reserveOk,
    setRental,
    rental,
    setCartCount,
    cartCount
  } = useModal();

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      // const muebles = { ...modalContent, ...input, selectedDate };
      localStorage.setItem('fecha',selectedDate)

      // const muebles = { id: modalContent.id, fecha: selectedDate };
      // setCantidad(getDayFree(dato));
      setRental(prevState => ({
        ...prevState,
        muebles: [
          ...prevState.muebles,  // Mantiene los muebles existentes
          {
            id: modalContent.id,
            cantidad: input,
            detalle: modalContent.name,
            precio: modalContent.unitPrice
          }
        ],
        fechaAlquiler:selectedDate,
      }));
     
      setCartCount(Number(cartCount)+Number(input))
      console.log("confirmado rental", rental);
      //onConfirm(data); // Solo ejecuta si es una función
    }
    closeModal(); // Cierra el modal

  };

  const handleVerificar = () => {
    if (typeof onConfirm === "function") {
      const data = { ...modalContent, ...input, selectedDate };
      getDayFree(data);
      //onConfirm(data); // Solo ejecuta si es una función
    }
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal}>
      {overlay}
      <ModalContent>
        <ModalHeader textAlign={"center"} color="olive">
          Consultar Disponibilidad{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalContent && (
            <Box>
              <Text>
                <strong>Producto:</strong> {modalContent.name}
              </Text>
              <Text>
                <strong>Descripción:</strong> {modalContent.description}
              </Text>
              <Text>
                <strong>Precio:</strong> ${modalContent.unitPrice}
              </Text>
            </Box>
          )}
          <Box mt={4}>
          {
            !selectedDate &&
            <SimpleDatePicker
              value={selectedDate}
              onChange={handleDateChange}
              
            />
          }
          </Box>
          {cantidad > 0 && <Text>Unidades Disponibles {cantidad}</Text>}
          <Text>Ingrese la cantidad</Text>
          <Input
            type="number"
            // value={input.cantidad}
            value={input}
            onChange={(e) => setInput(Number(e.target.value))}
            // onChange={(e) => setInput({ ...input, cantidad: e.target.value })}
          />
          {reserveOk && (
            <Text fontSize={"2em"} color={"green.400"}>
              Mensaje del back con o sin disponibilidad y la cantidad
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          {reserveOk && (
            <Button
              onClick={() => handleConfirm()}
              mx={"1"}
              fontSize={"sm"}
              bgColor={"green.400"}
            >
              Confirmar
            </Button>
          )}
          <Button
            onClick={() => closeModal()}
            mx={"1"}
            fontSize={"sm"}
            bgColor={"red.400"}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalRental;

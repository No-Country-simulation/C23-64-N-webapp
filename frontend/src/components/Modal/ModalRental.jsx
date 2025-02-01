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
} from "@chakra-ui/react";

import { useModal } from "../../Context/ModalContext";
import { useContext, useState } from "react";
import { SimpleDatePicker } from "simple-chakra-ui-datepicker";
import { MuebleContext } from "../../Context/MuebleContext";

const ModalRental = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay] = useState(<OverlayOne />);
  const [input, setInput] = useState("");

  const { cartCount, setCartCount, set_furniture } = useContext(MuebleContext);
  const {
    isOpen,
    modalContent,
    closeModal,
    onConfirm,
    selectedDate,
    setSelectedDate,
    setRental,
    cantidad,
  } = useModal();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    set_furniture(modalContent.id, date); // Llamar a set_furniture con el id y la fecha
  };

  const handleClose = () => {
    setSelectedDate(null);
    closeModal();
  };

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      localStorage.setItem("fecha", new Date(selectedDate).toISOString());

      setRental((prevState) => ({
        ...prevState,
        muebles: [
          ...prevState.muebles,
          {
            id: modalContent.id,
            cantidad: input,
            detalle: modalContent.name,
            precio: modalContent.unitPrice,
          },
        ],
        fechaAlquiler: selectedDate,
      }));

      setCartCount(Number(cartCount) + Number(input));
    }

    closeModal();
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
            <SimpleDatePicker
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Box>
          {selectedDate && (
            <Box>
              {cantidad}
              {cantidad > 0 && <Text>Unidades Disponibles {cantidad}</Text>}
              <Text>Ingrese la cantidad</Text>
              <Input
                type="number"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          {cantidad > 0 && (
            <Button
              onClick={handleConfirm}
              mx={"1"}
              fontSize={"sm"}
              bgColor={"green.400"}
            >
              Confirmar
            </Button>
          )}
          <Button
            onClick={handleClose}
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

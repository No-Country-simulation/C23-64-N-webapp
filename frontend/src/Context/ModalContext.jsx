import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { formatDateToString } from "../assets/utilities";

// Crear el contexto del modal
const ModalContext = createContext();

// Proveedor del contexto del modal
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [onConfirm, setOnConfirm] = useState(() => () => { });
  const [reserveOk, setReserveOk] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const initialValueRental = {
    cliente: {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      email: '',
      direccion: '',
    },
    muebles: [],
    fechaAlquiler: '',
    total: '',
    registrarCliente: ''
  }

  const [rental, setRental] = useState(initialValueRental)

  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

  //para el calendario
  const [selectedDate, setSelectedDate] = useState(null);

  const getDayFree = async (id, fecha) => {
    try {
        let response = await axios.get(`${baseURL}/furniture/${id}?date=${formatDateToString(new Date(fecha))}`);
         setCantidad(response.data.stock)
      
    } catch (error) {
      console.error("Error posible falla de fecha:", error);
    }
  


  }


  // Función para abrir el modal

  // const openModal = (content, confirmCallback) => {
  const openModal = (content) => {

    setModalContent(content);
    // setOnConfirm(() => (typeof confirmCallback === "function" ? confirmCallback : () => {}));
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    onConfirm(rental)
    setIsOpen(false);
    setCantidad(0);
    setModalContent(null);
    setOnConfirm(() => () => { });
  };
  useEffect(() => {
    localStorage.setItem('rental', JSON.stringify(rental))
 
  }, [rental])
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalContent,
        onConfirm,
        setSelectedDate,
        selectedDate,
        getDayFree,
        reserveOk,
        setRental,
        rental,

        setCantidad,
        cantidad,
      }}
    >
      {children}
      {/* {isOpen && <Modal>{modalContent}</Modal>} */}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto del modal
export const useModal = () => useContext(ModalContext);

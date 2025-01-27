import axios from "axios";
import React, { createContext, useState, useContext } from "react";

// Crear el contexto del modal
const ModalContext = createContext();

// Proveedor del contexto del modal
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [onConfirm, setOnConfirm] = useState(()=>()=>{});
  const [reserveOk, setReserveOk] = useState(false);
  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

//para el calendario
const [selectedDate, setSelectedDate] = useState(null);

const getDayFree=async (dato)=>{
  // const params={
  //   "date":dato.selectedDate,
  //   "id":dato.id,
  //   "cantidad":dato.cantidad
  //   }
  
  // try {
  //   const response = await axios.get(`${baseURL}/reserve/`,{params});
    

  // } catch (error) {
  //   console.error("Error fetching category:", error);
  //   }
  console.log("Info para el endpoint",dato);
  (dato.cantidad<=dato.stock)? setReserveOk(true):setReserveOk(false);
  

}
//


  // Función para abrir el modal
  const openModal = (content, confirmCallback) => {
    console.log("recibido para el modal",content)
    setModalContent(content);
    setOnConfirm(() => (typeof confirmCallback === "function" ? confirmCallback : () => {})); // Validar si es función
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    
    setIsOpen(false);
    setModalContent(null);
    setOnConfirm(() => () => {}); 
  };

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
        reserveOk
         }}
    >
      {children}
      {/* {isOpen && <Modal>{modalContent}</Modal>} */}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto del modal
export const useModal = () => useContext(ModalContext);

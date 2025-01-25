import React, { createContext, useState, useContext } from "react";

// Crear el contexto del modal
const ModalContext = createContext();

// Proveedor del contexto del modal
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [onConfirm, setOnConfirm] = useState(()=>()=>{});
//para el calendario
const [selectedDate, setSelectedDate] = useState(null);

const getDayFree=(dato)=>{
  console.log(dato);
}
//


  // Función para abrir el modal
  const openModal = (content, confirmCallback) => {
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
        getDayFree
         }}
    >
      {children}
      {/* {isOpen && <Modal>{modalContent}</Modal>} */}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto del modal
export const useModal = () => useContext(ModalContext);

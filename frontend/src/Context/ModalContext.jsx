import React, { createContext, useContext, useReducer } from "react";

// Definir las acciones
const ACTIONS = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
};

// Reducer para manejar el estado del modal
const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_MODAL:
      return { ...state, isOpen: true, modalContent: action.payload };
    case ACTIONS.CLOSE_MODAL:
      return { ...state, isOpen: false, modalContent: null };
    default:
      return state;
  }
};

// Crear el contexto del modal
const ModalContext = createContext();

// Proveedor del contexto del modal
export const ModalProvider = ({ children }) => {
  const initialState = {
    isOpen: false,
    modalContent: null,
  };

  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (content) => {
    dispatch({ type: ACTIONS.OPEN_MODAL, payload: content });
  };

  const closeModal = () => {
    dispatch({ type: ACTIONS.CLOSE_MODAL });
  };

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto del modal
export const useModal = () => useContext(ModalContext);

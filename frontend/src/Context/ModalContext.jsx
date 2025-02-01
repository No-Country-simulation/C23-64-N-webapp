import React, { createContext, useContext, useReducer } from "react";

// Definir las acciones
const ACTIONS = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  SET_SELECTED_DATE: "SET_SELECTED_DATE", // Nueva acción para establecer la fecha seleccionada
};

// Reducer para manejar el estado del modal
const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_DATE: // Manejar la acción de establecer la fecha seleccionada
      return { ...state, selectedDate: action.payload };
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
    selectedDate: null, // Estado para la fecha seleccionada
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

  const setSelectedDate = (date) => {
    dispatch({ type: ACTIONS.SET_SELECTED_DATE, payload: date });
  };

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal, setSelectedDate }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto del modal
export const useModal = () => useContext(ModalContext);

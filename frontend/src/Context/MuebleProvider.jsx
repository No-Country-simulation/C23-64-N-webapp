import { useEffect, useReducer } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";

// Definir las acciones
const ACTIONS = {
  SET_FURNITURE: "SET_FURNITURE",
  SET_CATEGORY: "SET_CATEGORY",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_RESERVADO: "SET_RESERVADO",
  SET_ROL: "SET_ROL", // Nueva acción para rol
  CHECK_AVAILABILITY: "CHECK_AVAILABILITY", // Nueva acción para disponibilidad
};

// Reducer para manejar el estado de los muebles
const furnitureReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FURNITURE:
      return { ...state, furniture: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ACTIONS.SET_CART_COUNT:
      return { ...state, cartCount: action.payload };
    case ACTIONS.SET_RESERVADO:
      return { ...state, reservado: action.payload };
    case ACTIONS.SET_ROL:
      return { ...state, rol: action.payload };
    case ACTIONS.CHECK_AVAILABILITY: // Manejar la acción de disponibilidad
      return { ...state, availability: action.payload };
    default:
      return state;
  }
};

export const MuebleProvider = ({ children }) => {
  const initialState = {
    furniture: [],
    category: [],
    cartCount: 0,
    reservado: null,
    rol: "user", // Establecer rol por defecto
    availability: null, // Estado para disponibilidad
  };

  const [state, dispatch] = useReducer(furnitureReducer, initialState);

  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

  const getFurniture = async () => {
    try {
      const response = await axios.get(`${baseURL}/furniture`);
      dispatch({ type: ACTIONS.SET_FURNITURE, payload: response.data });
    } catch (error) {
      console.error("Error fetching furniture:", error);
    }
  };

  const checkAvailability = async (id, date) => {
    try {
      const response = await axios.get(`${baseURL}/furniture/availability`, {
        params: { id, date },
      });
      dispatch({ type: ACTIONS.CHECK_AVAILABILITY, payload: response.data });
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(`${baseURL}/categories`);
      dispatch({ type: ACTIONS.SET_CATEGORY, payload: response.data });
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    getFurniture();
    getCategory();
  }, []);

  return (
    <MuebleContext.Provider
      value={{
        furniture: state.furniture,
        category: state.category,
        cartCount: state.cartCount,
        reservado: state.reservado,
        rol: state.rol,
        availability: state.availability, // Proveer disponibilidad en el contexto
        setCartCount: (count) => dispatch({ type: ACTIONS.SET_CART_COUNT, payload: count }),
        setReservado: (reservado) => dispatch({ type: ACTIONS.SET_RESERVADO, payload: reservado }),
        set_furniture: (id, date) => checkAvailability(id, date), // Función para verificar disponibilidad
      }}
    >
      {children}
    </MuebleContext.Provider>
  );
};

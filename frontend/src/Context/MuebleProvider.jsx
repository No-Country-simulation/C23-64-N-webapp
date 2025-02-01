import { useEffect, useReducer } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes

// Definir las acciones
const ACTIONS = {
  SET_FURNITURE: "SET_FURNITURE",
  SET_CATEGORY: "SET_CATEGORY",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_RESERVADO: "SET_RESERVADO",
  SET_ROL: "SET_ROL",
  CHECK_AVAILABILITY: "CHECK_AVAILABILITY",
  ADD_RENTAL: "ADD_RENTAL", // New action for adding rental
  SET_RENTAL_DATA: "SET_RENTAL_DATA", // New action for setting rental data
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
    case ACTIONS.CHECK_AVAILABILITY:
      return { ...state, cantidad: action.payload }; // Guardar el stock en cantidad
    case ACTIONS.ADD_RENTAL:
      return { ...state }; // Update state as necessary
    case ACTIONS.SET_RENTAL_DATA:
      return { ...state, rentalData: action.payload }; // Set rental data in state
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
    rol: "user",
    cantidad: null, // Estado para la cantidad disponible
    rentalData: null, // New state for rental data
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
      const response = await axios.get(`${baseURL}/furniture/${id}?date=${new Date(date).toISOString().split('T')[0]}`);
      dispatch({ type: ACTIONS.CHECK_AVAILABILITY, payload: response.data.stock }); // Asignar el stock a la variable de estado
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const addRental = async (rentalData) => {
    dispatch({ type: ACTIONS.SET_RENTAL_DATA, payload: rentalData }); // Store rental data in context
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
        cantidad: state.cantidad, // Proveer cantidad en el contexto
        rentalData: state.rentalData, // Provide rental data in context
        setCartCount: (count) => dispatch({ type: ACTIONS.SET_CART_COUNT, payload: count }),
        setReservado: (reservado) => dispatch({ type: ACTIONS.SET_RESERVADO, payload: reservado }),
        checkAvailability,
        addRental, // Provide the addRental function in context
      }}
    >
      {children}
    </MuebleContext.Provider>
  );
};

// PropTypes validation
MuebleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

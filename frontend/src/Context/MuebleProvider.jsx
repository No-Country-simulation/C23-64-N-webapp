import { useEffect, useState } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";
import { MdCloudQueue } from "react-icons/md";

export const MuebleProvider = ({ children }) => {
  const initialAuthState = {
    token: null,
    rol: "ROLE_USER",
    isAuthenticated: false,
  };
  const [rentals, setRentals]=useState([])
  const [furniture, setFurniture] = useState([]);
  const [reservado, setReservado] = useState(null);
  const [category, setCategory] = useState([]);
  const [auth, setAuth] = useState(initialAuthState);
  const [cartCount, setCartCount] = useState(0);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const getFurniture = async () => {
    try {
      const response = await axios.get(`${baseURL}/furniture`);
      setFurniture(response.data);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    }
  };
  const getCategory = async () => {
    try {
      const response = await axios.get(`${baseURL}/categories`);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  //actualizar furniture
  const updateFurniture = async (furniture) => {
    const storedData = localStorage.getItem("authData");
    const { token} = JSON.parse(storedData);
    try {
      await axios.patch(`${baseURL}/furniture/${furniture.id}`, furniture, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      getFurniture();
    } catch (error) {
      console.error("Error Post furniture:", error);
    }
  };
  //agregar furniture
  const postFurniture = async (furniture) => {
    const storedData = localStorage.getItem("authData");
    const { token} = JSON.parse(storedData);
    try {
      await axios.post(`${baseURL}/furniture`, furniture,{
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      getFurniture();
    } catch (error) {
      console.error("Error Post furniture:", error);
    }
  };
  //registrar alquiler
  const postAlquiler = async (alquiler) => {
    try {
      await axios.post(`${baseURL}/rentals`, alquiler).then((response) => {
        setReservado(response.data.id);
      });
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const getRental=async ()=>{
    try{
      const response=await axios.get(`${baseURL}/rentals`)
      setRentals(response.data)
    }catch(error){
      console.log("Error al leer datos de rental",error)
    }
  }
  //authorization

  const getAuthorization = async (value) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signin`, value);
      const { token, rol } = response.data;

      // Actualizamos el estado con los datos de autenticación
      setAuth({
        token,
        rol,
        isAuthenticated: true,
      });
      localStorage.setItem("authData", JSON.stringify({ token, rol }));
    } catch (error) {
      console.log("Error completo:", error);

      throw error;
    }
  };
  // Función para cerrar sesión
  const logout = () => {
    setAuth(initialAuthState);
    localStorage.removeItem("authData");
  };

  useEffect(() => {
    getFurniture();
    getCategory();
  }, []);
  useEffect(() => {
    if (cartCount == 0) {
      localStorage.removeItem("fecha");
    }
  }, [cartCount]);

  return (
    <MuebleContext.Provider
      value={{
        furniture,
        category,
        getFurniture,
        getCategory,

        cartCount,
        setCartCount,
        postAlquiler,
        postFurniture,
        updateFurniture,
        reservado,
        setReservado,
        getAuthorization,
        auth,
        setAuth,
        logout,
        getRental,
        rentals
      }}
    >
      {children}
    </MuebleContext.Provider>
  );
};

import { useEffect, useState } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";

export const MuebleProvider = ({ children }) => {
  const [furniture, setFurniture] = useState([]);
  const [reservado,setReservado]=useState(0)
  const [category, setCategory] = useState([]);
  const [rol, setRol] = useState({ rol: "admin" });
  const [cartCount, setCartCount] = useState(0);

  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

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
    try {
      await axios.patch(`${baseURL}/furniture`,furniture);
    } catch (error) {
      console.error("Error Post furniture:", error);
    }
  };
  //agregar furniture
  const postFurniture = async (furniture) => {
    try {
      await axios.post(`${baseURL}/furniture`,furniture);
    } catch (error) {
      console.error("Error Post furniture:", error);
    }
  };
  //registrar alquiler
  const postAlquiler = async(alquiler) => {
    try {
      await axios.post(`${baseURL}/rentals`,alquiler)
      .then((response) => {
        localStorage.setItem("id",response.data.id)
       
      })
    } catch (error) {
      console.error("Error fetching category:", error);
    }
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
        rol,
        cartCount,
        setCartCount,
        postAlquiler,
        postFurniture,
        updateFurniture,
        reservado,
        setReservado,
       
      }}
    >
      {children}
    </MuebleContext.Provider>
  );
};

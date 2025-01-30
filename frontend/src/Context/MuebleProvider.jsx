import { useEffect, useState } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";

export const MuebleProvider = ({ children }) => {
  const [furniture, setFurniture] = useState([]);
  const [category, setCategory] = useState([]);
  const [rol, setRol] = useState({ rol: "user" });
  const [cartCount, setCartCount] = useState(0);

  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

  const getFurniture = async () => {
    try {
      const response = await axios.get(`${baseURL}/furniture`);
      // console.log("Datos recibidos de la API:", response.data);
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
  //registrar alquiler
  const postAlquiler = async (alquiler) => {
    try {
      console.log(alquiler)
      const response = await axios.post(`${baseURL}/rentals`,alquiler);

      console.log(response.data);
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
      }}
    >
      {children}
    </MuebleContext.Provider>
  );
};

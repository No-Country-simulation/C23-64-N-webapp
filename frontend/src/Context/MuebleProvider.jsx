import { useEffect, useState } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";

export const MuebleProvider = ({ children }) => {
  const [furniture, setFurniture] = useState([]);

  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

  const getFurniture = async () => {
    try {
      const response = await axios.get(`${baseURL}/furniture`);
      console.log("Datos recibidos de la API:", response.data); // 🔍 Ver la respuesta
      setFurniture(response.data);
    } catch (error) {
      console.error("Error fetching furniture:", error);
    }
  };
 
  useEffect(() => {
    getFurniture();
  }, []);

  return (
    <MuebleContext.Provider value={{ furniture,getFurniture }}>
      {children}
    </MuebleContext.Provider>
  );
};

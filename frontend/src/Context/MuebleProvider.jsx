import { useEffect, useState } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";

export const MuebleProvider = ({ children }) => {
 
  const [furniture, setFurniture] = useState([]);
  const [category,setCategory]=useState([]);
  const [rol,setRol]=useState({rol:'user'})
 

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
 
  useEffect(() => {
    getFurniture();
    getCategory();
  }, []);

  return (
    <MuebleContext.Provider value={{
      furniture,
      category,
      getFurniture,
      getCategory,
      rol,
     
     
      }}>
      {children}
    </MuebleContext.Provider>
  );
};

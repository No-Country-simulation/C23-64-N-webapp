import { useEffect, useState } from "react";
import { MuebleContext } from "./MuebleContext";
import axios from "axios";

export const MuebleProvider = ({ children }) => {
  const [furniture, setFurniture] = useState([]);

  const baseURL = "https://c23-64-n-webapp-development.up.railway.app";

  const getFurniture = async () => {
    await axios.get(`${baseURL}/furniture`).then((response) => {
      setFurniture(response.data);
    });
   
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

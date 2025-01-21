import { useEffect, useState } from "react"
import { MuebleContext } from "./MuebleContext"
import axios from "axios";

export const MuebleProvider = ({children})=>{
    const [muebles, setMuebles] = useState("estado inicial")
    const [post, setPost] = useState(null);

//   const baseURL = "https://jsonplaceholder.typicode.com/posts";
  const baseURL = "https://c23-64-n-webapp-development.up.railway.app/";

  const getData=()=>{
     axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }
  
    useEffect(() => {
        getData();
  }, []);

  console.log(post)
    
    return (
        <MuebleContext.Provider value={{muebles, setMuebles}}>
            {children}
        </MuebleContext.Provider>
    )
}
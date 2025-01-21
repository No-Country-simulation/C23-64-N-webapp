import { Button, Center } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contacto" element={<Contacto />}></Route>
        {/* <Route path="/player/:id" element={<Player />}></Route> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

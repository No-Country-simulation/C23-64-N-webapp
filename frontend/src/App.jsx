import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import Contacto from "./pages/Contacto";
import { MuebleProvider } from "./Context/MuebleProvider";
import { Category } from "./pages/Category";
import Products from "./pages/Products";
import Product from "./pages/Product";

import { ModalProvider } from "./Context/ModalContext";
import ModalRental from "./components/Modal/ModalRental";
import { Box } from "@chakra-ui/react";
import AdminLogin from "./pages/AdminLogin";
import DetailCart from "./pages/DetailCart";
import AdminPanel from "./pages/AdminPanel";
import Layout from "./layout/Layout.jsx";


function App() {
  return (
    <BrowserRouter>
      <MuebleProvider>
        <ModalProvider>
          <Box minH={"60vh"}>
            <Routes>
              <Route path="/" element={<Layout page={<Home/>}/>}/>
              <Route path="/contacto" element={<Layout page={<Contacto/>}/>}/>
              <Route path="/productos" element={<Layout page={<Products/>}/>}/>
              <Route path="/producto/:id" element={<Layout page={<Product/>}/>}/>
              <Route path="/carrito" element={<Layout page={<DetailCart/>}/>}/>
              <Route path="/category/:id" element={<Layout page={<Category/>}/>}/>

              <Route path="/adminlogin" element={<AdminLogin/>}/>
              <Route path="/adminpanel" element={<AdminPanel/>}/>
            </Routes>
          </Box>
          <ModalRental/>
        </ModalProvider>
      </MuebleProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import Contacto from "./pages/Contacto";
import { MuebleProvider } from "./Context/MuebleProvider";
import { Category } from "./pages/Category";
import Products from "./pages/Products";
import Product from "./pages/Product";
import About from "./pages/About";
import { ModalProvider } from "./Context/ModalContext";
import ModalRental from "./components/Modal/ModalRental";
import { Box } from "@chakra-ui/react";
import AdminLogin from "./pages/AdminLogin";
import DetailCart from "./pages/DetailCart";
import AdminPanel from "./pages/AdminPanel";

const MainLayout = () => (
  <>
    <Header/>
    <Outlet/>
    <Footer/>
  </>
)

function App() {
  return (
    <BrowserRouter>
      <MuebleProvider>
        <ModalProvider>
          <Box minH="100vh" display="flex" flexDirection="column">
            <Routes>
              <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/contacto" element={<Contacto/>}/>
                <Route path="/nosotros" element={<About/>}/>
                <Route path="/productos" element={<Products/>}/>
                <Route path="/producto/:id" element={<Product/>}/>
                <Route path="/carrito" element={<DetailCart/>}/>
                <Route path="/category/:id" element={<Category/>}/>
              </Route>
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

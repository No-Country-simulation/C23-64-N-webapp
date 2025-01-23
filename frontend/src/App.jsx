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

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
      <MuebleProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contacto" element={<Contacto />}></Route>
          <Route path="/productos" element={<Products />}></Route>
          <Route path="/producto/:id" element={<Product />}></Route>
          <Route path="/category/:id" element={<Category />}></Route>
        </Routes>
      <Footer />
      </MuebleProvider>
      <ModalRental />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;

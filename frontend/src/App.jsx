import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import Contacto from "./pages/Contacto";
import { MuebleProvider } from "./Context/MuebleProvider";
import { Category } from "./pages/Category";
import Products from "./pages/Products";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <MuebleProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/producto/:id" element={<Product />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      <Footer />
      </MuebleProvider>
    </BrowserRouter>
  );
}

export default App;

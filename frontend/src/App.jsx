import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import Contacto from "./pages/Contacto";
import { MuebleProvider } from "./Context/MuebleProvider";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MuebleProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contacto" element={<Contacto />}></Route>
          {/* <Route path="/player/:id" element={<Player />}></Route> */}
        </Routes>
      </MuebleProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

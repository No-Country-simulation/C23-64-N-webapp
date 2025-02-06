import Header from "../components/Header/Header.jsx";
import { Footer } from "../components/Footer/Footer.jsx";

const Layout = ({page}) => (
  <>
    < Header/>
    {page}
    < Footer/>
  </>
);

export default Layout;
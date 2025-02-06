import { Box, Button, Center, Img } from "@chakra-ui/react";
import logo from "/img/logo.png";
import { Link } from "react-router-dom";
import MenuItems from "../MenuItems/MenuItems";
import CartIcon from "../CartIcon/CartIcon";

const Header = () => {


  return (
    <>

      <Center
        bg="brown.100"
        justifyContent={"space-between"}
        p={4}
        h={"150px"}
      >
        <Link to="/">
          <Box>
            <Img src={logo} alt="logo" w="50%"/>
          </Box>
        </Link>
        <MenuItems/>
        <Link to="/nosotros">
          <Button variant="custom">Nosotros</Button>
        </Link>


        <Link to="/contacto">
          <Button variant="custom">Contacto</Button>
        </Link>
        <Link to="/carrito">
          <CartIcon/>
        </Link>
      </Center>

    </>
  );
};

export default Header;

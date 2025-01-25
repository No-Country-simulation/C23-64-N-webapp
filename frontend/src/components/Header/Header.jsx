import { Box, Button, Center, Container, HStack, Img } from "@chakra-ui/react";
import logo from "/img/logo.png";
import React from "react";
import { Link } from "react-router-dom";
import MenuItems from "../MenuItems/MenuItems";
import CartIcon from "../CartIcon/CartIcon";

const Header = () => {
  return (
    <Center bg="brown.100" justifyContent={"space-between"} p={4} h={'100px'}>
      <Link to="/">
        <Box>
          <Img src={logo} alt="logo" w="25%" />
        </Box>
      </Link>
        <MenuItems/>
      <Link to="/nosotros">
        <Button variant="custom">Nosotros</Button>
      </Link>

      <Link to="/contacto">
        <Button variant="custom">Contacto</Button>
      </Link>
      <CartIcon/>
    </Center>
  );
};

export default Header;

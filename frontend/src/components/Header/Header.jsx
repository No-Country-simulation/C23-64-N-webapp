import { Box, Button, Center, Container, HStack, Img } from "@chakra-ui/react";
import logo from '/public/img/logo.png'
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Center bg="brown.100" justifyContent={"space-between"} p={4}>
      <Box>
        <Img
          src={logo}
          alt="logo"
         w='250px'/>
      </Box>
      <Link to="/">
        <Button variant="custom">Home</Button>
      </Link>
      <Link to="/nosotros">
        <Button variant="custom">Nosotros</Button>
      </Link>
      <Link to="/Calendario">
        <Button variant="custom">Calendario</Button>
      </Link>
      
      <Link to="/contacto">
        <Button variant="custom">
          Contacto
        </Button>
      </Link>
    </Center>
  );
};

export default Header;

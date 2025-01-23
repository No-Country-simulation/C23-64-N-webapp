import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { useModal } from "../../Context/ModalContext";
import ModalRental from "../Modal/ModalRental";

const ProductCard = ({ disponible=true ,producto}) => {
 
  const { openModal, closeModal } = useModal();
  
   const handleOpenModal = (product) => {
     openModal(product,(selectedProduct)=>{
       console.log("Producto confirmado",selectedProduct);
     });
   };
  return (
    <>
      
  
    <Card
      maxW="sm"
      _hover={{
        boxShadow: "5px 5px 15px 5px #8E6E53",
      }}
    >
      <CardBody minH={"400px"}>
        <Flex>
          <Box
            w="400px"
            minH="50vh"
            bgGradient="linear(to-r, , blue.700)"
            bgPosition={'center'}
            bgSize={'cover'}
            bgImage={`url(${producto.imageUri})`}
            color="white"
          >
            <Flex
              h="100%"
              direction={"column"}
              justify={"center"}
              bg={disponible ? "none" : "rgba(196, 195, 227, 0.37)"}
            >
              {!disponible && (
                <Text
                  position={"absolute"}
                  textAlign={"center"}
                  fontSize="4xl"
                  top="20%"
                  left="2%"
                  color="red.500"
                  fontWeight={900}
                >
                  SIN DISPONIBILIDAD
                </Text>
              )}
            </Flex>
          </Box>
        </Flex>
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} color="brown.600">
            {producto.title}
          </Heading>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button bgColor={"olivaClaro"}
          onClick={()=>handleOpenModal(producto)}
          >Alquilar</Button>

          <Link to={`/producto/${producto.id}`}>
            <Button bgColor={"dorado"}>Detalles</Button>
          </Link>
        </ButtonGroup>
        
      </CardFooter>
    </Card>
    
    </>
  );
};

export default ProductCard;

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
import { Link } from "react-router-dom";

import { useModal } from "../../Context/ModalContext";
import { formatPrice } from "../../assets/utils.js";

const ProductCard = ({disponible = true, producto}) => {

  const {openModal, closeModal, onConfirm, getDayFree, setSelectedDate} = useModal();

  const productConfirm = (data) => {
    localStorage.setItem('alquiler', JSON.stringify(data))
  }


  const handleOpenModal = (product) => {

    const fecha = localStorage.getItem('fecha');
    if (fecha !== null) {
      //llamar al endpoint con fecha para obtener la cantidad

      setSelectedDate(fecha)
      getDayFree(product.id, fecha)
    }

    openModal(product);
  };
  return (
    <Card
      bgColor='brown.100'
      maxW="sm"
      _hover={{
        boxShadow: "5px 5px 15px 5px #8E6E53",
      }}
    >
      <CardBody p={4}>
        <Flex>
          <Box
            w="440px"
            h="352px"
            bgGradient="linear(to-r, , blue.700)"
            bgPosition={'center'}
            bgSize={'contain'}
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
        <Stack mt="6" spacing="1">
          <Heading
            fontSize={'2xl'}
            textAlign={"center"}
            textShadow={"3px 3px 3px #8E6E53"}
            color="brown.500"
            overflow={'hidden'}
            h='30px'
          >
            {producto.name}
          </Heading>
          <Text overflow={'hidden'} h='50px' textAlign={"center"} color={'brown'}>{producto.description}</Text>
          <Text textAlign={"center"}
                fontSize={'xl'}
                color={'tostado'}
                fontWeight={900}
                mt={2}
          >{formatPrice(producto.unitPrice)}</Text>
        </Stack>
      </CardBody>
      <Divider/>
      <CardFooter mx="auto">
        <ButtonGroup spacing="2">
          <Button bgColor={"olivaClaro"}
                  onClick={() => handleOpenModal(producto)}
          >Consulta</Button>

          <Link to={`/producto/${producto.id}`}>
            <Button bgColor={"dorado"}>Detalles</Button>
          </Link>
        </ButtonGroup>

      </CardFooter>
    </Card>
  );
};

export default ProductCard;

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
import { useContext } from "react"; // Importar useContext
import { MuebleContext } from "../../Context/MuebleContext";
import PropTypes from "prop-types"; // Importar PropTypes

const ProductCard = ({ disponible = true, producto }) => {
  const { openModal } = useModal();
  const { checkAvailability } = useContext(MuebleContext);

  const handleOpenModal = (product) => {
    const fecha = localStorage.getItem('fecha');
    if (fecha !== null) {
      checkAvailability(product.id, fecha);
    }

    openModal({ ...product });
  };

 

  return (
    <>
      <Card
        bgColor='brown.100'
        maxW="sm"
        _hover={{
          boxShadow: "5px 5px 15px 5px #8E6E53",
        }}
        h='700px'
      >
        <CardBody h={'400px'}>
          <Flex>
            <Box
              w="440px"
              minH="50vh"
              bgGradient="linear(to-r, blue.700)"
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
            <Text h={'50px'}
                  textAlign={"center"}
                  fontSize={'xl'}
                  color={'tostado'}
                  fontWeight={900}
                  fontFamily={'cursive'}
            >$ {producto.unitPrice}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button bgColor={"olivaClaro"}
                    onClick={() => { handleOpenModal(producto);  }}
            >Agregar</Button>

            <Link to={`/producto/${producto.id}`}>
              <Button bgColor={"dorado"}>Detalles</Button>
            </Link>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

// Validación de PropTypes
ProductCard.propTypes = {
  disponible: PropTypes.bool,
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    imageUri: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;

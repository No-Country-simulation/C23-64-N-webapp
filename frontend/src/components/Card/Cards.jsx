import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Cards = ({title,precio,img,descripcion}) => {
  return (
    <Card maxW="sm" >
      <CardBody minH={'500px'}>
        <Image
          src={img}
          alt={title}
          borderRadius="sm"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>
            {descripcion}
           
          </Text>

          <Text color="blue.600" fontSize="2xl">
            $ {precio}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Alquilar
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Agregar al carrito
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Cards;

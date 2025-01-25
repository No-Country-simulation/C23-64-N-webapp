import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const DetalleCard = ({ name, img, description, price, stock }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      // overflow="hidden"
     m={3}
     
      variant="outline"
    >
      <Image
        objectFit="cover"
        m={3}
        maxW={{ base: "100%", sm: "300px" }}
        src={img}
        alt={name}
        
        
      />

      <Stack>
        <CardBody>
          <Heading size="2xl" >{name}</Heading>

          <Text py="2" fontSize={'xl'}>{description} </Text>
          <Text 
          py="2" 
          fontSize={'2xl'} 
          color={'tostado'}
          >$ {price} </Text>
        </CardBody>

        <CardFooter>
          <Button >
            Alquilar
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default DetalleCard;

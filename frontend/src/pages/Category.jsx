import { Card, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Card/Cards";
import { MuebleContext } from "../Context/MuebleContext";
import ProductCard from "../components/Card/ProductCard";

//componente que sera llamado de una categoria especifica para mostrar todos los productos de la misma
export const Category = () => {
  const param = useParams();

  //de momento utilizo este que tiene los muebles pero deberia ser un array filtrado por categoria
  const { furniture } = useContext(MuebleContext);
  console.log(furniture);
  return (
    <VStack h={"100%"} justifyContent={"center"}>
      <HStack wrap={"wrap"} justifyContent={"center"} spacing={4}>
        {furniture.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            img={item.imageUri}
            description={item.description}
            stock={item.stock}
            price={item.unitPrice}
            disponible={true}
          />
        ))}
      </HStack>
    </VStack>
  );
};

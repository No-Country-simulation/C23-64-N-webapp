import React, { useContext } from "react";
import { MuebleContext } from "../Context/MuebleContext";
import { Heading, HStack, useModal, useModalContext, VStack } from "@chakra-ui/react";
import Cards from "../components/Card/Cards";
import ProductCard from "../components/Card/ProductCard";

const Products = () => {
  const { furniture } = useContext(MuebleContext);
 console.log(furniture)
  return (
    <VStack h={"100%"} justifyContent={"center"} m={5}>
      
      <HStack wrap={"wrap"} justifyContent={"center"} spacing={4}>
        {furniture.map((item) => (
          <ProductCard
            key={item.id}
            producto={item}
          />
        ))}
        
      </HStack>
    </VStack>
  );
};

export default Products;

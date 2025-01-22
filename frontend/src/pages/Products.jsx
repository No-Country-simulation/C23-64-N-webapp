import React, { useContext } from "react";
import { MuebleContext } from "../Context/MuebleContext";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import Cards from "../components/Card/Cards";
import ProductCard from "../components/Card/ProductCard";

const Products = () => {
  const { furniture } = useContext(MuebleContext);
 

  return (
    <VStack h={"100%"} justifyContent={"center"}>
      
      <HStack wrap={"wrap"} justifyContent={"center"} spacing={4}>
        {furniture.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            precio={item.unitPrice}
            img={item.imageUri}
            descripcion={item.description}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default Products;

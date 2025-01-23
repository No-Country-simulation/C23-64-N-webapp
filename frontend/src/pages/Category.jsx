import { VStack, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MuebleContext } from "../Context/MuebleContext";
import ProductCard from "../components/Card/ProductCard";

export const Category = () => {
  const { id } = useParams(); // La categoría viene de la URL
  const { furniture } = useContext(MuebleContext);
   console.log("URL category param:", id);
  console.log("All furniture:", furniture);

  // Asegurar que la categoría filtrada coincide con la URL
  const filteredProducts = furniture.filter(
    (item) => item.category.replace(/\s+/g, "-").toLowerCase() === id
  );

  return (
    <VStack h={"100%"} justifyContent={"center"}>
      <HStack wrap={"wrap"} justifyContent={"center"} spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              producto={item}
              disponible={true}
              category={item.category}
            />
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}

      </HStack>
    </VStack>
  );
};

import { useContext } from "react";
import { MuebleContext } from "../Context/MuebleContext";
import { HStack, VStack } from "@chakra-ui/react";
import ProductCard from "../components/Card/ProductCard";

const Products = () => {
  const {furniture} = useContext(MuebleContext);

  return (
    <VStack justifyContent={"center"} m={5} flexGrow={1}>
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

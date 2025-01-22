import React, { useContext } from "react";
import { MuebleContext } from "../Context/MuebleContext";
import { Box, Center, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DetalleCard from "../components/Card/DetalleCard";

// realizaria un get a un producto especifico mediante el id

const Product = () => {
  const { id } = useParams();

  const { furniture } = useContext(MuebleContext);
  const product = furniture.find((item) => item.id === Number(id));

  return (
    <Center m={5}>
      <Box  
      borderRadius={15}
      boxShadow={"15px 15px 10px #8E6E53"}
      >

        {product && (
          <DetalleCard
            name={product.name}
            img={product.imageUri}
            description={product.description}
            price={product.unitPrice}
            stock={product.stock}
          />
        )}
      </Box>
      
    </Center>
  );
};

export default Product;

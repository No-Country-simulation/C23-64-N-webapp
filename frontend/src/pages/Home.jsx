import {Button, Center, Container, Heading, HStack, Image, Text, VStack} from "@chakra-ui/react";
import React, {useContext} from "react";

import Carousel from "../components/Carrusel/Carousel";
import {MuebleContext} from "../Context/MuebleContext";
import CategoryCard from "../components/Card/CategoryCard";


const Home = () => {
  const {category} = useContext(MuebleContext);

  const img = [
    "https://lh4.googleusercontent.com/proxy/6sovWP55KGpgDxoLU2M_Y5JMQnNuSkJ9sr9pGgeLW86GZIXymSmb92_AixZhg1P4iXBGLZFiEZeglnrDJ4YrMqVR7yLeEolg55DUz_d5t7j4rM7sIoZwyyTgpC_aNjeUXRh0TdzlC4E8clY_-qgBZ7DmvNmOBvf9VgIsPDanlw",
    "https://img.freepik.com/fotos-premium/muebles-mimbre-marron-encuentran-cesped-exterior-dia-soleado-verano_615536-394.jpg",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];

  return (
    <VStack h={"100%"} justifyContent={"center"} mb={5}>
      <Carousel images={img}/>
      <Heading as="h1" size='2xl'>CATEGORIAS</Heading>
      <HStack wrap={'wrap'} justifyContent={"center"} spacing={4}>
        {category.map((item) => (
          <CategoryCard
            key={item.id}
            id={item.name}
            title={item.description}
            img={item.imageUri}
          />
        ))}
      </HStack>
    </VStack>
  );
};


export default Home;

import { Button, Center, Container, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Cards from "../components/Card/Cards";
import Carousel from "../components/Carrusel/Carousel";


const Home = () => {
  const data=[
    {
      id:1,
    title:'Sofa para Sala de estar',
    precio:'14.500',
    img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    descripcion:'Este sofa es perfecto para espacios modernos tropicales, espacios inspirados en el barroco, espacios de tonos terrosos y para personas que aman un diseño chic con un toque de diseño vintage.',
  },
  {
    id:2,
    title:'Otro Sofa',
    precio:'12.500',
    img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    descripcion:'Este sofa  espacios de tonos terrosos y para personas que aman un diseño chic con un toque de diseño vintage.',
  },
]

const img=[
  
    'https://lh4.googleusercontent.com/proxy/6sovWP55KGpgDxoLU2M_Y5JMQnNuSkJ9sr9pGgeLW86GZIXymSmb92_AixZhg1P4iXBGLZFiEZeglnrDJ4YrMqVR7yLeEolg55DUz_d5t7j4rM7sIoZwyyTgpC_aNjeUXRh0TdzlC4E8clY_-qgBZ7DmvNmOBvf9VgIsPDanlw',
    'https://img.freepik.com/fotos-premium/muebles-mimbre-marron-encuentran-cesped-exterior-dia-soleado-verano_615536-394.jpg',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
   
]
  return (
    <VStack h={'100%'} justifyContent={'center'}>
      <Carousel images={img} />
      <HStack>
     {data.map((item)=>

     <Cards key={item.id} 
      title={item.title}
      precio={item.precio}
      img={item.img}
      descripcion={item.descripcion}
     />
     )}
     
      </HStack>
    </VStack>
  );
};

export default Home;

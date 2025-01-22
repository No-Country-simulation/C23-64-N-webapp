import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Cards from "../components/Card/Cards";
import Carousel from "../components/Carrusel/Carousel";
import { MuebleContext } from "../Context/MuebleContext";
import CategoryCard from "../components/Card/CategoryCard";

const Home = () => {
  const { furniture} = useContext(MuebleContext);

  
  // const data = [
  //   {
  //     id: 2,
  //     name: "Mesa Rústica de Roble",
  //     type: "mesa",
  //     stock: 15,
  //     unitPrice: 45.99,
  //     description:
  //       "Mesa de roble macizo con un diseño rústico y elegante, ideal para comedores o salones.",
  //     imageUri: "https://i.postimg.cc/T1xfrj8y/mesa-rustica-de-roble.webp",
  //   },
  //   {
  //     id: 3,
  //     name: "Silla Moderna Negra",
  //     type: "silla",
  //     stock: 30,
  //     unitPrice: 12.5,
  //     description:
  //       "Silla de diseño moderno con estructura de metal negro y asiento acolchado, perfecta para oficinas o comedores.",
  //     imageUri: "https://i.postimg.cc/1R09yd6D/silla-moderna-negra.webp",
  //   },
  //   {
  //     id: 4,
  //     name: "Sofá Seccional Gris",
  //     type: "silla",
  //     stock: 8,
  //     unitPrice: 120.0,
  //     description:
  //       "Sofá seccional amplio y cómodo, tapizado en tela gris. Ideal para salas de estar grandes.",
  //     imageUri: "https://i.postimg.cc/ZKTJnLF2/sofa-seccional-gris.webp",
  //   },
  //   {
  //     id: 5,
  //     name: "Estantería de Madera Industrial",
  //     type: "estanteria",
  //     stock: 10,
  //     unitPrice: 35.5,
  //     description:
  //       "Estantería de estilo industrial, fabricada con madera natural y marco de acero negro.",
  //     imageUri:
  //       "https://i.postimg.cc/SRGqVXqg/estanteria-de-madera-industrial.webp",
  //   },
  //   {
  //     id: 6,
  //     name: "Cocina Compacta de Acero Inoxidable",
  //     type: "cocina",
  //     stock: 5,
  //     unitPrice: 250.0,
  //     description:
  //       "Cocina compacta de acero inoxidable con 4 hornallas y horno integrado, perfecta para eventos gastronómicos.",
  //     imageUri:
  //       "https://i.postimg.cc/m28BHFmD/cocina-compacta-de-acero-inoxidable.webp",
  //   },
  // ];

  const img = [
    "https://lh4.googleusercontent.com/proxy/6sovWP55KGpgDxoLU2M_Y5JMQnNuSkJ9sr9pGgeLW86GZIXymSmb92_AixZhg1P4iXBGLZFiEZeglnrDJ4YrMqVR7yLeEolg55DUz_d5t7j4rM7sIoZwyyTgpC_aNjeUXRh0TdzlC4E8clY_-qgBZ7DmvNmOBvf9VgIsPDanlw",
    "https://img.freepik.com/fotos-premium/muebles-mimbre-marron-encuentran-cesped-exterior-dia-soleado-verano_615536-394.jpg",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];
  // const {muebles,setMuebles}=useContext(MuebleContext)
  const typeProducts = furniture.filter((item, index, self) => 
    index === self.findIndex(t => t.type === item.type)
);
// console.log("productos",typeProducts)
  return (
    <VStack h={"100%"} justifyContent={"center"}>
      <Carousel images={img} />
      <Heading as="h1" size='2xl'>CATEGORIAS</Heading>
      <HStack wrap={'wrap'} justifyContent={"center"} spacing={4}>
        {typeProducts.map((item) => (
          <CategoryCard
            key={item.id}
            id={item.id}
            title={item.name}
            img={item.imageUri}
           
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default Home;

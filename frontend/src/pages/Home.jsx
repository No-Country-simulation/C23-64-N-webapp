import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useContext } from "react";

import Carousel from "../components/Carrusel/Carousel";
import { MuebleContext } from "../Context/MuebleContext";
import CategoryCard from "../components/Card/CategoryCard";


const Home = () => {
  const {category} = useContext(MuebleContext);

  const img = [
    "https://i.postimg.cc/HkGxG1dc/boda.webp",
    "https://i.postimg.cc/fWryK0Pv/parrillada.webp",
    "https://i.postimg.cc/JzbhMYzT/quinceanera.webp",
  ];

  return (
    <VStack flexGrow={1} justifyContent={"start"} mb={5}>
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

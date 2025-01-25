import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Image,
  Flex,
  useInterval,
  Circle,
  HStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


const Carousel = ({ images = [], autoplaySpeed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay functionality
  useInterval(() => {
    handleNext();
  }, autoplaySpeed);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box position="relative"  w={'100%'}  mx="auto">
      {/* Image Container */}
      <Box 
        overflow="hidden" 
        borderRadius="lg"
        position="relative"
      >
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          w="full"
          h="400px"
          objectFit="cover"
          transition="all 0.3s ease"
        />
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        icon={<ChevronLeftIcon />}
        position="absolute"
        left="4"
        top="50%"
        transform="translateY(-50%)"
        onClick={handlePrevious}
        bg="whiteAlpha.800"
        _hover={{ bg: 'whiteAlpha.900' }}
        aria-label="Previous slide"
      />

      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute"
        right="4"
        top="50%"
        transform="translateY(-50%)"
        onClick={handleNext}
        bg="whiteAlpha.800"
        _hover={{ bg: 'whiteAlpha.900' }}
        aria-label="Next slide"
      />

      {/* Dots Navigation */}
      <Flex justify="center" mt="4">
        <HStack spacing="2">
          {images.map((_, index) => (
            <Circle
              key={index}
              size="2"
              bg={currentIndex === index ? "blue.500" : "gray.300"}
              cursor="pointer"
              onClick={() => handleDotClick(index)}
              _hover={{ bg: currentIndex === index ? "blue.600" : "gray.400" }}
            />
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Carousel;
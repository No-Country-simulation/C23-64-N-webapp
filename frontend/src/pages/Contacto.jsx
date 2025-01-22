import React from 'react'
import {
  ChakraProvider,
  Breadcrumb,
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Text,
  Textarea,
  Checkbox,
  Button
} from '@chakra-ui/react'

const App = () => (
  <ChakraProvider resetCSS>
    <Breadcrumb />
    <Box width={"50%"} marginX={"25%"} marginY={10}  pt={5} border="1px solid black" borderRadius={20} pointerEvents={'auto'}>
      <FormControl
        isRequired
        display="block"
        width="95%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Center pt={5}>
          <FormLabel
            width="50%"
            height="100%"
            borderRadius={20}
            border={1}
            ml={5}
          >
            Nombre
          </FormLabel>
          <FormLabel
            width="50%"
            height="100%"
            borderRadius={20}
            border={1}
            ml={5}
          >
            Apellido
          </FormLabel>
        </Center>
        <Center display="flex">
          <Input
            size="md"
            placeholder="Nombre"
            variant="outline"
            width="50%"
            height={10}
            border="1px solid black"
            borderRadius={20}
            mt={5}
            ml={5}
          />
          <Input
            size="md"
            placeholder="apellido"
            variant="outline"
            width="50%"
            height={10}
            border="1px solid black"
            borderRadius={20}
            mt={5}
            ml={5}
          />
        </Center>
      </FormControl>
      <FormControl
        isRequired
        display="block"
        width="95%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Center>
          <FormLabel
            width="100%"
            height="100%"
            borderRadius={20}
            border={1}
            ml={5}
            mt={5}
          >
            Email
          </FormLabel>
        </Center>
        <Center display="block" pt={5}>
          <Input
            size="md"
            placeholder="pepe@email.com"
            variant="outline"
            width="100%"
            height={10}
            border="1px solid black"
            borderRadius={20}
            ml={5}
            mt={5}
          />
        </Center>
      </FormControl>
      <Text textAlign="left" fontSize="xl" ml={5} mt={5}>
        Ingrese el mensaje
      </Text>
      <Textarea
        resize="none"
        placeholder="Dejanos tu mensaje..."
        minHeight={100}
        maxHeight={200}
        overflow="visible"
        pt={5}
        mt={5}
        ml={5}
        width="93%"
        border="1px solid black"
        borderRadius={20}
      />
      <Checkbox isChecked colorScheme="whatsapp" size="lg" ml={5} mt={5}>
        Deseo recibir ofertas imperdibles
      </Checkbox>
      <Button
        variant="outline"
        size="md"
        colorScheme="whatsapp"
        display="block"
        ml={5}
        mt={5}
        mb={5}
      >
        Enviar
      </Button>
    </Box>
  </ChakraProvider>
)

export default App
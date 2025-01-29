import { useForm } from "react-hook-form";
import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  Button,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { MuebleContext } from "../Context/MuebleContext";
import { useModal } from "../Context/ModalContext";
import { DeleteIcon } from "@chakra-ui/icons";

const DetailCart = () => {
  const { rental, setRental } = useModal();
  const { setCartCount, cartCount } = useContext(MuebleContext);
  const [total, setTotal] = useState(0);
  const muebles = rental.muebles;
  // muebles.map((item) => (total = total + item.cantidad * item.precio));

  const formatDateToString = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const eliminarProducto = (id) => {
    const pro = muebles.find((item) => item.id === id);
    setCartCount(cartCount - pro.cantidad);
    const extracto = muebles.filter((item) => item.id !== id);
    setRental({ ...rental, muebles: extracto });
  };
  //formulario
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const limpiarAlquiler=()=>{
    reset()
  }

  function onSubmit(values) {
    const alquiler = {
      cliente: { ...values },
      muebles: { ...muebles },
      fechaAlquiler: rental.fechaAlquiler,
      total: total,
      // registrarCliente: registro,
    };
    // mandar la información al endpoint correspondiente

    console.log(alquiler);
    limpiarAlquiler()
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(alquiler, null, 2));
        resolve();
      }, 3000);
    });
  }

  useEffect(() => {
    const nuevoTotal = muebles.reduce((acc, mueble) => {
      return acc + mueble.cantidad * mueble.precio;
    }, 0);

    setTotal(nuevoTotal);
  }, [muebles]); // Se actualiza cada vez que muebles cambie
  return (
    <Center>
      {muebles != 0 ? (
        <Stack>
          <TableContainer>
            <Table variant="striped" colorScheme="brown">
              <TableCaption fontSize={"2xl"} color={"red.400"}>
                Detalle de los muebles alquilados para la fecha:{" "}
                {formatDateToString(rental.fechaAlquiler)}{" "}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th isNumeric>ID</Th>
                  <Th isNumeric>CANT.</Th>
                  <Th>DETALLE</Th>
                  <Th isNumeric>P. U.</Th>
                  <Th isNumeric>SUB. TOTAL</Th>
                  <Th>Eliminar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {muebles.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.cantidad}</Td>
                    <Td>{item.detalle}</Td>
                    <Td isNumeric>{item.precio}</Td>
                    <Td isNumeric>{item.precio * item.cantidad}</Td>
                    <Td textAlign={"center"}>
                      <DeleteIcon
                        cursor={"pointer"}
                        onClick={() => eliminarProducto(item.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan={4} fontSize={"2xl"}>
                    TOTAL PARA ABONAR:{" "}
                  </Th>

                  <Th isNumeric fontSize={"2xl"}>
                    $ {total}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          {/* formulario de cliente| */}
          <Flex my={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack spacing={5} my={"15px"}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Input
                    id="name"
                    placeholder="Nombre"
                    {...register("name", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Mínimo debe tener 4 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.lastName}>
                  <FormLabel htmlFor="lastName">Apellido</FormLabel>
                  <Input
                    id="lastName"
                    placeholder="Apellido"
                    {...register("lastName", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Mínimo debe tener 4 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.dni}>
                  <FormLabel htmlFor="dni">D.N.I.</FormLabel>
                  <Input
                    type="number"
                    id="dni"
                    placeholder="Numero de Documento"
                    {...register("dni", {
                      required: "This is required",

                      minLength: {
                        value: 8,
                        message: "Debe tener 8 digitos",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.dni && errors.dni.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack spacing={5} my={"15px"}>
                <FormControl isInvalid={errors.telefono}>
                  <FormLabel htmlFor="tel">Teléfono</FormLabel>
                  <Input
                    type={"tel"}
                    id="tel"
                    placeholder="Numero de Télefono"
                    {...register("tel", {
                      minLength: {
                        value: 10,
                        message: "Debe tener 10 digitos",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.tel && errors.tel.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Dirección de E-mail"
                    {...register("email", {
                      minLength: {
                        value: 7,
                        message: "Debe ingresar un E-mail valido",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.direccion}>
                  <FormLabel htmlFor="direccion">Direccion</FormLabel>
                  <Input
                    type="text"
                    id="direccion"
                    placeholder="Dirección de postal"
                    {...register("direccion", {
                      minLength: {
                        value: 7,
                        message: "Mínimo 7 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.direccion && errors.direccion.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.registro}>
                  <FormLabel htmlFor="registro">
                    Registrarse como cliente
                  </FormLabel>
                  <Checkbox
                    id="registro"
                    placeholder="Dirección de postal"
                    {...register("registro", {
                      minLength: {
                        value: 7,
                        message: "Mínimo 7 caracteres",
                      },
                    })}
                  ></Checkbox>

                  <FormErrorMessage>
                    {errors.registro && errors.registro.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              {/* ----------------- */}

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Confirmar Alquiler
              </Button>
            </form>
          </Flex>
        </Stack>
      ) : (
        <VStack minH={"80vh"} justifyContent={"center"}>
          <Text fontSize={"2xl"}>No hay muebles cargados para mostrar</Text>
        </VStack>
      )}
    </Center>
  );
};

export default DetailCart;

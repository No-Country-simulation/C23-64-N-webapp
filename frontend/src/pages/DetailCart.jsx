import {useForm} from "react-hook-form";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import {MuebleContext} from "../Context/MuebleContext";
import {useModal} from "../Context/ModalContext";
import {DeleteIcon} from "@chakra-ui/icons";
import {AlertDialogComponent} from "../components/AlertDialog/AlertDialog";
import {useNavigate} from "react-router-dom";

const DetailCart = () => {
  const {rental, setRental} = useModal();
  const {setCartCount, cartCount, postAlquiler, reservado} =
    useContext(MuebleContext);
  const [total, setTotal] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la alerta
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de la alerta
  const muebles = rental.muebles;
  const navigate = useNavigate();

  const eliminarProducto = (id) => {
    const pro = muebles.find((item) => item.id === id);
    setCartCount(cartCount - pro.cantidad);
    const extracto = muebles.filter((item) => item.id !== id);
    setRental({...rental, muebles: extracto});
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      firstName: "Omar Dario",
      lastName: "Virili",
      dni: "35256328",
      // phone: "3698521475",
      email: "pedro@algo.com.ar",
      address: "Algun lado",
      // registro: false,
    },
  });

  const limpiarAlquiler = () => {
    setRental({});
    localStorage.removeItem("rental");
    localStorage.removeItem("fecha");
    localStorage.removeItem("id");
    reset();
    navigate('/')
  };

  function onSubmit(values) {
    const rentalDetails = muebles.map((item) => ({
      furnitureId: item.id,
      quantity: item.cantidad,
    }));
    const alquiler = {
      clientInfo: {...values},
      rentalDetails: rentalDetails,
      rentalDate: rental.fechaAlquiler.toISOString().split('T')[0],
    };

    postAlquiler(alquiler);
    // Mostrar la alerta

    setAlertMessage(JSON.stringify(alquiler, null, 2));
    setShowAlert(true);

    setTimeout(() => {
      limpiarAlquiler();
    }, 15000);
  }

  useEffect(() => {
    const nuevoTotal = muebles.reduce((acc, mueble) => {
      return acc + mueble.cantidad * mueble.precio;
    }, 0);

    setTotal(nuevoTotal);
  }, [muebles]);

  return (
    <Center flexDir={"column"}>
      {showAlert && ( // Renderizar la alerta si showAlert es true
        <AlertDialogComponent
          msj={alertMessage}
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
      {muebles?.length !== 0 ? (
        <Stack>
          <TableContainer>
            <Table variant="striped" colorScheme="brown">
              <TableCaption fontSize={"2xl"} color={"red.400"}>
                Detalle de los muebles alquilados para la fecha:{" "}
                {rental.fechaAlquiler.toISOString().split('T')[0]}{" "}
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
          <Flex my={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack spacing={5} my={"15px"}>
                <FormControl isInvalid={errors.firstName}>
                  <FormLabel htmlFor="firstName">Nombre</FormLabel>
                  <Input
                    id="firstName"
                    placeholder="Nombre"
                    {...register("firstName", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 4,
                        message: "Mínimo debe tener 4 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.lastName}>
                  <FormLabel htmlFor="lastName">Apellido</FormLabel>
                  <Input
                    id="lastName"
                    placeholder="Apellido"
                    {...register("lastName", {
                      required: "Este campo es requerido",
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
                      required: "Este campo es requerido",
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
                {/* <FormControl isInvalid={errors.telefono}>
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
                </FormControl> */}

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

                <FormControl isInvalid={errors.address}>
                  <FormLabel htmlFor="address">Dirección</FormLabel>
                  <Input
                    type="text"
                    id="address"
                    placeholder="Dirección de postal"
                    {...register("address", {
                      minLength: {
                        value: 7,
                        message: "Mínimo 7 caracteres",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>
                </FormControl>

                {/* <FormControl isInvalid={errors.registro} >
                  <FormLabel htmlFor="registro">
                    Registrarse como cliente
                  </FormLabel>
                  <Checkbox disabled
                    id="registro"
                    placeholder="Dirección de postal"
                    {...register("registro")}
                  ></Checkbox>

                  <FormErrorMessage>
                    {errors.registro && errors.registro.message}
                  </FormErrorMessage>
                </FormControl> */}
              </HStack>

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
      <Center>
        {reservado && (
          <VStack mx={'25px'}>
            <Text fontSize={'3xl'} textAlign={'center'} color={'olivaClaro'}>
              Tu reserva ha sido confirmada, se ha enviado un correo electrónico
              con los datos correspondientes. El día del alquiler, presentate
              con este código QR:
            </Text>

            <img
              src={`https://c23-64-n-webapp-development.up.railway.app/rentals/${reservado}/qrcode`}
            />
            <Text fontSize={'2xl'} color={'green.400'}> Este código también fue enviado a tu casilla
              de correo</Text>
          </VStack>
        )}
      </Center>
    </Center>
  );
};

export default DetailCart;

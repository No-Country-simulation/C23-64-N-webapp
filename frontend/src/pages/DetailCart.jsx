import { useForm } from "react-hook-form";
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
import { useContext, useEffect, useState } from "react";
import { MuebleContext } from "../Context/MuebleContext";
import { useModal } from "../Context/ModalContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { dateFormat, formatPrice } from "../assets/utils.js";

const DetailCart = () => {
  const {rental, setRental, setSelectedDate, selectedDate, initialValueRental} = useModal();
  const {setCartCount, cartCount, postAlquiler, reservado, setReservado} =
    useContext(MuebleContext);
  const [total, setTotal] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la alerta
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de la alerta
  const muebles = rental.muebles;
  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(false);

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
      firstName: "",
      lastName: "",
      dni: "",
      // phone: "3698521475",
      email: "",
      address: "",
      // registro: false,
    },
  });

  const limpiarAlquiler = () => {
    setRental(initialValueRental);
    setCartCount(0);
    setSelectedDate(null)
    setReservado(null)
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
      rentalDate: new Date(rental.fechaAlquiler).toISOString().split('T')[0],
    };
    setSubmitDisabled(true);

    postAlquiler(alquiler);
    // Mostrar la alerta

    // setAlertMessage(JSON.stringify(alquiler, null, 2));
    // setShowAlert(true);

    // setTimeout(() => {
    //   limpiarAlquiler();
    // }, 5000);
  }

  useEffect(() => {
    const nuevoTotal = muebles?.reduce((acc, mueble) => acc + mueble.cantidad * mueble.precio, 0) || 0;
    setTotal(nuevoTotal);
  }, [muebles]);

  return (
    <Center flexDir="column" flexGrow={1} justifyContent="flex-start" mt={4}>
      {/* {showAlert && ( // Renderizar la alerta si showAlert es true
        <AlertDialogComponent
          msj={alertMessage}
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )} */}
      {selectedDate && muebles?.length !== 0 ? (
        <Stack>
          <TableContainer>
            <Table variant="striped" colorScheme="brown">
              <TableCaption fontSize={"2xl"} color={"red.400"}>
                Detalle de los muebles alquilados para la fecha: {dateFormat.format(new Date(selectedDate))}
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
                    <Td isNumeric>{formatPrice(item.precio)}</Td>
                    <Td isNumeric>{formatPrice(item.precio * item.cantidad)}</Td>
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
                    {formatPrice(total)}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Flex my={5} justifyContent="center">
            <form onSubmit={handleSubmit(onSubmit)} style={{textAlign: "center"}}>
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
                isDisabled={submitDisabled}
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
          <VStack mx={'25px'} alignItems="center">
            <Text fontSize={'3xl'} textAlign={'center'} color={'olivaClaro'}>
              Tu reserva ha sido confirmada, se ha enviado un correo electrónico
              con los datos correspondientes. El día del alquiler, presentate
              con este código QR:
            </Text>

            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/rentals/${reservado}/qrcode`}
            />
            <Text fontSize={'2xl'} color={'green.400'}> Este código también fue enviado a tu casilla
              de correo</Text>
            <Button onClick={limpiarAlquiler} colorScheme={'red'} mb={4}>Volver al inicio</Button>
          </VStack>
        )}
      </Center>
    </Center>
  );
};

export default DetailCart;

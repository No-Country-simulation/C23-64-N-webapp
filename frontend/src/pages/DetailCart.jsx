import { Center } from '@chakra-ui/react'
import React, { useContext } from 'react'
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
  } from '@chakra-ui/react'
import { MuebleContext } from '../Context/MuebleContext'
import { useModal } from '../Context/ModalContext'
const DetailCart = () => {
    const {rental}=useModal();
   const muebles=rental.muebles;
   let total=0 
   muebles.map((item)=>total=total+(item.cantidad*item.precio))

   const formatDateToString = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <Center>
        <TableContainer>
  <Table variant='striped' colorScheme='brown'>
    <TableCaption>Detalle de los muebles alquilados para la fecha </TableCaption>
    <Thead>
      <Tr >
        <Th isNumeric>ID</Th>
        <Th isNumeric>CANT.</Th>
        <Th>DETALLE</Th>
        <Th isNumeric>P. U.</Th>
        <Th isNumeric >SUB. TOTAL</Th>
      </Tr>
    </Thead>
    <Tbody>
      {muebles.map((item)=>

      <Tr key={item.id}>
        
        <Td>{item.id}</Td>
        <Td>{item.cantidad}</Td>
        <Td>{item.detalle}</Td>
        <Td isNumeric>{item.precio}</Td>
        <Td isNumeric>{item.precio * item.cantidad}</Td>
      </Tr>
      )} 
    </Tbody>
    <Tfoot>
      <Tr>
        <Th colSpan={4}>ABONAR POR EL ALQUILER DE LA FECHA: {formatDateToString(rental.fechaAlquiler)}----></Th>
       
        <Th isNumeric fontSize={'2xl'}>$ {total}</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
    </Center>
  )
}

export default DetailCart
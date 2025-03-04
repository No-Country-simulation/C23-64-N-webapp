import { AlertDialog as ChakraAlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Center } from "@chakra-ui/react";
import { useRef } from "react";
import PropTypes from 'prop-types';

export const AlertDialogComponent = ({ msj, codeQr, isOpen, onClose }) => {
    const cancelRef = useRef();

    return (
      <>
        <ChakraAlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Registro Exitoso
            </AlertDialogHeader>

            <AlertDialogBody>
             {msj}
             <Center>
              {codeQr}
             </Center>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} colorScheme={'green'} onClick={onClose}>
                Aceptar
              </Button>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </ChakraAlertDialog>
      </>
    );
}

// Validación de props
AlertDialogComponent.propTypes = {
    msj: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

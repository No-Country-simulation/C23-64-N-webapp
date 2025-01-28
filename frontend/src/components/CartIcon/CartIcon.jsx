import { useContext, useState } from "react";
import { IconButton, Badge, Box } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useModal } from "../../Context/ModalContext";


const CartIcon = () => {
    const {cartCount}=useModal();

    return (
        <Box position="relative">
            <IconButton
            icon={<FaShoppingCart/>}
            aria-label="Carrito de Compras"
            size="lg"
            />
            {cartCount > 0 && (
                <Badge position="absolute" top="-1" right="-1" bg="green.500" color="white" borderRadius="full" px={2} fontSize="0.8em">
                    {cartCount}
                </Badge>
            )}
        </Box>
    );
};

export default CartIcon;
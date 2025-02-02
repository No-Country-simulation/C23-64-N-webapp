import { Badge, Box, IconButton } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { MuebleContext } from "../../Context/MuebleContext";

const CartIcon = () => {
  const { cartCount } = useContext(MuebleContext); // Access cartCount from context

  useEffect(() => {
    console.log(cartCount); // Log the cartCount whenever it changes
  }, [cartCount]);

  return (
    <Box position="relative">
      <IconButton
        icon={<FaShoppingCart />}
        aria-label="Carrito de Compras"
        size='lg'
      />
      {cartCount > 0 && (
        <Badge
          position="absolute"
          top="-1"
          right="-1"
          bg="green.500"
          color="white"
          borderRadius="full"
          px={2}
          fontSize="0.8em"
        >
          {cartCount}
        </Badge>
      )}
    </Box>
  );
};

export default CartIcon;

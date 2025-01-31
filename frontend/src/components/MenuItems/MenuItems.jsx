import { useContext, useState } from "react";
import { MuebleContext } from "../../Context/MuebleContext";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const MenuItems = () => {
  const { category } = useContext(MuebleContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category) => {
    navigate(`/category/${category.name}`);
    setIsOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton as={Button} colorScheme="whatsapp" onClick={() => setIsOpen(!isOpen)}>
        Productos
      </MenuButton>
      <MenuList>
        {category.length > 0 ? (
          category.map((category, index) => (
            <MenuItem key={index} onClick={() => handleCategorySelect(category)}>
              {category.description}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No hay categorías disponibles</MenuItem>
        )}
        <MenuItem
          onClick={() => navigate("/productos")}
        >Todos los productos
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuItems;
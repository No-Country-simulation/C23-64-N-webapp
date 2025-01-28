import { useContext, useState, useEffect } from "react";
import { MuebleContext } from "../../Context/MuebleContext";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const MenuItems = () => {
  const { furniture } = useContext(MuebleContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Obtener categorías únicas
  useEffect(() => {
    if (furniture.length > 0) {
      const uniqueCategories = [...new Set(furniture.map((item) => item.category))];
      setCategories(uniqueCategories);
    }
  }, [furniture]);

  
  const handleCategorySelect = (category) => {
    const formattedCategory = category.replace(/\s+/g, "-").toLowerCase(); // Normaliza la URL
    
    navigate(`/category/${formattedCategory}`);
    setIsOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton as={Button} colorScheme="whatsapp" onClick={() => setIsOpen(!isOpen)}>
        Productos
      </MenuButton>
      <MenuList>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <MenuItem key={index} onClick={() => handleCategorySelect(category)}>
              {category}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No hay categorías disponibles</MenuItem>
        )}
        <MenuItem
          onClick={() => navigate("/productos")}
        >Ver todos los productos
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuItems;
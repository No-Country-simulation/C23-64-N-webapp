import {extendTheme } from "@chakra-ui/react";
import { ButtonConfig } from "./ButtonConfig";
import { InputConfig } from "./InputConfig";



const colors = {
  brand: {
    100: "#F6e7f6",
    200: "#F5e5f5",
    300: "#E5e5e5",
    400: "#D5e5D5",
    500: "#C5e5C5",
    600: "#B5e5B5",
    700: "#A5e5A5",
    800: "#90e090",
  },
  primary: "#5252f2",
  brown:{
    100:"#EDE0D4",
    200:"#E6CCB2",
    300:"#DDB892",
    400:"#B08968",
    500:"#7F5539",
    600:"#9C6644",

  },
  
  beige:"#F7F3E9",// Ideal para fondos o areas neutras
  olivaClaro:"#A8B18F",// Para dar un toque natural y fresco.
  tostado:"#8E6E53",// Agrega calidez y una sensación de lujo.
  dorado:"#D4A373",//: Aporta elegancia sin ser demasiado llamativo.
};
const fonts = {
  heading: "Roboto,Courier New , sans-serif",
  body: "Roboto, sans-serif",
};

export const themePropio = extendTheme({
  colors,
  fonts,
  components: {
    Button: ButtonConfig,
    Input: InputConfig,
   
  },
});

// export const themePropio = extendTheme({colors,fonts,components:{Button:buttonAlura}});

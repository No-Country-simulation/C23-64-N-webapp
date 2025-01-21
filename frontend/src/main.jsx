import { StrictMode } from 'react'
import { themePropio } from './assets/themePropio'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ChakraProvider theme={themePropio}>

    <App/>
   </ChakraProvider>
  </StrictMode>,
)

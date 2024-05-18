import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { DarkModeProvider } from './hooks/DarkModeContext.tsx'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeProvider>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </DarkModeProvider>
  </React.StrictMode>,
)

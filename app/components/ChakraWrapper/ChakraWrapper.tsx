'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'

interface Props {
  children: React.ReactNode
}

const theme = extendTheme({
  colors: {
    brand: {
      100: '#FF3C00'
    }
  },
  fonts: {
    body: 'Open Sans, sans-serif'
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.200'
      }
    })
  },
  components: {}
})

export default function ChakraWrapper({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

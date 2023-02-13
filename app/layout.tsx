import ChakraWrapper from './components/ChakraWrapper/ChakraWrapper'
import Navbar from './components/Navbar/Navbar'

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head />
      <body>
        <ChakraWrapper>
          <Navbar />
          {children}
        </ChakraWrapper>
      </body>
    </html>
  )
}

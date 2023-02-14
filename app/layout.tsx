import ChakraWrapper from "./components/ChakraWrapper/ChakraWrapper";
import Navbar from "./components/Navbar/Navbar";
import RecoilWrapper from "./components/RecoilWrapper/RecoilWrapper";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <RecoilWrapper>
          <ChakraWrapper>
            <Navbar />
            {children}
          </ChakraWrapper>
        </RecoilWrapper>
      </body>
    </html>
  );
}

import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { Container } from "@/styles/pages/app";

import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { Header } from "@/components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </ShoppingCartProvider>
  );
}

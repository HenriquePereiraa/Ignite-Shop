import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import logoImg from "@/assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

import { HiOutlineShoppingBag } from "react-icons/hi";
import ShoppingCart from "@/components/ShoppingCart";
import { useState } from "react";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ShoppingCartProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />

          <div className="icon" onClick={() => setIsOpen(!isOpen)}>
            <span>1</span>
            <HiOutlineShoppingBag size={20} />
          </div>

          <ShoppingCart isOpen={isOpen} handleSetIsOpen={setIsOpen} />
        </Header>
        <Component {...pageProps} />
      </Container>
    </ShoppingCartProvider>
  );
}

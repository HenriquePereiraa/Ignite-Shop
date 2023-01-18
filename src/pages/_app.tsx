import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import logoImg from "@/assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

import { HiOutlineShoppingBag } from "react-icons/hi";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <div className="icon">
          <span>1</span>
          <HiOutlineShoppingBag size={20} />
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}

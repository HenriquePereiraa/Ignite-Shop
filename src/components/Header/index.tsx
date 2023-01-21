import React, { useContext } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShoppingCart from "../ShoppingCart";
import logoImg from "@/assets/logo.svg";
import Image from "next/image";
import { HeaderContainer } from "./styles";

import { useState } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { productsInCart } = useContext(ShoppingCartContext);

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <div className="icon" onClick={() => setIsOpen(!isOpen)}>
        {productsInCart.length > 0 && <span>{productsInCart.length}</span>}
        <HiOutlineShoppingBag size={20} />
      </div>

      <ShoppingCart isOpen={isOpen} handleSetIsOpen={setIsOpen} />
    </HeaderContainer>
  );
}

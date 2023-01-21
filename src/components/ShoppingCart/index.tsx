import React, { useContext, useMemo } from "react";
import { ShoppingCartContainer, ContentMainCart } from "./styles";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import Image from "next/image";

interface ShoppingCartProps {
  isOpen: boolean;
  handleSetIsOpen: (open: boolean) => void;
}

export default function ShoppingCart({
  isOpen,
  handleSetIsOpen,
}: ShoppingCartProps) {
  const { productsInCart, removeProduct } = useContext(ShoppingCartContext);

  const totalPrice = useMemo(() => {
    let price = productsInCart.reduce((acc, product) => {
      acc += parseFloat(product.price);

      return acc;
    }, 0);

    let priceEdit = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);

    return priceEdit;
  }, [productsInCart]);

  return (
    <ShoppingCartContainer css={{ $$displayT: isOpen ? "" : "none" }}>
      <header>
        <span onClick={() => handleSetIsOpen(!isOpen)} role="button">
          X
        </span>
      </header>

      <ContentMainCart>
        <h2>Sacola de compras</h2>
        <div
          className="products"
          style={
            productsInCart.length >= 4
              ? { overflow: "auto" }
              : { overflow: "hidden" }
          }
        >
          {productsInCart.map((product) => {
            let priceEdit = new Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(product.price / 100);

            return (
              <div className="product" key={product.id}>
                <div className="product__imageContainer">
                  <Image src={product.image} width={95} height={95} alt="" />
                </div>
                <div className="product__content">
                  <span className="content__title">{product.name}</span>
                  <strong>{priceEdit}</strong>
                  <span
                    className="content__button"
                    role="button"
                    onClick={() => removeProduct(product.id)}
                  >
                    Remover
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <footer>
          <div className="infos">
            <span>Quantidade</span>
            <span>
              {productsInCart.length > 1
                ? `${productsInCart.length} items`
                : `${productsInCart.length} item`}
            </span>
          </div>

          <div className="infos">
            <strong>Valor Total</strong>
            <strong>{totalPrice}</strong>
          </div>

          <button>Finalizar compras</button>
        </footer>
      </ContentMainCart>
    </ShoppingCartContainer>
  );
}

import React, { useContext, useMemo, useState } from "react";
import { ShoppingCartContainer, ContentMainCart } from "./styles";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import Image from "next/image";
import axios from "axios";

interface ShoppingCartProps {
  isOpen: boolean;
  handleSetIsOpen: (open: boolean) => void;
}

export default function ShoppingCart({
  isOpen,
  handleSetIsOpen,
}: ShoppingCartProps) {
  const { productsInCart, removeProduct } = useContext(ShoppingCartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

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

  async function handleBuyFinished() {
    try {
      setIsCreatingCheckoutSession(true);

      const priceIds = productsInCart.map((prod) => {
        return {
          id: prod.defaultPriceId,
        };
      });

      const response = await axios.post("/api/checkout", {
        priceId: priceIds,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      //conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      isCreatingCheckoutSession(false);

      alert("Falha ao redirecionar ao checkou");
    }
  }

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

          <button
            onClick={handleBuyFinished}
            disabled={isCreatingCheckoutSession}
          >
            Finalizar compras
          </button>
        </footer>
      </ContentMainCart>
    </ShoppingCartContainer>
  );
}

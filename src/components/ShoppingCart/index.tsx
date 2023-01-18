import React from "react";
import { ShoppingCartContainer, ContentMainCart } from "./styles";

interface ShoppingCartProps {
  isOpen: boolean;
  handleSetIsOpen: (open: boolean) => void;
}

export default function ShoppingCart({
  isOpen,
  handleSetIsOpen,
}: ShoppingCartProps) {
  return (
    <ShoppingCartContainer css={{ $$displayT: isOpen ? "" : "none" }}>
      <header>
        <span onClick={() => handleSetIsOpen(!isOpen)} role="button">
          X
        </span>
      </header>

      <ContentMainCart>
        <h2>Sacola de compras</h2>
        <div className="products">
          <div className="product">
            <div className="product__imageContainer"></div>
            <div className="product__content">
              <span className="content__title">Camisa Explorer</span>
              <strong>R$ 79,90</strong>
              <span className="content__button" role="button">
                Remover
              </span>
            </div>
          </div>
        </div>

        <footer>
          <div className="infos">
            <span>Quantidade</span>
            <span>3 itens</span>
          </div>

          <div className="infos">
            <strong>Valor Total</strong>
            <strong>R$ 270,00</strong>
          </div>

          <button>Finalizar compras</button>
        </footer>
      </ContentMainCart>
    </ShoppingCartContainer>
  );
}

import { ReactNode, createContext, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface ShoppingCartContextType {
  productsInCart: Product[];
  addNewProduct: (product: Product) => void;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [productsInCart, setProducts] = useState<Product[]>([]);

  function addNewProduct(product: Product) {
    if (product) {
      const sameProduct = productsInCart.some((prod) => prod.id === product.id);

      if (sameProduct) {
        return;
      }
    }

    setProducts((prevState) => [...prevState, product]);
  }

  return (
    <ShoppingCartContext.Provider value={{ productsInCart, addNewProduct }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

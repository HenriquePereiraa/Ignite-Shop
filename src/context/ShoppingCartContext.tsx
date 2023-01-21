import { ReactNode, createContext, useCallback, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  defaultPriceId: string;
}

interface ShoppingCartContextType {
  productsInCart: Product[];
  addNewProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [productsInCart, setProducts] = useState<Product[]>([]);

  const addNewProduct = useCallback(
    (product: Product) => {
      {
        if (product) {
          const sameProduct = productsInCart.some(
            (prod) => prod.id === product.id
          );

          if (sameProduct) {
            return;
          }
        }

        setProducts((prevState) => [...prevState, product]);
      }
    },
    [productsInCart]
  );

  const removeProduct = (id: string) => {
    let newList = productsInCart;

    newList = newList.filter((product) => product.id !== id);

    setProducts(newList);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ productsInCart, addNewProduct, removeProduct }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

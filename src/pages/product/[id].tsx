import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import axios from "axios";
import { useContext, useState } from "react";
import Head from "next/head";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isAddInCart, setIsAddInCart] = useState(false);

  const { addNewProduct } = useContext(ShoppingCartContext);

  async function handleBuyProduct() {
    const price = product.price;

    const data = {
      id: product.id,
      name: product.name,
      price,
      image: product.imageUrl,
      defaultPriceId: product.defaultPriceId,
    };

    addNewProduct(data);
  }

  const price = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(product.price / 100);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{price}</span>

          <p>{product?.description}</p>

          <button onClick={handleBuyProduct} disabled={isAddInCart}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_NBK5Fv29xJHRK2" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: price.unit_amount,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};

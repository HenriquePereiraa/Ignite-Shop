import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

import {
  ImageContainer,
  ImageSlideWrapper,
  SuccessContainer,
} from "@/styles/pages/success";

import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
// import { useContext } from "react";
// import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { useKeenSlider } from "keen-slider/react";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imagesUrl: string[];
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageSlideWrapper>
          {product.imagesUrl.map((image) => {
            return (
              <ImageContainer key={image.image}>
                <Image src={image.image} width={120} height={110} alt="" />
              </ImageContainer>
            );
          })}
        </ImageSlideWrapper>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {product.imagesUrl.length >= 1
            ? `${product.imagesUrl.length} camisetas`
            : `${product.imagesUrl.length} camiseta`}{" "}
          já está a caminho de sua casa
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  // PEGAR OS DADOS RETORNADOS DO STRIPE E ENVIAR PARA AS PROPS
  const ImagesProducts = session.line_items?.data?.map((item) => {
    return {
      image: item.price?.product.images[0],
    };
  });

  return {
    props: {
      customerName: customerName?.name,
      product: {
        name: product?.name,
        imagesUrl: ImagesProducts,
      },
    },
  };
};

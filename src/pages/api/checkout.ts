import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface priceIdType {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!priceId) {
    return res.status(400).json({ error: "Price not Found" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  const line_items = priceId.map((item: priceIdType) => {
    return {
      price: item.id,
      quantity: 1,
    };
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}

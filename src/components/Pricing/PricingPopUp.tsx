"use client";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { PaymentInput } from "./PaymentInput/PaymentInput";
import { Price } from "./Price/Price";
import "./PricingPopUp.css";
import { SuccessPayment } from "./SuccessPayment/SuccessPayment";
import { useState } from "react";
import { BASE_URL } from "@/constants/api";
import { useSession } from "next-auth/react";
interface Props {
  action: string;
  isSubscriber: boolean;
}
export const PricingPopUp = ({ action, isSubscriber }: Props) => {
  let { data: session } = useSession({ required: true });
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  const [wasFetched, setWasFetched] = useState<boolean>(false);
  const setupStripe = async () => {
    setWasFetched(true);
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string)
    );
    fetch(`${BASE_URL}/create-subscription`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    }).then(async (res) => {
      const { clientSecret } = await res.json();
      setStripeClientSecret(clientSecret);
    });
  };
  return (
    <section className="pricing-pop-up pricing-background">
      {action === "info" && (
        <Price isSubscriber={isSubscriber} setupStripe={setupStripe} />
      )}
      {action === "pay" && (
        <PaymentInput
          stripePromise={stripePromise}
          stripeClientSecret={stripeClientSecret}
          setupStripe={setupStripe}
          wasFetched={wasFetched}
        />
      )}
      {action === "success" && <SuccessPayment />}
    </section>
  );
};

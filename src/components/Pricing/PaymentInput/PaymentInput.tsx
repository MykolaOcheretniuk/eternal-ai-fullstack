import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./PaymentInput.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BASE_URL } from "@/constants/api";
import { useSession } from "next-auth/react";
import { PaymentForm } from "../paymentForm/PaymentForm";
import Spinner from "../../../../public/ButtonSpinner.svg";
export const PaymentInput = () => {
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  let { data: session } = useSession({ required: true });
  const router = useRouter();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  useEffect(() => {
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
  }, []);

  return (
    <>
      <Link
        className="auth-pop-up-logo"
        href="/"
        onClick={() => {
          setIsPopUpOpen(false);
        }}
      >
        <Image src={EternalLogo} alt="logo" />
      </Link>
      <button
        className="close-button"
        onClick={() => {
          router.back();
        }}
      >
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="payment-input">
        <div className="container">
          <div className="payment-input-inner">
            {stripeClientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: stripeClientSecret,
                  appearance: { theme: "stripe" },
                  fonts: [
                    {
                      family: "Avenir",
                      src: "url(../../../../public/fonts/Avenir-Book.woff2) format(woff2)",
                      weight: "400",
                    },
                  ],
                }}
              >
                <div className="payment-input-main gradient-border">
                  <span className="pro payment-input-pro gradient-border">
                    pro
                  </span>
                  <p className="payment-input-price avenir-bold">$10 / month</p>
                  <PaymentForm clientSecret={stripeClientSecret} />
                </div>
              </Elements>
            ) : (
              <div className="form-loading">
                <Image className="button-spinner" src={Spinner} alt="loading" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

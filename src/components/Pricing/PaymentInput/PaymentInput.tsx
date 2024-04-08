import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./PaymentInput.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "../paymentForm/PaymentForm";
import Spinner from "../../../../public/ButtonSpinner.svg";
import { PricingHead } from "../PricingHead";
import { useEffect } from "react";
interface Props {
  stripePromise: Promise<Stripe | null> | null;
  stripeClientSecret: string;
  setupStripe: () => void;
  wasFetched: boolean;
}
export const PaymentInput = ({
  stripeClientSecret,
  stripePromise,
  wasFetched,
  setupStripe,
}: Props) => {
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  const router = useRouter();
  useEffect(() => {
    if (!wasFetched) {
      console.log("setup stripe");
      setupStripe();
    }
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
            <PricingHead />
            <div className="payment-input-main gradient-border">
              <span className="pro payment-input-pro gradient-border">pro</span>
              <p className="payment-input-price avenir-bold">$10 / month</p>
              {stripeClientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: stripeClientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        fontFamily: "Avenir",
                      },
                    },
                    fonts: [
                      {
                        family: "Avenir",
                        src: "url(public/fonts/Avenir-Book.woff2)",
                        weight: "400",
                      },
                    ],
                  }}
                >
                  <PaymentForm
                    clientSecret={stripeClientSecret}
                    isEdit={false}
                  />
                </Elements>
              ) : (
                <div className="form-loading payment-input-submit">
                  <Image
                    className="button-spinner"
                    src={Spinner}
                    alt="loading"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./PaymentFormStyle.css";
import Image from "next/image";
import Spinner from "../../../../public/ButtonSpinner.svg";
import { useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
interface Props {
  clientSecret: string;
}
export const PaymentForm = ({ clientSecret }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [dataSending, setDataSending] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  let { data: session, update } = useSession();
  const inputStyle = {
    iconColor: "#f9f9f9",
    color: "white",
    fontWeight: "400",
    fontFamily: "Avenir,Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "18px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      color: "white",
    },
    "::placeholder": {
      color: "white",
    },
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setDataSending(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      }
    );
    setDataSending(false);
    if (!error) {
      router.push(`${window.location.origin}/pricing?pricing=success`);
    }
  };
  return (
    <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>
      <div className="payment-form-inner">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: inputStyle,
            },
          }}
          onChange={(e) => {
            const { complete } = e;
            if (complete) {
              setIsFormComplete(true);
            } else {
              setIsFormComplete(false);
            }
          }}
        />
      </div>
      <button
        className="payment-input-submit gradient-button"
        disabled={dataSending || !stripe || !elements || !isFormComplete}
        type="submit"
      >
        {dataSending ? (
          <Image className="button-spinner" src={Spinner} alt="loading" />
        ) : (
          <> submit payment</>
        )}
      </button>
    </form>
  );
};

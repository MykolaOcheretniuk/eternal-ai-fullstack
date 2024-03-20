import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./PaymentFormStyle.css";
import Image from "next/image";
import Spinner from "../../../../public/ButtonSpinner.svg";
import { useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
interface Props {
  clientSecret: string;
}
export const PaymentForm = ({ clientSecret }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [dataSending, setDataSending] = useState(false);
  const inputStyle = {
    iconColor: "#c4f0ff",
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

    const element = elements.getElement(CardElement);
    console.log(element);
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    setDataSending(false);
    router.push(`${window.location.origin}/pricing?pricing=success`);
  };
  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="payment-form-inner">
        <CardElement
          options={{
            hidePostalCode: true,

            style: {
              base: inputStyle,
            },
          }}
        />
      </div>
      <button
        className="payment-input-submit gradient-button"
        disabled={dataSending || !stripe || !elements}
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

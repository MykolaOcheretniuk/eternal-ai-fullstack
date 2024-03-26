import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./PaymentFormStyle.css";
import Image from "next/image";
import Spinner from "../../../../public/ButtonSpinner.svg";
import { Dispatch, SetStateAction, useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

interface Props {
  isEdit: boolean;
  clientSecret: string;
  setIsPaymentInputActive?: Dispatch<SetStateAction<boolean>>;
}
export const PaymentForm = ({
  clientSecret,
  isEdit,
  setIsPaymentInputActive,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [dataSending, setDataSending] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

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

    if (isEdit) {
      setDataSending(true);
      const { error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      });

      if (error) {
        toast(error.message, {
          style: {
            border: "none",
            fontSize: "18px",
            color: "white",
            background: "#F82D98",
            fontFamily: "Avenir",
            textAlign: "center",
          },
        });
      } else {
        toast("Payment method changed.", {
          style: {
            border: "none",
            fontSize: "18px",
            color: "black",
            background: "#B5E42E",
            fontFamily: "Avenir",
          },
        });
        if (setIsPaymentInputActive) {
          setIsPaymentInputActive(false);
        }
      }
      setDataSending(false);
    } else {
      setDataSending(true);
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      });
      setDataSending(false);
      if (error) {
        toast(error.message, {
          style: {
            border: "none",
            fontSize: "18px",
            color: "white",
            background: "#F82D98",
            fontFamily: "Avenir",
            textAlign: "center",
          },
        });
      }
      if (!error) {
        router.push(`${window.location.origin}/pricing?pricing=success`);
      }
    }
  };
  return (
    <>
      <div className="alert-container">
        <Toaster position="top-center" />
      </div>
      <form
        className={`stripe-payment-form ${
          isEdit ? "edit-form" : "payment-form"
        }`}
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <div className={`payment-form-inner ${isEdit ? "edit" : ""}`}>
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
        {isEdit ? (
          <>
            <button
              className="save-payment gradient-button"
              disabled={dataSending || !stripe || !elements || !isFormComplete}
              type="submit"
            >
              {dataSending ? (
                <Image className="button-spinner" src={Spinner} alt="loading" />
              ) : (
                <> Save</>
              )}
            </button>
          </>
        ) : (
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
        )}
      </form>
    </>
  );
};

import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./PaymentInput.css";
import { PricingHead } from "../PricingHead";
import { PaymentCardInput } from "@/components/PaymentCardInput/PaymentCardInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CREDIT_CARD_DATE_REGEX, CREDIT_CARD_REGEX } from "@/constants/regex";
import Spinner from "../../../../public/ButtonSpinner.svg";
import { isDateCorrect } from "@/utils/isCardDateCorrect";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import getEnv from "@/utils/getEnv";
export const PaymentInput = () => {
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  const router = useRouter();
  const [card, setCard] = useState("");
  const [cvc, setCvc] = useState("");
  const [date, setDate] = useState("");
  const [dataSending, setDataSending] = useState(false);
  const stripePromise = loadStripe(getEnv("NEXT_PUBLIC_STRIPE_API_KEY"));
  const inputCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard(e.target.value.replace(/\s/g, ""));
  };
  const inputCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };
  const inputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const subscribeUser = async () => {
    setDataSending(true);
    setDataSending(false);
    router.push("/pricing?pricing=success");
  };
  const options = {
    clientSecret: "",
    appearance: {},
  };
  useEnterKeyHandler(() => {
    if (
      CREDIT_CARD_REGEX.test(card) ||
      cvc.length === 3 ||
      CREDIT_CARD_DATE_REGEX.test(date) ||
      isDateCorrect(date) ||
      dataSending
    ) {
      subscribeUser();
    }
  });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
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
            <Elements stripe={stripePromise} options={options}>
              <div className="payment-input-main gradient-border">
                <PaymentElement />
                <span className="pro payment-input-pro gradient-border">
                  pro
                </span>
                <p className="payment-input-price avenir-bold">$10 / month</p>
                <PaymentCardInput
                  setCard={inputCard}
                  setCvc={inputCvc}
                  setDate={inputDate}
                  actualDateValidator={isDateCorrect}
                />
                <button
                  className="payment-input-submit gradient-button"
                  disabled={
                    !CREDIT_CARD_REGEX.test(card) ||
                    cvc.length !== 3 ||
                    !CREDIT_CARD_DATE_REGEX.test(date) ||
                    !isDateCorrect(date) ||
                    dataSending
                  }
                  onClick={async () => {
                    await subscribeUser();
                  }}
                >
                  {dataSending ? (
                    <Image
                      className="button-spinner"
                      src={Spinner}
                      alt="loading"
                    />
                  ) : (
                    <> submit payment</>
                  )}
                </button>
              </div>
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

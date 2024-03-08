import "./PaymentCardInput.css";
import Image from "next/image";
import CardSvg from "../../../public/CreditCards.svg";
import InputMask from "react-input-mask";
import { CREDIT_CARD_DATE_REGEX, CREDIT_CARD_REGEX } from "@/constants/regex";
import { useState } from "react";

interface Props {
  setCard: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCvc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actualDateValidator: (value: string) => boolean;
}
export const PaymentCardInput = ({
  setCard,
  setCvc,
  setDate,
  actualDateValidator,
}: Props) => {
  const [isCardValid, setIsCardValid] = useState(false);
  const [isCvcValid, setIsCvcValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const onBlur = (value: string, fieldName: string) => {
    if (fieldName === "card") {
      const card = value.replace(/\s/g, "");
      const isCardValid = CREDIT_CARD_REGEX.test(card);
      setIsCardValid(isCardValid);
    }
    if (fieldName === "cvc") {
      setIsCvcValid(value.replace(/\s/g, "").length === 3);
    }
    if (fieldName === "date") {
      const isDateActual = actualDateValidator(value);
      if (!isDateActual) {
        setIsDateValid(false);
      } else {
        setIsDateValid(CREDIT_CARD_DATE_REGEX.test(value));
      }
    }
  };
  return (
    <form
      className={`payment-card-input ${
        isCardValid && isCvcValid && isDateValid ? "" : "incorrect-input"
      }`}
    >
      <div className="payment-card-inner">
        <Image src={CardSvg} alt="card" />
        <InputMask
          name="card"
          className="payment-card-input-card"
          placeholder="Card Number"
          maskChar=" "
          mask="9999 9999 9999 9999"
          onChange={setCard}
          onBlur={(e) => {
            onBlur(e.target.value, e.target.name);
          }}
        ></InputMask>
        <InputMask
          name="date"
          className="payment-card-input-date"
          placeholder="MM / YY"
          maskChar=" "
          mask="99/99"
          pattern="^(0[1-9]|1[0-2])\/(1[9-9][0-9][0-9]|20[0-9][0-9])$"
          type="text"
          onChange={setDate}
          onBlur={(e) => {
            onBlur(e.target.value, e.target.name);
          }}
        ></InputMask>
        <InputMask
          name="cvc"
          className="payment-card-input-cvc"
          placeholder="CVC"
          maskChar=" "
          mask="999"
          type="text"
          onChange={setCvc}
          onBlur={(e) => {
            onBlur(e.target.value, e.target.name);
          }}
        ></InputMask>
      </div>
    </form>
  );
};

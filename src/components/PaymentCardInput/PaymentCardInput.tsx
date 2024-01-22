import "./PaymentCardInput.css";
import Image from "next/image";
import CardSvg from "../../../public/CreditCards.svg";
export const PaymentCardInput = () => {
  return (
    <div className="payment-card-input">
      <div className="payment-card-inner">
        <Image src={CardSvg} alt="card" />
        <input
          className="payment-card-input-card"
          placeholder="Card Number"
        ></input>
        <input
          className="payment-card-input-date"
          type="text"
          pattern="([0-9]{2}[/]?){2}"
          placeholder="MM / YY"
        ></input>
        <input className="payment-card-input-cvc" placeholder="CVC"></input>
      </div>
    </div>
  );
};

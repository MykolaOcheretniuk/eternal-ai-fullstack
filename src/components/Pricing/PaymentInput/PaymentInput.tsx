import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./PaymentInput.css";
import { PricingHead } from "../PricingHead";
import { PaymentCardInput } from "@/components/PaymentCardInput/PaymentCardInput";
export const PaymentInput = () => {
  return (
    <>
      <Image className="auth-pop-up-logo" src={EternalLogo} alt="logo" />
      <button className="close-button">
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="payment-input">
        <div className="container">
          <div className="payment-input-inner">
            <PricingHead />
            <div className="payment-input-main gradient-border">
              <span className="pro payment-input-pro gradient-border">pro</span>
              <p className="payment-input-price avenir-bold">$10 / month</p>
              <PaymentCardInput />
              <button className="payment-input-submit gradient-button">
                submit payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

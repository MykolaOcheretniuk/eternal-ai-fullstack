import "./SuccessPayment.css";
import check from "../../../../public/check.svg";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
export const SuccessPayment = () => {
  return (
    <>
      <Image className="auth-pop-up-logo" src={EternalLogo} alt="logo" />
      <button className="close-button">
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="success-payment">
        <div className="container">
          <div className="success-payment-inner gradient-border">
            <span className="success-payment-check gradient-button">
              <Image
                className="success-payment-check-img"
                src={check}
                alt="check"
              />
            </span>
            <div className="success-payment-text-group">
              <h1 className="success-payment-title avenir-bold">
                You have successfully subscribed!
              </h1>
              <p className="success-payment-text base-text">
                A receipt was sent to your email
              </p>
            </div>
            <button className="success-payment-start gradient-button">
              start chatting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

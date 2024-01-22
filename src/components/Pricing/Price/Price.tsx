import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import { PricingHead } from "../PricingHead";
import "./Price.css";
export const Price = () => {
  return (
    <>
      <Image className="auth-pop-up-logo" src={EternalLogo} alt="logo" />
      <button className="close-button">
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="container">
        <div className="price-inner">
          <PricingHead />
          <div className="price-main">
            <div className="price-share">
              <div className="price-share-inner">
                <span className="price-free">Free</span>
                <div className="price-text">
                  <p className="price-share-title avenir-bold">
                    Share with a friend
                  </p>
                  <p className="price-share-text base-text">
                    Get <span className="purple-text">3 free</span> questions
                    when you share on social media
                  </p>{" "}
                </div>
                <button className="price-share-button">share</button>
              </div>
            </div>
            <div className="price-amount gradient-border">
              <div className="price-amount-pro">
                <span className="pro gradient-border price-amount-pro">
                  Pro
                </span>
              </div>
              <p className="price-amount-text avenir-bold">$10 / month</p>
              <ul className="price-amount-features-list">
                <li className="price-amount-feature">
                  <p className="price-amount-feature-text">
                    Unlimited questions
                  </p>
                </li>
                <li className="price-amount-feature">
                  <p className="price-amount-feature-text">SMS texting</p>
                </li>
                <li className="price-amount-feature">
                  <p className="price-amount-feature-text">
                    Access to all characters
                  </p>
                </li>
              </ul>
              <button className="price-amount-subscribe gradient-button">
                subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
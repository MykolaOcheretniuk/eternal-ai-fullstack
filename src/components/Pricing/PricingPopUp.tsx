"use client";
import { Price } from "./Price/Price";
import "./PricingPopUp.css";
import { SuccessPayment } from "./SuccessPayment/SuccessPayment";
interface Props {
  action: string;
  isSubscriber: boolean;
}
export const PricingPopUp = ({ action, isSubscriber }: Props) => {
  return (
    <section className="pricing-pop-up pricing-background">
      {action === "info" && <Price isSubscriber={isSubscriber} />}
      {action === "success" && <SuccessPayment />}
    </section>
  );
};

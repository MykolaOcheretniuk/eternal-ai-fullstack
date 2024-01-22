import { PaymentInput } from "./PaymentInput/PaymentInput";
import { Price } from "./Price/Price";
import "./PricingPopUp.css";
import { SuccessPayment } from "./SuccessPayment/SuccessPayment";
interface Props {
  action: string;
}
export const PricingPopUp = ({ action }: Props) => {
  return (
    <section className="pricing-pop-up pricing-background">
      {action === "init" && <Price />}
      {action === "pay" && <PaymentInput />}
      {action === "success" && <SuccessPayment />}
    </section>
  );
};

"use client";
import { PaymentInput } from "@/components/Pricing/PaymentInput/PaymentInput";
import Loading from "@/components/loader/Loader";
import { useSession } from "next-auth/react";
export default function Pay() {
  let { status } = useSession({ required: true });

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      <section className="pricing-pop-up pricing-background">
        <PaymentInput />
      </section>
    </div>
  );
}

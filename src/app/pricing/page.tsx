"use client";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";
import { PricingPopUp } from "@/components/Pricing/PricingPopUp";

export default function AccountDetailsPage() {
  const searchParams = useSearchParams();
  const { status } = useSession({
    required: true,
  });
  const pricingAction = searchParams.get("pricing");
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      {pricingAction && <PricingPopUp action={pricingAction} />}
    </div>
  );
}

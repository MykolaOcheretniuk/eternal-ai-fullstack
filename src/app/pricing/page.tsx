"use client";
import { useSearchParams } from "next/navigation";
import { PricingPopUp } from "@/components/Pricing/PricingPopUp";

export default function AccountDetailsPage() {
  const searchParams = useSearchParams();
  const pricingAction = searchParams.get("pricing");
  return (
    <div className="wrapper">
      {pricingAction && <PricingPopUp action={pricingAction} />}
    </div>
  );
}

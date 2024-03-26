"use client";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";
import { PricingPopUp } from "@/components/Pricing/PricingPopUp";
import { useAppContext } from "@/context";
import { useEffect } from "react";
import { useShouldUserBeUpdated } from "@/store/useShouldBeUpdated";

export default function AccountDetailsPage() {
  const searchParams = useSearchParams();
  const { status } = useSession({
    required: true,
  });
  const pricingAction = searchParams.get("pricing");
  const context = useAppContext();
  const { needToBeUpdated, setIsNeedToBeUpdated } = useShouldUserBeUpdated();
  useEffect(() => {
    if (needToBeUpdated) {
      context?.refetchUser();
      setIsNeedToBeUpdated(false);
    }
  }, [needToBeUpdated, setIsNeedToBeUpdated, context]);
  if (status === "loading" || needToBeUpdated) {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      {pricingAction && <PricingPopUp action={pricingAction} />}
    </div>
  );
}

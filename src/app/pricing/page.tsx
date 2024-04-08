"use client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { PricingPopUp } from "@/components/Pricing/PricingPopUp";
import { useAppContext } from "@/context";
import { useEffect } from "react";
import { useShouldUserBeUpdated } from "@/store/useShouldBeUpdated";
import Loading from "@/components/loader/Loader";

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
  if (status === "loading" || needToBeUpdated || !context?.user) {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      {pricingAction && (
        <PricingPopUp
          action={pricingAction}
          isSubscriber={(context?.user?.subscriptionId as number) <= 0}
        />
      )}
    </div>
  );
}

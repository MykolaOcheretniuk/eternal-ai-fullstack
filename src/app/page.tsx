"use client";
import { AuthPopUp } from "@/components/Auth/AuthPopUp";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ImportantQuestions } from "@/components/ImportantQuestions/ImportantQuestions";
import { IndividualsList } from "@/components/IndividualsList/IndividuaList";
import { PricingPopUp } from "@/components/Pricing/PricingPopUp";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const searchParams = useSearchParams();
  const authAction = searchParams.get("action");
  const pricingAction = searchParams.get("pricing");
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="wrapper">
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      {authAction && <AuthPopUp action={authAction} />}
      {pricingAction && <PricingPopUp action={pricingAction} />}
      <ImportantQuestions isNavOpen={isNavOpen} />
      <IndividualsList isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
}

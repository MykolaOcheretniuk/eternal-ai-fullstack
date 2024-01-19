"use client";
import { AuthPopUp } from "@/components/Auth/AuthPopUp";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ImportantQuestions } from "@/components/ImportantQuestions/ImportantQuestions";
import { IndividualsList } from "@/components/IndividualsList/IndividuaList";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  return (
    <div className="wrapper">
      <Header />
      {action && <AuthPopUp action={action} />}
      <ImportantQuestions />
      <IndividualsList />
      <Footer />
    </div>
  );
}

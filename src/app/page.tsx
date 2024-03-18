"use client";
import { AuthPopUp } from "@/components/Auth/AuthPopUp";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { ImportantQuestions } from "@/components/ImportantQuestions/ImportantQuestions";
import { IndividualsList } from "@/components/IndividualsList/IndividuaList";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
export default function Home() {
  const searchParams = useSearchParams();
  const authAction = searchParams.get("action");
  const { status } = useSession({
    required: false,
  });
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      <Header />
      {authAction && <AuthPopUp action={authAction} />}
      <ImportantQuestions />
      <IndividualsList />
      <Footer />
    </div>
  );
}

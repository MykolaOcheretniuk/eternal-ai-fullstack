"use client";
import { AccountDetails } from "@/components/AccountDetails/AccountDetails";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function AccountDetailsPage() {
  const { status } = useSession({
    required: true,
  });
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      <Header />
      <AccountDetails />
      <Footer />
    </div>
  );
}

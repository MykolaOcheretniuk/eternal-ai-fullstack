"use client";
import { AccountDetails } from "@/components/AccountDetails/AccountDetails";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useState } from "react";

export default function AccountDetailsPage() {
  const { status } = useSession({
    required: true,
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
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

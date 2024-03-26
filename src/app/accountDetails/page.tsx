"use client";
import { AccountDetails } from "@/components/AccountDetails/AccountDetails";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useAppContext } from "@/context";

export default function AccountDetailsPage() {
  const { status } = useSession({ required: true });
  const context = useAppContext();

  return (
    <>
      {status === "loading" || !context?.user ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <Header />
          <AccountDetails user={context.user} setUser={context.updateUser} />
          <Footer />
        </div>
      )}
    </>
  );
}

"use client";
import { AccountDetails } from "@/components/AccountDetails/AccountDetails";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { useShouldUserBeUpdated } from "@/store/useShouldBeUpdated";
import { useEffect } from "react";
import Loading from "@/components/loader/Loader";

export default function AccountDetailsPage() {
  const { status } = useSession({ required: true });
  const context = useAppContext();
  const { needToBeUpdated, setIsNeedToBeUpdated } = useShouldUserBeUpdated();
  useEffect(() => {
    if (needToBeUpdated) {
      context?.refetchUser();
      setIsNeedToBeUpdated(false);
    }
  }, [needToBeUpdated, setIsNeedToBeUpdated, context]);
  return (
    <>
      {status === "loading" || !context?.user || needToBeUpdated ? (
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

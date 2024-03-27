"use client";
import { Chat } from "@/components/Chat/Chat";
import Loading from "@/components/loader/Loader";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  const { status } = useSession({
    required: false,
  });
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      <Chat />
    </div>
  );
}

"use client";
import { Chat } from "@/components/Chat/Chat";
import { useSession } from "next-auth/react";
import Loading from "../loading";

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

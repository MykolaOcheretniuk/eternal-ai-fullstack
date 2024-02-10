"use client";
import { IndividualPortrait } from "./IndividualPortrait/IndividualPortrait";
import "./Chat.css";
import { MessagesList } from "./MessagesList/MessagesList";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";

export const Chat = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const individual = searchParams.get("individual");
  const portrait = searchParams.get("portrait");
  const career = searchParams.get("career");
  useLayoutEffect(() => {
    const attachIndividualToUser = async () => {
      const res = await fetch("/api/user/setIndividual", {
        method: "POST",
        body: JSON.stringify({ individualName: individual as string }),
      });
      if (!res.ok) {
        router.push("/");
      }
    };
    attachIndividualToUser();
  }, [individual, router]);
  return (
    <section className="chat">
      <div className="fluid-container chat-container">
        <div className="chat-inner">
          <div className="chat-individual">
            <IndividualPortrait portrait={portrait as string} />
            <div className="chat-individual-info">
              <p className="chat-individual-info-name">{individual}</p>
              <p className="chat-individual-info-career">{career}</p>
            </div>
          </div>
          <div className="messages-list">
            <MessagesList />
          </div>
        </div>
      </div>
    </section>
  );
};

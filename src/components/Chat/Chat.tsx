"use client";
import { IndividualPortrait } from "./IndividualPortrait/IndividualPortrait";
import "./Chat.css";
import { MessagesList } from "./MessagesList/MessagesList";
import { useSearchParams } from "next/navigation";
import { Header } from "../Header/Header";
import { EternalLogoChat } from "../eternalLogo/EternalLogoChat";
import { Suspense, useState } from "react";

export const Chat = () => {
  const searchParams = useSearchParams();
  const individual = searchParams.get("individual");
  const portrait = searchParams.get("portrait");
  const career = searchParams.get("career");
  return (
    <>
      <Header />
      <section className="chat">
        <div className="fluid-container chat-container">
          <div className="chat-inner">
            <div className="chat-individual">
              <div className="chat-eternal-logo">
                <EternalLogoChat />
              </div>
              <IndividualPortrait
                portrait={portrait as string}
                individual={individual as string}
                career={career as string}
              />
            </div>{" "}
            <Suspense fallback={<p className="loader-text">Loading feed...</p>}>
              <div className="messages-list">
                <MessagesList
                  individual={individual as string}
                  individualPortrait={portrait as string}
                />
              </div>
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

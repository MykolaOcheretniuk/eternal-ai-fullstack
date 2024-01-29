"use client";
import { IndividualPortrait } from "./IndividualPortrait/IndividualPortrait";
import "./Chat.css";
import { MessagesList } from "./MessagesList/MessagesList";

export const Chat = () => {
  return (
    <section className="chat">
      <div className="fluid-container chat-container">
        <div className="chat-inner">
          <div className="chat-individual">
            <IndividualPortrait />
          </div>
          <div className="messages-list">
            <MessagesList />
          </div>
        </div>
      </div>
    </section>
  );
};

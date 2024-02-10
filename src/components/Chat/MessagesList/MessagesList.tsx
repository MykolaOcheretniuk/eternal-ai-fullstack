"use client";
import { useLayoutEffect, useState } from "react";
import { ActiveMessage } from "../ActiveMessage/ActiveMessage";
import { IndividualMessage } from "../IndividualMessage/IndividualMessage";
import { UserMessage } from "../UserMessage/UserMessage";
import "./MessagesList.css";
import { ChatLog } from "@/models/message";
const limit = 10;
export const MessagesList = () => {
  const [messages, setMessages] = useState<ChatLog[]>([]);
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState("");
  const [activeAnswer, setAnswer] = useState<null | string>(null);
  const getAnswer = async () => {
    if (activeAnswer) {
      messages[messages.length - 1].answer = activeAnswer;
    }
    setMessages((prev) => [...prev, { question, answer: null } as ChatLog]);
    const res = await fetch("/api/user/getAnswer", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    const { answer } = await res.json();
    setAnswer(answer);
    setQuestion("");
  };

  useLayoutEffect(() => {
    const getChatLog = async () => {
      const res = await fetch(`/api/user/chatLog?page=${page}&limit=${limit}`, {
        method: "GET",
      });
      const chatLog = (await res.json()) as ChatLog[];
      setMessages(chatLog);
    };
    getChatLog();
  }, [page]);
  return (
    <div className="messages-list">
      <div className="messages-list-messages">
        {messages.map((message, i) => {
          const {
            question,
            answer: individualMessage,
            individualIcon,
          } = message;
          return (
            <div className="messages-container" key={i}>
              <UserMessage message={question} />
              {individualMessage && (
                <IndividualMessage
                  message={individualMessage}
                  individualPortraitPath={individualIcon}
                />
              )}
            </div>
          );
        })}
      </div>
      {activeAnswer && <ActiveMessage message={activeAnswer} />}
      <div className="messages-list-send-message gradient-border">
        <input
          className="messages-list-send-message-input"
          placeholder="Enter your message..."
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>
        <button
          className="messages-list-send-message-button gradient-button"
          disabled={question.length === 0}
          onClick={() => {
            getAnswer();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

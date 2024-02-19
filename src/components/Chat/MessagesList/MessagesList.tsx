"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActiveMessage } from "../ActiveMessage/ActiveMessage";
import { IndividualMessage } from "../IndividualMessage/IndividualMessage";
import { UserMessage } from "../UserMessage/UserMessage";
import "./MessagesList.css";
import Spinner from "../../../../public/ButtonSpinner.svg";
import Image from "next/image";
import { ChatLog } from "@/models/message";
import { useInView } from "react-intersection-observer";
const limit = 3;
interface Props {
  individual: string;
  individualPortrait: string;
}
export const MessagesList = ({ individual, individualPortrait }: Props) => {
  const [messages, setMessages] = useState<ChatLog[]>([]);
  let [page, setPage] = useState(1);
  const [question, setQuestion] = useState("");
  const [activeAnswer, setAnswer] = useState<null | string>(null);
  const [isMoreMessages, setIsMoreMessages] = useState(true);
  const [isDataSending, setDataSending] = useState(false);
  const { ref, inView } = useInView();
  const getAnswer = async () => {
    setDataSending(true);
    if (activeAnswer) {
      messages[0].answer = activeAnswer;
    }
    const updatedChatLog = [{ question, answer: null } as ChatLog, ...messages];
    setMessages(updatedChatLog);
    const res = await fetch("/api/user/getAnswer", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    const { answer } = await res.json();
    setAnswer(answer);
    setQuestion("");
    setPage(page + 1);
    setDataSending(false);
  };
  const fetchMessages = async () => {
    const res = await fetch(
      `/api/user/chatLog?page=${page}&limit=${limit}&individual=${individual}`,
      {
        method: "GET",
      }
    );
    const chatLog = (await res.json()) as ChatLog[];
    return chatLog;
  };
  useLayoutEffect(() => {
    const getChatLog = async () => {
      const chatLog = await fetchMessages();
      setMessages(chatLog);
      setPage(page + 1);
    };
    getChatLog();
    const preparedQuestion = sessionStorage.getItem("QUESTION");
    if (preparedQuestion) {
      setQuestion(preparedQuestion);
      sessionStorage.removeItem("QUESTION");
    }
  }, []);
  useEffect(() => {
    const getChatLog = async () => {
      const chatLog = await fetchMessages();
      console.log(chatLog);
      if (chatLog.length < limit) {
        setIsMoreMessages(false);
      }
      setMessages(messages.concat(chatLog));
      setPage(page + 1);
    };
    if (inView) {
      if (isMoreMessages) {
        console.log("Fetching more messages");
        getChatLog();
      }
    }
  }, [inView]);
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
            <div
              className="messages-container"
              key={i}
              ref={i === messages.length - 1 ? ref : undefined}
            >
              <UserMessage message={question} />
              {individualMessage && (
                <IndividualMessage
                  message={individualMessage}
                  individualPortraitPath={individualPortrait}
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
          value={question}
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
          {isDataSending ? (
            <Image className="button-spinner" src={Spinner} alt="loading" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

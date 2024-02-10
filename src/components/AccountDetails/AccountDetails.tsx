"use client";
import { useSession } from "next-auth/react";
import "./AccountDetails.css";
import { useLayoutEffect, useState } from "react";
import { SessionUser, Subscriber, UpdateUser } from "@/models/user";
import Spinner from "../../../public/ButtonSpinner.svg";
import {
  CREDIT_CARD_DATE_REGEX,
  CREDIT_CARD_REGEX,
  EMAIL_TEST_REGEX,
} from "@/enums/regex";
import Image from "next/image";
import { PaymentCardInput } from "../PaymentCardInput/PaymentCardInput";
import { isDateCorrect } from "@/utils/isCardDateCorrect";
import { format } from "date-fns";
export const AccountDetails = () => {
  let { data: session, update } = useSession();
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [dataSending, setDataSending] = useState(false);
  const [isPaymentInputActive, setIsPaymentInputActive] = useState(false);
  const [card, setCard] = useState("");
  const [cvc, setCvc] = useState("");
  const [date, setDate] = useState("");
  const inputCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard(e.target.value.replace(/\s/g, ""));
  };
  const inputCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };
  const inputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const getSubscriber = async () => {
    const response = await fetch("/api/user/subscriber", { method: "GET" });
    const subscriber = (await response.json()) as Subscriber;
    if (subscriber) {
      setSubscriber(subscriber);
    } else {
      setSubscriber(null);
    }
  };
  const clearInputs = () => {
    setUserName(null);
    setEmail(null);
    setPhoneNumber(null);
    setPassword(null);
  };
  const updateUser = async () => {
    setDataSending(true);
    const updateRequest: UpdateUser = {
      name: userName,
      email,
      password,
      phoneNumber,
    };
    const res = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify(updateRequest),
    });
    const updatedUser = (await res.json()) as SessionUser;
    if (session) {
      session.user = updatedUser;
      await update(session);
    }
    clearInputs();
    setDataSending(false);
  };
  const cancelSubscription = async () => {
    const res = await fetch("/api/payment/cancelSubscription", {
      method: "POST",
    });
    const { canceled } = await res.json();
    if (subscriber) {
      setSubscriber({ ...subscriber, isCancelled: canceled });
    }
  };
  useLayoutEffect(() => {
    getSubscriber();
  }, []);

  return (
    <section className="account-details">
      <div className="container">
        <div className="account-details-inner">
          <div className="account-details-info gradient-border">
            <h1 className="account-details-title avenir-bold">
              Account Details
            </h1>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Name</p>
              <input
                className="account-details-input base-input"
                placeholder={
                  session?.user.name ? session.user.name : "Justin Mac"
                }
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName ? userName : ""}
                type="text"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Email</p>
              <input
                className="account-details-input base-input"
                placeholder={
                  session?.user.email ? session.user.email : "justin@gmail.com"
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email ? email : ""}
                pattern={`${EMAIL_TEST_REGEX}`}
                type="email"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">
                Phone number
              </p>
              <input
                className="account-details-input base-input"
                placeholder={
                  session?.user.phoneNumber
                    ? session.user.phoneNumber
                    : "8329822222"
                }
                value={phoneNumber ? phoneNumber : ""}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                type="number"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Password</p>
              <input
                className="account-details-input base-input"
                placeholder="•••••••••••••••••••"
                type="password"
                value={password ? password : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <button
              className="account-details-save-button gradient-button"
              disabled={
                (!userName && !email && !phoneNumber && !password) ||
                (email ? !EMAIL_TEST_REGEX.test(email as string) : false)
              }
              onClick={async () => {
                await updateUser();
              }}
            >
              {dataSending ? (
                <Image className="button-spinner" src={Spinner} alt="loading" />
              ) : (
                <>continue</>
              )}
            </button>
          </div>
        </div>
        {subscriber && subscriber.status === "active" && (
          <div className="account-details-subscription gradient-border">
            <span className="pro gradient-border">PRO</span>
            <p className="account-details-price avenir-bold">$10 / month</p>
            <p className="account-details-next-payment base-text">
              {subscriber.isCancelled
                ? "Subscription ends on"
                : "Next payment will be processed on"}{" "}
              {format(+subscriber.nextPaymentDate * 1000, "MMMM d, yyyy")}
            </p>
            {isPaymentInputActive ? (
              <div className="account-details-payment-input">
                <PaymentCardInput
                  setCard={inputCard}
                  setCvc={inputCvc}
                  setDate={inputDate}
                  actualDateValidator={isDateCorrect}
                />
                <button
                  className="account-details-payment-change-submit gradient-button"
                  disabled={
                    !CREDIT_CARD_REGEX.test(card) ||
                    cvc.length !== 3 ||
                    !CREDIT_CARD_DATE_REGEX.test(date) ||
                    !isDateCorrect(date) ||
                    dataSending
                  }
                >
                  {dataSending ? (
                    <Image
                      className="button-spinner"
                      src={Spinner}
                      alt="loading"
                    />
                  ) : (
                    <> Save</>
                  )}
                </button>
              </div>
            ) : (
              <div className="account-details-buttons">
                <button
                  className="account-details-button account-details-update-payment"
                  onClick={() => {
                    setIsPaymentInputActive(true);
                  }}
                >
                  update payment
                </button>
                <button
                  className="account-details-button account-details-cancel-subscription"
                  onClick={async () => {
                    await cancelSubscription();
                  }}
                >
                  cancel subscription
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

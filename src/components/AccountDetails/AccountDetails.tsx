"use client";
import { useSession } from "next-auth/react";
import "./AccountDetails.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { SessionUser } from "@/models/user";
import { SelectSubscriber } from "@/db/schema/subscribers";
import { EMAIL_TEST_REGEX } from "@/enums/regex";
export const AccountDetails = () => {
  const { data: session } = useSession();
  const [subscriber, setSubscriber] = useState<SelectSubscriber | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const getSubscriber = async () => {
    const response = await fetch("/api/user/subscriber", { method: "GET" });
    const subscriber = (await response.json()) as SelectSubscriber;
    if (subscriber) {
      setSubscriber(subscriber);
    } else {
      setSubscriber(null);
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <button
              className="account-details-save-button gradient-button"
              disabled={
                (!userName && !email && !phoneNumber && !password) ||
                !EMAIL_TEST_REGEX.test(email as string)
              }
            >
              save
            </button>
          </div>
        </div>
        {subscriber && (
          <div className="account-details-subscription gradient-border">
            <span className="pro gradient-border">PRO</span>
            <p className="account-details-price avenir-bold">$10 / month</p>
            <p className="account-details-next-payment base-text">
              Next payment will be processed on April 6, 2023
            </p>
            <div className="account-details-buttons">
              <button className="account-details-update-payment">
                update payment
              </button>
              <button className="account-details-cancel-subscription">
                cancel subscription
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

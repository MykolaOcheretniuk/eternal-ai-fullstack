"use client";
import { useSession } from "next-auth/react";
import "./AccountDetails.css";
import { useLayoutEffect, useState } from "react";
import { UpdateUser, User } from "@/models/user";
import Spinner from "../../../public/ButtonSpinner.svg";
import {
  CREDIT_CARD_DATE_REGEX,
  CREDIT_CARD_REGEX,
  EMAIL_TEST_REGEX,
} from "@/constants/regex";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { BASE_URL } from "@/constants/api";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { format } from "date-fns";
import { PaymentCardInput } from "../PaymentCardInput/PaymentCardInput";
import { isDateCorrect } from "@/utils/isCardDateCorrect";
export const AccountDetails = () => {
  let { data: session, update } = useSession();
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [dataSending, setDataSending] = useState(false);
  const { setIsOpen: setIsPopUpOpen, isOpened: isPopUpOpen } = useIsPopUpOpen();
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

  const clearInputs = () => {
    setUserName(null);
    setEmail(null);
    setPhone(null);
    setPassword(null);
  };
  const updateUser = async () => {
    setDataSending(true);
    const updateRequest: UpdateUser = {
      name: userName ? userName : undefined,
      email: email ? email : undefined,
      password: password ? password : undefined,
      phone: phone ? `+${phone}` : undefined,
    };

    const res = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.token,
      },
      body: JSON.stringify(updateRequest),
    });
    const updatedUser = await res.json();
    if (updatedUser.message) {
      toast(updatedUser.message, {
        style: {
          background: "#B5E42E",
          border: "none",
          fontSize: "18px",
          color: "white",
          fontFamily: "Avenir",
          justifyContent: "center",
        },
      });
    }
    if (session) {
      let prevUser = session.user.user;
      Object.keys(updatedUser).forEach((key) => {
        if (
          updateRequest.hasOwnProperty(key) &&
          updatedUser[key] !== undefined
        ) {
          (prevUser as any)[key] = updatedUser[key] as User[keyof User];
        }
      });
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
  };
  useLayoutEffect(() => {
    setIsPopUpOpen(false);
  }, [setIsPopUpOpen]);
  return (
    <section className="account-details">
      <div className="container">
        <Toaster position="top-center" />
        <span className="account-details-top-decor"></span>
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
                  session?.user.user.name
                    ? session.user.user.name
                    : "Justin Mac"
                }
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName ? userName : ""}
                type="text"
                tabIndex={isPopUpOpen ? -1 : 0}
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Email</p>
              <input
                className="account-details-input base-input"
                placeholder={
                  session?.user.user.email
                    ? session.user.user.email
                    : "justin@gmail.com"
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email ? email : ""}
                pattern={`${EMAIL_TEST_REGEX}`}
                type="email"
                tabIndex={isPopUpOpen ? -1 : 0}
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">
                Phone number
              </p>
              <input
                className="account-details-input base-input"
                placeholder={
                  session?.user.user.phone
                    ? session.user.user.phone
                    : "8329822222"
                }
                value={phone ? phone : ""}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="number"
                tabIndex={isPopUpOpen ? -1 : 0}
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
                tabIndex={isPopUpOpen ? -1 : 0}
              ></input>
            </div>
            <button
              className="account-details-save-button gradient-button"
              disabled={
                (!userName && !email && !phone && !password) ||
                (email ? !EMAIL_TEST_REGEX.test(email as string) : false)
              }
              onClick={async () => {
                await updateUser();
                toast("User info updated.", {
                  style: {
                    background: "#B5E42E",
                    border: "none",
                    fontSize: "18px",
                    fontFamily: "Avenir",
                    justifyContent: "center",
                  },
                });
              }}
              tabIndex={isPopUpOpen ? -1 : 0}
            >
              {dataSending ? (
                <Image className="button-spinner" src={Spinner} alt="loading" />
              ) : (
                <>Save</>
              )}
            </button>
          </div>
        </div>
        {session && session.user.user.subscriptionId !== 0 && (
          <>
            <span className="account-details-bottom-decor"></span>
            <div className="account-details-subscription gradient-border">
              <span className="pro gradient-border">PRO</span>
              <p className="account-details-price avenir-bold">$10 / month</p>
              <p className="account-details-next-payment base-text">
                Next payment will be processed on
                {format(
                  new Date(session.user.user.subscriptionExpireDate),
                  "MMMM d, yyyy"
                )}
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
                    onClick={() => {
                      toast("Payment method updated.", {
                        style: {
                          background: "#B5E42E",
                          border: "none",
                          fontSize: "18px",
                          color: "white",
                          fontFamily: "Avenir",
                        },
                      });
                    }}
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
                      toast("Subscription canceled.", {
                        style: {
                          border: "none",
                          fontSize: "18px",
                          color: "white",
                          fontFamily: "Avenir",
                        },
                      });
                      await cancelSubscription();
                    }}
                  >
                    cancel subscription
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

"use client";
import { useSession } from "next-auth/react";
import "./AccountDetails.css";
import { useLayoutEffect, useState } from "react";
import { UpdateUser, User } from "@/models/user";
import Spinner from "../../../public/ButtonSpinner.svg";
import { EMAIL_TEST_REGEX } from "@/constants/regex";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { BASE_URL } from "@/constants/api";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
export const AccountDetails = () => {
  let { data: session, update } = useSession();
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [dataSending, setDataSending] = useState(false);
  const { setIsOpen: setIsPopUpOpen, isOpened: isPopUpOpen } = useIsPopUpOpen();
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
      </div>
    </section>
  );
};

import { useRouter } from "next/navigation";
import EternalLogo from "../../../../../public/EternalLogo.svg";
import XMark from "../../../../../public/xMark.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./ResetEmailInputStyle.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { BASE_URL, HEADERS } from "@/constants/api";
import Spinner from "../../../../../public/ButtonSpinner.svg";
export const ResetEmailInput = () => {
  const router = useRouter();
  const activeAreaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  const [isDataSending, setIsDataSending] = useState(false);
  const sendOtp = async () => {
    setIsDataSending(true);
    const res = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ email: email }),
    });
    const { message } = await res.json();
    if (!res.ok) {
      return router.push(`/?action=signUp&errorMessage=${message}`);
    }
    setIsDataSending(false);
    router.push("/?action=password-reset-code-input");
  };
  useHandleOutsideClick(activeAreaRef, () => {
    setIsPopUpOpen(false);
    router.push("/");
  });
  useEnterKeyHandler(async () => {
    if (email.length) {
      sessionStorage.setItem("RESET_PASSWORD_EMAIL", email);
      await sendOtp();
    }
  });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [router]);
  return (
    <>
      <Link className="auth-pop-up-logo" href="/">
        <Image src={EternalLogo} alt="logo" />
      </Link>
      <div>
        <button
          className="close-button"
          onClick={() => {
            setIsPopUpOpen(false);
            router.push("/");
          }}
        >
          <Image className="close-button-ig" src={XMark} alt="x mark" />
        </button>
        <div className="container">
          <div
            className="reset-email-input gradient-border"
            ref={activeAreaRef}
          >
            <div>
              <h1 className="reset-email-input-title avenir-bold">
                Enter Email
              </h1>
              <p className="base-text reset-email-input-text">
                We will send a confirmation code to your email.
              </p>
            </div>
            <div className="reset-email-input-container">
              <label className="reset-email-input-label avenir-bold">
                Email
              </label>
              <input
                className="reset-email-input-email base-input"
                placeholder="justin@gmail.com"
                type="email"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
              ></input>
            </div>
            <button
              className="reset-email-input-submit gradient-button"
              disabled={email.length === 0}
              onClick={async () => {
                sessionStorage.setItem("RESET_PASSWORD_EMAIL", email);
                await sendOtp();
              }}
            >
              {isDataSending ? (
                <Image className="button-spinner" src={Spinner} alt="loading" />
              ) : (
                <>ENTER</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

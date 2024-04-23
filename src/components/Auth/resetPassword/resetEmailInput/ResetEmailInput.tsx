import { useRouter } from "next/navigation";
import EternalLogo from "../../../../../public/EternalLogo.svg";
import XMark from "../../../../../public/xMark.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./ResetEmailInputStyle.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import Link from "next/link";
export const ResetEmailInput = () => {
  const router = useRouter();
  const activeAreaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  useHandleOutsideClick(activeAreaRef, () => {
    router.push("/");
  });
  useEnterKeyHandler(() => {
    if (email.length) {
      sessionStorage.setItem("RESET_PASSWORD_EMAIL", email);
      router.push("/?action=password-reset-code-input");
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
        <button className="close-button" onClick={() => router.push("/")}>
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
              onClick={() => {
                sessionStorage.setItem("RESET_PASSWORD_EMAIL", email);
                router.push("/?action=password-reset-code-input");
              }}
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

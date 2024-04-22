import { useRouter } from "next/navigation";
import EternalLogo from "../../../../../public/EternalLogo.svg";
import XMark from "../../../../../public/xMark.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./ResetPasswordInputStyle.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
export const ResetPasswordInput = () => {
  const router = useRouter();
  const activeAreaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  useHandleOutsideClick(activeAreaRef, () => {
    router.push("/");
  });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [router]);
  return (
    <>
      <Image
        className="auth-pop-up-logo"
        src={EternalLogo}
        alt="logo"
        onClick={() => router.push("/")}
      />
      <div>
        <button className="close-button" onClick={() => router.push("/")}>
          <Image className="close-button-ig" src={XMark} alt="x mark" />
        </button>
        <div className="container">
          <div
            className="reset-password-input gradient-border"
            ref={activeAreaRef}
          >
            <div>
              <h1 className="reset-password-input-title avenir-bold">
                Enter New Password
              </h1>
              <p className="base-text reset-password-input-text">
                Your password will be changed after submitting this form.
              </p>
            </div>
            <div className="reset-password-input-container">
              <label className="reset-password-input-label avenir-bold">
                Password
              </label>
              <input
                className="reset-password-input-password base-input"
                placeholder="•••••••••••••••••••"
                type="password"
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
              ></input>
            </div>
            <button
              className="reset-password-input-submit gradient-button"
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

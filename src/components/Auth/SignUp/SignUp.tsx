"use client";
import "./SignUp.css";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { EMAIL_TEST_REGEX } from "@/enums/regex";
export const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signUpAreaRef = useRef(null);
  useHandleOutsideClick(signUpAreaRef, () => {
    router.push("/");
  });
  const saveRegisterData = () => {
    sessionStorage.setItem(
      "REGISTER_DATA",
      JSON.stringify({ email, password })
    );
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <>
      <Image
        className="auth-pop-up-logo"
        src={EternalLogo}
        alt="logo"
        onClick={() => {
          saveRegisterData();
          router.push("/?action=about");
        }}
      />
      <button
        className="close-button"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="container">
        <div className="sign-up-inner gradient-border" ref={signUpAreaRef}>
          <div className="sign-up-inner-text">
            <h1 className="sign-up-title avenir-bold">Get started</h1>
            <p className="base-text sign-up-text">
              To continue please create an account
            </p>
          </div>
          <div className="sign-up-form-container">
            <AuthForm
              setPassword={setPassword}
              setEmail={setEmail}
              email={email}
            />
          </div>
          <div className="sign-up-buttons">
            <AuthButtons
              actionText="sign up"
              isDisabled={
                email.length === 0 ||
                password.length === 0 ||
                !EMAIL_TEST_REGEX.test(email)
              }
              onClick={() => {
                saveRegisterData();
                router.push("/?action=about");
              }}
            />
          </div>
          <p className="sign-up-sign-in-text">
            Already have an account?{" "}
            <a
              className="purple-text"
              href="#"
              onClick={() => {
                router.push("/?action=signIn");
              }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

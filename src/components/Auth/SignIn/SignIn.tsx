"use client";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./SignIn.css";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { EMAIL_TEST_REGEX } from "@/enums/regex";
export const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signInAreaRef = useRef(null);
  useHandleOutsideClick(signInAreaRef, () => {
    router.push("/");
  });
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
        onClick={() => router.push("/")}
      />
      <button className="close-button" onClick={() => router.push("/")}>
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="container">
        <div className="sign-in-inner gradient-border" ref={signInAreaRef}>
          <div className="sign-in-inner-text">
            <h1 className="sign-in-title avenir-bold">Login</h1>
          </div>
          <div className="sign-in-auth-form">
            <AuthForm
              setPassword={setPassword}
              setEmail={setEmail}
              email={email}
            />
          </div>
          <a className="sign-in-forgot-pass base-text">Forgot password?</a>
          <div className="sign-in-auth-buttons">
            <AuthButtons
              actionText="sign in"
              isDisabled={
                email.length === 0 ||
                password.length === 0 ||
                !EMAIL_TEST_REGEX.test(email)
              }
              onClick={() => {}}
            />
          </div>
          <p className="sign-in-sign-up-text avenir-bold">
            Don{"'"}t have an account?{" "}
            <a
              className="purple-text"
              href="#"
              onClick={() => {
                router.push("/?action=signUp");
              }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

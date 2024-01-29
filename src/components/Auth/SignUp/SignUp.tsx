"use client";
import "./SignUp.css";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
export const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signUpAreaRef = useRef(null);
  useHandleOutsideClick(signUpAreaRef, () => {
    router.push("/");
  });
  return (
    <>
      <Image
        className="auth-pop-up-logo"
        src={EternalLogo}
        alt="logo"
        onClick={() => {
          router.push("/");
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
            <AuthForm setPassword={setPassword} setEmail={setEmail} />
          </div>
          <div className="sign-up-buttons">
            <AuthButtons
              actionText="sign up"
              navigateTo="/?action=about"
              isDisabled={email.length === 0 || password.length === 0}
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

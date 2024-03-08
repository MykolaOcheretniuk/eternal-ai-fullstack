"use client";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./SignIn.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { EMAIL_TEST_REGEX } from "@/constants/regex";
import { signIn } from "next-auth/react";
import { useEscapeKeyHandler } from "@/utils/handleEscPush";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import { Toaster, toast } from "sonner";
export const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dataSending, setDataSending] = useState(false);
  const signInAreaRef = useRef(null);
  const successMessage = searchParams.get("successMessage");
  const submitLogin = async () => {
    setDataSending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (!res?.ok) {
      toast(res?.error, {
        style: {
          background: "#F82D98",
          border: "none",
          fontSize: "18px",
          color: "white",
          fontFamily: "Avenir",
          justifyContent: "center",
        },
      });
    } else {
      router.push("/");
    }
    setDataSending(false);
  };
  useEscapeKeyHandler(() => {
    router.push("/");
  });
  useHandleOutsideClick(signInAreaRef, () => {
    router.push("/");
  });
  useEnterKeyHandler(() => {
    if (email.length > 0 && password.length > 0) {
      submitLogin();
    }
  });
  useEffect(() => {
    if (successMessage) {
      toast(successMessage, {
        style: {
          background: "#B5E42E",
          color: "black",
          border: "none",
          fontSize: "18px",
          fontFamily: "Avenir",
          justifyContent: "center",
        },
      });
      router.replace("/?action=signIn");
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [router, successMessage]);
  return (
    <>
      <Toaster position="top-center" />
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
              dataSending={dataSending}
              onClick={() => {
                submitLogin();
              }}
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

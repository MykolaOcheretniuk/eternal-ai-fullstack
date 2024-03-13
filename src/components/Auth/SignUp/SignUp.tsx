"use client";
import "./SignUp.css";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { EMAIL_TEST_REGEX } from "@/constants/regex";
import { useEscapeKeyHandler } from "@/utils/handleEscPush";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import { Toaster, toast } from "sonner";
export const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dataSending, setDataSending] = useState(false);
  const signUpAreaRef = useRef(null);
  const errorMessage = searchParams.get("errorMessage");
  useHandleOutsideClick(signUpAreaRef, () => {
    router.push("/");
  });
  useEscapeKeyHandler(() => {
    router.push("/");
  });
  useEnterKeyHandler(() => {
    if (email.length > 0 && password.length > 0) {
      saveRegisterData();
    }
  });
  const saveRegisterData = () => {
    setDataSending(true);
    sessionStorage.setItem(
      "REGISTER_DATA",
      JSON.stringify({ email, password })
    );
    setDataSending(false);
    router.push("/?action=about");
  };

  useEffect(() => {
    if (errorMessage) {
      toast(errorMessage, {
        style: {
          background: "#F82D98",
          border: "none",
          fontSize: "18px",
          color: "white",
          fontFamily: "Avenir",
        },
      });
      router.replace("/?action=signUp");
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [errorMessage, router]);
  return (
    <>
      <Toaster position="top-center" />
      <Image
        className="auth-pop-up-logo"
        src={EternalLogo}
        alt="logo"
        onClick={() => {
          saveRegisterData();
          router.push("/?action=about");
        }}
      />
      <div>
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
                dataSending={dataSending}
                onClick={() => {
                  saveRegisterData();
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
      </div>
    </>
  );
};

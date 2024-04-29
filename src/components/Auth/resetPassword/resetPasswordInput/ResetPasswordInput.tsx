import { useRouter } from "next/navigation";
import EternalLogo from "../../../../../public/EternalLogo.svg";
import XMark from "../../../../../public/xMark.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./ResetPasswordInputStyle.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import Spinner from "../../../../../public/ButtonSpinner.svg";
import { BASE_URL, HEADERS } from "@/constants/api";
import { UpdateUser } from "@/models/user";
export const ResetPasswordInput = () => {
  const router = useRouter();
  const activeAreaRef = useRef<HTMLDivElement>(null);
  const [password, setPassword] = useState("");
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  const [isDataSending, setIsDataSending] = useState(false);
  const resetPassword = async () => {
    setIsDataSending(true);
    const resetPasswordToken = sessionStorage.getItem("RESET_PASSWORD_TOKEN");
    if (resetPasswordToken) {
      const updateRequest: UpdateUser = {
        name: undefined,
        email: undefined,
        password: password,
        phone: undefined,
      };
      const res = await fetch(`${BASE_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resetPasswordToken}`,
        },
        body: JSON.stringify(updateRequest),
      });
      const { message } = await res.json();
      if (!res.ok) {
        return router.push(`/?action=signUp&errorMessage=${message}`);
      }
      setIsDataSending(false);
      router.push("/?action=signIn&successMessage=Password successfully reset");
    }
  };

  useHandleOutsideClick(activeAreaRef, () => {
    setIsPopUpOpen(false);
    router.push("/");
  });
  useEnterKeyHandler(async () => {
    if (password.length > 0) {
      await resetPassword();
    }
  });
  useEffect(() => {
    const resetEmail = sessionStorage.getItem("RESET_PASSWORD_EMAIL");
    const resetPasswordToken = sessionStorage.getItem("RESET_PASSWORD_TOKEN");
    if (!resetEmail || !resetPasswordToken) {
      router.push("/?action=password-reset-email-input");
    }
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
                  setPassword(target.value);
                }}
              ></input>
            </div>
            <button
              className="reset-password-input-submit gradient-button"
              disabled={password.length === 0}
              onClick={async () => {
                await resetPassword();
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

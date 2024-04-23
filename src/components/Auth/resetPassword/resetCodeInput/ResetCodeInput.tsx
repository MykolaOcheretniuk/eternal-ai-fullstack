import { useRouter } from "next/navigation";
import EternalLogo from "../../../../../public/EternalLogo.svg";
import XMark from "../../../../../public/xMark.svg";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import "./ResetCodeInputStyle.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import Link from "next/link";
export const ResetCodeInput = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const activeAreaRef = useRef(null);
  useHandleOutsideClick(activeAreaRef, () => {
    router.push("/");
  });
  useEnterKeyHandler(() => {
    if (otp.length) {
      router.push("/?action=password-reset-password-input");
    }
  });
  useEffect(() => {
    const resetEmail = sessionStorage.getItem("RESET_PASSWORD_EMAIL");
    if (!resetEmail) {
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
        <button className="close-button" onClick={() => router.push("/")}>
          <Image className="close-button-ig" src={XMark} alt="x mark" />
        </button>
        <div className="container">
          <div className="reset-code gradient-border" ref={activeAreaRef}>
            <div>
              <h1 className="reset-code-title avenir-bold">Enter Code</h1>
              <p className="base-text reset-code-text">
                We have sent code to your email address.
              </p>
            </div>
            <div className="reset-code-input-container">
              <b className="reset-code-input-text avenir-bold">6 Digit Code</b>
              <div className="reset-code-otp-container">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  containerStyle={{ gap: "8px" }}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </div>
            <div className="reset-code-button-container">
              <button
                className="reset-code-submit gradient-button"
                disabled={otp.length === 0}
                onClick={() => {
                  router.push("/?action=password-reset-password-input");
                }}
              >
                ENTER
              </button>
            </div>
            <b className="reset-code-resend avenir-bold">
              Need a new code?
              <span className="reset-code-resend-active purple-text">
                {" "}
                Resend Code
              </span>
            </b>
          </div>
        </div>
      </div>
    </>
  );
};

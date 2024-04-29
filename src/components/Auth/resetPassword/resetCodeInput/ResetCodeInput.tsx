import { useRouter } from "next/navigation";
import EternalLogo from "../../../../../public/EternalLogo.svg";
import XMark from "../../../../../public/xMark.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import "./ResetCodeInputStyle.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { BASE_URL, HEADERS } from "@/constants/api";
import { Toaster, toast } from "sonner";
import Spinner from "../../../../../public/ButtonSpinner.svg";
export const ResetCodeInput = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const activeAreaRef = useRef(null);
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  const [isDataSending, setIsDataSending] = useState(false);
  const checkOtp = async () => {
    setIsDataSending(true);
    if (email) {
      const res = await fetch(`${BASE_URL}/check-otp`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ email: email, submittedOtp: otp }),
      });
      const { token } = await res.json();
      if (!res.ok) {
        toast("Invalid code!", {
          style: {
            background: "#F82D98",
            border: "none",
            fontSize: "18px",
            color: "white",
            fontFamily: "Avenir",
          },
        });
        setIsDataSending(false);
        return;
      }
      sessionStorage.setItem("RESET_PASSWORD_TOKEN", token);
      setIsDataSending(false);
      router.push("/?action=password-reset-password-input");
    }
  };
  const resendCode = async () => {
    const codeWasSent = sessionStorage.getItem("CODE_WAS_RESENT");
    if (!codeWasSent) {
      sessionStorage.setItem("CODE_WAS_RESENT", "true");
      const res = await fetch(`${BASE_URL}/send-otp`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ email: email }),
      });
      const { message } = await res.json();
      if (!res.ok) {
        return router.push(`/?action=signUp&errorMessage=${message}`);
      }
      toast("Code sent!", {
        style: {
          background: "#B5E42E",
          color: "black",
          border: "none",
          fontSize: "18px",
          fontFamily: "Avenir",
          justifyContent: "center",
        },
      });
      return;
    }
    toast("You cant request resend anymore!", {
      style: {
        background: "#F82D98",
        border: "none",
        fontSize: "18px",
        color: "white",
        fontFamily: "Avenir",
      },
    });
  };
  useHandleOutsideClick(activeAreaRef, () => {
    setIsPopUpOpen(false);
    router.push("/");
  });
  useEnterKeyHandler(async () => {
    if (otp.length) {
      await checkOtp();
    }
  });
  useEffect(() => {
    const resetEmail = sessionStorage.getItem("RESET_PASSWORD_EMAIL");
    if (!resetEmail) {
      router.push("/?action=password-reset-email-input");
    }
    setEmail(resetEmail);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [router]);

  return (
    <>
      <Toaster position="top-left" />
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
                  shouldAutoFocus={true}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </div>
            <div className="reset-code-button-container">
              <button
                className="reset-code-submit gradient-button"
                disabled={otp.length !== 6}
                onClick={async () => {
                  await checkOtp();
                }}
              >
                {isDataSending ? (
                  <Image
                    className="button-spinner"
                    src={Spinner}
                    alt="loading"
                  />
                ) : (
                  <>ENTER</>
                )}
              </button>
            </div>
            <b className="reset-code-resend avenir-bold">
              Need a new code?
              <span
                className="reset-code-resend-active purple-text"
                onClick={async () => {
                  resendCode();
                }}
              >
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

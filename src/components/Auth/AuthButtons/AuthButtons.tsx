"use client";
import "./AuthButtons.css";
import GoogleIcon from "../../../../public/googleIcon.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../../../../public/ButtonSpinner.svg";
interface Props {
  isDisabled: boolean;
  dataSending: boolean;
  actionText: string;
  onClick: () => void;
}
export const AuthButtons = ({
  dataSending,
  isDisabled,
  actionText,
  onClick,
}: Props) => {
  const router = useRouter();
  const [isGoogleDataSending, setIsGoogleDataSending] = useState(false);
  const googleSignIn = async () => {
    setIsGoogleDataSending(true);
    await signIn("google", {
      callbackUrl: "/",
    });
  };
  return (
    <div className="auth-buttons">
      <button
        className="auth-button google-button"
        onClick={async () => {
          await googleSignIn();
        }}
      >
        { isGoogleDataSending ? (
          <Image className="button-spinner" src={Spinner} alt="loading" />
        ) : (
          <>
            <Image
              className="google-button-img"
              src={GoogleIcon}
              alt="google login"
            />
            sign up with google
          </>
        )}
      </button>
      <button
        className="auth-button confirm-button gradient-button"
        onClick={onClick}
        disabled={isDisabled}
      >
        {dataSending ? (
          <Image className="button-spinner" src={Spinner} alt="loading" />
        ) : (
          <>{actionText}</>
        )}
      </button>
    </div>
  );
};

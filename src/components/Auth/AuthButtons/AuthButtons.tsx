"use client";
import "./AuthButtons.css";
import GoogleIcon from "../../../../public/googleIcon.svg";
import Image from "next/image";
interface Props {
  isDisabled: boolean;
  actionText: string;
  onClick: () => void;
}
export const AuthButtons = ({ isDisabled, actionText, onClick }: Props) => {
  return (
    <div className="auth-buttons">
      <button className="auth-button google-button">
        <Image
          className="google-button-img"
          src={GoogleIcon}
          alt="google login"
        />
        sign up with google
      </button>
      <button
        className="auth-button confirm-button gradient-button"
        onClick={onClick}
        disabled={isDisabled}
      >
        {actionText}
      </button>
    </div>
  );
};

"use client";
import "./AuthButtons.css";
import GoogleIcon from "../../../../public/googleIcon.svg";
import Image from "next/image";
interface Props {
  navigateTo: string;
  isDisabled: boolean;
  actionText: string;
}
import { useRouter } from "next/navigation";
export const AuthButtons = ({ navigateTo, isDisabled, actionText }: Props) => {
  const router = useRouter();
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
        onClick={() => {
          router.push(navigateTo);
        }}
        disabled={isDisabled}
      >
        {actionText}
      </button>
    </div>
  );
};

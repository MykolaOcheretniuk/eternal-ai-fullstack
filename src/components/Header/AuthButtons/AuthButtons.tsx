"use client";
import "./AuthButtons.css";
import { useRouter } from "next/navigation";
export const AuthButtons = () => {
  const router = useRouter();
  return (
    <div className="header-auth-buttons">
      <button
        className="header-auth-login"
        onClick={() => {
          router.push("/?action=signIn");
        }}
      >
        Login
      </button>
      <button
        className="header-auth-start gradient-button"
        onClick={() => {
          router.push("/?action=signUp");
        }}
      >
        Get started
      </button>
    </div>
  );
};

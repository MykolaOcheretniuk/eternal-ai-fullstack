"use client";
import { signOut, useSession } from "next-auth/react";
import "./AuthButtons.css";
import { useRouter } from "next/navigation";
export const AuthButtons = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="header-auth-buttons">
      {!session?.user ? (
        <button
          className="header-auth-login auth-button"
          onClick={() => {
            router.push("/?action=signIn");
          }}
        >
          Login
        </button>
      ) : (
        <>
          <button
            className="header-auth-login auth-button"
            onClick={() => {
              signOut();
            }}
          >
            sign out
          </button>
        </>
      )}
      <button
        className="header-auth-start gradient-button auth-button"
        onClick={() => {
          if (session?.user) {
            return router.push("/?pricing=info");
          }
          return router.push("/?action=signUp");
        }}
      >
        Get started
      </button>
    </div>
  );
};

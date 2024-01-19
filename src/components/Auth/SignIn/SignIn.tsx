import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import "./SignIn.css";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
export const SignIn = () => {
  return (
    <>
      <Image className="auth-pop-up-logo" src={EternalLogo} alt="logo" />
      <button className="close-button">
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="container">
        <div className="sign-in-inner gradient-border">
          <div className="sign-in-inner-text">
            <h1 className="sign-in-title avenir-bold">Login</h1>
          </div>
          <div className="sign-in-auth-form">
            <AuthForm />
          </div>
          <a className="sign-in-forgot-pass base-text">Forgot password?</a>
          <div className="sign-in-auth-buttons">
            <AuthButtons />
          </div>
          <p className="sign-in-sign-up-text avenir-bold">
            Don{"'"}t have an account?{" "}
            <a className="purple-text" href="#">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

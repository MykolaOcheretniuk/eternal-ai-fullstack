import "./SignUp.css";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import { AuthForm } from "../AuthForm/AuthForm";
import { AuthButtons } from "../AuthButtons/AuthButtons";
export const SignUp = () => {
  return (
    <>
      <Image className="auth-pop-up-logo" src={EternalLogo} alt="logo" />
      <button className="close-button">
        <Image className="close-button-ig" src={XMark} alt="x mark" />
      </button>
      <div className="container">
        <div className="sign-up-inner gradient-border">
          <div className="sign-up-inner-text">
            <h1 className="sign-up-title avenir-bold">Get started</h1>
            <p className="base-text sign-up-text">
              To continue please create an account
            </p>
          </div>
          <div className="sign-up-form-container">
            <AuthForm />
          </div>
          <div className="sign-up-buttons">
            <AuthButtons />
          </div>
          <p className="sign-up-sign-in-text">
            Already have an account?{" "}
            <a className="purple-text" href="#">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

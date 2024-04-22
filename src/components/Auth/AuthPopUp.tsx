import { SignIn } from "@/components/Auth/SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import { AboutPlatform } from "./AboutPlatform/AboutPlatform";
import { ResetCodeInput } from "./resetPassword/resetCodeInput/ResetCodeInput";
import { ResetEmailInput } from "./resetPassword/resetEmailInput/ResetEmailInput";
import { ResetPasswordInput } from "./resetPassword/resetPasswordInput/ResetPasswordInput";

interface Props {
  action: string;
}
export const AuthPopUp = ({ action }: Props) => {
  return (
    <div className="auth-pop-up">
      {action === "signIn" && (
        <section className="auth-pop-up container-with-blur">
          <SignIn />
        </section>
      )}
      {action === "signUp" && (
        <section className="auth-pop-up container-with-blur">
          <SignUp />
        </section>
      )}
      {action === "about" && (
        <section className="auth-pop-up container-with-blur">
          <AboutPlatform />
        </section>
      )}
      {action === "password-reset-code-input" && (
        <section className="auth-pop-up container-with-blur">
          <ResetCodeInput />
        </section>
      )}
      {action === "password-reset-email-input" && (
        <section className="auth-pop-up container-with-blur">
          <ResetEmailInput />
        </section>
      )}
      {action === "password-reset-password-input" && (
        <section className="auth-pop-up container-with-blur">
          <ResetPasswordInput />
        </section>
      )}
    </div>
  );
};
